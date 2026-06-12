import React from 'react';
import { motion } from 'motion/react';
import { PortfolioTheme } from '../types';

interface BackgroundBlobsProps {
  theme: PortfolioTheme;
}

export default function BackgroundBlobs({ theme }: BackgroundBlobsProps) {
  // Check if dark theme is selected (for cyberfield)
  const isDark = theme.id === 'cyberfield';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Absolute Backdrop Gradient Base */}
      <div 
        className={`absolute inset-0 transition-colors duration-1000 ${
          isDark 
            ? 'bg-slate-950' 
            : 'bg-gradient-to-tr from-[#f8fafc] via-[#fdfdfd] to-[#eff6ff]/30'
        }`}
        style={{
          background: isDark 
            ? 'radial-gradient(ellipse at top, #0f172a, #020617, #090d16)' 
            : undefined
        }}
      />

      {/* Main watercolor soft glowing blobs */}
      <motion.div
        id="bg-blob-1"
        className="absolute rounded-full filter blur-[100px] opacity-60 mix-blend-multiply"
        style={{
          width: '500px',
          height: '500px',
          backgroundColor: theme.blob1Color,
          left: '10%',
          top: '-5%',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        id="bg-blob-2"
        className="absolute rounded-full filter blur-[120px] opacity-50 mix-blend-multiply"
        style={{
          width: '600px',
          height: '600px',
          backgroundColor: theme.blob2Color,
          right: '-10%',
          top: '5%',
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        id="bg-blob-3"
        className="absolute rounded-full filter blur-[100px] opacity-50 mix-blend-multiply"
        style={{
          width: '450px',
          height: '450px',
          backgroundColor: theme.blob3Color,
          left: '-5%',
          top: '40%',
        }}
        animate={{
          x: [0, 30, -40, 0],
          y: [0, 50, -20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        id="bg-blob-4"
        className="absolute rounded-full filter blur-[110px] opacity-45 mix-blend-multiply"
        style={{
          width: '550px',
          height: '550px',
          backgroundColor: theme.blob4Color,
          right: '15%',
          bottom: '10%',
        }}
        animate={{
          x: [0, -40, 40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating 3D/Geometric glass shapes from screenshot */}
      
      {/* 1. Teal Sphere top left */}
      <motion.div
        id="geom-teal-sphere"
        className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400/40 to-cyan-300/10 backdrop-blur-[2px] border border-white/20 shadow-lg"
        style={{ left: '6%', top: '15%' }}
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 2. Soft lavender coin top right */}
      <motion.div
        id="geom-lavender-coin"
        className="absolute w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-400/30 to-pink-300/10 backdrop-blur-[2px] border border-white/20 shadow-md rotate-12"
        style={{ right: '8%', top: '22%' }}
        animate={{ y: [0, 12, 0], rotate: [12, -12, 12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3. Small light-blue cylinder near gallery header */}
      <motion.div
        id="geom-blue-cylinder"
        className="absolute w-6 h-10 rounded-full bg-gradient-to-b from-sky-400/30 to-blue-500/10 backdrop-blur-[3px] border border-white/20 shadow-lg"
        style={{ left: '4%', top: '48%' }}
        animate={{ y: [0, -18, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 4. Triangular prism (rotated card) right of gallery */}
      <motion.div
        id="geom-prism-1"
        className="absolute w-10 h-10 bg-gradient-to-br from-indigo-300/30 to-teal-200/10 backdrop-blur-[4px] border border-white/30"
        style={{
          right: '5%',
          top: '35%',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
        animate={{ y: [0, -14, 0], rotate: [0, 360] }}
        transition={{ 
          y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
      />

      {/* 5. Pink sphere next to EcoTracker card */}
      <motion.div
        id="geom-pink-sphere"
        className="absolute w-14 h-14 rounded-full bg-gradient-to-tr from-pink-400/40 to-rose-300/5 backdrop-blur-[6px] border border-white/20 shadow-xl"
        style={{ left: '22%', top: '56%' }}
        animate={{ y: [0, 15, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 6. Blue floating cone bottom right of timeline */}
      <motion.div
        id="geom-cone-1"
        className="absolute w-12 h-12 bg-gradient-to-br from-indigo-400/40 to-pink-300/10 backdrop-blur-[4px] border border-white/20"
        style={{
          right: '8%',
          top: '72%',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
        animate={{ y: [0, 20, 0], rotate: [45, 15, 45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 7. Rounded lavender sphere bottom left near footer list */}
      <motion.div
        id="geom-lavender-sphere"
        className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-300/30 via-purple-400/20 to-pink-300/5 backdrop-blur-[6px] border border-white/25 shadow-lg"
        style={{ left: '8%', bottom: '15%' }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 8. Gigantic soft warmth gradient bottom right */}
      <motion.div
        id="geom-footer-glowing-circle"
        className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-rose-400/20 to-yellow-300/10 backdrop-blur-[10px] border border-white/10"
        style={{ right: '12%', bottom: '-4%' }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
