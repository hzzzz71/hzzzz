import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioConfig, PortfolioTheme, ContactMessage, TimelineEvent, Project } from '../types';
import { X, Sliders, Palette, Briefcase, Mail, Plus, Trash2, Check, Star, RefreshCw, Eye } from 'lucide-react';

interface EditorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
  onChangeConfig: (newConfig: PortfolioConfig) => void;
  themes: PortfolioTheme[];
  messages: ContactMessage[];
  onMarkMessageRead: (id: string) => void;
  onDeleteMessage: (id: string) => void;
  onResetToDefault: () => void;
}

export default function EditorPanel({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  themes,
  messages,
  onMarkMessageRead,
  onDeleteMessage,
  onResetToDefault
}: EditorPanelProps) {
  const [activeTab, setActiveTab] = React.useState<'theme' | 'projects' | 'timeline' | 'messages'>('theme');
  const [editingProjectId, setEditingProjectId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  // --- Theme Change Handlers ---
  const handleThemeSelect = (themeId: string) => {
    onChangeConfig({ ...config, themeId });
  };

  const handleTextChange = (field: keyof Omit<PortfolioConfig, 'projects' | 'timeline'>, value: string) => {
    onChangeConfig({ ...config, [field]: value });
  };

  // --- Project Editors ---
  const handleProjectUpdate = (projectId: string, updatedFields: Partial<Project>) => {
    const nextProjects = config.projects.map(p => {
      if (p.id === projectId) {
        return { ...p, ...updatedFields };
      }
      return p;
    });
    onChangeConfig({ ...config, projects: nextProjects });
  };

  // --- Timeline Managers ---
  const handleTimelineUpdate = (eventId: string, updatedFields: Partial<TimelineEvent>) => {
    const nextTimeline = config.timeline.map(t => {
      if (t.id === eventId) {
        return { ...t, ...updatedFields };
      }
      return t;
    });
    onChangeConfig({ ...config, timeline: nextTimeline });
  };

  const handleAddTimelineEvent = () => {
    const newEvent: TimelineEvent = {
      id: `time-new-${Date.now()}`,
      dateRange: "2026 - Present",
      title: "New Milestones Architect",
      company: "Startup Co.",
      description: "Describe your custom responsibilities and contributions in high-fidelity."
    };
    onChangeConfig({ ...config, timeline: [newEvent, ...config.timeline] });
  };

  const handleDeleteTimelineEvent = (id: string) => {
    onChangeConfig({ ...config, timeline: config.timeline.filter(t => t.id !== id) });
  };

  const unreadMessagesCount = messages.filter(m => !m.read).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Soft Dimmer Backdrop */}
        <motion.div
          id="editor-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900"
        />

        {/* Sliding Panel */}
        <motion.div
          id="editor-slide-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 border-l border-slate-100"
        >
          {/* Editor Header Navigation */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-800 font-display">
                  Portfolio Personalizer
                </h2>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Customize copy, milestones, watercolors, and inspect inquiries.
              </p>
            </div>
            <button
              id="btn-close-editor"
              onClick={onClose}
              className="p-1.5 hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer transition"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/20 text-xs font-semibold text-slate-500 overflow-x-auto">
            <button
              id="editor-tab-theme"
              onClick={() => setActiveTab('theme')}
              className={`flex-1 py-3 text-center border-b-2 transition min-w-[70px] ${
                activeTab === 'theme' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent hover:text-slate-800'
              }`}
            >
              <span className="flex items-center justify-center space-x-1">
                <Palette className="w-3.5 h-3.5" />
                <span>Branding</span>
              </span>
            </button>
            <button
              id="editor-tab-projects"
              onClick={() => setActiveTab('projects')}
              className={`flex-1 py-3 text-center border-b-2 transition min-w-[70px] ${
                activeTab === 'projects' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent hover:text-slate-800'
              }`}
            >
              <span className="flex items-center justify-center space-x-1">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Gallery</span>
              </span>
            </button>
            <button
              id="editor-tab-timeline"
              onClick={() => setActiveTab('timeline')}
              className={`flex-1 py-3 text-center border-b-2 transition min-w-[70px] ${
                activeTab === 'timeline' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent hover:text-slate-800'
              }`}
            >
              <span className="flex items-center justify-center space-x-1">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Journey</span>
              </span>
            </button>
            <button
              id="editor-tab-messages"
              onClick={() => setActiveTab('messages')}
              className={`relative flex-1 py-3 text-center border-b-2 transition min-w-[70px] ${
                activeTab === 'messages' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent hover:text-slate-800'
              }`}
            >
              <span className="flex items-center justify-center space-x-1">
                <Mail className="w-3.5 h-3.5" />
                <span>Inbox</span>
              </span>
              {unreadMessagesCount > 0 && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative rounded-full h-2 w-2 bg-pink-500"></span>
                </span>
              )}
            </button>
          </div>

          {/* ACTIVE TAB CONTENTS AREA */}
          <div className="flex-grow overflow-y-auto p-5 space-y-5" id="editor-tab-content-scroller">
            
            {/* 1. BRANDING & THEME TAB */}
            {activeTab === 'theme' && (
              <div className="space-y-4" id="editor-brand-panel">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div className="text-[11px] text-slate-500">Want default settings back?</div>
                  <button
                    id="btn-designer-reset"
                    onClick={onResetToDefault}
                    className="text-[11px] underline text-indigo-700 font-semibold flex items-center hover:text-indigo-900 cursor-pointer"
                  >
                    Reset Design
                  </button>
                </div>

                {/* Designer Name Text Field */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Designer Name
                  </label>
                  <input
                    id="field-config-name"
                    type="text"
                    value={config.name}
                    onChange={(e) => handleTextChange('name', e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                  />
                </div>

                {/* Role text field */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Headline Role
                  </label>
                  <input
                    id="field-config-role"
                    type="text"
                    value={config.role}
                    onChange={(e) => handleTextChange('role', e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                  />
                </div>

                {/* Hero Title Field */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Hero Title Tagline
                  </label>
                  <textarea
                    id="field-config-heroTitle"
                    value={config.heroTitle}
                    onChange={(e) => handleTextChange('heroTitle', e.target.value)}
                    rows={2}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 resize-none"
                  />
                </div>

                {/* About Bio Area */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Professional Brief bio
                  </label>
                  <textarea
                    id="field-config-about"
                    value={config.aboutText}
                    onChange={(e) => handleTextChange('aboutText', e.target.value)}
                    rows={4}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 resize-none"
                  />
                </div>

                {/* Choose Watercolor Backdrop Themes */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                    Backdrop Color Scheme
                  </label>
                  <div className="grid grid-cols-2 gap-2" id="theme-selector-grid">
                    {themes.map((t) => {
                      const active = config.themeId === t.id;
                      const isDark = t.id === 'cyberfield';
                      return (
                        <button
                          key={t.id}
                          id={`theme-btn-${t.id}`}
                          onClick={() => handleThemeSelect(t.id)}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 relative overflow-hidden cursor-pointer transition ${
                            active 
                              ? 'border-indigo-600 bg-indigo-50/20 ring-1 ring-indigo-600' 
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <span className={`text-[10px] font-bold z-10 ${isDark ? 'text-slate-800' : 'text-slate-700'}`}>
                            {t.name}
                          </span>
                          
                          {/* Mini simulated color circle dots inside button */}
                          <div className="flex space-x-1.5 mt-2 z-10">
                            <span className="w-2.5 h-2.5 rounded-full border border-white" style={{ backgroundColor: t.blob1Color }} />
                            <span className="w-2.5 h-2.5 rounded-full border border-white" style={{ backgroundColor: t.blob2Color }} />
                            <span className="w-2.5 h-2.5 rounded-full border border-white" style={{ backgroundColor: t.blob3Color }} />
                          </div>

                          {active && (
                            <span className="absolute top-2 right-2 h-4.5 w-4.5 rounded-full bg-indigo-600 flex items-center justify-center text-white z-10">
                              <Check className="w-3 h-3 text-white" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 2. GALLERY PROJECTS EDIT TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-4" id="editor-projects-panel">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none">
                  Customize Project Cards
                </span>

                {editingProjectId === null ? (
                  <div className="space-y-2">
                    {config.projects.map(proj => (
                      <button
                        id={`btn-edit-config-proj-${proj.id}`}
                        key={proj.id}
                        onClick={() => setEditingProjectId(proj.id)}
                        className="w-full flex items-center p-3 rounded-xl border border-slate-200/80 hover:border-indigo-500/50 bg-white hover:bg-indigo-50/10 text-left transition cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 mr-3 border border-slate-200/50">
                          <img src={proj.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <span className="font-semibold text-xs text-slate-700 block">{proj.title}</span>
                          <span className="text-[10px] text-slate-400">{proj.subtitle}</span>
                        </div>
                        <Eye className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                      </button>
                    ))}
                  </div>
                ) : (
                  // Detailed single project editing state
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3.5 relative" id="project-editor-single-view">
                    <button
                      id="btn-editor-back-to-project-list"
                      onClick={() => setEditingProjectId(null)}
                      className="absolute top-3.5 right-3.5 text-[11px] font-semibold text-indigo-700 hover:underline cursor-pointer"
                    >
                      Back to list
                    </button>

                    <h4 className="font-bold text-slate-800 text-xs">
                      Editing: {config.projects.find(p => p.id === editingProjectId)?.title}
                    </h4>

                    {/* Change title */}
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-1">
                        Card Display Title
                      </label>
                      <input
                        id="field-project-title"
                        type="text"
                        value={config.projects.find(p => p.id === editingProjectId)?.title || ''}
                        onChange={(e) => handleProjectUpdate(editingProjectId, { title: e.target.value })}
                        className="w-full text-xs font-semibold px-2.5 py-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>

                    {/* Change subtitle */}
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-1">
                        Category Subtitle Caption
                      </label>
                      <input
                        id="field-project-subtitle"
                        type="text"
                        value={config.projects.find(p => p.id === editingProjectId)?.subtitle || ''}
                        onChange={(e) => handleProjectUpdate(editingProjectId, { subtitle: e.target.value })}
                        className="w-full text-xs font-semibold px-2.5 py-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>

                    {/* Change description */}
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-1">
                        Main Card summary block
                      </label>
                      <textarea
                        id="field-project-description"
                        value={config.projects.find(p => p.id === editingProjectId)?.description || ''}
                        onChange={(e) => handleProjectUpdate(editingProjectId, { description: e.target.value })}
                        rows={2}
                        className="w-full text-xs font-semibold px-2.5 py-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 resize-none"
                      />
                    </div>

                    {/* Change tech tag list */}
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-1">
                        Portfolio Toolkit Tags (comma separated)
                      </label>
                      <input
                        id="field-project-tags"
                        type="text"
                        value={config.projects.find(p => p.id === editingProjectId)?.techTags.join(', ') || ''}
                        onChange={(e) => handleProjectUpdate(editingProjectId, { techTags: e.target.value.split(',').map(tag => tag.trim()) })}
                        className="w-full text-xs font-semibold px-2.5 py-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. JOURNEY TIMELINE EDIT TAB */}
            {activeTab === 'timeline' && (
              <div className="space-y-4" id="editor-journey-panel">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none">
                    Milestone Timeline events
                  </span>
                  <button
                    id="btn-add-milestone"
                    onClick={handleAddTimelineEvent}
                    className="flex items-center space-x-1 px-2.5 py-1 bg-indigo-600 font-bold hover:bg-slate-800 text-white rounded-md text-[10px] cursor-pointer transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Milestone</span>
                  </button>
                </div>

                {/* Sub-Items List */}
                <div className="space-y-3.5" id="timeline-editor-scroll">
                  {config.timeline.map((event, eventIdx) => (
                    <div 
                      key={event.id}
                      className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2.5 relative"
                      id={`timeline-editor-item-${event.id}`}
                    >
                      <button
                        id={`btn-del-config-timeline-${event.id}`}
                        onClick={() => handleDeleteTimelineEvent(event.id)}
                        className="absolute top-3.5 right-3.5 text-rose-500 hover:text-rose-700 bg-white p-1 rounded-md border border-slate-200/50 cursor-pointer hover:bg-rose-50 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Header indicators */}
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded">
                          Node {eventIdx + 1}
                        </span>
                      </div>

                      {/* Date bounds */}
                      <div>
                        <label className="block text-[9.5px] uppercase font-bold text-slate-400 mb-0.5">
                          Date Range Span
                        </label>
                        <input
                          id={`field-time-date-${event.id}`}
                          type="text"
                          value={event.dateRange}
                          onChange={(e) => handleTimelineUpdate(event.id, { dateRange: e.target.value })}
                          className="w-full text-xs font-semibold px-2 py-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                        />
                      </div>

                      {/* Job Title and Enterprise Row */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9.5px] uppercase font-bold text-slate-400 mb-0.5">
                            Position Title
                          </label>
                          <input
                            id={`field-time-role-${event.id}`}
                            type="text"
                            value={event.title}
                            onChange={(e) => handleTimelineUpdate(event.id, { title: e.target.value })}
                            className="w-full text-xs font-semibold px-2 py-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block text-[9.5px] uppercase font-bold text-slate-400 mb-0.5">
                            Company
                          </label>
                          <input
                            id={`field-time-company-${event.id}`}
                            type="text"
                            value={event.company}
                            onChange={(e) => handleTimelineUpdate(event.id, { company: e.target.value })}
                            className="w-full text-xs font-semibold px-2 py-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                          />
                        </div>
                      </div>

                      {/* Details Area */}
                      <div>
                        <label className="block text-[9.5px] uppercase font-bold text-slate-400 mb-0.5">
                          Job responsibilities / details
                        </label>
                        <textarea
                          id={`field-time-desc-${event.id}`}
                          value={event.description}
                          onChange={(e) => handleTimelineUpdate(event.id, { description: e.target.value })}
                          rows={2.5}
                          className="w-full text-xs font-semibold px-2 py-1.5 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. MESSAGES INBOX TAB */}
            {activeTab === 'messages' && (
              <div className="space-y-4" id="editor-messages-panel">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none">
                  Incoming contact inquiries ({messages.length})
                </span>

                {messages.length === 0 ? (
                  <div className="text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 mt-2">
                    <Mail className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <span className="text-xs font-semibold">Inquiries queue empty</span>
                    <p className="text-[10px] text-slate-400 mt-1">Submit the bottom Contact Form to check realtime updates.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5" id="editor-inbox-scroll">
                    {messages.map(item => (
                      <div
                        id={`msg-card-${item.id}`}
                        key={item.id}
                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-colors ${
                          item.read 
                            ? 'bg-slate-50/50 border-slate-100 text-slate-600' 
                            : 'bg-indigo-500/5 border-indigo-200 text-slate-800 relative ring-1 ring-indigo-300/30'
                        }`}
                      >
                        {/* Inbox row header */}
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <span className="font-bold text-xs flex items-center">
                              {!item.read && <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2 flex-shrink-0 animate-ping" />}
                              {item.name}
                            </span>
                            <span className="text-[10px] text-indigo-500 font-mono italic block mt-0.5">{item.email}</span>
                          </div>
                          
                          {/* Inbox date */}
                          <span className="text-[9px] font-mono text-slate-400">{item.timestamp}</span>
                        </div>

                        {/* Message body */}
                        <p className="text-[11px] leading-relaxed select-text font-medium mt-1 bg-white/40 p-2 rounded-lg border border-slate-200/20">
                          {item.message}
                        </p>

                        {/* Action triggers */}
                        <div className="flex justify-end items-center mt-3 pt-2 border-t border-slate-100/10 space-x-2">
                          <button
                            id={`btn-del-msg-${item.id}`}
                            onClick={() => onDeleteMessage(item.id)}
                            className="text-[10px] font-semibold text-rose-500 hover:text-rose-700 font-mono transition cursor-pointer"
                          >
                            Delete
                          </button>
                          
                          {!item.read && (
                            <button
                              id={`btn-read-msg-${item.id}`}
                              onClick={() => onMarkMessageRead(item.id)}
                              className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 cursor-pointer transition"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Mark Read</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
