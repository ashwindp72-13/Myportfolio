import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  BarChart4, 
  Cpu, 
  Printer, 
  Linkedin, 
  Mail, 
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  MapPin,
  Menu,
  X
} from 'lucide-react';
import { ashwinResumeData } from './data';
import ResumeTab from './components/ResumeTab';
import ProjectShowcase from './components/ProjectShowcase';
import AICopilot from './components/AICopilot';
import PrintPreview from './components/PrintPreview';

type ActiveTab = 'resume' | 'survey' | 'copilot' | 'print';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('resume');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'resume', label: 'Interactive Resume', icon: FileText },
    { id: 'survey', label: 'Digital Payment Survey', icon: BarChart4 },
    { id: 'copilot', label: 'AI Recruiter Workspace', icon: Cpu },
    { id: 'print', label: 'PDF Export & Design', icon: Printer },
  ];

  const activeTabData = ashwinResumeData;

  return (
    <div className="bg-[#080d1a] min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Decorative Blur Spots (Hidden on print) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none no-print" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none no-print" />

      {/* Main Header / Navigation Bar (Hidden on print) */}
      <header className="border-b border-slate-900 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50 no-print" id="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-display font-bold text-lg text-slate-100 shadow-md shadow-indigo-950/40">
              A
            </div>
            <div>
              <h1 className="text-base font-display font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
                {activeTabData.contact.name}
                <span className="hidden sm:inline px-2 py-0.5 text-[9px] font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 rounded-full uppercase tracking-wider font-semibold">
                  Upgraded Portfolio
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                {activeTabData.contact.title}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-900">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === tab.id 
                      ? 'bg-slate-900 text-indigo-400 border border-slate-800 shadow shadow-slate-950' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                  }`}
                  id={`nav-tab-${tab.id}`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop External LinkedIn badge */}
          <div className="hidden lg:flex items-center gap-3 text-xs">
            <a 
              href={activeTabData.contact.linkedin} 
              target="_blank" 
              rel="referrer" 
              className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors py-1.5 px-3 rounded-lg border border-slate-850 hover:bg-slate-900/30"
              id="topbar-linkedin-link"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn Profile</span>
            </a>
          </div>

          {/* Mobile Hamburger menu toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 rounded-lg transition-all"
              id="btn-mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation Overlay (Hidden on print) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-900 bg-slate-950/90 backdrop-blur-lg fixed top-16 left-0 right-0 z-40 overflow-hidden no-print"
            id="mobile-drawer"
          >
            <div className="px-4 py-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as ActiveTab);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3 text-sm font-semibold rounded-xl transition-all ${
                      activeTab === tab.id 
                        ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/25' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                    id={`mobile-nav-tab-${tab.id}`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}

              <hr className="border-slate-900 my-3" />

              <a 
                href={activeTabData.contact.linkedin}
                target="_blank" 
                rel="referrer" 
                className="flex items-center gap-3 w-full p-3 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 rounded-xl"
                id="mobile-linkedin-link"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content-area">
        
        {/* Quick Overview Stats Strip (Hidden on print) */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 no-print" id="overview-stats-strip">
          
          {/* Card 1 */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Current Professional Role</span>
              <span className="text-xs font-semibold text-slate-200 block">CAMS Mutual Funds Senior Executive</span>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-semibold">
              Live
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Analytics Certification Status</span>
              <span className="text-xs font-semibold text-slate-200 block">MySQL (current) & Completed Power BI, Excel</span>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-semibold">
              IIE Hopes
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">AI Studio Ecosystem Integration</span>
              <span className="text-xs font-semibold text-slate-200 block">Server-Side Gemini 3.5 Copilot Connected</span>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full font-semibold">
              v1.2
            </span>
          </div>

        </div>

        {/* Dynamic Screen View Controller */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            id={`tab-view-container-${activeTab}`}
          >
            {activeTab === 'resume' && <ResumeTab />}
            {activeTab === 'survey' && <ProjectShowcase />}
            {activeTab === 'copilot' && <AICopilot />}
            {activeTab === 'print' && <PrintPreview />}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* Footer (Hidden on print) */}
      <footer className="mt-12 py-6 border-t border-slate-900/60 text-center text-xs text-slate-500 no-print" id="app-footer">
        <p>© 2026 Ashwin D P. Designed & built with React, Tailwind CSS, & Gemini API.</p>
      </footer>

    </div>
  );
}
