'use client';

import { GameProvider } from '@/context/game';
import IntroScene from '@/components/scenes/IntroScene';
import { useGame } from '@/context/game';

const SceneRenderer: React.FC = () => {
  const { gameState } = useGame();

  const scenes: { [key: string]: React.ComponentType } = {
    intro: IntroScene,
  };

  const CurrentScene = scenes[gameState.currentScene] || IntroScene;

  return (
    <main className="w-full h-screen">
      <CurrentScene />
    </main>
  );
};

export default function Page() {
  return (
    <GameProvider>
      <SceneRenderer />
    </GameProvider>
  );
}
