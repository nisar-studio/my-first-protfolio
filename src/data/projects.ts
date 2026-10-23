/**
 * Project content is derived from each repository's public README and source
 * tree (checked October 2026). Nothing here is aspirational: if a live URL is
 * listed, it responded during verification; if a feature is listed in the
 * repo's roadmap rather than its code, it is not included.
 */

export type ProjectVisual = "finora" | "research" | "comply" | "bynovix" | "supply";

export type Project = {
  id: string;
  name: string;
  subtitle: string;
  categories: string[];
  year: string;
  summary: string;
  problem: string;
  features: string[];
  implementation: string[];
  stack: string[];
  repo: string;
  repoName: string;
  live?: string;
  liveNote?: string;
  primaryLanguage: string;
  visual: ProjectVisual;
  featured?: boolean;
  limits?: string;
  highlights?: string[];
};

export const projects: Project[] = [
  {
    id: "finora-ai",
    name: "Finora AI",
    subtitle: "Personal AI financial coach",
    categories: ["Generative AI", "Full-stack"],
    year: "2026",
    featured: true,
    primaryLanguage: "TypeScript",
    summary:
      "A financial coach built on one rule: the model never does the arithmetic. Every metric is computed in code first, then explained in plain language by Gemini.",
    highlights: [
      "Deterministic financial engine — Gemini explains, never calculates",
      "Statistical risk, forecast and anomaly views with visible confidence",
      "Clerk auth, MongoDB persistence and tests around the metrics",
    ],
    problem:
      "Most “AI finance” demos either let the model invent numbers or skip the financial maths entirely. A coach that is confidently wrong about your balance is worse than no coach at all.",
    features: [
      "Dashboard with balance, income vs. expenses, category breakdown and month-over-month comparison",
      "A real transaction ledger — add, edit, delete, filter by type or category, with pagination",
      "Intelligence view: risk indicator, expense forecast with a visible confidence figure, and unusual-spending detection against your own category averages",
      "AI coach that cites the computed metrics behind each answer in a “Sources used” panel",
      "Savings goals with target amounts, optional deadlines and auto-save",
      "Honest low-data states that say “still building your history” instead of presenting thin data as insight",
    ],
    implementation: [
      "Three services: a React 19 + TypeScript web app, a Node.js/Express API, and a Python FastAPI intelligence service",
      "Deterministic metrics live in the Node API; the Python service handles risk scoring, forecasting, pattern detection and anomaly detection with pandas, NumPy and scikit-learn",
      "Gemini receives only pre-computed, verified metrics through a dedicated context builder — the prompt forbids calculation",
      "Authentication with Clerk; MongoDB Atlas persistence; unit and integration tests around metrics, goals and coach context",
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "FastAPI",
      "MongoDB Atlas",
      "Clerk",
      "Gemini API",
      "Recharts",
      "scikit-learn",
    ],
    repo: "https://github.com/nisar-studio/Finora-AI",
    repoName: "nisar-studio/Finora-AI",
    live: "https://finora-ai-eta.vercel.app",
    liveNote: "The demo is behind Clerk sign-in, and the hosted API can take up to ~30–50s to wake on a free instance.",
    visual: "finora",
  },
  {
    id: "researchai",
    name: "ResearchAI",
    subtitle: "PDF to study workspace with real RAG",
    categories: ["Generative AI", "Full-stack"],
    year: "2026",
    primaryLanguage: "JavaScript",
    summary:
      "Upload a dense PDF and get four ways to actually use it: a grounded summary, RAG chat, generated flashcards and quizzes, and a mind map of its structure.",
    problem:
      "Reading a 40-page report cover to cover to find three relevant paragraphs is slow. Pasting the whole document into a chat window is not retrieval — it is a prompt trick that breaks as documents grow.",
    features: [
      "JWT authentication with bcrypt hashing; every route is scoped to the signed-in user",
      "Drag-and-drop PDF upload with client- and server-side validation, then a structured AI analysis",
      "Chat with the document using genuine RAG: overlapping chunks, embeddings, cosine-similarity retrieval, and an instruction to answer only from retrieved context",
      "Flashcards generated once and persisted — reopening never re-triggers a model call",
      "Quizzes with plausible distractors, immediate explanations, and server-side scoring",
      "Three-level mind maps rendered with plain CSS flexbox, no charting dependency",
      "Live dashboard with real computed document and storage statistics",
    ],
    implementation: [
      "React 19 + Vite client and a Node.js/Express API on MongoDB Atlas",
      "Server-side text extraction with pdf-parse, then Gemini for analysis, flashcards, quiz and mind-map generation",
      "Embeddings stored beside each chunk; queries embedded the same way and ranked by cosine similarity before generation",
      "Structured JSON outputs are parsed defensively so a malformed model response cannot take down the UI",
    ],
    stack: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "Gemini API",
      "JWT",
      "pdf-parse",
    ],
    repo: "https://github.com/nisar-studio/ResearchAI",
    repoName: "nisar-studio/ResearchAI",
    live: "https://research-ai-lilac.vercel.app",
    liveNote: "The Render-hosted API may need ~30–50s to wake on first request.",
    visual: "research",
  },
  {
    id: "complyflow",
    name: "ComplyFlow",
    subtitle: "Autonomous AI compliance agent",
    categories: ["AI Agents", "Python"],
    year: "2026",
    primaryLanguage: "Python",
    summary:
      "An action-oriented agent that reads a requirements document, maps evidence to every requirement, isolates gaps, and re-verifies after corrections until a package is ready to submit.",
    problem:
      "Compliance submissions arrive as scattered PDFs, policies and statements. Checking each requirement against each document by hand is slow and error-prone, and a generic chat assistant stops at summarising text.",
    features: [
      "Requirement extraction into a structured model from PDF, DOCX and TXT files",
      "Evidence matching with per-requirement verdicts: satisfied, partial, missing or conflicting",
      "Gap classification by severity, including expired documents and cross-document conflicts",
      "A prioritised remediation plan, followed by a re-verification pass and a final ready-to-submit or action-required verdict",
      "Live agent workspace streamed over server-sent events as each tool runs",
      "Audit trail, role-based access and a seeded demo package for a full before/after run",
    ],
    implementation: [
      "Python 3.11 + FastAPI backend with six specialised tools orchestrated through Google ADK and Gemini",
      "Pydantic schemas enforce the structure of every tool result, so the agent reasons over typed data",
      "Document parsing with pypdf and python-docx; Firestore persists projects, matches, issues and agent events",
      "React 18 + Vite interface that consumes the SSE stream; Docker image prepared for Cloud Run",
    ],
    stack: [
      "Python 3.11",
      "FastAPI",
      "Google ADK",
      "Gemini API",
      "Pydantic",
      "Firestore",
      "React 18",
      "Vite",
      "Tailwind CSS",
      "SSE",
      "Docker",
    ],
    repo: "https://github.com/nisar-studio/Complyflow",
    repoName: "nisar-studio/Complyflow",
    visual: "comply",
    limits: "No public deployment: the agent needs a Gemini API key and a Firestore project, so it runs locally from the repository.",
  },
  {
    id: "bynovix-ai",
    name: "Bynovix AI",
    subtitle: "Enterprise intelligence suite",
    categories: ["Data & Analytics", "Full-stack"],
    year: "2026",
    primaryLanguage: "HTML",
    summary:
      "Twelve connected modules that carry a business from raw data to analytics, forecasts, AI insight, action and an auditable security response.",
    problem:
      "Analytics, forecasting, AI recommendations and governance usually live in separate tools. When they are not connected, nobody can trace a decision back to the data or the approval that produced it.",
    features: [
      "Executive overview with KPIs, alerts and forecasts, plus dedicated analytics and forecast modules",
      "AI insights and a natural-language analyst over the organisation's own data",
      "What-if simulator for scenario modelling and an actions module for execution",
      "Security pipeline: audit event, threat detection, playbook, AI confidence gate, human approval and a written audit entry",
      "Data source connection with field mapping and quality metrics",
      "Team permissions, row-level security and organisation settings",
    ],
    implementation: [
      "Static HTML + JavaScript + Tailwind front end with a hash router and twelve module pages",
      "Supabase for PostgreSQL, authentication and row-level security across a 22-table schema in versioned migrations",
      "Supabase Edge Functions in TypeScript/Deno handle data sync, insight generation and threat response",
      "Groq API for insight generation; a production smoke-test suite covers the backend end to end",
    ],
    stack: [
      "HTML",
      "JavaScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Edge Functions (Deno)",
      "Groq API",
      "Netlify",
    ],
    repo: "https://github.com/nisar-studio/Bynovix-AI",
    repoName: "nisar-studio/Bynovix-AI",
    live: "https://bynovix-ai.netlify.app",
    liveNote: "The deployed build needs a Supabase session; demo data is seeded by the repository's migrations.",
    visual: "bynovix",
  },
  {
    id: "supply-chain-agent",
    name: "Autonomous Retail Supply Chain Agent",
    subtitle: "Closed-loop recovery agent, built as a team",
    categories: ["AI Agents", "Python"],
    year: "2026",
    primaryLanguage: "Python",
    summary:
      "A multi-agent system that watches a simulated retail supply chain, detects disruptions, investigates alternatives, acts, verifies the outcome, and replans when reality changes.",
    problem:
      "A supply chain can break between the moment you plan and the moment you act — a supplier goes dark, a route closes, demand spikes. A one-shot recommendation becomes fiction as soon as conditions move.",
    features: [
      "Continuous monitor → detect → plan → decide → act → verify → adapt loop",
      "Disruption detection for inventory shortages, shipment delays, vendor issues, demand spikes and constraint violations",
      "Alternative investigation across suppliers, inventory, routes, cost and carbon",
      "Simulated purchase, transfer and reroute actions with controlled failure conditions for demonstration",
      "Independent evaluation and verification layer that checks results instead of trusting execution",
      "Streamlit dashboard presenting the real integrated recovery flow",
    ],
    implementation: [
      "Built for the Tech Zephyr 4.0 Agentic AI Hackathon at IIT Bhubaneswar as a four-person team",
      "The repository is structured by contributor layer; I owned the orchestration layer — monitor, disruption detection, recovery goal and plan, and the replanning loop in Nisar/agent",
      "Contract-based adapters connect the orchestration layer to the decision, execution and verification modules without coupling them",
      "Verification, evaluation scenarios, metrics and a robustness suite cover the full loop",
    ],
    stack: [
      "Python",
      "Agent orchestration",
      "Pydantic contracts",
      "Streamlit",
      "Pytest",
      "Simulation environment",
    ],
    repo: "https://github.com/nisar-studio/Autonomous-Retail-Supply-Chain-Agent-Team_Codex",
    repoName: "nisar-studio/Autonomous-Retail-Supply-Chain-Agent-Team_Codex",
    visual: "supply",
    limits: "A team hackathon build with no public deployment; the repository includes a local dashboard and a one-command evaluation flow.",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
