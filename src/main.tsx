import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import { ThemeProvider } from 'next-themes'
import GoogleAnalytics from './components/GoogleAnalytics'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <GoogleAnalytics />
    <App />
  </ThemeProvider>
);
