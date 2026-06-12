import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onViewProject: (project: Project) => void;
  spanClass?: string;
  key?: string;
}

export default function ProjectCard({ project, onViewProject, spanClass = "" }: ProjectCardProps) {
  return (
    <motion.div
      id={`project-card-${project.id}`}
      onClick={() => onViewProject(project)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative rounded-[24px] md:rounded-[32px] border border-stroke bg-surface overflow-hidden group cursor-pointer aspect-[4/3] md:aspect-auto md:h-[380px] lg:h-[440px] transition-all duration-500 ${spanClass}`}
    >
      {/* 1. Underlying Project Photography */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          id={`project-img-${project.id}`}
          src={project.imageUrl}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform duration-700 group-hover:scale-105 transition-transform"
        />
      </div>

      {/* 2. Retro Halftone Overlay */}
      <div className="absolute inset-0 halftone-overlay mix-blend-multiply opacity-20 z-10 pointer-events-none" />

      {/* 3. Aesthetic Dark Gradient Vignette for titles */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 z-10 transition-opacity duration-500 group-hover:opacity-40" />

      {/* 4. Constant Minimal Bottom Label (Visible when not hovered) */}
      <div className="absolute bottom-6 left-6 right-6 z-20 transition-all duration-500 group-hover:translate-y-4 group-hover:opacity-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {project.techTags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-[10px] uppercase font-mono tracking-wider bg-white/10 border border-white/10 text-white/90 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display italic text-2xl md:text-3xl lg:text-4xl text-text-primary leading-tight mt-1.5">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-white/60 font-sans mt-1">
          {project.subtitle}
        </p>
      </div>

      {/* 5. Rich Hover Overlay Trigger (Full blur-in, centering action button) */}
      <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg flex flex-col justify-between p-8 z-30 transition-all duration-300">
        {/* Hover label pill centered */}
        <div className="m-auto flex flex-col items-center text-center">
          <div className="relative p-[1.5px] rounded-full overflow-hidden flex items-center justify-center animate-gradient-offset accent-gradient">
            <div className="bg-bg text-text-primary px-6 py-3 rounded-full flex items-center justify-center gap-1.5 font-display text-base md:text-lg italic font-medium">
              查看 <span className="font-sans font-normal opacity-40">—</span> {project.title}
            </div>
          </div>
        </div>

        {/* Categories / Meta at the bottom of hover screen */}
        <div className="mt-auto pt-4 border-t border-stroke flex items-center justify-between text-xs text-muted font-sans">
          <span>{project.category}</span>
          <span className="font-mono text-[10px] tracking-widest bg-stroke px-2 py-1 rounded">MOCKUP: {project.mockupType.toUpperCase()}</span>
        </div>
      </div>
    </motion.div>
  );
}
