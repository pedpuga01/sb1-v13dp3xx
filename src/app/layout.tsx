import { Providers } from '@/providers';
import '@/styles/globals.css';

export const metadata = {
  title: 'Lidia - Gestión de Academias',
  description: 'Plataforma de gestión para academias y centros educativos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}