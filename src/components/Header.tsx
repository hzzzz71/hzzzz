import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  onResumeClick: () => void;
  onContactClick: () => void;
}

export default function Header({ 
  onNavClick, 
  activeSection, 
  onResumeClick,
  onContactClick
}: HeaderProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollY > 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      {/* Internal Navigation Shell */}
      <nav 
        className={`inline-flex items-center rounded-full border border-stroke/40 bg-surface/80 px-2.5 py-1.5 md:py-2 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? 'shadow-[0_10px_25px_rgba(0,0,0,0.05)] border-stroke/65 bg-surface/90 scale-[0.98]' : ''
        }`}
      >
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* 2. Navigation items */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 flex-wrap justify-center">
            <button
              onClick={() => onNavClick('hero')}
              className={`text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-3.5 py-1 sm:py-2 transition-all cursor-pointer ${
                activeSection === 'hero' 
                  ? 'text-text-primary bg-stroke/60 font-bold' 
                  : 'text-muted hover:text-text-primary hover:bg-stroke/30'
              }`}
            >
              首页
            </button>
            <button
              onClick={() => onNavClick('internships')}
              className={`text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-3.5 py-1 sm:py-2 transition-all cursor-pointer ${
                activeSection === 'internships' 
                  ? 'text-text-primary bg-stroke/60 font-bold' 
                  : 'text-muted hover:text-text-primary hover:bg-stroke/30'
              }`}
            >
              实习
            </button>
            <button
              onClick={() => onNavClick('projects')}
              className={`text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-3.5 py-1 sm:py-2 transition-all cursor-pointer ${
                activeSection === 'projects' 
                  ? 'text-text-primary bg-stroke/60 font-bold' 
                  : 'text-muted hover:text-text-primary hover:bg-stroke/30'
              }`}
            >
              项目
            </button>
            <button
              onClick={() => onNavClick('skills')}
              className={`text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-3.5 py-1 sm:py-2 transition-all cursor-pointer ${
                activeSection === 'skills' 
                  ? 'text-text-primary bg-stroke/60 font-bold' 
                  : 'text-muted hover:text-text-primary hover:bg-stroke/30'
              }`}
            >
              技能
            </button>
            <button
              onClick={() => onNavClick('achievements')}
              className={`text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-3.5 py-1 sm:py-2 transition-all cursor-pointer ${
                activeSection === 'achievements' 
                  ? 'text-text-primary bg-stroke/60 font-bold' 
                  : 'text-muted hover:text-text-primary hover:bg-stroke/30'
              }`}
            >
              成就
            </button>
            <button
              onClick={() => {
                onResumeClick();
                onNavClick('resume');
              }}
              className={`text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-3.5 py-1 sm:py-2 transition-all cursor-pointer ${
                activeSection === 'resume' 
                  ? 'text-text-primary bg-stroke/60 font-bold' 
                  : 'text-muted hover:text-text-primary hover:bg-stroke/30'
              }`}
            >
              简历
            </button>
          </div>

          {/* Spacer Divider */}
          <div className="w-px h-5 bg-stroke mx-1" />

          {/* 3. Say Hello button */}
          <button
            onClick={onContactClick}
            className="group relative rounded-full text-xs sm:text-sm px-4 py-1.5 sm:py-2 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden flex items-center justify-center"
          >
            {/* Animated accent gradient revealed on hover */}
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-[1px] rounded-full bg-surface transition-colors group-hover:bg-transparent" />
            
            {/* Inner Content with background surface blur */}
            <span className="relative z-10 flex items-center gap-1 text-text-primary font-medium tracking-wide">
              打个招呼 <span className="font-sans text-[11px] sm:text-xs">↗</span>
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
