import React from 'react';
import { motion } from 'motion/react';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

interface FeaturedProjectsProps {
  onViewProject: (project: Project) => void;
}

export default function FeaturedProjects({ onViewProject }: FeaturedProjectsProps) {
  // 4 stunning curated projects matching the requested names and visual categories:
  const projects: Project[] = [
    {
      id: 'proj-1',
      title: "汽车运动",
      subtitle: "Speed and aerodynamics visual identity",
      description: "为顶级赛车车队量身定制的数字媒体系统，采用高对比度暗色界面与无缝数据流展示，诠释极致竞速美学。",
      fullDetails: "此项目通过高度集成的遥测仪表盘和流媒体管道，为越野拉力及场地大奖赛提供秒级交互辅助。设计概念借鉴了顶级方程式赛车的破风造型，以凌厉的碳纤几何和流态光效构建高频美感。",
      techTags: ["WebGL", "Three.js", "Data Visualization", "Telemetry"],
      imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop",
      category: "Motorsport Design",
      mockupType: "dashboard"
    },
    {
      id: 'proj-2',
      title: "城市建筑",
      subtitle: "Brutalist structures digital portfolio",
      description: "为先锋主义建筑事务所打造的多维网格展廊，将实体巨构的无机质感与几何张力在网页交互中完美复刻。",
      fullDetails: "本平台整合了多轴立体陀螺仪联动和超轻量级SVG矢量排版，创造出近似实体漫步的探索维度。通过纯粹的明暗反差与极简边框，实现建筑实体在光圈投影下的诗意张力。",
      techTags: ["Interaction", "CSS Grid", "Gatsby", "Spatial Sound"],
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      category: "Architectural Experience",
      mockupType: "ecommerce"
    },
    {
      id: 'proj-3',
      title: "人文视角",
      subtitle: "Humanistic photography and visual index",
      description: "捕捉城市边缘人性的摄影文献索引，采用富有呼吸感与胶片颗粒噪波的画幅系统，呈现静谧的时间诗学。",
      fullDetails: "这是一次以纪实镜头向城市精神致敬的线上策展体验。每一个微小的呼吸像素，都伴随着动态响应式的字形拉伸和光影色阶过滤。通过重构摄影集，以数字媒介承载实体纸页的质感温热。",
      techTags: ["Asset Direction", "Typography", "React Native", "Curator Tools"],
      imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop",
      category: "Digital Exhibition",
      mockupType: "mobile"
    },
    {
      id: 'proj-4',
      title: "品牌识别",
      subtitle: "Minimalist brand book simulation",
      description: "为跨国科技工坊打造的硬核极简品牌圣经系统，对标全球先导排版秩序，承载模块化的动态视觉标识规范。",
      fullDetails: "将复杂的VI色彩推算、比例参数约束和动态转描，合并进一套无代码、可实时拷贝输出的开发规范手册。将视觉本真抽象为网格常数和排版黄金律，塑造极高的全球多终端一致性。",
      techTags: ["Identity Studio", "Figma Design", "Next.js", "Motion Rails"],
      imageUrl: "https://images.unsplash.com/photo-1541462608141-2f682d68c94a?q=80&w=800&auto=format&fit=crop",
      category: "Corporate Identity",
      mockupType: "ecommerce"
    }
  ];

  return (
    <section id="work" className="py-24 bg-bg relative z-10 border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header containing InView/initial animation wrapper */}
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
              <span>Selected Work</span>
            </div>
            
            <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
              精选项目
            </h2>
            
            <p className="text-sm text-muted max-w-sm mt-3 leading-relaxed">
              我从构想到上线参与过的项目精选。秉持极简秩序，赋予系统生命的数字微光。
            </p>
          </div>

          {/* View all button (visible on desktop) */}
          <button 
            type="button"
            className="hidden md:inline-flex items-center justify-center gap-2 rounded-full border border-stroke bg-surface hover:bg-bg hover:border-text-primary/60 hover:text-text-primary text-text-primary/70 text-xs font-semibold px-6 py-3 cursor-pointer transition-all duration-300 group"
          >
            <span>查看所有工作</span>
            <span className="transition-transform group-hover:translate-x-1 font-sans">→</span>
          </button>
        </motion.div>

        {/* Bento Grid layout with spans alternating: 7, 5, 5, 7 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6" id="projects-bento-grid">
          {projects.map((proj, idx) => {
            // Determine column spans based on alternative indexes: 0->7, 1->5, 2->5, 3->7
            const bentoSpans = [
              'md:col-span-7 col-span-12',
              'md:col-span-5 col-span-12',
              'md:col-span-5 col-span-12',
              'md:col-span-7 col-span-12',
            ];
            const currentSpan = bentoSpans[idx % 4];

            return (
              <ProjectCard
                key={proj.id}
                project={proj}
                onViewProject={onViewProject}
                spanClass={currentSpan}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
