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
      id: 'log-1',
      title: "硬核极简主义与动态物理阻尼的交互调和",
      summary: "系统地将牛顿惯性与弹簧共振公式引入数字面板，创造出真正具有骨架张力与直观触感的微米级滑动过渡。",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150&auto=format&fit=crop",
      readTime: "5 min read",
      date: "2026-06-12"
    },
    {
      id: 'log-2',
      title: "无感网格排版：探讨黄金分割在低光源下的视觉聚焦",
      summary: "在全暗高对比面板中，利用非对称对齐以及微妙的负空间调节，让读者在不产生视觉疲劳的前提下聚焦最核心指标。",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=150&auto=format&fit=crop",
      readTime: "8 min read",
      date: "2026-06-08"
    },
    {
      id: 'log-3',
      title: "流媒体视频体验中HLS播放器的低延迟调优策略",
      summary: "阐述在现代混合SPA应用中，利用分片预加载和浏览器底层媒体源扩展(MSE)实现多终端无缝高清自动播放的技术内幕。",
      imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=150&auto=format&fit=crop",
      readTime: "4 min read",
      date: "2026-05-30"
    },
    {
      id: 'log-4',
      title: "代码与直觉：在AI时代坚持手工艺编程的工匠精神",
      summary: "为什么在自动化大面积普及的当下，手工打磨的界面动效、像素级阴影对齐和干净的代码架构依然是触动深层情感的秘钥。",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=150&auto=format&fit=crop",
      readTime: "6 min read",
      date: "2026-05-15"
    }
  ];

  return (
    <section id="logs" className="py-24 bg-bg relative z-10 border-t border-stroke/30">
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
              <span>Recent Thoughts</span>
            </div>
            
            <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
              最近想法
            </h2>
            
            <p className="text-sm text-muted max-w-sm mt-3 leading-relaxed">
              关于技术架构、设计美学和极简主义探索的学术记录与日常札记。
            </p>
          </div>

          {/* View all button */}
          <button 
            type="button"
            className="flex items-center justify-center gap-2 rounded-full border border-stroke bg-surface hover:bg-bg hover:border-text-primary/60 hover:text-text-primary text-text-primary/70 text-xs font-semibold px-6 py-3 cursor-pointer transition-all duration-300 group"
          >
            <span>查看全部想法</span>
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
                  <Clock className="w-3.5 h-3.5 text-muted/50" />
                  <span>{entry.readTime}</span>
                </div>

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
