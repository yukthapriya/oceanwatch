import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '🌊 OceanWatch — Maritime Intelligence',
  description: 'Real-time maritime intelligence dashboard with 3D globe visualization',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: '#0a0e1a', color: '#e2e8f0', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
