import type { Metadata } from 'next';
import './globals.css';
import ThemeRegistry from '@/app/components/providers/ThemeRegistry';
import Navbar from '@/app/components/layout/Navbar';
import Sidebar from '@/app/components/layout/Sidebar';
import { SidebarProvider } from '@/app/components/providers/SidebarProvider';

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
          <SidebarProvider>
            <div className='h-screen flex flex-col overflow-hidden'>
              <Navbar />
              <div className='flex flex-row flex-1 pt-16 overflow-hidden'>
                <Sidebar />
                <main className='flex-1 overflow-hidden bg-background'>
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
