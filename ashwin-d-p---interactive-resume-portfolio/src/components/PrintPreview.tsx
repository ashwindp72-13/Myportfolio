import React, { useState } from 'react';
import { 
  Printer, 
  Settings, 
  Check, 
  FileText, 
  Layout, 
  Eye, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen
} from 'lucide-react';
import { ashwinResumeData } from '../data';
import { ResumeLayout } from '../types';

export default function PrintPreview() {
  const [layout, setLayout] = useState<ResumeLayout>('classic');
  const [showObjective, setShowObjective] = useState(true);
  const [showAchievements, setShowAchievements] = useState(true);
  const [showCertifications, setShowCertifications] = useState(true);
  const [showInterests, setShowInterests] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  const data = ashwinResumeData;

  return (
    <div className="space-y-6" id="print-customizer-container">
      {/* Settings Bar (Hidden on print) */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center no-print">
        <div className="space-y-1">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block">Print & Export Center</span>
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Layout className="w-4 h-4 text-indigo-400" /> Customize Layout
          </h3>
        </div>

        {/* Configurations */}
        <div className="flex flex-wrap gap-4 text-xs">
          {/* Layout Selector */}
          <div className="flex items-center gap-2 bg-slate-950/40 p-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 font-mono">Style:</span>
            {(['classic', 'modern', 'minimalist'] as ResumeLayout[]).map((style) => (
              <button
                key={style}
                onClick={() => setLayout(style)}
                className={`px-2 py-1 rounded transition-colors uppercase font-mono text-[10px] ${
                  layout === style 
                    ? 'bg-indigo-600 text-slate-100 font-semibold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id={`btn-style-${style}`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Feature toggles */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-950/40 p-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 font-mono">Sections:</span>
            <label className="flex items-center gap-1 cursor-pointer text-slate-300">
              <input 
                type="checkbox" 
                checked={showObjective} 
                onChange={() => setShowObjective(!showObjective)} 
                className="rounded text-indigo-600 bg-slate-900 border-slate-800"
              />
              <span>Objective</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer text-slate-300">
              <input 
                type="checkbox" 
                checked={showAchievements} 
                onChange={() => setShowAchievements(!showAchievements)} 
                className="rounded text-indigo-600 bg-slate-900 border-slate-800"
              />
              <span>Achievements</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer text-slate-300">
              <input 
                type="checkbox" 
                checked={showCertifications} 
                onChange={() => setShowCertifications(!showCertifications)} 
                className="rounded text-indigo-600 bg-slate-900 border-slate-800"
              />
              <span>Certifications</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer text-slate-300">
              <input 
                type="checkbox" 
                checked={showInterests} 
                onChange={() => setShowInterests(!showInterests)} 
                className="rounded text-indigo-600 bg-slate-900 border-slate-800"
              />
              <span>Interests</span>
            </label>
          </div>

          {/* Action Print */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 font-semibold text-slate-100 rounded-lg flex items-center gap-2 transition-all shadow-md shadow-emerald-950/20"
            id="btn-trigger-print"
          >
            <Printer className="w-3.5 h-3.5" /> Print / PDF Export
          </button>
        </div>
      </div>

      {/* A4 Printable Sheet Container */}
      <div className="overflow-x-auto p-1 max-w-full no-scrollbar">
        <div 
          className="w-[210mm] min-h-[297mm] bg-white text-[#2a2f35] border border-slate-200 shadow-xl p-10 rounded-md mx-auto print-page font-sans text-xs relative overflow-hidden"
          id="printable-a4-sheet"
        >
          {/* Style 1: Classic Split Layout (Left sidebar, right body) */}
          {layout === 'classic' && (
            <div className="grid grid-cols-12 gap-8 h-full">
              {/* Left sidebar (gray background/slate) */}
              <div className="col-span-4 border-r border-slate-200 pr-6 space-y-6">
                {/* Header info */}
                <div className="space-y-2">
                  <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-display text-xl font-bold text-slate-800">
                    AP
                  </div>
                  <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">{data.contact.name}</h1>
                  <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">{data.contact.title}</p>
                </div>

                {/* Contact info */}
                <div className="space-y-2 text-[10px] text-slate-600 border-t border-slate-100 pt-4">
                  <div className="flex gap-2">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{data.contact.location}</span>
                  </div>
                  <div className="flex gap-2">
                    <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{data.contact.phone}</span>
                  </div>
                  <div className="flex gap-2">
                    <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="break-all">{data.contact.email}</span>
                  </div>
                  <div className="flex gap-2">
                    <Linkedin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="break-all">linkedin.com/in/ashwin-d-p</span>
                  </div>
                </div>

                {/* Skills section */}
                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">Skills & Roadmap</h3>
                  
                  {/* Completed list */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-semibold text-indigo-600 uppercase tracking-wider block">Completed Analytics:</span>
                    {data.skills.filter(s => s.status === 'completed' && s.category === 'analytics').map(s => (
                      <div key={s.name} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-1.5 rounded">
                        <span className="font-medium text-slate-800 text-[10px]">{s.name}</span>
                        <span className="text-[8px] font-mono bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-semibold">Done</span>
                      </div>
                    ))}
                  </div>

                  {/* Doing & Upcoming */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[9px] font-semibold text-amber-600 uppercase tracking-wider block">In-Progress / Upcoming:</span>
                    {data.skills.filter(s => s.status !== 'completed').map(s => (
                      <div key={s.name} className="flex justify-between items-center bg-amber-50/50 border border-amber-100/50 p-1.5 rounded">
                        <span className="font-medium text-slate-800 text-[10px]">{s.name}</span>
                        <span className={`text-[8px] font-mono px-1 py-0.2 rounded font-semibold ${
                          s.status === 'in-progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {s.status === 'in-progress' ? 'Current' : 'Upcoming'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Core skills */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[9px] font-semibold text-slate-600 uppercase tracking-wider block">Other Qualifications:</span>
                    <div className="flex flex-wrap gap-1">
                      {data.skills.filter(s => s.category !== 'analytics' && s.status === 'completed').map(s => (
                        <span key={s.name} className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[9px] text-slate-700">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">Languages</h3>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    {data.languages.map(l => (
                      <div key={l.name} className="flex flex-col">
                        <span className="font-semibold text-slate-800">{l.name}</span>
                        <span className="text-[9px] text-slate-500">{l.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right main body content */}
              <div className="col-span-8 space-y-5">
                {/* Objective */}
                {showObjective && (
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display pb-1 border-b border-slate-200">
                      Professional Objective
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-justify">
                      {data.contact.objective}
                    </p>
                  </div>
                )}

                {/* Work Experience */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display pb-1 border-b border-slate-200 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" /> Work Experience
                  </h3>

                  <div className="space-y-4">
                    {data.experience.map(exp => (
                      <div key={exp.id} className="space-y-1.5">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-xs font-bold text-slate-900">{exp.role}</h4>
                          <span className="text-[10px] text-slate-500 font-mono font-medium">{exp.period}</span>
                        </div>
                        <p className="text-[10px] text-indigo-600 font-bold">{exp.company}</p>
                        <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 leading-relaxed text-justify">
                          {exp.highlights.map((h, i) => (
                            <li key={i} className="text-justify"><span className="font-sans text-[10px] ml-[-4px]">{h}</span></li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display pb-1 border-b border-slate-200 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" /> Education
                  </h3>

                  <div className="grid grid-cols-1 gap-2.5">
                    {data.education.map(edu => (
                      <div key={edu.id} className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{edu.degree}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">{edu.institution}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-mono text-slate-500 block">{edu.period}</span>
                          <span className="text-[9px] text-indigo-600 font-mono font-bold">Grade: {edu.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display pb-1 border-b border-slate-200">
                    Key Practical Projects
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold text-slate-850">{data.projects[0].title}</h4>
                      <span className="text-[10px] text-indigo-600 font-mono font-bold">{data.projects[0].platform}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-justify">{data.projects[0].description}</p>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1 leading-relaxed">
                      {data.projects[0].highlights.slice(0, 3).map((h, i) => (
                        <li key={i}><span className="font-sans text-[10px] ml-[-4px]">{h}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Achievements & Certifications row */}
                <div className="grid grid-cols-2 gap-6 pt-1">
                  {showAchievements && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display pb-1 border-b border-slate-200">
                        Achievements
                      </h3>
                      <div className="space-y-2 text-slate-600 leading-relaxed">
                        {data.achievements.map(ach => (
                          <div key={ach.id}>
                            <span className="font-bold text-slate-800 block text-[10px]">{ach.title}</span>
                            <span className="text-[9px] mt-0.5 block">{ach.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {showCertifications && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display pb-1 border-b border-slate-200">
                        Certifications
                      </h3>
                      <div className="space-y-2 text-slate-600">
                        {data.certifications.map(cert => (
                          <div key={cert.id} className="text-[10px]">
                            <span className="font-semibold text-slate-800 block">{cert.name}</span>
                            <span className="text-slate-500">{cert.institution} ({cert.period.split(' ')[0]})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Style 2: Modern Centered Single Column layout */}
          {layout === 'modern' && (
            <div className="space-y-6">
              {/* Centered header */}
              <div className="text-center space-y-2 pb-4 border-b-2 border-indigo-600">
                <h1 className="text-3xl font-extrabold text-slate-900 font-display uppercase tracking-tight">{data.contact.name}</h1>
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">{data.contact.title}</p>
                
                {/* Flex contacts */}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-slate-600 font-mono mt-2">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {data.contact.location}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {data.contact.phone}</span>
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {data.contact.email}</span>
                  <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/ashwin-d-p</span>
                </div>
              </div>

              {/* Single column sections */}
              {showObjective && (
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-display pb-1 border-b border-slate-150">Professional Summary</h3>
                  <p className="text-slate-600 leading-relaxed text-justify">{data.contact.objective}</p>
                </div>
              )}

              {/* Experience */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-display pb-1 border-b border-slate-150">Work Experience</h3>
                <div className="space-y-4">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900">{exp.role}</h4>
                          <span className="text-slate-400 font-medium">|</span>
                          <span className="text-[10px] text-indigo-600 font-bold">{exp.company}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{exp.period}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 leading-relaxed text-justify">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="text-justify"><span className="font-sans text-[10px] ml-[-4px]">{h}</span></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Matrices Row */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-display pb-1 border-b border-slate-150">Technical Skills & Credentials</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <span className="font-semibold text-slate-800 text-[10px] block mb-1">Completed Analytics</span>
                    <div className="flex flex-wrap gap-1">
                      {data.skills.filter(s => s.status === 'completed' && s.category === 'analytics').map(s => (
                        <span key={s.name} className="px-1.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-800 font-medium rounded text-[9px]">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 text-[10px] block mb-1">In-Progress & Upcoming</span>
                    <div className="flex flex-wrap gap-1">
                      {data.skills.filter(s => s.status !== 'completed').map(s => (
                        <span key={s.name} className="px-1.5 py-0.5 bg-amber-50 border border-amber-100 text-amber-800 font-medium rounded text-[9px]">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 text-[10px] block mb-1">Ecosystem Tools</span>
                    <div className="flex flex-wrap gap-1">
                      {data.skills.filter(s => s.category !== 'analytics' && s.status === 'completed').map(s => (
                        <span key={s.name} className="px-1.5 py-0.5 bg-slate-50 border border-slate-100 text-slate-700 rounded text-[9px]">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-display pb-1 border-b border-slate-150">Education History</h3>
                <div className="grid grid-cols-3 gap-4">
                  {data.education.map(edu => (
                    <div key={edu.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                      <span className="font-bold text-slate-800 text-[10px] block leading-snug">{edu.degree}</span>
                      <span className="text-[9px] text-slate-500 mt-1 block leading-normal">{edu.institution}</span>
                      <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-200/60 font-mono text-[9px]">
                        <span className="text-indigo-600 font-bold">{edu.score}</span>
                        <span className="text-slate-400">{edu.period.split(' ')[0]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-display pb-1 border-b border-slate-150">Core Practical Projects</h3>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-slate-900">{data.projects[0].title} ({data.projects[0].platform})</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{data.projects[0].subtitle}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-justify">{data.projects[0].description}</p>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1 leading-relaxed">
                    {data.projects[0].highlights.slice(0, 3).map((h, i) => (
                      <li key={i}><span className="font-sans text-[10px] ml-[-4px]">{h}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Style 3: Minimalist layout (Extremely stripped back, ultra clean) */}
          {layout === 'minimalist' && (
            <div className="space-y-5">
              {/* Top Row Header */}
              <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight uppercase">{data.contact.name}</h1>
                  <p className="text-xs font-medium text-slate-500">{data.contact.title}</p>
                </div>
                <div className="text-right text-[10px] text-slate-500 font-mono space-y-0.5">
                  <p>{data.contact.location}</p>
                  <p>{data.contact.phone}</p>
                  <p>{data.contact.email}</p>
                </div>
              </div>

              {/* Content items */}
              {showObjective && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block font-mono">Objective:</span>
                  <p className="text-slate-600 leading-relaxed text-justify">{data.contact.objective}</p>
                </div>
              )}

              {/* Experience */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block font-mono">Experience:</span>
                <div className="space-y-3">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span>{exp.role} — {exp.company}</span>
                        <span className="font-mono text-slate-500 font-normal">{exp.period}</span>
                      </div>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5 leading-relaxed pl-1">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="text-justify"><span className="font-sans text-[10px] ml-[-4px]">{h}</span></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block font-mono">Education:</span>
                <div className="space-y-2">
                  {data.education.map(edu => (
                    <div key={edu.id} className="flex justify-between items-baseline">
                      <div>
                        <span className="font-semibold text-slate-800">{edu.degree}</span>
                        <span className="text-slate-400">, {edu.institution}</span>
                      </div>
                      <div className="font-mono text-slate-500">
                        <span>{edu.score}</span> • <span>{edu.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Skill Status */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block font-mono">Skills Portfolio:</span>
                <p className="text-slate-600">
                  <span className="font-semibold text-slate-800">Completed Data Analytics: </span>
                  {data.skills.filter(s => s.status === 'completed' && s.category === 'analytics').map(s => s.name).join(', ')} • 
                  <span className="font-semibold text-slate-800"> Currently Learning: </span>
                  {data.skills.filter(s => s.status === 'in-progress').map(s => s.name).join(', ')} • 
                  <span className="font-semibold text-slate-800"> Upcoming Training: </span>
                  {data.skills.filter(s => s.status === 'upcoming').map(s => s.name).join(', ')}
                </p>
              </div>

              {/* Project */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block font-mono">Key Project:</span>
                <p className="text-slate-600">
                  <span className="font-semibold text-slate-800">{data.projects[0].title} ({data.projects[0].platform}): </span>
                  {data.projects[0].description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
