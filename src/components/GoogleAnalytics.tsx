import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const GoogleAnalytics = () => {
  useEffect(() => {
    // Google Analytics 4 configuration
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
    
    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          'custom_dimension_1': 'company_type',
          'custom_dimension_2': 'user_role'
        }
      });
    `;
    document.head.appendChild(script2);

    // Track page views
    const trackPageView = () => {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: window.location.pathname + window.location.search,
          page_title: document.title,
        });
      }
    };

    // Initial page view
    trackPageView();

    // Track route changes for SPA
    const handleRouteChange = () => {
      setTimeout(trackPageView, 100);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null;
};

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters?.label || '',
      value: parameters?.value || 1,
      ...parameters
    });
  }
};

export const trackConversion = (conversionType: string, value?: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      send_to: import.meta.env.VITE_GA_CONVERSION_ID,
      event_category: 'conversion',
      event_label: conversionType,
      value: value || 1,
      currency: 'IDR'
    });
  }
};

export const trackOrder = (orderId: string, value: number, items: any[]) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: value,
      currency: 'IDR',
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price
      }))
    });
  }
};

export const trackAIInteraction = (action: string, details?: any) => {
  trackEvent('ai_interaction', {
    event_category: 'ai_assistant',
    event_label: action,
    custom_dimension_1: details?.type || 'general',
    custom_dimension_2: details?.language || 'id'
  });
};

export default GoogleAnalytics;
