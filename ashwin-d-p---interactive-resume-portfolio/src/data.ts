import { ResumeData } from './types';

export const ashwinResumeData: ResumeData = {
  contact: {
    name: "Ashwin D P",
    title: "Senior Executive & Aspiring Data Analyst",
    location: "Kalapatti, Coimbatore 641048",
    phone: "+91 9600536723",
    email: "ashwindp72@gmail.com",
    linkedin: "https://www.linkedin.com/in/ashwin-d-p-52797a380",
    objective: "Motivated Analyst with hands-on experience in corporate transactions and data annotation. Highly skilled in data visualization, quantitative analysis, and database management, currently upgrading capabilities through rigorous training in data analytics. Eager to leverage professional expertise in financial processes and AI training models to deliver high-impact data analysis, business intelligence, and process optimization."
  },
  experience: [
    {
      id: "exp-1",
      role: "Senior Executive (Offmarket Transactions & Exchanges)",
      company: "CAMS (Computer Age Management Services)",
      location: "Coimbatore, India",
      period: "Aug 2025 - Present",
      highlights: [
        "Oversee and process critical offmarket share and mutual fund transaction transfers (exchanges) with absolute precision and regulatory compliance.",
        "Manage inter-depository and intra-depository securities transactions, ensuring seamless settlement processes across various funds.",
        "Perform deep verification on transaction payloads and resolve settlement discrepancies in coordination with major fund managers and clients.",
        "Utilize advanced internal database systems to track transaction histories, identify processing bottlenecks, and suggest procedural optimizations.",
        "Maintained a 99.9% processing accuracy rate, managing high transaction volumes in a fast-paced, high-risk financial environment."
      ],
      tools: ["CAMS Core Systems", "Advanced MS Excel", "Securities Settlement Portals"]
    },
    {
      id: "exp-2",
      role: "Analyst",
      company: "Objectways Technologies",
      location: "Coimbatore, India",
      period: "Sep 2023 - Aug 2025",
      highlights: [
        "Worked across various structured data types for AI training and model optimization projects, specializing in computer vision and natural language processing (NLP).",
        "Handled massive volumes of source data with strict attention to accuracy, efficiency, and structural format requirements across multiple concurrent projects.",
        "Conducted thorough, multi-tiered quality checks to ensure error-free data deliverables for enterprise clients.",
        "Managed complex text processing, data annotations, custom transcription services, and detailed process documentation tasks.",
        "Collaborated with cross-functional technical teams to meet strict milestones and deliver premium AI training datasets on schedule."
      ],
      tools: ["MS Excel", "Amazon SageMaker AWS", "Data Annotation Tools", "Internal Process Management Suites"]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "BBA (Computer Applications)",
      institution: "Kathir College of Arts and Science, Coimbatore",
      location: "Coimbatore, India",
      period: "June 2020 - May 2023",
      score: "75.45% (Aggregate)"
    },
    {
      id: "edu-2",
      degree: "HSC (Higher Secondary Certificate)",
      institution: "PSG Sarvajana Higher Secondary School, Coimbatore",
      location: "Coimbatore, India",
      period: "June 2019 - March 2020",
      score: "79.8%"
    },
    {
      id: "edu-3",
      degree: "SSLC (Secondary School Leaving Certificate)",
      institution: "Mahidhar Academy Higher Secondary School, Erode",
      location: "Erode, India",
      period: "June 2017 - March 2018",
      score: "80.8%"
    }
  ],
  skills: [
    // Completed Data Analytics at IIE
    { name: "MS Excel & Advanced Excel", level: 95, status: "completed", category: "analytics", institution: "Indra Institute of Education (IIE), Hopes" },
    { name: "Power BI", level: 90, status: "completed", category: "analytics", institution: "Indra Institute of Education (IIE), Hopes" },
    { name: "Tableau", level: 85, status: "completed", category: "analytics", institution: "Indra Institute of Education (IIE), Hopes" },
    
    // In progress at IIE
    { name: "MySQL", level: 65, status: "in-progress", category: "database", institution: "Indra Institute of Education (IIE), Hopes" },
    
    // Upcoming at IIE
    { name: "Python for Data Analytics", level: 0, status: "upcoming", category: "programming", institution: "Indra Institute of Education (IIE), Hopes" },
    
    // Other Skills
    { name: "Tally Prime", level: 90, status: "completed", category: "core" },
    { name: "Computer Applications", level: 85, status: "completed", category: "core" },
    { name: "Data Annotation & Curation", level: 95, status: "completed", category: "other" },
    { name: "Computer Vision & NLP Annotation", level: 90, status: "completed", category: "other" },
    { name: "Office Automation", level: 88, status: "completed", category: "core" }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Digital Payment Usage & Consumer Behavior Survey",
      subtitle: "Power BI Analytics Project",
      platform: "Power BI & MS Excel",
      description: "An in-depth data analytics and visualization project exploring consumer adoption, behavioral drivers, and usage frequency of digital payment modes (UPI, Cards, Net Banking, Wallets) across different age groups and demographics.",
      highlights: [
        "Designed and analyzed a comprehensive consumer behavior survey tracking payment frequency, security concerns, and platform preference.",
        "Ingested and cleaned messy survey responses using Power Query, structuring the dimensional model for optimized performance.",
        "Created dynamic DAX measures to calculate active usage rates, Net Promoter Score (NPS), and adoption trends across segmented age cohorts.",
        "Designed an interactive multi-tab Power BI dashboard showing demographic analysis, platform comparisons, and correlation matrices.",
        "Extracted actionable insights demonstrating that UPI holds an 82% adoption share in the 18-25 cohort, while security remain the main bottleneck for 50+ age cohorts."
      ],
      tags: ["Power BI", "Power Query", "DAX", "Data Modeling", "Consumer Behavior", "Survey Design"]
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Tally Prime Certification",
      institution: "Yuvasakthi Academy, Coimbatore",
      period: "March 2024 - June 2024"
    },
    {
      id: "cert-2",
      name: "Digital Marketing Certification",
      institution: "Kathir College of Arts and Science, Coimbatore",
      period: "February 2021"
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Department Association Secretary",
      description: "Elected and served as the Student Secretary for the BBA.CA department association, 'Prolifica 2K22', managing budget, planning schedules, and organizing national-level symposiums.",
      date: "2022"
    },
    {
      id: "ach-2",
      title: "AD-ZAP Competition Runner-up",
      description: "Secured 2nd place in the prestigious 'AD-ZAP' (advertisement creation and pitching) event at Firebird Institute's national-level management fest 'Biz-flare 2.0'.",
      date: "Oct 2022"
    }
  ],
  interests: [
    "Learning and implementing new enterprise office tools and automation workflows.",
    "Exploring advanced statistical models and data validation techniques.",
    "Participating in collaborative technical problem-solving forums.",
    "Keeping pace with advancements in Artificial Intelligence, NLP, and LLM training."
  ],
  languages: [
    { name: "Tamil", proficiency: "Native" },
    { name: "English", proficiency: "Proficient" }
  ]
};
