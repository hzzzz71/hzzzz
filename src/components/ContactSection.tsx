import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Mail, User, MessageSquare, Send, CheckCircle, Github, Linkedin, Disc } from 'lucide-react';

interface ContactSectionProps {
  onFormSubmit: (data: { name: string; email: string; message: string }) => void;
  onResumeClick: () => void;
  isDarkTheme: boolean;
}

export default function ContactSection({ onFormSubmit, onResumeClick, isDarkTheme }: ContactSectionProps) {
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const cardBg = isDarkTheme 
    ? 'bg-slate-900/40 border-slate-800 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]' 
    : 'bg-white/40 border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.03)]';

  const textPrimary = isDarkTheme ? 'text-slate-100' : 'text-slate-900';
  const textSecondary = isDarkTheme ? 'text-slate-400' : 'text-slate-500';
  const inputBg = isDarkTheme ? 'bg-slate-950/60 border-slate-800' : 'bg-white/65 border-white/60';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate API storage roundtrip
    setTimeout(() => {
      onFormSubmit(formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Automatically clear popup feedback after 4 seconds
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1200);
  };

  return (
    <section id="contact-form-section" className="py-16 px-4 md:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div 
          id="contact-double-card"
          className={`backdrop-blur-xl border rounded-[2rem] overflow-hidden grid grid-cols-1 md:grid-cols-12 ${cardBg} p-8 gap-8 md:gap-12 transition-all duration-500`}
        >
          {/* LEFT COLUMN: Links (12 cols on mobile -> 5 cols on desktop) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-8" id="contact-links-grid">
            <div>
              <h3 className={`font-display text-2xl font-bold tracking-tight ${textPrimary}`}>
                Links
              </h3>
              <div className="w-8 h-1 bg-indigo-500 rounded-full mt-2 mb-6" />
              
              <ul className="space-y-3" id="contact-ul">
                <li>
                  <a
                    id="foot-link-work"
                    href="#work-gallery"
                    onClick={(e) => handleNavClick(e, 'work-gallery-section')}
                    className={`text-sm font-semibold ${textSecondary} hover:text-indigo-600 transition flex items-center group`}
                  >
                    <span>Work</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
                <li>
                  <a
                    id="foot-link-about"
                    href="#career-journey"
                    onClick={(e) => handleNavClick(e, 'career-journey-section')}
                    className={`text-sm font-semibold ${textSecondary} hover:text-indigo-600 transition flex items-center group`}
                  >
                    <span>About</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
                <li>
                  <a
                    id="foot-link-contact"
                    href="#contact-form"
                    onClick={(e) => handleNavClick(e, 'contact-form-section')}
                    className={`text-sm font-semibold ${textSecondary} hover:text-indigo-600 transition flex items-center group`}
                  >
                    <span>Contact</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
                <li>
                  <button
                    id="foot-link-resume"
                    onClick={onResumeClick}
                    className={`text-sm font-semibold ${textSecondary} hover:text-indigo-600 transition flex items-center group cursor-pointer border-none bg-transparent p-0`}
                  >
                    <span>Resume</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Social Badges and branding */}
            <div className="pt-4 border-t border-slate-100/10">
              <span className={`text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3`}>
                Connect Socially
              </span>
              <div className="flex space-x-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-indigo-50/50 hover:bg-indigo-600 text-slate-600 hover:text-white border border-slate-200/50 hover:border-transparent transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-indigo-50/50 hover:bg-indigo-600 text-slate-600 hover:text-white border border-slate-200/50 hover:border-transparent transition"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-indigo-50/50 hover:bg-indigo-600 text-slate-600 hover:text-white border border-slate-200/50 hover:border-transparent transition"
                  aria-label="Dribbble"
                >
                  <Disc className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form (12 cols on mobile -> 7 cols on desktop) */}
          <div className="md:col-span-7 flex flex-col justify-between" id="contact-fields-grid">
            <div>
              <h3 className={`font-display text-2xl font-bold tracking-tight ${textPrimary}`}>
                Contact
              </h3>
              <div className="w-8 h-1 bg-indigo-500 rounded-full mt-2 mb-6" />

              <form id="contact-form-node" onSubmit={handleSubmit} className="space-y-3.5">
                {/* Name / Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Name Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <input
                      id="input-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      required
                      className={`w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 text-slate-800 transition ${inputBg}`}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <input
                      id="input-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      required
                      className={`w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 text-slate-800 transition ${inputBg}`}
                    />
                  </div>
                </div>

                {/* Message TextArea */}
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none text-slate-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <textarea
                    id="input-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Message"
                    rows={4}
                    required
                    className={`w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 text-slate-800 transition resize-none ${inputBg}`}
                  />
                </div>

                {/* Action buttons list */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex-grow">
                    <AnimatePresence>
                      {submitSuccess && (
                        <motion.div
                          id="submit-success-banner"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="flex items-center text-xs font-semibold text-emerald-600 space-x-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/50 max-w-max"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>Message sent successfully!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    id="btn-submit-contact"
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-indigo-200/40 bg-indigo-50/60 hover:bg-indigo-600 hover:text-white text-indigo-700 font-semibold text-xs cursor-pointer transition-all duration-300 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Submit'}</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
