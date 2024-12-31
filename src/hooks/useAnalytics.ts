import { useCallback } from 'react';
import { analytics } from '../lib/analytics/Analytics';
import { useAuth } from './useAuth';

export function useAnalytics() {
  const { user } = useAuth();

  const trackEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    analytics.trackEvent(eventName, {
      ...params,
      user_id: user?.id,
      user_role: user?.role
    });
  }, [user]);

  const trackError = useCallback((error: Error, context?: string) => {
    analytics.trackError(error, context);
  }, []);

  const trackPageView = useCallback((pageName: string) => {
    analytics.trackPageView(pageName);
  }, []);

  return {
    trackEvent,
    trackError,
    trackPageView
  };
}