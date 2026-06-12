import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

// Core State and Schema Definitions
import { PortfolioConfig, ContactMessage, Project } from './types';
import { defaultPortfolio, defaultThemes } from './data/defaultPortfolio';

// Newly Engineered Modular Portfolio Sections
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedProjects from './components/FeaturedProjects';
import LogsSection from './components/LogsSection';
import Timeline from './components/Timeline';
import ExploreGallery from './components/ExploreGallery';
import StatsSection from './components/StatsSection';
import ContactFooter from './components/ContactFooter';

// Dynamic Modals and Control Drawers
import ProjectDetailModal from './components/ProjectDetailModal';
import ResumeModal from './components/ResumeModal';
import EditorPanel from './components/EditorPanel';

export default function App() {
  // --- 1. Sequential Loading Screen ---
  const [isLoading, setIsLoading] = useState(true);

  // --- 2. Live Customizer Configuration & Sync (LocalStorage) ---
  const [config, setConfig] = useState<PortfolioConfig>(() => {
    const saved = localStorage.getItem('designer_portfolio_config_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing portfolio configs:', e);
      }
    }
    return defaultPortfolio;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('designer_portfolio_messages_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing messages checklist:', e);
      }
    }
    return [
      {
        id: 'msg-seed-1',
        name: 'James Reynolds',
        email: 'james@creativepulse.network',
        message: 'Michael, absolutely outstanding portfolio aesthetic! The fluid video integration and grid systems feel incredibly premium. Would love to secure design engineering support for a new telemetry dashboard we are drafting.',
        timestamp: '10 mins ago',
        read: false
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('designer_portfolio_config_v2', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('designer_portfolio_messages_v2', JSON.stringify(messages));
  }, [messages]);

  // --- 3. Dynamic Section Navigation & Scroll Listeners ---
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const sections = ['hero', 'work', 'timeline', 'explore', 'stats', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  // --- 4. Modals and Live Panel Overdrawer Hooks ---
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // --- 5. Message Event Controllers ---
  const handleAddNewMessage = (formData: { name: string; email: string; message: string }) => {
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: 'Just now',
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const handleMarkMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const handleResetToDefault = () => {
    if (window.confirm('Are you sure you want to reset all portfolio values to default?')) {
      setConfig(defaultPortfolio);
      localStorage.removeItem('designer_portfolio_config_v2');
    }
  };

  const unreadMessagesCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-bg text-text-primary uppercase-none select-none selection:bg-white/10 select-text">
      
      {/* 1. INITIAL SEQUENTIAL LOADER */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Container Rendered when Loaded */}
      {!isLoading && (
        <div className="relative flex flex-col min-h-screen">
          {/* 2. FLOATING NAVIGATION BAR */}
          <Header 
            activeSection={activeSection}
            onNavClick={scrollToSection}
            onResumeClick={() => setIsResumeOpen(true)}
            onContactClick={() => scrollToSection('contact')}
          />

          {/* 3. HERO VIEWPORT */}
          <HeroSection 
            onViewWorkClick={() => scrollToSection('work')}
            onContactClick={() => scrollToSection('contact')}
          />

          {/* 4. SELECTED PROJECTS BENTO SECTION */}
          <FeaturedProjects onViewProject={setSelectedProject} />

          {/* 5. HORIZONTAL PILL LOGS */}
          <LogsSection />

          {/* 6. STATS METRICS DISPLAY */}
          <StatsSection />

          {/* 7. RESUME CAREER TIMELINE */}
          <Timeline timelineEvents={config.timeline} />

          {/* 8. CONTACT & GSAP INFINITE SCROLL */}
          <ContactFooter />

          {/* --- ACTIVE FLOATING UTILITIES BAR (EXCLUSIVE CUSTOMIZER PORTAL) --- */}
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setIsEditorOpen(true)}
              className="relative flex items-center justify-center w-12 h-12 rounded-full accent-gradient hover:scale-110 active:scale-95 text-bg transition-transform shadow-[0_10px_30px_rgba(0,0,0,0.6)] group border border-white/20 cursor-pointer"
            >
              {/* Dynamic Notification badge */}
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative rounded-full h-4.5 w-4.5 bg-pink-500 flex items-center justify-center text-[9px] text-white font-bold leading-none">
                    {unreadMessagesCount}
                  </span>
                </span>
              )}
              {/* Interactive Pen SVG icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </div>

          {/* --- DETAILED DIALOG MODALS SUBSCRIPTION --- */}
          
          {/* Case Study UI Simulator Sheet */}
          <ProjectDetailModal 
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />

          {/* High Contrast Academic Resume CV Card */}
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
            designerName="Michael Smith"
            role="Systems Engineering & Visual Craftsman"
          />

          {/* Dynamic Configuration Panel drawer */}
          <EditorPanel 
            isOpen={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
            config={config}
            onChangeConfig={setConfig}
            themes={defaultThemes}
            messages={messages}
            onMarkMessageRead={handleMarkMessageRead}
            onDeleteMessage={handleDeleteMessage}
            onResetToDefault={handleResetToDefault}
          />
        </div>
      )}
    </div>
  );
}
