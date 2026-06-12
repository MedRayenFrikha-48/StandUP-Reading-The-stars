'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, SceneType, SealType } from '@/types/game';

interface GameContextType {
  gameState: GameState;
  moveToScene: (scene: SceneType) => void;
  unlockSeal: (seal: SealType) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: 'intro',
    unlockedSeals: new Set(),
    progress: 0,
    gameComplete: false,
  });

  const moveToScene = (scene: SceneType) => {
    setGameState((prev) => ({ ...prev, currentScene: scene }));
  };

  const unlockSeal = (seal: SealType) => {
    setGameState((prev) => {
      const newSeals = new Set(prev.unlockedSeals);
      newSeals.add(seal);
      const newProgress = Math.min((newSeals.size / 4) * 100, 100);
      return {
        ...prev,
        unlockedSeals: newSeals,
        progress: newProgress,
      };
    });
  };

  const resetGame = () => {
    setGameState({
      currentScene: 'intro',
      unlockedSeals: new Set(),
      progress: 0,
      gameComplete: false,
    });
  };

  return (
    <GameContext.Provider value={{ gameState, moveToScene, unlockSeal, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
