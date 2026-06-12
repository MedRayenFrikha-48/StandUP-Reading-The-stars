'use client';

import { GameProvider } from '@/context/game';
import { ReactNode } from 'react';

export function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <GameProvider>
      {children}
    </GameProvider>
  );
}
