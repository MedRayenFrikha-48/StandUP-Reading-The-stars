'use client';

import { useGame } from '@/context/GameContext';
import IntroScene from '@/components/scenes/IntroScene';

const scenes: { [key: string]: React.ComponentType } = {
  intro: IntroScene,
};

export default function Home() {
  const { gameState } = useGame();
  const CurrentScene = scenes[gameState.currentScene];

  return (
    <main className="w-full h-screen">
      {CurrentScene ? <CurrentScene /> : <IntroScene />}
    </main>
  );
}
