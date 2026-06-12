import type { Metadata } from 'next';
import './globals.css';
import { RootLayoutClient } from './layout-client';

export const metadata: Metadata = {
  title: 'The Celestial Cipher',
  description: 'Journey to Peak Island - A premium cinematic web experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-celestial-dark">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
