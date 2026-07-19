import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  BookOpen, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  CheckCircle, 
  Globe, 
  TrendingUp,
  Cpu,
  Bookmark,
  ExternalLink
} from 'lucide-react';
import { ashwinResumeData } from '../data';
import { WorkExperience } from '../types';

export default function ResumeTab() {
  const [selectedExp, setSelectedExp] = useState<string>("exp-1");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Column: Profile Card & Personal Details */}
      <div className="lg:col-span-1 space-y-6">
        <motion.div 
          variants={itemVariants}
          className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden"
          id="profile-summary-card"
        >
          {/* Subtle decorative radial light */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center text-center">
            {/* Custom Avatar with Ashwin's Initial */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-1 mb-4 shadow-xl shadow-indigo-950/40">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <span className="text-3xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-cyan-200">
                  A P
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-display font-bold text-slate-100 tracking-tight" id="ashwin-name">
              {ashwinResumeData.contact.name}
            </h2>
            <p className="text-sm text-indigo-400 font-medium mt-1 uppercase tracking-wider font-mono">
              {ashwinResumeData.contact.title}
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-2">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {ashwinResumeData.contact.location}
            </p>
          </div>

          <hr className="border-slate-800/80 my-5" />

          {/* Quick Contact Links */}
          <div className="space-y-3 text-sm text-slate-300">
            <a 
              href={`tel:${ashwinResumeData.contact.phone}`} 
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/40 transition-colors group"
              id="phone-link"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-mono group-hover:text-slate-100 transition-colors">{ashwinResumeData.contact.phone}</span>
            </a>

            <a 
              href={`mailto:${ashwinResumeData.contact.email}`} 
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/40 transition-colors group"
              id="email-link"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-mono break-all group-hover:text-slate-100 transition-colors">{ashwinResumeData.contact.email}</span>
            </a>

            <a 
              href={ashwinResumeData.contact.linkedin} 
              target="_blank" 
              rel="referrer" 
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/40 transition-colors group"
              id="linkedin-link"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors">
                <Linkedin className="w-4 h-4" />
              </div>
              <span className="truncate group-hover:text-slate-100 transition-colors">linkedin.com/in/ashwin-d-p</span>
              <ExternalLink className="w-3 h-3 text-slate-500 ml-auto group-hover:text-slate-300 transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* Professional Summary */}
        <motion.div 
          variants={itemVariants}
          className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6"
          id="summary-card"
        >
          <h3 className="text-base font-display font-semibold text-slate-200 flex items-center gap-2 mb-3">
            <Bookmark className="w-4 h-4 text-indigo-400" />
            Professional Objective
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed text-justify">
            {ashwinResumeData.contact.objective}
          </p>
        </motion.div>

        {/* Languages Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6"
          id="languages-card"
        >
          <h3 className="text-base font-display font-semibold text-slate-200 flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-cyan-400" />
            Languages
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {ashwinResumeData.languages.map((lang, index) => (
              <div key={index} className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl flex flex-col">
                <span className="text-sm font-semibold text-slate-200">{lang.name}</span>
                <span className="text-xs text-indigo-400 font-mono mt-0.5">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Column: Work Experience, Education, Achievements */}
      <div className="lg:col-span-2 space-y-6">
        {/* Work Experience Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6"
          id="experience-section"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
            <h3 className="text-lg font-display font-semibold text-slate-200 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              Work Experience
            </h3>
            {/* Quick selectors */}
            <div className="flex p-0.5 bg-slate-950/80 rounded-lg border border-slate-800">
              {ashwinResumeData.experience.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExp(exp.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    selectedExp === exp.id 
                      ? 'bg-indigo-600 text-slate-100 shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  id={`btn-${exp.id}`}
                >
                  {exp.company.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Content rendering */}
          {ashwinResumeData.experience.map((exp) => {
            if (exp.id !== selectedExp) return null;
            return (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
                id={`exp-content-${exp.id}`}
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="text-lg font-display font-bold text-slate-100">
                      {exp.role}
                    </h4>
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 font-mono text-xs border border-indigo-500/20 self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-cyan-400 font-medium mt-1 flex items-center gap-1.5">
                    {exp.company}
                    {exp.id === "exp-1" && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-sans">
                        Current Role
                      </span>
                    )}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 text-sm text-slate-300">
                  {exp.highlights.map((bullet, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-justify">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/80 mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech & Tools */}
                {exp.tools && exp.tools.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/60">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                      Tools & Ecosystem:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {exp.tools.map((tool, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 bg-slate-950 border border-slate-800 rounded-md font-mono text-[11px] text-slate-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Education & Learning Milestone */}
        <motion.div 
          variants={itemVariants}
          className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6"
          id="education-section"
        >
          <h3 className="text-lg font-display font-semibold text-slate-200 flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            Education History
          </h3>

          <div className="relative pl-6 border-l-2 border-slate-800/80 space-y-6">
            {ashwinResumeData.education.map((edu, idx) => (
              <div key={edu.id} className="relative group" id={`edu-item-${edu.id}`}>
                {/* Timeline node icon */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500 transition-all duration-300" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                    {edu.degree}
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">{edu.period}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{edu.institution}</p>
                <p className="text-xs text-indigo-400 font-mono mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Score: {edu.score}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            variants={itemVariants}
            className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6"
            id="achievements-section"
          >
            <h3 className="text-base font-display font-semibold text-slate-200 flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-yellow-500" />
              Achievements
            </h3>
            <div className="space-y-4">
              {ashwinResumeData.achievements.map((ach) => (
                <div key={ach.id} className="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl hover:border-slate-700/80 transition-colors">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-sm font-semibold text-slate-200 block">{ach.title}</span>
                    <span className="text-[10px] font-mono text-indigo-400 shrink-0">{ach.date}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{ach.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6"
            id="certifications-section"
          >
            <h3 className="text-base font-display font-semibold text-slate-200 flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Certifications & Internships
            </h3>
            <div className="space-y-3">
              {ashwinResumeData.certifications.map((cert) => (
                <div key={cert.id} className="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl">
                  <span className="text-sm font-semibold text-slate-200 block">{cert.name}</span>
                  <p className="text-xs text-slate-400 mt-1">{cert.institution}</p>
                  <p className="text-[10px] font-mono text-indigo-400 mt-1">{cert.period}</p>
                </div>
              ))}
              <div className="p-3 bg-slate-950/40 border border-indigo-950/80 rounded-xl relative overflow-hidden">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block mb-1">Internship Training</span>
                <span className="text-xs font-semibold text-slate-200 block">Global Casting Solutions, Coimbatore</span>
                <p className="text-[10px] text-slate-400 mt-1">Completed 15 days specialized training program in corporate manufacturing environments.</p>
                <p className="text-[10px] font-mono text-indigo-400 mt-1">Nov 2021</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
