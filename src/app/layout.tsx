import type { Metadata } from 'next';
import './globals.css';
import ThemeRegistry from '@/app/ui/providers/ThemeRegistry';
import Navbar from '@/app/ui/layout/Navbar';
import Sidebar from '@/app/ui/layout/Sidebar';
import { SidebarProvider } from '@/app/ui/providers/SidebarProvider';
import { AuthProvider } from '@/app/ui/providers/AuthProvider';

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
          <AuthProvider>
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
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
