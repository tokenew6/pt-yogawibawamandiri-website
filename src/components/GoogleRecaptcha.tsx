import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

interface GoogleRecaptchaProps {
  onVerify: (token: string) => void;
  onExpired?: () => void;
  onError?: () => void;
  size?: 'compact' | 'normal';
  theme?: 'light' | 'dark';
}

const GoogleRecaptcha = ({ 
  onVerify, 
  onExpired, 
  onError, 
  size = 'normal', 
  theme = 'light' 
}: GoogleRecaptchaProps) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [widgetId, setWidgetId] = useState<number | null>(null);

  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key

  useEffect(() => {
    // Load reCAPTCHA script if not already loaded
    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
      script.async = true;
      script.defer = true;
      
      // Define global callback
      (window as any).onRecaptchaLoad = () => {
        setIsLoaded(true);
      };
      
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }

    return () => {
      // Cleanup
      if (widgetId !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetId);
        } catch (error) {
          console.warn('Failed to reset reCAPTCHA:', error);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (isLoaded && recaptchaRef.current && !widgetId) {
      try {
        const id = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          size: size,
          theme: theme,
          callback: (token: string) => {
            onVerify(token);
          },
          'expired-callback': () => {
            onExpired?.();
          },
          'error-callback': () => {
            onError?.();
          }
        });
        setWidgetId(id);
      } catch (error) {
        console.error('Failed to render reCAPTCHA:', error);
        onError?.();
      }
    }
  }, [isLoaded, size, theme, onVerify, onExpired, onError]);

  const reset = () => {
    if (widgetId !== null && window.grecaptcha) {
      try {
        window.grecaptcha.reset(widgetId);
      } catch (error) {
        console.warn('Failed to reset reCAPTCHA:', error);
      }
    }
  };

  const getResponse = (): string | null => {
    if (widgetId !== null && window.grecaptcha) {
      try {
        return window.grecaptcha.getResponse(widgetId);
      } catch (error) {
        console.warn('Failed to get reCAPTCHA response:', error);
        return null;
      }
    }
    return null;
  };

  // Expose reset and getResponse methods
  useEffect(() => {
    if (recaptchaRef.current) {
      (recaptchaRef.current as any).reset = reset;
      (recaptchaRef.current as any).getResponse = getResponse;
    }
  }, [widgetId]);

  return (
    <div className="flex justify-center">
      <div ref={recaptchaRef} className="inline-block" />
      {!isLoaded && (
        <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded">
          <div className="text-sm text-gray-500">Loading reCAPTCHA...</div>
        </div>
      )}
    </div>
  );
};

// Hook for using reCAPTCHA in forms
export const useRecaptcha = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = (recaptchaToken: string) => {
    setToken(recaptchaToken);
    setIsVerified(true);
  };

  const handleExpired = () => {
    setToken(null);
    setIsVerified(false);
  };

  const handleError = () => {
    setToken(null);
    setIsVerified(false);
  };

  const reset = () => {
    setToken(null);
    setIsVerified(false);
  };

  return {
    token,
    isVerified,
    handleVerify,
    handleExpired,
    handleError,
    reset
  };
};

export default GoogleRecaptcha;
