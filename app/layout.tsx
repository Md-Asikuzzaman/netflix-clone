import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import Provider from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'Netflix Clone | Developed by dev Asik',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Provider>
        <body className={inter.className} suppressHydrationWarning={true}>
          {children}
        </body>
      </Provider>
    </html>
  );
}
