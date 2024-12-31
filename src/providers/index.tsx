'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './auth-provider';
import { AcademyProvider } from './academy-provider';
import { ThemeProvider } from './theme-provider';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AcademyProvider>
            {children}
          </AcademyProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}