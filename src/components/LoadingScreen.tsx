import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [startAnim, setStartAnim] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const duration = 2700; // 2700ms total
  const words = ["设计", "创造", "启发"];

  useEffect(() => {
    // Small delay to start visual entrance cleanly
    setStartAnim(true);

    let animationFrameId: number;

    const updateCounter = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      // Rotate words every 900ms (0-900 indices 0, 1, 2)
      const currentWordIdx = Math.min(
        words.length - 1, 
        Math.floor(elapsed / 900)
      );
      setWordIndex(currentWordIdx >= 0 ? currentWordIdx : 0);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        // When counter reaches 100, delay for 400ms, then trigger onComplete
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-12 select-none overflow-hidden">
      {/* Top Left: "Portfolio" label */}
      <div className="flex justify-between items-start">
        <AnimatePresence>
          {startAnim && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-text-primary text-xs uppercase tracking-[0.3em] font-medium"
            >
              PORTFOLIO
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="text-[10px] text-muted tracking-widest font-mono">
          EDITION '26
        </div>
      </div>

      {/* Center: Spinning display words */}
      <div className="flex justify-center items-center my-auto">
        <div className="h-24 md:h-32 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={wordIndex}
              initial={{ y: 30, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 0.8, filter: 'blur(0px)' }}
              exit={{ y: -30, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary text-center"
            >
              {words[wordIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Side Info: Right side counter and overall progress */}
      <div className="space-y-4">
        <div className="flex justify-end items-end">
          <div className="text-right">
            <div className="text-3xl sm:text-5xl md:text-8xl lg:text-9xl font-display text-text-primary font-bold tabular-nums tracking-tighter leading-none">
              {String(count).padStart(3, "0")}
            </div>
            <div className="text-[11px] text-muted tracking-widest font-mono mt-2 uppercase">
              EXPERIENCE INDEXING_
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="h-[3px] bg-stroke/30 rounded-full w-full overflow-hidden relative">
          <div
            className="h-full accent-gradient transition-transform duration-75 origin-left"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 12px rgba(137, 170, 204, 0.75)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
