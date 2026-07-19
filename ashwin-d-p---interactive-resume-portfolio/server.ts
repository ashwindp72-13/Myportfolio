import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { ashwinResumeData } from "./src/data";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily to prevent crash on startup if key is missing,
// as specified in Dependency Management guidelines.
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Endpoint 1: Professional Portfolio AI Chat Assistant
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid messages array provided." });
      return;
    }

    const ai = getGeminiClient();

    // Map the message history into the Gemini contents structure
    const contents = messages.map((m: any) => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const systemInstruction = `
You are Ashwin D P's Professional AI Portfolio Assistant. Your goal is to represent Ashwin's profile in the absolute best light to recruiters, hiring managers, and portfolio visitors.
Answer their questions professionally, warmly, and persuasively.

Rules of engagement:
1. Always refer to Ashwin in the third person (e.g. "Ashwin possesses...", "He recently upgraded his...") unless explicitly asked to act directly as him (in which case, clarify you are his AI representative speaking on his behalf).
2. Use professional, clear, and direct English. Be concise yet detailed where necessary.
3. Base your answers strictly on Ashwin's actual resume data provided below. Never invent details that are not supported by his experience or training.
4. Highlight his key career transitions:
   - He is currently a Senior Executive at CAMS (Computer Age Management Services), handling critical offmarket transactions and exchanges since August 2025.
   - He was previously an Analyst at Objectways Technologies (Sep 2023 - Aug 2025) working on high-quality AI training projects in Computer Vision and NLP.
   - He is undergoing rigorous Data Analytics training at Indra Institute of Education (IIE), Hopes. Highlight that he has completed Excel, Advanced Excel, Power BI, and Tableau. He is currently learning MySQL and will soon start Python.
   - Highlight his active practical project: a Power BI dashboard analyzing Digital Payment Usage and Consumer Behavior based on surveys.
5. If someone asks about a technology or skill he does not have, explain that while he doesn't have deep commercial experience in it yet, he is a rapid learner (pointing to his educational background in Computer Applications BBA and current Indra Institute analytics boot camp) and is highly motivated to bridge gaps.

Here is Ashwin's official, updated resume data:
--------------------------------------------------
CONTACT DETAILS:
Name: Ashwin D P
Title: Senior Executive & Aspiring Data Analyst
Location: Kalapatti, Coimbatore 641048
Phone: +91 9600536723
Email: ashwindp72@gmail.com
LinkedIn: https://www.linkedin.com/in/ashwin-d-p-52797a380

PROFESSIONAL OBJECTIVE:
Motivated Analyst with hands-on experience in corporate transactions and data annotation. Highly skilled in data visualization, quantitative analysis, and database management, currently upgrading capabilities through rigorous training in data analytics. Eager to leverage professional expertise in financial processes and AI training models to deliver high-impact data analysis, business intelligence, and process optimization.

WORK EXPERIENCE:
1. Senior Executive (Offmarket Transactions & Exchanges) | CAMS (Computer Age Management Services)
   Period: Aug 2025 - Present
   Highlights:
   - Process critical offmarket share and mutual fund transaction transfers (exchanges) with absolute precision and regulatory compliance.
   - Manage inter-depository and intra-depository securities transactions.
   - Perform deep verification on transaction payloads and resolve settlement discrepancies.
   - Utilize advanced internal database systems to track transaction histories and suggest procedural optimizations.
   - Maintained a 99.9% processing accuracy rate.

2. Analyst | Objectways Technologies
   Period: Sep 2023 - Aug 2025
   Highlights:
   - Worked across various structured data types for AI training and model optimization projects, specializing in computer vision and natural language processing (NLP).
   - Handled massive volumes of source data with strict attention to accuracy and efficiency.
   - Conducted multi-tiered quality checks to ensure error-free data deliverables.
   - Managed complex text processing, data annotations, and custom transcription.
   - Tools: MS Excel, Amazon SageMaker AWS, annotation suites.

EDUCATION:
- BBA (Computer Applications) | Kathir College of Arts and Science, Coimbatore | June 2020 - May 2023 | Score: 75.45%
- HSC | PSG Sarvajana Higher Secondary School, Coimbatore | June 2019 - March 2020 | Score: 79.8%
- SSLC | Mahidhar Academy Higher Secondary School, Erode | June 2017 - March 2018 | Score: 80.8%

DATA ANALYTICS TRAINING & ROADMAP (Indra Institute of Education - IIE, Hopes):
- Completed Modules: Excel, Advanced Excel, Power BI, Tableau (All completed successfully, high proficiency)
- Current Module: MySQL (Database management, querying, schemas, data definitions)
- Upcoming Module: Python (Pandas, Numpy, Matplotlib, exploratory data analysis)

PROJECTS:
- Title: Digital Payment Usage & Consumer Behavior Survey (Power BI)
  Platform: Power BI & MS Excel
  Description: In-depth survey-based dashboard analyzing consumer adoption and preferences (UPI, Cards, Net Banking) across multiple demographic cohorts. Developed custom DAX measures, performed data cleaning in Power Query, and built interactive visualizations mapping out adoption drivers and security bottlenecks.

CERTIFICATIONS:
- Tally Prime | Yuvasakthi Academy, Coimbatore | March 2024 - June 2024
- Digital Marketing | Kathir College of Arts and Science, Coimbatore | Feb 2021

ACHIEVEMENTS:
- BBA.CA Department Association Secretary (Prolifica 2K22) - Managed budget, coordinated national level symposiums.
- AD-ZAP Competition Runner-up - Firebird Institute national-level management fest Biz-flare 2.0 (Oct 2022).

LANGUAGES:
- Tamil (Native)
- English (Proficient)
--------------------------------------------------
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "An error occurred while communicating with Gemini." });
  }
});

// Endpoint 2: Resume Tailoring & Cover Letter Generator
app.post("/api/tailor", async (req, res) => {
  try {
    const { jobDescription, jobTitle = "Data Analyst / Operations Analyst" } = req.body;
    if (!jobDescription || typeof jobDescription !== "string") {
      res.status(400).json({ error: "Job description is required." });
      return;
    }

    const ai = getGeminiClient();

    const prompt = `
Analyze Ashwin's professional profile and resume against the following Job Description (JD).
Your task is to produce a structured, thorough, and supportive evaluation in JSON format.

JOB TITLE: ${jobTitle}
JOB DESCRIPTION:
${jobDescription}

ASHWIN'S CANDIDATE PROFILE:
- Objective: ${ashwinResumeData.contact.objective}
- Work Experience: ${JSON.stringify(ashwinResumeData.experience)}
- Education: ${JSON.stringify(ashwinResumeData.education)}
- Current Skills & Learning Roadmap (IIE): ${JSON.stringify(ashwinResumeData.skills)}
- Key Projects: ${JSON.stringify(ashwinResumeData.projects)}
- Certifications: ${JSON.stringify(ashwinResumeData.certifications)}
- Achievements: ${JSON.stringify(ashwinResumeData.achievements)}

Requirements:
- Calculate a realistic matchPercentage (0-100) based on requirements.
- Highlight specific overlaps: CAMS processing rigor, data precision from Objectways, and solid data analytics toolkits (Excel, Power BI, Tableau).
- Address gaps constructively: e.g., if SQL is required, mention he is currently undergoing hands-on MySQL instruction at Indra Institute. If Python is required, mention he is scheduled to begin Python training next.
- Craft a compelling, highly professional cover letter addressed to the hiring manager. Frame his financial operations background (CAMS) as a major asset for visual data analysis because of his high attention to data cleanliness and transactional accuracy.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchPercentage: {
              type: Type.INTEGER,
              description: "Match rating from 0 to 100 based on keywords and skills requirements."
            },
            overallAssessment: {
              type: Type.STRING,
              description: "A 3-4 sentence evaluation of how Ashwin's unique mix of operational execution and visual analytics fits the position."
            },
            keyAlignments: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-4 strong areas of synergy, highlighting specific skills or experience points."
            },
            skillGaps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 skills or tools mentioned in the JD that Ashwin is currently learning or preparing to learn."
            },
            resumeTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 concrete tips on what parts of his resume Ashwin should emphasize or detail further for this role."
            },
            coverLetter: {
              type: Type.STRING,
              description: "A beautiful, 3-paragraph tailored cover letter written in the first-person from Ashwin D P. Highlight CAMS, Objectways, and IIE analytics learning."
            }
          },
          required: ["matchPercentage", "overallAssessment", "keyAlignments", "skillGaps", "resumeTips", "coverLetter"]
        },
        temperature: 0.3,
      }
    });

    const report = JSON.parse(response.text || "{}");
    res.json(report);
  } catch (error: any) {
    console.error("Error in /api/tailor:", error);
    res.status(500).json({ error: error.message || "An error occurred during resume tailoring." });
  }
});

// Setup Vite Dev Server / Static Assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets from dist/");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
