import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';

// Import console filter for development
if (process.env.NODE_ENV === 'development') {
  import('@/lib/console-filter');
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaxPilot AI - Swiss Tax Intelligence',
  description: 'Professional Swiss tax intelligence platform for SMEs. Calculate taxes, optimize deductions, and get AI-powered insights for all Swiss cantons.',
  keywords: 'Swiss tax, tax calculator, tax optimization, SME, Switzerland, cantons, AI tax advice',
  authors: [{ name: 'TaxPilot AI Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'TaxPilot AI - Swiss Tax Intelligence',
    description: 'Professional Swiss tax intelligence platform for SMEs',
    type: 'website',
    locale: 'en_CH',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          inter.className,
          'min-h-screen bg-background font-sans antialiased'
        )}>
          {/* Swiss-themed gradient background */}
          <div className="fixed inset-0 -z-10 swiss-layout" />
          
          {/* Main application content */}
          <div className="relative z-10">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
} 