import type { Metadata } from 'next';
import { GameProvider } from '@/context/game';
import './globals.css';

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
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
