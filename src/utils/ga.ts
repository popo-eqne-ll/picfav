declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

export const trackPageView = (path: string) => {
  if (GA_TRACKING_ID && typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      'page_path': path
    });
  } else {
    console.warn('GA_TRACKING_ID is not set or gtag is not available. Page view not tracked:', path);
  }
};

export const trackEvent = (eventName: string, eventParams: { [key: string]: any }) => {
  if (GA_TRACKING_ID && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  } else {
    console.warn('GA_TRACKING_ID is not set or gtag is not available. Event not tracked:', eventName, eventParams);
  }
};
