import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Cpu, 
  FileText, 
  Sparkles, 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  Bookmark, 
  Copy, 
  RotateCcw, 
  ThumbsUp, 
  Briefcase,
  Play,
  Loader2
} from 'lucide-react';
import { Message, TailorReport } from '../types';

const PRESET_QUESTIONS = [
  "Why is Ashwin a strong fit for a Data Analyst role?",
  "What are his exact responsibilities at CAMS?",
  "Detail his AI annotation work at Objectways.",
  "Tell me about his data analytics training at IIE."
];

const SAMPLE_JD = `We are looking for an Associate Data Analyst or Business Operations Executive. 

Key Responsibilities:
- Process daily business operations and transactional reports with high accuracy.
- Prepare visual dashboards in Power BI and MS Excel to communicate key metrics to fund stakeholders.
- Maintain and query relational databases (SQL) for analytical deep dives.
- Collaborate with compliance and support teams to resolve discrepancy issues.

Requirements:
- Bachelor's degree with computer proficiency.
- Hands-on skills in Advanced Excel, Power BI or Tableau.
- Knowledge of MySQL databases. Python knowledge is a major plus.
- Exceptional attention to detail and structured communication.`;

export default function AICopilot() {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'tailor'>('chat');
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi there! I'm Ashwin's AI Professional Assistant. I have been trained on his complete updated resume, CAMS financial operations experience, and Indra Institute analytics milestones. Ask me any questions about his qualifications, projects, or career ambitions!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  
  // Tailor State
  const [jdText, setJdText] = useState("");
  const [isTailorLoading, setIsTailorLoading] = useState(false);
  const [tailorReport, setTailorReport] = useState<TailorReport | null>(null);
  const [tailorError, setTailorError] = useState<string | null>(null);
  const [copiedLetter, setCopiedLetter] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending chat message
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isChatLoading) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsChatLoading(true);
    setChatError(null);

    try {
      // Gather conversation history
      const history = [...messages, userMsg].map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      });

      if (!res.ok) {
        throw new Error("Could not reach Gemini client. Please make sure GEMINI_API_KEY is configured.");
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}-model`,
        role: 'model',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err: any) {
      console.error(err);
      setChatError(err.message || "Something went wrong. Please check your network or credentials.");
    } finally {
      setIsChatLoading(false);
    }
  };

  // Evaluate Resume Alignment (Tailoring)
  const handleTailorResume = async () => {
    if (!jdText.trim() || isTailorLoading) return;

    setIsTailorLoading(true);
    setTailorReport(null);
    setTailorError(null);

    try {
      const res = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jdText })
      });

      if (!res.ok) {
        throw new Error("Could not reach tailoring agent. Verify GEMINI_API_KEY is configured.");
      }

      const report: TailorReport = await res.json();
      if ((report as any).error) throw new Error((report as any).error);

      setTailorReport(report);
    } catch (err: any) {
      console.error(err);
      setTailorError(err.message || "Failed to customize resume details. Check API keys.");
    } finally {
      setIsTailorLoading(false);
    }
  };

  // Copy cover letter to clipboard
  const handleCopyLetter = () => {
    if (!tailorReport) return;
    navigator.clipboard.writeText(tailorReport.coverLetter);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" id="ai-workspace-container">
      {/* Workspace Sidebar Toggles */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider px-2 pb-2 border-b border-slate-800">
            Select AI Module
          </span>

          <button
            onClick={() => setActiveSubTab('chat')}
            className={`flex items-center gap-3 p-3 rounded-xl text-sm font-semibold transition-all ${
              activeSubTab === 'chat'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-md shadow-indigo-950/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
            id="btn-workspace-chat"
          >
            <MessageSquare className="w-4 h-4" />
            Ashwin's Chat Bot
          </button>

          <button
            onClick={() => setActiveSubTab('tailor')}
            className={`flex items-center gap-3 p-3 rounded-xl text-sm font-semibold transition-all ${
              activeSubTab === 'tailor'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-md shadow-indigo-950/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
            }`}
            id="btn-workspace-tailor"
          >
            <Cpu className="w-4 h-4" />
            Resume Tailor
          </button>
        </div>

        {/* Informational Guidelines Card */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-4 text-xs text-slate-400 space-y-2 leading-relaxed">
          <div className="flex gap-1.5 text-indigo-400 font-semibold items-center">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Studio Integration</span>
          </div>
          <p>
            Both workflows operate on secure, server-side <span className="font-mono text-slate-300">gemini-3.5-flash</span> models. Responses are grounded in Ashwin's verified, upgraded qualifications, including his latest learning achievements.
          </p>
        </div>
      </div>

      {/* Main Workspace Column */}
      <div className="lg:col-span-3">
        {activeSubTab === 'chat' ? (
          /* Ashwin's Chatbot Interface */
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl h-[560px] flex flex-col justify-between overflow-hidden relative">
            
            {/* Header */}
            <div className="p-4 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                  <MessageSquare className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-200">Ask Ashwin's AI Representative</h3>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active (Gemini 3.5 Flash)
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-all"
                title="Restart Chat"
                id="btn-restart-chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Display Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar">
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  id={`chat-bubble-${m.id}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm flex flex-col gap-1 shadow-md ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-slate-100 rounded-tr-none'
                      : 'bg-slate-950/60 text-slate-300 border border-slate-800 rounded-tl-none'
                  }`}>
                    <span>{m.text}</span>
                    <span className="text-[9px] text-slate-400 self-end font-mono">{m.timestamp}</span>
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start" id="chat-loading-spinner">
                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl rounded-tl-none p-3 max-w-[85%] flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                    <span className="text-xs text-slate-400 font-mono">Ashwin's AI is writing...</span>
                  </div>
                </div>
              )}
              {chatError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2" id="chat-error-log">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{chatError}</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer with Presets & Input Form */}
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
              {/* Presets pill list */}
              {messages.length === 1 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Suggested Questions:</span>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSendMessage(q)}
                        className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all"
                        id={`preset-${q.substring(0, 10).replace(/ /g, "-")}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input form */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
                className="flex gap-2"
                id="chat-input-form"
              >
                <input
                  type="text"
                  placeholder="Ask about skills, CAMS work, projects, training..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  id="chat-text-input"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isChatLoading}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-slate-100 rounded-xl transition-all"
                  id="btn-chat-send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Resume Tailoring Module */
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 space-y-6" id="resume-tailoring-workspace">
            <div>
              <h3 className="text-lg font-display font-bold text-slate-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                AI Job Customization Workspace
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Paste any target Job Description below. The server-side Gemini intelligence will evaluate Ashwin's profile and instantly generate tailored materials.
              </p>
            </div>

            {/* Input Job Description */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Target Job Description:</span>
                <button 
                  onClick={() => setJdText(SAMPLE_JD)}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                  id="btn-load-sample-jd"
                >
                  <Play className="w-3 h-3" /> Load Sample Analyst JD
                </button>
              </div>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the hiring criteria or JD details here..."
                rows={6}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 leading-relaxed focus:outline-none focus:border-indigo-500 transition-colors no-scrollbar"
                id="jd-textarea"
              />
            </div>

            {/* Actions Panel */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleTailorResume}
                disabled={!jdText.trim() || isTailorLoading}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-slate-100 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-indigo-950/20"
                id="btn-run-tailoring"
              >
                {isTailorLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing Alignment...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Customize & Match
                  </>
                )}
              </button>

              {tailorReport && (
                <button
                  onClick={() => { setTailorReport(null); setJdText(""); }}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5"
                  id="btn-clear-tailor"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear Report
                </button>
              )}
            </div>

            {tailorError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2" id="tailor-error-log">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{tailorError}</span>
              </div>
            )}

            {/* Tailor Report Evaluation Results Rendering */}
            <AnimatePresence mode="wait">
              {tailorReport && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border-t border-slate-800/80 pt-6 space-y-6"
                  id="tailor-report-payload"
                >
                  {/* Gauge & Assessment block */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    {/* SVG Gauge */}
                    <div className="flex flex-col items-center justify-center bg-slate-950/40 p-4 border border-slate-850 rounded-xl md:col-span-1">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="48" cy="48" r="38" stroke="#1e293b" strokeWidth="5" fill="transparent" />
                          <motion.circle 
                            cx="48" 
                            cy="48" 
                            r="38" 
                            stroke={tailorReport.matchPercentage >= 75 ? "#10b981" : "#eab308"} 
                            strokeWidth="5" 
                            fill="transparent"
                            strokeDasharray={238.76}
                            initial={{ strokeDashoffset: 238.76 }}
                            animate={{ strokeDashoffset: 238.76 - (238.76 * tailorReport.matchPercentage) / 100 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </svg>
                        <span className="absolute text-xl font-display font-extrabold text-slate-100">{tailorReport.matchPercentage}%</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-2">Overall Match</span>
                    </div>

                    {/* Text Evaluation */}
                    <div className="md:col-span-3 space-y-2">
                      <h4 className="text-sm font-semibold text-indigo-400">Executive Suitability Assessment</h4>
                      <p className="text-xs text-slate-300 leading-relaxed text-justify">
                        {tailorReport.overallAssessment}
                      </p>
                    </div>
                  </div>

                  {/* Key overlaps & gaps list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl space-y-3">
                      <h5 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                        <CheckCircle className="w-3.5 h-3.5" /> Overlapping Strengths
                      </h5>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {tailorReport.keyAlignments.map((item, idx) => (
                          <li key={idx} className="flex gap-2 leading-relaxed">
                            <span className="text-emerald-400 font-bold font-mono shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl space-y-3">
                      <h5 className="text-xs font-semibold text-yellow-500 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                        <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" /> Training roadmap Bridge
                      </h5>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {tailorReport.skillGaps.map((item, idx) => (
                          <li key={idx} className="flex gap-2 leading-relaxed">
                            <span className="text-yellow-500 font-bold font-mono shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Interview Preparation & Resume tuning advice */}
                  <div className="p-4 bg-slate-950/40 border border-indigo-950 rounded-xl space-y-3">
                    <h5 className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                      <Bookmark className="w-3.5 h-3.5" /> Customized Resume Highlights Advice
                    </h5>
                    <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                      {tailorReport.resumeTips.map((tip, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-indigo-400 font-bold font-mono shrink-0">[{idx + 1}]</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cover Letter Panel */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h5 className="text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider">
                        Tailored Professional Cover Letter
                      </h5>
                      <button
                        onClick={handleCopyLetter}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 hover:border-indigo-500/30 transition-all flex items-center gap-1.5"
                        id="btn-copy-cover-letter"
                      >
                        {copiedLetter ? (
                          <>
                            <ThumbsUp className="w-3 h-3 text-emerald-400" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy Letter
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-5 bg-slate-950/90 border border-slate-850 rounded-xl font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed shadow-inner">
                      {tailorReport.coverLetter}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
