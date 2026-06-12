import React from 'react';
import { TimelineEvent } from '../types';
import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface TimelineProps {
  timelineEvents: TimelineEvent[];
}

export default function Timeline({ timelineEvents }: TimelineProps) {
  return (
    <section id="timeline" className="py-24 bg-bg relative z-10 border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header Display */}
        <div className="mb-16">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">
            JOURNEY_
          </p>
          <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl text-text-primary">
            履历与经历
          </h2>
          <p className="text-sm text-muted max-w-md mt-2">
            多年来专注于系统设计、全栈工程和艺术探索。
          </p>
        </div>

        {/* Desktop timeline view */}
        <div className="hidden md:grid grid-cols-4 gap-6 relative pt-12 pb-6" id="desktop-timeline-scaffold">
          {/* Horizontal custom accent bar line across items */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-stroke/60" />

          {timelineEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="relative pt-8 group flex flex-col justify-between h-full"
            >
              {/* Connector Pin Dot */}
              <div className="absolute -top-[5.5px] left-0 w-2.5 h-2.5 rounded-full bg-stroke transition-colors group-hover:bg-[#89AACC] z-10 ring-4 ring-bg" />

              <div>
                {/* Year Badge */}
                <span className="text-[11px] font-mono font-bold text-muted bg-surface border border-stroke px-2 py-0.5 rounded uppercase tracking-wider">
                  {event.dateRange}
                </span>

                <h4 className="text-base font-display italic text-text-primary mt-4 font-semibold group-hover:text-text-primary/95 transition-all">
                  {event.title}
                </h4>

                <p className="text-xs text-muted font-sans font-medium mt-1">
                  {event.company}
                </p>
              </div>

              <p className="text-xs text-[#a0a0a0] leading-relaxed mt-4 font-sans border-t border-stroke/20 pt-4">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile timeline view */}
        <div className="grid grid-cols-1 gap-6 md:hidden relative pl-6" id="mobile-timeline-scaffold">
          {/* Vertical axis line */}
          <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-stroke" />

          {timelineEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group bg-surface/30 border border-stroke rounded-2xl p-5 hover:bg-surface/50 transition-colors"
            >
              {/* Circle check dot on axis */}
              <div className="absolute -left-[24px] top-6 w-2.5 h-2.5 rounded-full bg-stroke group-hover:bg-[#89AACC] border border-bg z-10" />

              <div className="flex items-center gap-1.5 mb-3 font-mono text-[10px] text-muted">
                <Calendar className="w-3.5 h-3.5 text-text-primary/40" />
                <span>{event.dateRange}</span>
              </div>

              <h4 className="text-base font-display italic text-text-primary font-bold">
                {event.title}
              </h4>
              
              <p className="text-xs text-muted font-sans font-medium mt-0.5 mb-3">
                {event.company}
              </p>

              <p className="text-xs text-[#a0a0a0] leading-relaxed font-sans border-t border-stroke/20 pt-3">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
