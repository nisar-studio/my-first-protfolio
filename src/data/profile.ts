/**
 * Profile content. Every claim here traces back to the supplied profile details,
 * the GitHub profile README, or a public repository README.
 */

export const profile = {
  name: "Mohammed Nisaruddin",
  firstName: "Mohammed",
  wordmark: "MN.",
  headline: "AI & ML Student | AI-Integrated Full-Stack Developer",
  heroTitle: "Building Intelligent Experiences with AI & Code.",
  heroDescription:
    "I explore the intersection of artificial intelligence and full-stack development, turning ideas into useful applications through Python, generative AI, and modern web technologies.",
  email: "mnisaruddin56@gmail.com",
  github: "https://github.com/nisar-studio",
  githubHandle: "nisar-studio",
  linkedin: "https://www.linkedin.com/in/mohammednisaruddin-88a8ab415",
  location: "Udupi, Karnataka, India",
  availability: "Open to AI/ML internships & collaborations",
} as const;

export const about = {
  paragraphs: [
    "I'm a Computer Science Engineering (Artificial Intelligence & Machine Learning) student who learns by building. Most of what I know has come from taking an idea, shipping a working version of it, and then fixing what the first version got wrong.",
    "That usually means an AI product end-to-end: the interface, the API, the data model, and the part where a model actually has to behave. I care about the last part especially — grounding answers in real data, showing confidence instead of pretending to have it, and stating limits rather than hiding them.",
    "I'm currently going deeper into machine learning, retrieval-augmented generation, and agentic systems, while keeping one rule: a feature should only look finished when it genuinely works.",
  ],
  interests: [
    "Generative AI",
    "Machine Learning",
    "Python",
    "Exploratory data analysis",
    "Data visualisation",
    "AI-integrated full-stack apps",
  ],
  info: [
    { label: "Location", value: "Udupi, Karnataka, India" },
    {
      label: "Education",
      value: "B.E. CSE (AI & ML), AJ Institute of Engineering and Technology, Mangaluru",
    },
    { label: "Focus", value: "Generative AI, ML & full-stack AI applications" },
    { label: "Currently", value: "RAG pipelines, AI agents and applied machine learning" },
  ],
} as const;

export type SkillGroup = {
  title: string;
  caption: string;
  items: string[];
};

/** Only technologies that appear in the repositories or the GitHub profile. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    caption: "What I write day to day",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C", "SQL", "HTML & CSS"],
  },
  {
    title: "AI & Machine Learning",
    caption: "Applied modelling and evaluation",
    items: [
      "Generative AI",
      "LLM application design",
      "Retrieval-augmented generation",
      "Embeddings & cosine similarity",
      "Statistical analysis",
      "Anomaly detection",
      "scikit-learn",
      "pandas & NumPy",
    ],
  },
  {
    title: "AI Agents & Data",
    caption: "Orchestration and data substrates",
    items: [
      "Google ADK",
      "Gemini API",
      "Groq API",
      "Structured outputs (Pydantic)",
      "MongoDB",
      "PostgreSQL / Supabase",
      "Firestore",
    ],
  },
  {
    title: "Full-Stack",
    caption: "Shipping the product around the model",
    items: [
      "React",
      "Node.js & Express",
      "FastAPI",
      "Tailwind CSS",
      "Vite",
      "REST APIs",
      "JWT & Clerk auth",
      "Server-sent events",
    ],
  },
  {
    title: "Tools & Delivery",
    caption: "From local build to deployed app",
    items: ["Git & GitHub", "Docker", "Vercel", "Render", "Netlify", "Google Cloud Run"],
  },
];

export const exploring = [
  {
    title: "Agentic systems",
    body: "Closed-loop agents that plan, act, verify and replan instead of returning a single answer. Built with Google ADK and custom control loops.",
    signal: "Google ADK · tool orchestration",
  },
  {
    title: "Retrieval-augmented generation",
    body: "Chunking, embeddings and similarity search so answers come from the document rather than the model's memory.",
    signal: "Embeddings · chunking · grounding",
  },
  {
    title: "Grounded generative AI",
    body: "Designing LLM features where the model explains numbers computed elsewhere — never invents them.",
    signal: "Gemini · structured outputs",
  },
  {
    title: "Applied machine learning",
    body: "Forecasting, anomaly detection and pattern analysis on real, messy personal and business data.",
    signal: "scikit-learn · pandas",
  },
  {
    title: "AI-integrated product engineering",
    body: "The unglamorous parts that make AI usable: auth, persistence, streaming state, error paths and honest empty states.",
    signal: "React · FastAPI · Node",
  },
];

export type Credential = {
  kind: "Education" | "Certification";
  title: string;
  org: string;
  meta: string;
  detail: string;
};

export const credentials: Credential[] = [
  {
    kind: "Education",
    title: "Artificial Intelligence & Machine Learning",
    org: "AJ Institute of Engineering and Technology, Mangaluru",
    meta: "2024",
    detail:
      "Computer Science Engineering with a specialisation in Artificial Intelligence and Machine Learning. Coursework and self-directed projects across ML, data analysis and application development.",
  },
  {
    kind: "Certification",
    title: "GenAI Powered Data Analytics — Job Simulation",
    org: "Tata",
    meta: "Credential",
    detail:
      "A job simulation focused on applying generative AI to data analytics workflows. No public verification link is attached to this certificate.",
  },
];
