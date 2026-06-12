import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  readTime: string;
  date: string;
}

export default function LogsSection() {
  const entries: JournalEntry[] = [
    {
      id: 'achieve-1',
      title: "Apple Design Award 创意设计学生先锋提名",
      summary: "凭借极富物理阻尼回弹张力的手势界面与非线性黄金分割网格交互系统，斩获年度数字艺术提名。",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop",
      readTime: "Design Nominee",
      date: "2026-04"
    },
    {
      id: 'achieve-2',
      title: "GitHub Open Source Core Contributor 卓越贡献奖",
      summary: "积极推动 Next.js 边缘端路由缓存机制算法的低算力高并发改造，项目合并代码影响数百万网页启动速度。",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=150&auto=format&fit=crop",
      readTime: "Top 1% Contributor",
      date: "2025-11"
    },
    {
      id: 'achieve-3',
      title: "字节跳动优秀实习个人 & 「抖音季度设计之星」",
      summary: "主导完成了全物理机制弹簧算子的极简化组件化重写，在极低端海外安卓设备亦实现了无感 60 帧触控反馈。",
      imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=150&auto=format&fit=crop",
      readTime: "Star Intern",
      date: "2025-07"
    },
    {
      id: 'achieve-4',
      title: "“深蓝底座杯” 全国数字交互设计与能效攻防赛 冠军",
      summary: "通过将 WebGL 三维投影管线的多线程离合化重叠，极大缩减海量点云渲染能耗与动画触发卡顿率。",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=150&auto=format&fit=crop",
      readTime: "Championship",
      date: "2024-12"
    }
  ];

  return (
    <section id="achievements" className="py-24 bg-bg relative z-10 border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Same Header Pattern as Selected Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 text-muted text-xs uppercase tracking-[0.3em] mb-4">
              <span className="w-8 h-[1px] bg-stroke/60 inline-block" />
              <span>Personal Achievements</span>
            </div>
            
            <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
              个人成就
            </h2>
          </div>

          {/* View all button */}
          <button 
            type="button"
            className="flex items-center justify-center gap-2 rounded-full border border-stroke bg-surface hover:bg-bg hover:border-text-primary/60 hover:text-text-primary text-text-primary/70 text-xs font-semibold px-6 py-3 cursor-pointer transition-all duration-300 group"
          >
            <span>查看全部成就</span>
            <span className="transition-transform group-hover:translate-x-1 font-sans">→</span>
          </button>
        </motion.div>

        {/* 4 horizontal journaling items */}
        <div className="flex flex-col gap-4 max-w-4xl mx-auto" id="logs-container">
          {entries.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-[24px] sm:rounded-full bg-surface/30 hover:bg-surface border border-transparent hover:border-stroke transition-all duration-300 group cursor-pointer hover:scale-[1.01]"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Thumbnail element */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl sm:rounded-full overflow-hidden flex-shrink-0 border border-stroke/50 bg-stroke/25 group-hover:scale-105 transition-transform">
                  <img
                    src={entry.imageUrl}
                    alt={entry.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:rotate-2 transition-transform duration-500"
                  />
                </div>

                {/* Text blocks info */}
                <div>
                  <h4 className="font-display italic text-base sm:text-lg text-text-primary font-medium tracking-wide group-hover:text-[#89AACC] transition-colors leading-snug">
                    {entry.title}
                  </h4>
                  <p className="text-xs text-muted font-sans mt-1 line-clamp-1 max-w-xl group-hover:text-muted/90 transition-colors">
                    {entry.summary}
                  </p>
                </div>
              </div>

              {/* Right metadata panel */}
              <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-0 pl-16 sm:pl-0 border-t border-stroke/15 sm:border-0 pt-3 sm:pt-0">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted font-mono">
                  <Calendar className="w-3.5 h-3.5 text-muted/50" />
                  <span>{entry.date}</span>
                </div>

                {/* Micro chevron arrow indicator */}
                <span className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full border border-stroke/40 text-muted group-hover:border-[#89AACC] group-hover:text-text-primary transition-colors">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
