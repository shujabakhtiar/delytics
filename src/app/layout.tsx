import type { Metadata } from 'next';
import './globals.css';
import ThemeRegistry from '@/app/ui/providers/ThemeRegistry';
import Navbar from '@/app/ui/layout/Navbar';

export const metadata: Metadata = {
  title: 'Delytics - Smarter Delivery Management',
  description: 'Delytics helps businesses track, optimize, and analyze deliveries in real-time.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
            <Navbar />
            <main>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
