import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, Cpu, Layout, Sparkles } from 'lucide-react';

interface Internship {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  icon: React.ReactNode;
}

export default function InternshipSection() {
  const internships: Internship[] = [
    {
      id: 'intern-1',
      role: '前端 & 图形引擎研发实习生 (Graphics Engine Intern)',
      company: '字节跳动 - 抖音设计系统团队 (ByteDance)',
      duration: '2025.10 - 至今',
      location: '北京',
      description: '参与跨平台图形渲染加速及新一代动态设计系统底座的重构，将混合渲染与手势卡顿延迟降低 35%。',
      achievements: [
        '基于 WebGL 与 Three.js 实现了流式互动特效组件库，成功在抖音 H5 推广活动中上线，带来数百万次的顺滑交互体验。',
        '主导了牛顿弹簧动力学（Spring Physics）阻尼计算模块在多物理引擎交互场景下的组件级封装，实现全平滑高帧率阻尼滑动。',
        '负责多媒体流播放器内核（MSE、HLS.js）的预加载方案设计，极限网络下首帧开播延迟大幅度优化。'
      ],
      techStack: ['TypeScript', 'WebGL', 'Three.js', 'Hls.js', 'Tailwind CSS'],
      icon: <Cpu className="w-5 h-5 text-[#89AACC]" />
    },
    {
      id: 'intern-2',
      role: '系统研发与交互设计师实习生 (Design Technologist Intern)',
      company: '微软亚洲研究院 - 创意引擎中心 (MSRA)',
      duration: '2024.11 - 2025.08',
      location: '上海',
      description: '负责微软创意套件的 Web 客户端性能与人机反馈系统调优，探索极简网格排版和动态视差滚动的美学框架。',
      achievements: [
        '利用 GSAP ScrollTrigger 与 CSS Grid 构建了高维立体多轴联动骨架漫步，创造了多款用于数字资产发布的互动式动态网格展廊。',
        '对 Fluent Design System 在低光源对比环境下的视觉聚焦进行了色彩学与排版常数级微调，优化了色偏盲用户群体的可访问性。',
        '参与无代码可视化协作面板的设计，支持实时在多终端快速拷贝导出无缝的动画插值关键帧参数。'
      ],
      techStack: ['React', 'GSAP', 'Next.js', 'Figma', 'CSS Grid'],
      icon: <Layout className="w-5 h-5 text-[#89AACC]" />
    },
    {
      id: 'intern-3',
      role: '全栈开发实习生 (Full-Stack Engineering Intern)',
      company: 'Vercel - 核心框架研发小组 (Vercel Core)',
      duration: '2023.06 - 2023.12',
      location: 'Remote (旧金山)',
      description: '参与 Next.js 后端渲染边缘管道和客户端路由预加载逻辑的部分重构研发，打磨无感极速体验。',
      achievements: [
        '优化客户端 Router 缓存和 HMR 在复杂多组件渲染页面下的内存占用，使频繁文件修改编译反馈速度提升了 18%。',
        '研究高防抖延迟更新（Debounced Resize）在复杂矢量画布和 SVG 三维投影中的自动自适应流式重绘，防止大规模状态重渲染。',
        '编写轻量级的 CSS variables 动态主题推算脚本，支持在白昼/全黑环境下即时自适应计算并注入美学互补色彩对。'
      ],
      techStack: ['Next.js', 'Node.js', 'Rust', 'Vite', 'postcss'],
      icon: <Sparkles className="w-5 h-5 text-[#89AACC]" />
    }
  ];

  return (
    <section id="internships" className="py-24 bg-bg relative z-10 border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">
            PRACTICE & EXPERIECE_
          </p>
          <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight">
            实习经历
          </h2>
        </div>

        {/* Card Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8" id="internships-grid">
          {internships.map((intern, idx) => (
            <motion.div
              key={intern.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group relative p-6 md:p-8 rounded-3xl border border-stroke bg-surface/30 hover:border-stroke/80 hover:bg-surface/50 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)]"
            >
              {/* Header inside Card */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center bg-bg shadow-sm">
                    {intern.icon}
                  </div>
                </div>

                <h3 className="text-lg font-display italic text-text-primary font-bold group-hover:text-text-primary/90 transition-colors">
                  {intern.role}
                </h3>
                
                <h4 className="text-xs text-muted font-sans font-medium mt-1 mb-4 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-muted/50" />
                  <span>{intern.company}</span>
                </h4>

                <p className="text-xs text-muted leading-relaxed font-sans mt-3 mb-6 border-b border-stroke/15 pb-4">
                  {intern.description}
                </p>

                {/* Achievements block */}
                <div className="space-y-3 mb-6">
                  <span className="text-[10px] font-mono text-[#a0a0a0] uppercase tracking-wider block">KEY ACHIEVEMENTS_</span>
                  {intern.achievements.map((item, keyIdx) => (
                    <div key={keyIdx} className="flex gap-2 items-start text-[11px] leading-relaxed text-[#757575] font-sans">
                      <span className="text-[#89AACC] mt-1 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
