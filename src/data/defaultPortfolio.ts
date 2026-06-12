import { PortfolioConfig, PortfolioTheme } from '../types';

import ecoImg from '../assets/images/ecotracker_app_mockup_1781275545424.jpg';
import dataImg from '../assets/images/datastream_analytics_mockup_1781275560777.jpg';
import bloomImg from '../assets/images/bloom_boutique_mockup_1781275575902.jpg';

export const defaultThemes: PortfolioTheme[] = [
  {
    id: 'aurora-glass',
    name: 'Aurora Dream (Original)',
    blob1Color: 'rgba(99, 102, 241, 0.35)', // indigo
    blob2Color: 'rgba(236, 72, 153, 0.3)',  // pink
    blob3Color: 'rgba(45, 212, 191, 0.25)',  // teal
    blob4Color: 'rgba(168, 85, 247, 0.3)',  // purple
    bgGradient: 'from-slate-50 via-neutral-50 to-indigo-50/20',
  },
  {
    id: 'sunset-glow',
    name: 'Warm Sunset',
    blob1Color: 'rgba(249, 115, 22, 0.25)',  // orange
    blob2Color: 'rgba(239, 68, 68, 0.25)',   // red
    blob3Color: 'rgba(236, 72, 153, 0.2)',   // pink
    blob4Color: 'rgba(234, 179, 8, 0.2)',    // yellow
    bgGradient: 'from-amber-50/50 via-stone-50 to-rose-50/30',
  },
  {
    id: 'cyberfield',
    name: 'Neo Glow (Dark Mode)',
    blob1Color: 'rgba(124, 58, 237, 0.45)',  // violet
    blob2Color: 'rgba(6, 182, 212, 0.4)',   // cyan
    blob3Color: 'rgba(244, 63, 94, 0.35)',   // rose
    blob4Color: 'rgba(16, 185, 129, 0.3)',   // emerald
    bgGradient: 'from-slate-950 via-slate-900 to-zinc-950',
  },
  {
    id: 'forest-mint',
    name: 'Earthy Sage',
    blob1Color: 'rgba(16, 185, 129, 0.2)',   // emerald
    blob2Color: 'rgba(34, 197, 94, 0.2)',    // green
    blob3Color: 'rgba(14, 165, 233, 0.2)',   // sky
    blob4Color: 'rgba(132, 204, 22, 0.25)',  // lime
    bgGradient: 'from-stone-50 via-emerald-50/10 to-teal-50/20',
  }
];

export const defaultPortfolio: PortfolioConfig = {
  name: "Sarah Jenkins",
  role: "Product Designer",
  heroTitle: "I create digital experiences.",
  aboutText: "Hey there! I am a full-suite digital product designer specializing in developing elegant user experience architectures, high-converting checkout flows, and fluid interactive motion experiences. I build prototypes that feel like final applications.",
  resumeUrl: "#",
  themeId: 'aurora-glass',
  projects: [
    {
      id: 'proj-1',
      title: "EcoTracker App",
      subtitle: "Sustainable living platform",
      description: "A gamified environmental footprint tracker that turns minor routine shifts into tangible metrics of preservation.",
      fullDetails: "EcoTracker empowers individuals to measure, analyze, and offset their daily carbon footprint. Featuring high-fidelity interactive elements, beautiful habit trackers, social competition ladders, and automated sensor integrations to sync smart home power ratings. The UI focuses on calming mint-green and soothing pastels to establish a comfortable emotional connection.",
      techTags: ["Mobile UI", "SwiftUI", "Figma", "User Research", "Data Visualization"],
      imageUrl: ecoImg,
      category: "Mobile Design",
      mockupType: "mobile"
    },
    {
      id: 'proj-2',
      title: "DataStream Analytics",
      subtitle: "Real-time insights dashboard",
      description: "Amalgamating modern charts, micro-interaction state flows, and neo-glassmorphic panels into a premium cloud telemetry hub.",
      fullDetails: "DataStream processes multi-source event signals in real-time, providing high-speed telemetry with sub-millisecond response indicators. Fully customized dashboard interfaces with custom widget nodes, modular drag-and-drop report builders, dark/light optimization, and keyboard-driven command rails.",
      techTags: ["SaaS Architecture", "React", "D3.js", "Prototyping", "Dashboard Design"],
      imageUrl: dataImg,
      category: "Web & SaaS",
      mockupType: "dashboard"
    },
    {
      id: 'proj-3',
      title: "Bloom Boutique",
      subtitle: "Online floral shop",
      description: "A sophisticated minimalist narrative-driven web app and e-commerce experience celebrating natural floral aesthetics.",
      fullDetails: "Bloom-Boutique blends rich high-end photography, cinematic parallax transitions, and an elegant serif typography system with robust shop carts. Features single-tap localized express delivery, recurring floral subscription boxes, and custom visual arrangement builders for artisanal boutiques.",
      techTags: ["E-Commerce", "Webflow", "UI Engineering", "Asset Direction", "Typography"],
      imageUrl: bloomImg,
      category: "E-Commerce",
      mockupType: "ecommerce"
    }
  ],
  timeline: [
    {
      id: 'time-1',
      dateRange: "1992 - 2010",
      title: "Foundations & Graphics Specialist",
      company: "Print & Pixel Studio",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Developed deep understanding of grid layouts, typeface pairings, and editorial spacing in high-end design consultancies."
    },
    {
      id: 'time-2',
      dateRange: "2010 - 2016",
      title: "Senior UX Designer",
      company: "Innovate Solutions",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Orchestrated interactive mockups, detailed prototyping vectors, and user verification benchmarks across e-commerce frameworks."
    },
    {
      id: 'time-3',
      dateRange: "2016 - 2021",
      title: "Lead Digital Experience Planner",
      company: "CloudCore Systems",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Oversaw comprehensive client-only design architectures, full dashboard paradigms, and brand styling systems handling thousands of enterprise flows."
    },
    {
      id: 'time-4',
      dateRange: "2021 - 2026",
      title: "Principal Product Designer",
      company: "Stellar Flow Studio",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curating design system policies, high-fidelity micro-interactions, and leading high-profile developer-to-designer handoffs."
    }
  ]
};
