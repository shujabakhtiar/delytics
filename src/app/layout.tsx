import type { Metadata } from 'next';
import './globals.css';
import ThemeRegistry from '@/app/ui/providers/ThemeRegistry';
import Navbar from '@/app/ui/layout/Navbar';
import Sidebar from './ui/layout/Sidebar';
import { SidebarProvider } from '@/app/ui/providers/SidebarProvider';

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
            <div className='min-h-screen flex flex-col'>
              <Navbar />
              <div className='flex flex-row flex-1 pt-16'>
                <Sidebar />
                <main className='flex-1 overflow-auto bg-background'>
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
