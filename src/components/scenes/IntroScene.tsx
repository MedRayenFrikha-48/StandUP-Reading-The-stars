'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/game';

const IntroScene: React.FC = () => {
  const { moveToScene } = useGame();
  const [displayedText, setDisplayedText] = useState('');
  const [showCTA, setShowCTA] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const textSequence = [
    { text: 'Many searched for the Island of Peak.', delay: 2000 },
    { text: 'Few ever found it.', delay: 8000 },
    { text: 'The stars reveal the path.', delay: 14000 },
  ];

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    textSequence.forEach((item, index) => {
      timeouts.push(
        setTimeout(() => {
          setDisplayedText(item.text);
          if (index === textSequence.length - 1) {
            setTimeout(() => setShowCTA(true), 3000);
          }
        }, item.delay)
      );
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-celestial overflow-hidden">
      <AnimatedOcean />

      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="absolute top-6 right-6 z-10 p-3 rounded-full border border-celestial-light hover:bg-celestial-ocean/50 transition-colors"
        aria-label="Toggle audio"
      >
        {audioEnabled ? '🔊' : '🔇'}
      </button>

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center max-w-2xl px-6">
          <motion.p
            key={displayedText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-4xl font-serif text-celestial-light mb-12 leading-relaxed"
          >
            {displayedText}
          </motion.p>
        </div>
      </div>

      {showCTA && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        >
          <button
            onClick={() => moveToScene('journal')}
            className="px-8 py-4 bg-celestial-gold hover:bg-celestial-gold/80 text-celestial-dark font-bold rounded-full transition-colors text-lg"
          >
            ⚓ Begin Navigation
          </button>
        </motion.div>
      )}
    </div>
  );
};

const AnimatedOcean: React.FC = () => {
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a1428" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#020B1F" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#oceanGradient)" />
        <motion.path
          d="M 0 300 Q 300 280 600 300 T 1200 300"
          stroke="#A9C8FF"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
          animate={{ d: ['M 0 300 Q 300 280 600 300 T 1200 300', 'M 0 300 Q 300 320 600 300 T 1200 300', 'M 0 300 Q 300 280 600 300 T 1200 300'] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </svg>

      <motion.div
        className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-6xl opacity-40"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ⛵
      </motion.div>

      <motion.div
        className="absolute top-10 right-0 text-6xl opacity-20"
        animate={{ x: [-100, 300] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        ☁️
      </motion.div>
    </div>
  );
};

export default IntroScene;
