import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../../lib/analytics/Analytics';
import { useAuth } from '../../hooks/useAuth';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAuth();

  // Trackear cambios de página
  useEffect(() => {
    analytics.trackPageView(location.pathname);
  }, [location]);

  // Actualizar usuario en analytics
  useEffect(() => {
    analytics.setUser(user);
  }, [user]);

  return <>{children}</>;
}