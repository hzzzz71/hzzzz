import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HeroSectionProps {
  onViewWorkClick: () => void;
  onContactClick: () => void;
}

export default function HeroSection({ onViewWorkClick, onContactClick }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = ["创意", "全栈", "创始人", "学者"];
  const videoUrl = "https://github.com/yu2845399005-dot/Image-for-Ai/blob/main/jimeng-2026-04-06-5558-%E5%B0%8F%E7%8C%AB%E5%92%AA%E5%81%B7%E5%90%83%E8%A5%BF%E7%93%9C%EF%BC%8C%E7%84%B6%E5%90%8E%E8%A2%AB%E4%BA%BA%E5%8F%91%E7%8E%B0%EF%BC%8C%E7%84%B6%E5%90%8E%E9%9D%9E%E5%B8%B8%E7%9A%84%E6%87%B5%EF%BC%8C%E7%84%B6%E5%90%8E%E7%AB%99%E8%B5%B7%E6%9D%A5%E4%B8%80%E8%BE%B9%E6%8B%9B%E6%89%8B%EF%BC%8C%E4%B8%80%E8%BE%B9%E5%81%87%E7%AC%91%E4%BA%86%E4%B8%80%E4%B8%8B%EF%BC%8C....mp4";

  // Helper to translate GitHub file pages into direct streaming files
  const getRawVideoUrl = (url: string) => {
    if (url.includes('github.com') && url.includes('/blob/')) {
      return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    }
    return url;
  };

  // 1. Roles cycle index every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex(p => (p + 1) % roles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // 2. Video Player Stream Hook
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const stream = getRawVideoUrl(videoUrl);

    // If it's a dynamic playlist format and Hls parses it
    if (stream.endsWith('.m3u8') && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(stream);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log("Engine blocked autoplay:", e));
      });
      return () => hls.destroy();
    } else {
      // Fallback for standard progressive MP4 files and Safari native players
      video.src = stream;
      video.load();
      video.play().catch(e => console.log("Engine blocked autoplay fallback:", e));
    }
  }, []);

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg"
    >
      {/* Absolute background player layout */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 brightness-110 contrast-95 opacity-25 scale-105"
        />
        {/* Soft bright backdrop overlay - completely transparent */}
        <div className="absolute inset-0 bg-transparent" />
        {/* Smooth light vignette fading to background page elements */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero content payload (Centered visual focal point) */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center pt-24 pb-16">
        
        {/* Collection badge (Eyebrow element, blur-in class label) */}
        <p className="blur-in text-xs sm:text-sm text-muted uppercase tracking-[0.3em] mb-6 select-none opacity-0">
          COLLECTION '26_
        </p>

        {/* Headline display title */}
        <h1 className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-tight sm:leading-[0.9] tracking-tighter text-text-primary mb-6 outline-none opacity-0 select-text">
          Michael Smith
        </h1>

        {/* Dynamic cycling subtitle text role */}
        <div className="blur-in text-lg sm:text-xl md:text-2xl text-text-primary/95 mb-8 flex items-center gap-1.5 font-light tracking-wide opacity-0">
          <span>一个 </span>
          <span 
            key={roleIndex} 
            className="font-display italic font-semibold text-text-primary animate-role-fade-in inline-block border-b border-stroke pb-0.5"
          >
            {roles[roleIndex]}
          </span>
          <span> 住在芝加哥。</span>
        </div>

        {/* Brief designer bio bio card */}
        <p className="blur-in text-xs sm:text-sm md:text-base text-muted max-w-lg leading-relaxed mb-10 select-none opacity-0">
          通过聚焦微小事物并赋予系统生命，打造前卫而细致的无缝数字交互体验。
        </p>

        {/* CTA triggers */}
        <div className="blur-in inline-flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto opacity-0">
          {/* Action solid button */}
          <button
            onClick={onViewWorkClick}
            className="w-full sm:w-auto relative group overflow-hidden inline-flex items-center justify-center rounded-full text-xs sm:text-sm px-8 py-4 bg-text-primary text-bg font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:text-text-primary hover:bg-transparent cursor-pointer"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-20 animate-gradient-offset" />
            <span className="absolute inset-[1px] rounded-full bg-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="relative z-10">查看作品</span>
          </button>

          {/* Action stroke button */}
          <button
            onClick={onContactClick}
            className="w-full sm:w-auto relative group overflow-hidden inline-flex items-center justify-center rounded-full text-xs sm:text-sm px-8 py-4 bg-bg border border-stroke text-text-primary font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:border-transparent cursor-pointer"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-20 animate-gradient-offset" />
            <span className="absolute inset-[1px] rounded-full bg-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="relative z-10">伸手合作</span>
          </button>
        </div>
      </div>

      {/* Down-bound scrolling indicator anchor */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 select-none pointer-events-none z-10">
        <span className="text-[10px] tracking-[0.34em] text-muted uppercase font-mono">SCROLL</span>
        <div className="w-[1px] h-10 bg-stroke/60 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-text-primary rounded-full animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
