import { initializeAnalytics, logEvent, setUserProperties } from 'firebase/analytics';
import { app } from '../firebase';
import { User } from '../../types/models';

export class Analytics {
  private static instance: Analytics;
  private analytics;

  private constructor() {
    this.analytics = initializeAnalytics(app);
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  trackEvent(eventName: string, params?: Record<string, any>) {
    logEvent(this.analytics, eventName, params);
  }

  setUser(user: User | null) {
    if (user) {
      setUserProperties(this.analytics, {
        role: user.role,
        academy_id: user.academy_id || 'none'
      });
    }
  }

  // Eventos predefinidos
  trackPageView(pageName: string) {
    this.trackEvent('page_view', { page_name: pageName });
  }

  trackLogin(method: string) {
    this.trackEvent('login', { method });
  }

  trackError(error: Error, context?: string) {
    this.trackEvent('error', {
      error_name: error.name,
      error_message: error.message,
      context
    });
  }

  trackFeatureUsage(featureName: string) {
    this.trackEvent('feature_used', { feature_name: featureName });
  }
}

export const analytics = Analytics.getInstance();