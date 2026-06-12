import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  rotation: string;
}

export default function ExploreGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: '流动液态铬',
      category: 'Motion Design',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      rotation: '-rotate-3 group-hover:-rotate-1'
    },
    {
      id: 'gal-2',
      title: '残影建筑空间',
      category: 'Architecture',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      rotation: 'rotate-2 group-hover:rotate-6'
    },
    {
      id: 'gal-3',
      title: '虹彩粒子系统',
      category: 'Abstract 3D',
      imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop',
      rotation: '-rotate-2 group-hover:rotate-1'
    },
    {
      id: 'gal-4',
      title: '未来神经网络',
      category: 'Data Arts',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
      rotation: 'rotate-3 group-hover:-rotate-3'
    },
    {
      id: 'gal-5',
      title: '硬核工业矩阵',
      category: 'Hardware',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
      rotation: '-rotate-6 group-hover:rotate-2'
    },
    {
      id: 'gal-6',
      title: '流光速度轮廓',
      category: 'Kinetics',
      imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800&auto=format&fit=crop',
      rotation: 'rotate-4 group-hover:-rotate-1'
    }
  ];

  useEffect(() => {
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    const container = containerRef.current;
    const textNode = textRef.current;

    if (!leftCol || !rightCol || !container || !textNode) return;

    // Create Pin ScrollTrigger for text element
    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: textNode,
      pinSpacing: false
    });

    // Translate Column 1 slightly down on scroll
    const leftAnim = gsap.fromTo(leftCol, 
      { y: "15%" }, 
      {
        y: "-15%",
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      }
    );

    // Translate Column 2 upwards over scroll (creating opposing speeds!)
    const rightAnim = gsap.fromTo(rightCol, 
      { y: "-15%" }, 
      {
        y: "15%",
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      }
    );

    return () => {
      pinTrigger.kill();
      leftAnim.scrollTrigger?.kill();
      leftAnim.kill();
      rightAnim.scrollTrigger?.kill();
      rightAnim.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      id="explore"
      className="relative min-h-[180vh] sm:min-h-[300vh] bg-bg w-full py-24 border-t border-stroke/30"
    >
      {/* Layer 1: Pinned Center Heading (z-10) */}
      <div 
        ref={textRef}
        className="absolute top-0 left-0 right-0 h-screen flex flex-col items-center justify-center text-center z-10 px-6 pointer-events-none select-none"
      >
        <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">
          EXPLORE_
        </p>
        <h2 className="font-display italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary">
          视觉游乐场
        </h2>
        <p className="text-sm text-muted max-w-sm mt-3 leading-relaxed">
          在数字画布之外进行多维概念探索、摄影和视觉重组。
        </p>
        <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono text-muted tracking-widest mt-6">
          <span>滚动查看视差效果</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>

      {/* Layer 2: Parallax Columns Grid (z-20) */}
      <div className="relative z-20 w-full max-w-[1250px] mx-auto px-6 md:px-12 pt-32 sm:pt-48 flex justify-between gap-6 sm:gap-24">
        
        {/* Left column (Items 1, 3, 5) */}
        <div 
          ref={leftColRef}
          className="w-1/2 flex flex-col gap-12 sm:gap-24"
        >
          {galleryItems.filter((_, idx) => idx % 2 === 0).map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-square max-w-[340px] w-full mx-auto rounded-3xl border border-stroke bg-surface overflow-hidden cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:border-[#89AACC]/40 transition-all duration-500"
            >
              {/* Image component inside with layout rotation */}
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transform transition-all duration-700 ease-out group-hover:scale-105 ${item.rotation}`}
              />
              
              {/* Ambient halftone overlay */}
              <div className="absolute inset-0 halftone-overlay mix-blend-multiply opacity-20 pointer-events-none" />

              {/* Cover slide labels */}
              <div className="absolute inset-0 bg-bg/85 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6 transition-all duration-300 z-10">
                <ZoomIn className="w-5 h-5 text-[#89AACC] mb-2" />
                <h4 className="font-display italic text-xl md:text-2xl text-text-primary">
                  {item.title}
                </h4>
                <p className="text-[10px] text-muted font-mono tracking-widest uppercase mt-1">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right column (Items 2, 4, 6) */}
        <div 
          ref={rightColRef}
          className="w-1/2 flex flex-col gap-12 sm:gap-24 mt-20 sm:mt-48"
        >
          {galleryItems.filter((_, idx) => idx % 2 !== 0).map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-square max-w-[340px] w-full mx-auto rounded-3xl border border-stroke bg-surface overflow-hidden cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:border-[#89AACC]/40 transition-all duration-500"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transform transition-all duration-700 ease-out group-hover:scale-105 ${item.rotation}`}
              />
              
              <div className="absolute inset-0 halftone-overlay mix-blend-multiply opacity-20 pointer-events-none" />

              <div className="absolute inset-0 bg-bg/85 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6 transition-all duration-300 z-10">
                <ZoomIn className="w-5 h-5 text-[#89AACC] mb-2" />
                <h4 className="font-display italic text-xl md:text-2xl text-text-primary">
                  {item.title}
                </h4>
                <p className="text-[10px] text-muted font-mono tracking-widest uppercase mt-1">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Overlay Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden bg-bg border border-stroke rounded-2xl z-10 flex flex-col justify-between"
            >
              {/* Close Button top edge */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-surface border border-stroke text-text-primary hover:scale-110 active:scale-95 transition-transform"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="overflow-hidden bg-surface flex items-center justify-center">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Text Info footer of Lightbox */}
              <div className="p-6 bg-surface border-t border-stroke flex items-center justify-between">
                <div>
                  <h4 className="font-display italic text-2xl text-text-primary">
                    {selectedItem.title}
                  </h4>
                  <p className="text-xs text-muted font-sans font-medium mt-1">
                    {selectedItem.category} — Visual Exploration '26
                  </p>
                </div>
                
                <span className="text-[10px] font-mono bg-stroke px-2 py-1 rounded text-muted">
                  ID: {selectedItem.id.toUpperCase()}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
