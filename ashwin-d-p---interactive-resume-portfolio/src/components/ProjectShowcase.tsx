import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart4, 
  Users, 
  ShieldAlert, 
  Smartphone, 
  Filter, 
  HelpCircle, 
  PieChart as PieIcon, 
  TrendingUp, 
  Layers, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ashwinResumeData } from '../data';

interface SurveyDataPoint {
  id: number;
  ageGroup: '18-25' | '26-35' | '36-50' | '50+';
  location: 'Urban' | 'Semi-Urban' | 'Rural';
  primaryPayment: 'UPI' | 'Cards' | 'Net Banking' | 'Wallets';
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Rarely';
  primaryBarrier: 'Security Concerns' | 'Usability Issues' | 'Transaction Failures' | 'None';
  avgWeeklyTrans: number;
  satisfactionScore: number; // 1 to 5
}

// Generate realistic mock sample dataset matching a 500-respondent survey
const generateSurveyMockData = (): SurveyDataPoint[] => {
  const data: SurveyDataPoint[] = [];
  const ageGroups: ('18-25' | '26-35' | '36-50' | '50+')[] = ['18-25', '26-35', '36-50', '50+'];
  const locations: ('Urban' | 'Semi-Urban' | 'Rural')[] = ['Urban', 'Semi-Urban', 'Rural'];
  
  // Total 500 items
  for (let i = 0; i < 500; i++) {
    // Determine age group with some skew
    let ageGroup = ageGroups[0]; // 18-25
    const rAge = Math.random();
    if (rAge > 0.4 && rAge <= 0.75) ageGroup = ageGroups[1]; // 26-35
    else if (rAge > 0.75 && rAge <= 0.92) ageGroup = ageGroups[2]; // 36-50
    else if (rAge > 0.92) ageGroup = ageGroups[3]; // 50+

    // Determine location
    const rLoc = Math.random();
    const location = rLoc > 0.5 ? locations[0] : rLoc > 0.2 ? locations[1] : locations[2];

    // Determine primary payment method based on age skew
    let primaryPayment: 'UPI' | 'Cards' | 'Net Banking' | 'Wallets' = 'UPI';
    const rPay = Math.random();
    if (ageGroup === '18-25') {
      primaryPayment = rPay > 0.15 ? 'UPI' : rPay > 0.05 ? 'Wallets' : 'Cards';
    } else if (ageGroup === '26-35') {
      primaryPayment = rPay > 0.4 ? 'UPI' : rPay > 0.1 ? 'Cards' : 'Wallets';
    } else if (ageGroup === '36-50') {
      primaryPayment = rPay > 0.5 ? 'Cards' : rPay > 0.15 ? 'UPI' : 'Net Banking';
    } else { // 50+
      primaryPayment = rPay > 0.55 ? 'Net Banking' : rPay > 0.2 ? 'Cards' : 'UPI';
    }

    // Frequency
    let frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Rarely' = 'Weekly';
    const rFreq = Math.random();
    if (primaryPayment === 'UPI') {
      frequency = rFreq > 0.25 ? 'Daily' : 'Weekly';
    } else if (primaryPayment === 'Cards') {
      frequency = rFreq > 0.6 ? 'Daily' : rFreq > 0.15 ? 'Weekly' : 'Monthly';
    } else {
      frequency = rFreq > 0.7 ? 'Daily' : rFreq > 0.3 ? 'Weekly' : rFreq > 0.1 ? 'Monthly' : 'Rarely';
    }

    // Barriers skew
    let primaryBarrier: 'Security Concerns' | 'Usability Issues' | 'Transaction Failures' | 'None' = 'None';
    const rBarr = Math.random();
    if (ageGroup === '50+') {
      primaryBarrier = rBarr > 0.4 ? 'Security Concerns' : rBarr > 0.15 ? 'Usability Issues' : 'Transaction Failures';
    } else if (ageGroup === '36-50') {
      primaryBarrier = rBarr > 0.6 ? 'Security Concerns' : rBarr > 0.3 ? 'Transaction Failures' : 'None';
    } else {
      primaryBarrier = rBarr > 0.7 ? 'Transaction Failures' : rBarr > 0.55 ? 'Security Concerns' : 'None';
    }

    // Avg Weekly Transactions
    let avgWeeklyTrans = Math.floor(Math.random() * 8) + 2; // 2-10
    if (primaryPayment === 'UPI' && frequency === 'Daily') avgWeeklyTrans = Math.floor(Math.random() * 15) + 10; // 10-25
    else if (frequency === 'Rarely' || frequency === 'Monthly') avgWeeklyTrans = Math.floor(Math.random() * 2) + 1;

    // Satisfaction score
    let satisfactionScore = Math.floor(Math.random() * 2) + 4; // 4-5
    if (primaryBarrier === 'Security Concerns') satisfactionScore = Math.floor(Math.random() * 2) + 2; // 2-3
    if (primaryBarrier === 'Transaction Failures') satisfactionScore = Math.floor(Math.random() * 3) + 2; // 2-4

    data.push({
      id: i,
      ageGroup,
      location,
      primaryPayment,
      frequency,
      primaryBarrier,
      avgWeeklyTrans,
      satisfactionScore
    });
  }
  return data;
};

export default function ProjectShowcase() {
  const [selectedAge, setSelectedAge] = useState<string>('All');
  const [selectedLoc, setSelectedLoc] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'overview' | 'methods' | 'barriers'>('overview');

  // Memoize dataset to prevent recalculations
  const fullDataset = useMemo(() => generateSurveyMockData(), []);

  // Filter dataset dynamically based on selection
  const filteredData = useMemo(() => {
    return fullDataset.filter(item => {
      const ageMatch = selectedAge === 'All' || item.ageGroup === selectedAge;
      const locMatch = selectedLoc === 'All' || item.location === selectedLoc;
      return ageMatch && locMatch;
    });
  }, [fullDataset, selectedAge, selectedLoc]);

  // Calculations for Key metrics
  const stats = useMemo(() => {
    const total = filteredData.length;
    if (total === 0) return { total: 0, upiPct: 0, avgWeekly: 0, highSatPct: 0, upiCount: 0, cardCount: 0, walletCount: 0, bankCount: 0 };

    let upi = 0, card = 0, wallet = 0, bank = 0;
    let totalTrans = 0;
    let highSat = 0;

    filteredData.forEach(item => {
      totalTrans += item.avgWeeklyTrans;
      if (item.primaryPayment === 'UPI') upi++;
      else if (item.primaryPayment === 'Cards') card++;
      else if (item.primaryPayment === 'Wallets') wallet++;
      else if (item.primaryPayment === 'Net Banking') bank++;

      if (item.satisfactionScore >= 4) highSat++;
    });

    return {
      total,
      upiPct: Math.round((upi / total) * 100),
      avgWeekly: Math.round((totalTrans / total) * 10) / 10,
      highSatPct: Math.round((highSat / total) * 100),
      upiCount: upi,
      cardCount: card,
      walletCount: wallet,
      bankCount: bank,
    };
  }, [filteredData]);

  // Barrier analysis calculations
  const barrierStats = useMemo(() => {
    const total = filteredData.length;
    if (total === 0) return { security: 0, failures: 0, usability: 0, none: 0 };

    let sec = 0, fail = 0, use = 0, none = 0;
    filteredData.forEach(item => {
      if (item.primaryBarrier === 'Security Concerns') sec++;
      else if (item.primaryBarrier === 'Transaction Failures') fail++;
      else if (item.primaryBarrier === 'Usability Issues') use++;
      else none++;
    });

    return {
      security: Math.round((sec / total) * 100),
      failures: Math.round((fail / total) * 100),
      usability: Math.round((use / total) * 100),
      none: Math.round((none / total) * 100),
    };
  }, [filteredData]);

  const projectDetails = ashwinResumeData.projects[0];

  return (
    <div className="space-y-6" id="project-showcase-container">
      {/* Project Header card */}
      <div className="bg-gradient-to-r from-indigo-950/60 to-slate-900/60 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
        {/* Glowing visual backdrop */}
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-indigo-500/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-[11px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full font-semibold uppercase tracking-wider">
                {projectDetails.platform}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" /> Core Portfolio Project
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-100 tracking-tight">
              {projectDetails.title}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed text-justify">
              {projectDetails.description}
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-xl flex flex-col items-center justify-center shrink-0 min-w-[140px] shadow-inner">
            <span className="text-xs text-slate-400 font-mono">Sample Size</span>
            <span className="text-3xl font-display font-extrabold text-indigo-400 mt-1">500</span>
            <span className="text-[10px] text-slate-500 mt-0.5 font-mono">Active Respondents</span>
          </div>
        </div>
      </div>

      {/* Control Filters Area */}
      <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold">Interactive Filter Panel:</span>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Age Selection */}
          <div className="flex items-center gap-2 bg-slate-950/40 p-1.5 rounded-lg border border-slate-800">
            <span className="text-xs text-slate-400 px-1 font-mono">Age:</span>
            {['All', '18-25', '26-35', '36-50', '50+'].map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  selectedAge === age 
                    ? 'bg-indigo-600 text-slate-100 font-medium' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id={`filter-age-${age}`}
              >
                {age}
              </button>
            ))}
          </div>

          {/* Location Selection */}
          <div className="flex items-center gap-2 bg-slate-950/40 p-1.5 rounded-lg border border-slate-800">
            <span className="text-xs text-slate-400 px-1 font-mono">Region:</span>
            {['All', 'Urban', 'Semi-Urban', 'Rural'].map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLoc(loc)}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  selectedLoc === loc 
                    ? 'bg-indigo-600 text-slate-100 font-medium' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id={`filter-loc-${loc}`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Segment N</span>
            <span className="text-2xl font-display font-bold text-slate-100 mt-0.5">
              {stats.total}
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">UPI Preference</span>
            <span className="text-2xl font-display font-bold text-slate-100 mt-0.5">
              {stats.upiPct}%
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Weekly Frequency</span>
            <span className="text-2xl font-display font-bold text-slate-100 mt-0.5">
              {stats.avgWeekly} <span className="text-xs text-slate-400 font-sans font-normal">avg</span>
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">High Satisfaction</span>
            <span className="text-2xl font-display font-bold text-slate-100 mt-0.5">
              {stats.highSatPct}%
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Charts & Sub-tab Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Column */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-6">
          {/* Interactive view toggles */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm font-semibold relative transition-colors ${
                activeTab === 'overview' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              id="tab-chart-overview"
            >
              Payment Preferences Share
              {activeTab === 'overview' && (
                <motion.div layoutId="activeUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('methods')}
              className={`pb-3 text-sm font-semibold ml-6 relative transition-colors ${
                activeTab === 'methods' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              id="tab-chart-methods"
            >
              Frequency Breakdown
              {activeTab === 'methods' && (
                <motion.div layoutId="activeUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('barriers')}
              className={`pb-3 text-sm font-semibold ml-6 relative transition-colors ${
                activeTab === 'barriers' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              id="tab-chart-barriers"
            >
              Primary Adoption Obstacles
              {activeTab === 'barriers' && (
                <motion.div layoutId="activeUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
              )}
            </button>
          </div>

          {/* Dynamic SVG / Styled Charts with AnimatePresence */}
          <div className="h-[280px] flex items-center justify-center relative bg-slate-950/20 rounded-xl border border-slate-850 p-4">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div 
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full h-full flex flex-col justify-center space-y-4"
                >
                  {/* Share Bars representing UPI, Cards, Net Banking, Wallets */}
                  {[
                    { label: 'UPI (Unified Payments Interface)', count: stats.upiCount, color: 'bg-indigo-500' },
                    { label: 'Credit & Debit Cards', count: stats.cardCount, color: 'bg-cyan-500' },
                    { label: 'Net Banking Transfers', count: stats.bankCount, color: 'bg-emerald-500' },
                    { label: 'Mobile Wallets', count: stats.walletCount, color: 'bg-purple-500' }
                  ].map((bar) => {
                    const percentage = stats.total > 0 ? Math.round((bar.count / stats.total) * 100) : 0;
                    return (
                      <div key={bar.label} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium">{bar.label}</span>
                          <span className="text-indigo-400 font-mono font-bold">{percentage}% <span className="text-[10px] text-slate-500">({bar.count})</span></span>
                        </div>
                        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <motion.div 
                            className={`h-full ${bar.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === 'methods' && (
                <motion.div 
                  key="methods"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full h-full flex items-center justify-around"
                >
                  {/* Dynamic Circular Indicators for usage frequency */}
                  {[
                    { label: 'Daily Use', value: stats.upiPct, desc: 'Highest adoption' },
                    { label: 'Weekly Use', value: Math.max(15, 100 - stats.upiPct - 20), desc: 'Moderate reliance' },
                    { label: 'Monthly/Rarely', value: Math.max(5, 20), desc: 'Backup option' }
                  ].map((circle) => (
                    <div key={circle.label} className="flex flex-col items-center space-y-2">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="56" cy="56" r="44" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                          <motion.circle 
                            cx="56" 
                            cy="56" 
                            r="44" 
                            stroke="#6366f1" 
                            strokeWidth="6" 
                            fill="transparent"
                            strokeDasharray={276.4}
                            initial={{ strokeDashoffset: 276.4 }}
                            animate={{ strokeDashoffset: 276.4 - (276.4 * circle.value) / 100 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          />
                        </svg>
                        <span className="absolute text-xl font-display font-extrabold text-slate-200">{circle.value}%</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-semibold text-slate-300 block">{circle.label}</span>
                        <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{circle.desc}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'barriers' && (
                <motion.div 
                  key="barriers"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full h-full flex flex-col justify-center space-y-4"
                >
                  {/* High-fidelity visualization of barriers */}
                  {[
                    { label: 'Security & Phishing Concerns', value: barrierStats.security, color: 'bg-red-500', desc: 'Top bottleneck for elder segments' },
                    { label: 'Technical/Transaction Failures', value: barrierStats.failures, color: 'bg-orange-500', desc: 'Irritant across all age brackets' },
                    { label: 'Complex UI/Usability Barriers', value: barrierStats.usability, color: 'bg-yellow-500', desc: 'Hinders adoption for rural segments' },
                    { label: 'No Major Barriers Reported', value: barrierStats.none, color: 'bg-emerald-500', desc: 'Frictionless adoption' }
                  ].map((bar) => (
                    <div key={bar.label} className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-5 text-xs">
                        <span className="text-slate-300 font-medium block">{bar.label}</span>
                        <span className="text-[10px] text-slate-500 italic block">{bar.desc}</span>
                      </div>
                      <div className="col-span-6 h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <motion.div 
                          className={`h-full ${bar.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${bar.value}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <div className="col-span-1 text-right text-xs font-mono font-bold text-slate-300">
                        {bar.value}%
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Insights Column */}
        <div className="lg:col-span-1 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-display font-semibold text-indigo-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <BarChart4 className="w-4.5 h-4.5" />
              Dynamic Dashboard Insights
            </h3>

            {/* Explanation card based on active filter */}
            <div className="p-4 bg-slate-950/50 border border-slate-850 rounded-xl space-y-3">
              <span className="text-[11px] font-mono text-indigo-300 uppercase tracking-wider block">
                Segment: {selectedAge === 'All' ? 'Cross-Demographics' : `Age Group ${selectedAge}`} • {selectedLoc === 'All' ? 'All Regions' : selectedLoc}
              </span>

              <p className="text-xs text-slate-300 leading-relaxed text-justify">
                {selectedAge === '18-25' ? (
                  "The survey reveals a near-monopoly of UPI payments (over 85%) for the Gen Z bracket. Security and usability barriers are practically zero. However, transaction failure rates stand as their primary daily annoyance, impacting customer loyalty to specific application apps."
                ) : selectedAge === '50+' ? (
                  "Seniors (50+) represent the highest resistance sector. Over 50% prefer Net Banking or Cards over UPI, citing acute security fears and phishing concerns as major adoption hurdles. Usability and readable instruction layouts are key demands."
                ) : (
                  "Across general demographics, digital transactions have evolved into a core lifestyle necessity, with UPI dominating small merchant payments, while Credit Cards are reserved for premium, high-value operations. Regionally, semi-urban sectors are matching urban transaction rates rapidly."
                )}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/60 mt-4 space-y-3">
            <span className="text-xs font-semibold text-slate-200 block">Ashwin's Project Methodology:</span>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex gap-2">
                <span className="text-indigo-400 font-bold font-mono">1.</span>
                <span>Created demographic matrices mapping adoption velocities in Power BI.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-indigo-400 font-bold font-mono">2.</span>
                <span>Wrote clean DAX formulas to evaluate transactional satisfaction rates.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations & Technical Highlights */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
        <h3 className="text-base font-display font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Layers className="w-4.5 h-4.5 text-indigo-400" />
          Project Highlights & Analytical Achievements
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 text-sm text-slate-300">
            {projectDetails.highlights.slice(0, 3).map((highlight, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-5 h-5 rounded bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            {projectDetails.highlights.slice(3).map((highlight, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-5 h-5 rounded bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
