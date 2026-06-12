import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Printer, Briefcase, GraduationCap, Award, BrainCircuit } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  designerName: string;
  role: string;
}

export default function ResumeModal({ isOpen, onClose, designerName, role }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop glass */}
        <motion.div
          id="resume-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        />

        {/* Resume Canvas Container */}
        <motion.div
          id="resume-body-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 md:p-8 shadow-2xl z-10 border border-slate-200"
        >
          {/* Close Trigger */}
          <button
            id="btn-close-resume"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/50 rounded-full cursor-pointer transition"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          {/* Ribbon indicator */}
          <div className="flex items-center space-x-1.5 text-[10px] font-bold text-indigo-600 mb-4 bg-indigo-50/70 border border-indigo-100 max-w-max px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3 h-3 animate-pulse text-indigo-500" />
            <span>Curriculum Vitae</span>
          </div>

          {/* Resume Heading */}
          <div className="border-b border-slate-100 pb-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-950">
                {designerName}
              </h2>
              <p className="text-sm text-indigo-600 font-semibold mt-1 font-sans">
                {role} — Product Architecture Specialist
              </p>
            </div>
            
            {/* Quick print dummy feedback */}
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 py-1.5 px-4 rounded-full border border-slate-200 hover:border-slate-800 hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold cursor-pointer transition shadow-sm bg-white"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print PDF</span>
            </button>
          </div>

          {/* MAIN COLUMN SPLIT */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="resume-grid">
            
            {/* LEFT COLUMN: Experience blocks (8 cols) */}
            <div className="md:col-span-8 space-y-6" id="resume-left">
              {/* Experience */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center mb-4">
                  <Briefcase className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0" />
                  Experience History
                </h3>

                <div className="space-y-4 border-l border-slate-100 pl-4 relative ml-2">
                  {/* Job 1 */}
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white" />
                    <span className="text-[10px] font-semibold font-mono text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">
                      2021 — PRESENT
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1.5">
                      Principal Systems Designer / Stellar Flow
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Leading multi-disciplinary squads building international design system frameworks, modular UI structures, and micro-interaction prototypes using high-grade viewport rendering.
                    </p>
                  </div>

                  {/* Job 2 */}
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                    <span className="text-[10px] font-semibold font-mono text-[#5c4a37] uppercase bg-[#f5ebe0] px-2 py-0.5 rounded">
                      2016 — 2021
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1.5">
                      Lead UX Architect / CloudCore Systems
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Orchestrated enterprise analytics interfaces, custom metric widgets, and SaaS performance telemetry dashboards. Accelerated system response layouts by 8.5%.
                    </p>
                  </div>

                  {/* Job 3 */}
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                    <span className="text-[10px] font-semibold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      2010 — 2016
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1.5">
                      Senior Interaction Designer / Innovate corp
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Spearheaded customer journey optimization, interactive mockups, and layout validation benchmarks across e-commerce frameworks handling 1M+ active events.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center mb-4">
                  <GraduationCap className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0" />
                  Education
                </h3>
                <div className="space-y-3.5 border-l border-slate-100 pl-4 relative ml-2">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-violet-400 ring-4 ring-white" />
                    <h4 className="text-xs font-bold text-slate-800">
                      MFA in Digital Interaction Design
                    </h4>
                    <span className="text-[10.5px] text-slate-500 block">Rhode Island School of Design / Class of 2010</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                    <h4 className="text-xs font-bold text-slate-800">
                      BS in Human-Computer Interaction
                    </h4>
                    <span className="text-[10.5px] text-slate-500 block">Georgia Institute of Technology / Class of 2008</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Toolkits & Awards (4 cols) */}
            <div className="md:col-span-4 space-y-6" id="resume-right-aside">
              {/* Core expertises list */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center mb-3">
                  <BrainCircuit className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0" />
                  Skillsets
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {['Product Design', 'Visual Hierarchy', 'Interactive Prototyping', 'Design Systems', 'Figma Wireframing', 'Taylor Spacing', 'SaaS Dashboards', 'React Components', 'Lottie Animations', 'SwiftUI Views'].map((s, id) => (
                    <span 
                      key={id}
                      className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-1 rounded-md border border-slate-200/50"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accolades */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center mb-3">
                  <Award className="w-4 h-4 text-indigo-500 mr-2" />
                  Awards
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 font-medium">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-1 flex-shrink-0">🏆</span>
                    <span>Awwwards Site of the Day (2024)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-1 flex-shrink-0">🏆</span>
                    <span>Red Dot Interface Design Winner (2021)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-1 flex-shrink-0">🏆</span>
                    <span>CSS Design Awards Best UI/UX (2019)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
