import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

export default function ContactFooter() {
  const footerVideoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  const videoUrl = "https://github.com/yu2845399005-dot/Image-for-Ai/blob/main/jimeng-2026-04-06-5558-%E5%B0%8F%E7%8C%AB%E5%92%AA%E5%81%B7%E5%90%83%E8%A5%BF%E7%93%9C%EF%BC%8C%E7%84%B6%E5%90%8E%E8%A2%AB%E4%BA%BA%E5%8F%91%E7%8E%B0%EF%BC%8C%E7%84%B6%E5%90%8E%E9%9D%9E%E5%B8%B8%E7%9A%84%E6%87%B5%EF%BC%8C%E7%84%B6%E5%90%8E%E7%AB%99%E8%B5%B7%E6%9D%A5%E4%B8%80%E8%BE%B9%E6%8B%9B%E6%89%8B%EF%BC%8C%E4%B8%80%E8%BE%B9%E5%81%87%E7%AC%91%E4%BA%86%E4%B8%80%E4%B8%8B%EF%BC%8C....mp4";

  const getRawVideoUrl = (url: string) => {
    if (url.includes('github.com') && url.includes('/blob/')) {
      return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    }
    return url;
  };

  // 1. Initialise the Flipped Background Video Stream
  useEffect(() => {
    if (!footerVideoRef.current) return;
    const video = footerVideoRef.current;
    const stream = getRawVideoUrl(videoUrl);

    if (stream.endsWith('.m3u8') && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(stream);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log("Engine blocked autoplay:", e));
      });
      return () => hls.destroy();
    } else {
      video.src = stream;
      video.load();
      video.play().catch(e => console.log("Engine blocked autoplay:", e));
    }
  }, []);

  // 2. Endless GSAP Marquee scroll
  useEffect(() => {
    if (!marqueeRef.current) return;
    
    const marquee = marqueeRef.current;
    
    const anim = gsap.to(marquee, {
      xPercent: -50,
      ease: "none",
      duration: 40,
      repeat: -1
    });

    return () => {
      anim.kill();
    };
  }, []);

  return (
    <section 
      id="contact" 
      className="relative bg-bg pt-20 md:pt-28 pb-8 md:pb-12 overflow-hidden border-t border-stroke/30"
    >
      {/* 1. Vertically Flipped Player Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <video
          ref={footerVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] brightness-110 contrast-95 opacity-25"
        />
        <div className="absolute inset-0 bg-transparent" />
      </div>

      <div className="relative z-10 w-full flex flex-col justify-between h-full min-h-[450px]">
        
        {/* 2. GSAP Signage Infinite Scrolling Banner */}
        <div className="w-full overflow-hidden select-none mb-12">
          <div 
            ref={marqueeRef}
            className="flex whitespace-nowrap text-4xl sm:text-6xl md:text-8xl font-display italic font-bold tracking-wider text-text-primary/10 py-3 uppercase"
          >
            {/* Repeated 10x inside two adjacent rows to facilitate a seamless 50% shift reset */}
            <span className="inline-block px-4">
              建设未来 • 建设未来 • 建设未来 • 建设未来 • 建设未来 • 建设未来 • 建设未来 • 建设未来 • 建设未来 • 建设未来 •
            </span>
            <span className="inline-block px-4">
              建设未来 • 建设未来 • 建设未来 • 建设未来 • 建设未来 • 建设未来 • 建设未来 • 建设未来 • 建设未来 • 建设未来 •
            </span>
          </div>
        </div>

        {/* 3. CTA Action Area */}
        <div className="my-auto flex flex-col items-center text-center px-6">
          <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display italic tracking-tight text-text-primary mb-10 max-w-2xl leading-tight">
            让想法变成令人赞叹的奇妙现实
          </h3>

          {/* Mail button wrapping custom animated boundary ring on-hover */}
          <a
            href="mailto:hello@michaelsmith.com"
            className="group relative inline-flex items-center justify-center rounded-full text-sm sm:text-base font-semibold tracking-wide py-4 px-10 transition-all duration-300 hover:scale-105"
          >
            {/* Hover visual highlight boundary border */}
            <span className="absolute inset-[-2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-[1px] rounded-full bg-surface" />
            
            <span className="relative z-10 text-text-primary flex items-center gap-2">
              hello@michaelsmith.com <span className="font-sans text-xs sm:text-sm">↗</span>
            </span>
          </a>
        </div>

        {/* 4. Footer Base bar */}
        <div className="mt-20 max-w-[1200px] w-full mx-auto px-6 md:px-10 lg:px-16 pt-8 border-t border-stroke/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        </div>
      </div>
    </section>
  );
}
