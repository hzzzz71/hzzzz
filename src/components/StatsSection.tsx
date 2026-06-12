import React from 'react';
import { motion } from 'motion/react';
import { Award, Target, Heart } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      id: 'stat-1',
      icon: <Award className="w-5 h-5 text-[#89AACC]" />,
      value: "20+",
      label: "年经验",
      englishLabel: "Years of Experience",
      description: "在创意工程、艺术导向以及像素高保真架构领域深耕。"
    },
    {
      id: 'stat-2',
      icon: <Target className="w-5 h-5 text-[#89AACC]" />,
      value: "95+",
      label: "项目完成",
      englishLabel: "Completed Projects",
      description: "跨越移动终端、企业云服务底座及3D跨媒介渲染大作。"
    },
    {
      id: 'stat-3',
      icon: <Heart className="w-5 h-5 text-[#89AACC]" />,
      value: "200%",
      label: "客户满意度",
      englishLabel: "Client Satisfaction",
      description: "坚持高维度共情交付，长期服务全球五百强与业界翘楚。"
    }
  ];

  return (
    <section id="stats" className="py-24 bg-bg relative z-10 border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Subtle Section Title */}
        <div className="mb-12 text-center sm:text-left select-none">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-2">
            METRICS_
          </p>
          <h3 className="font-display italic text-2xl md:text-3xl lg:text-4xl text-text-primary">
            核心效能数据
          </h3>
        </div>

        {/* Grid panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" id="stats-grid-container">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="relative p-6 sm:p-8 rounded-3xl border border-stroke bg-surface/30 hover:border-stroke/80 hover:bg-surface/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Row: Icon badge */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center bg-bg shadow-sm">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-mono tracking-widest text-muted/60 uppercase">METRIC_0{idx + 1}</span>
              </div>

              {/* Center Row: Dynamic Big Numbers */}
              <div>
                <div className="text-5xl sm:text-7xl lg:text-8xl font-display italic font-bold text-text-primary tracking-tight leading-none">
                  {stat.value}
                </div>
                
                {/* Chinese / English labels */}
                <h4 className="text-base font-semibold text-text-primary mt-4 tracking-wide flex items-center gap-2">
                  {stat.label}
                  <span className="text-xs font-mono font-normal text-muted">/ {stat.englishLabel}</span>
                </h4>
              </div>

              {/* Bottom Row Description */}
              <p className="text-xs text-muted font-sans leading-relaxed mt-4 pt-4 border-t border-stroke/15">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
