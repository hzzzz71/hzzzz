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
        className={`inline-flex items-center rounded-full border border-white/10 bg-surface/80 px-2.5 py-1.5 md:py-2 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-white/15 bg-surface/90 scale-[0.98]' : ''
        }`}
      >
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* 1. Logo Unit */}
          <button 
            type="button"
            onClick={() => onNavClick('hero')}
            className="group relative w-9 h-9 rounded-full flex items-center justify-center p-[1px] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-110"
          >
            {/* Rotate Gradient Bezel on hover */}
            <span className="absolute inset-0 accent-gradient rounded-full transition-transform duration-500 group-hover:rotate-180" />
            <span className="absolute inset-[1px] bg-bg rounded-full flex items-center justify-center" />
            <span className="relative z-10 font-display italic text-text-primary text-[13px] font-bold tracking-tight">
              JA
            </span>
          </button>

          {/* Spacer Divider (Hidden on mobile) */}
          <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

          {/* 2. Navigation items: [首页 (Home), 工作 (Work), 简历 (Resume)] */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => onNavClick('hero')}
              className={`text-xs sm:text-sm font-medium rounded-full px-3.5 py-1.5 sm:py-2 transition-all cursor-pointer ${
                activeSection === 'hero' 
                  ? 'text-text-primary bg-stroke/60 font-semibold' 
                  : 'text-muted hover:text-text-primary hover:bg-stroke/30'
              }`}
            >
              首页
            </button>
            <button
              onClick={() => onNavClick('work')}
              className={`text-xs sm:text-sm font-medium rounded-full px-3.5 py-1.5 sm:py-2 transition-all cursor-pointer ${
                activeSection === 'work' 
                  ? 'text-text-primary bg-stroke/60 font-semibold' 
                  : 'text-muted hover:text-text-primary hover:bg-stroke/30'
              }`}
            >
              工作
            </button>
            <button
              onClick={() => {
                onResumeClick();
                onNavClick('resume');
              }}
              className={`text-xs sm:text-sm font-medium rounded-full px-3.5 py-1.5 sm:py-2 transition-all cursor-pointer ${
                activeSection === 'resume' 
                  ? 'text-text-primary bg-stroke/60 font-semibold' 
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
