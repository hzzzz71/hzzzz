import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SkillCard {
  id: string;
  name: string;
  category: string;
  level: string;
  imageUrl: string;
  color: string;
}

export default function SkillsSection() {
  // 1. Core Engineering and Visual Tools mapping to matching abstract images
  const topRowSkills: SkillCard[] = [
    {
      id: 'skill-react',
      name: 'React / Next.js',
      category: 'Frontend Core',
      level: 'Mastery',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop',
      color: 'border-cyan-500/30 text-cyan-600'
    },
    {
      id: 'skill-threejs',
      name: 'Three.js / WebGL',
      category: '3D Graphics',
      level: 'Expert',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop',
      color: 'border-fuchsia-500/30 text-fuchsia-600'
    },
    {
      id: 'skill-ts',
      name: 'TypeScript',
      category: 'Robust Architecture',
      level: 'Expert',
      imageUrl: 'https://images.unsplash.com/photo-1516116211223-5c359a36298a?q=80&w=400&auto=format&fit=crop',
      color: 'border-blue-500/30 text-blue-600'
    },
    {
      id: 'skill-gsap',
      name: 'GSAP Animation',
      category: 'Fluid Motion',
      level: 'Mastery',
      imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&auto=format&fit=crop',
      color: 'border-emerald-500/30 text-emerald-600'
    },
    {
      id: 'skill-tailwind',
      name: 'Tailwind CSS',
      category: 'Utility Styling',
      level: 'Mastery',
      imageUrl: 'https://images.unsplash.com/photo-1541462608141-2f682d68c94a?q=80&w=400&auto=format&fit=crop',
      color: 'border-teal-500/30 text-teal-600'
    },
    {
      id: 'skill-vite',
      name: 'Vite / ESBuild',
      category: 'Build Automation',
      level: 'Expert',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=400&auto=format&fit=crop',
      color: 'border-purple-500/30 text-purple-600'
    }
  ];

  const bottomRowSkills: SkillCard[] = [
    {
      id: 'skill-figma',
      name: 'Figma DevMode',
      category: 'Visual Crafting',
      level: 'Expert',
      imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=400&auto=format&fit=crop',
      color: 'border-orange-500/30 text-orange-600'
    },
    {
      id: 'skill-webgpu',
      name: 'WebGPU / Shaders',
      category: 'Graphics pipeline',
      level: 'Proficient',
      imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=400&auto=format&fit=crop',
      color: 'border-rose-500/30 text-rose-600'
    },
    {
      id: 'skill-node',
      name: 'Node.js / Express',
      category: 'Full-Stack Base',
      level: 'Expert',
      imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400&auto=format&fit=crop',
      color: 'border-green-500/30 text-green-600'
    },
    {
      id: 'skill-vfx',
      name: 'C4D / AfterEffects',
      category: 'Motion Design',
      level: 'Expert',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop',
      color: 'border-amber-500/30 text-amber-600'
    },
    {
      id: 'skill-perf',
      name: 'HLS / MSE Opt.',
      category: 'Low-Latency Media',
      level: 'Expert',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop',
      color: 'border-indigo-500/30 text-indigo-600'
    },
    {
      id: 'skill-sql',
      name: 'PostgreSQL / SQL',
      category: 'Relational Model',
      level: 'Proficient',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop',
      color: 'border-violet-500/30 text-violet-600'
    }
  ];

  // Double the rows to enable smooth horizontal infinite loop animations
  const doubledTopRow = [...topRowSkills, ...topRowSkills, ...topRowSkills];
  const doubledBottomRow = [...bottomRowSkills, ...bottomRowSkills, ...bottomRowSkills];

  return (
    <section id="skills" className="py-24 bg-bg relative z-10 border-t border-stroke/30 overflow-hidden select-none">
      
      {/* 1. Scrolling Top Row Gallery (Translating left) */}
      <div className="w-full relative mb-12 flex items-center">
        {/* Subtle left gradient overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        {/* Subtle right gradient overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-infinite-scroll-left hover:[animation-play-state:paused] whitespace-nowrap py-6">
          {doubledTopRow.map((skill, index) => {
            // Apply a staggered stagger offset (up / down) based on index
            const staggerY = index % 2 === 0 ? '-14px' : '14px';
            return (
              <div
                key={`${skill.id}-top-${index}`}
                style={{ transform: `translateY(${staggerY})` }}
                className="inline-flex w-[56px] sm:w-[72px] md:w-[84px] aspect-square rounded-[14px] overflow-hidden bg-surface hover:scale-110 hover:rotate-2 transition-all duration-500 relative flex-shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.06)] group cursor-pointer border border-stroke/20"
              >
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Main Centered Header Frame (Reference Style) */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center my-12 relative z-25">
        <h3 className="font-display italic text-3xl sm:text-5xl md:text-6xl text-text-primary tracking-tight leading-tight max-w-4xl mx-auto">
          在数字秩序与视觉感性中融会贯通
        </h3>
      </div>

      {/* 3. Scrolling Bottom Row Gallery (Translating right) */}
      <div className="w-full relative flex items-center">
        {/* Subtle left gradient overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        {/* Subtle right gradient overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-infinite-scroll-right hover:[animation-play-state:paused] whitespace-nowrap py-6">
          {doubledBottomRow.map((skill, index) => {
            // Apply opposite stagger offset for bottom row to make it visually interesting
            const staggerY = index % 2 === 0 ? '14px' : '-14px';
            return (
              <div
                key={`${skill.id}-bottom-${index}`}
                style={{ transform: `translateY(${staggerY})` }}
                className="inline-flex w-[56px] sm:w-[72px] md:w-[84px] aspect-square rounded-[14px] overflow-hidden bg-surface hover:scale-110 hover:-rotate-2 transition-all duration-500 relative flex-shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.06)] group cursor-pointer border border-stroke/20"
              >
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
