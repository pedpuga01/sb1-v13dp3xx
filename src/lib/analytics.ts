import mixpanel from 'mixpanel-browser';
import { getAnalytics, logEvent } from 'firebase/analytics';

// Inicializar Mixpanel
mixpanel.init('TU_TOKEN_MIXPANEL');

// Firebase Analytics
const analytics = getAnalytics();

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Trackear en Mixpanel
  mixpanel.track(eventName, properties);
  
  // Trackear en Firebase Analytics
  logEvent(analytics, eventName, properties);
};

export const identifyUser = (userId: string, userProperties?: Record<string, any>) => {
  mixpanel.identify(userId);
  if (userProperties) {
    mixpanel.people.set(userProperties);
  }
};