import type { JSX, ReactNode } from "react";
import type { ProjectVisual } from "../data/projects";

const FONT = "Inter, system-ui, sans-serif";
const INK = "rgba(255,255,255,0.86)";
const DIM = "rgba(255,255,255,0.42)";
const FAINT = "rgba(255,255,255,0.22)";
const LINE = "rgba(255,255,255,0.09)";
const PANEL = "rgba(255,255,255,0.035)";
const VIOLET = "#957cff";
const CYAN = "#56e0d3";
const AMBER = "#f2b66d";
const GREEN = "#6ee7a8";
const ROSE = "#ff8a9b";

function Chrome({ title, badge }: { title: string; badge?: string }) {
  return (
    <g>
      <circle cx="34" cy="28" r="4" fill="rgba(255,255,255,0.16)" />
      <circle cx="50" cy="28" r="4" fill="rgba(255,255,255,0.11)" />
      <circle cx="66" cy="28" r="4" fill="rgba(255,255,255,0.07)" />
      <text x="92" y="31.5" fill={DIM} fontFamily={FONT} fontSize="9.5" letterSpacing="0.4">
        {title}
      </text>
      {badge ? (
        <g>
          <rect x="534" y="20" width="78" height="18" rx="9" fill="rgba(149,124,255,0.14)" stroke="rgba(149,124,255,0.3)" />
          <circle cx="546" cy="29" r="2.4" fill={VIOLET} />
          <text x="553" y="32.4" fill="rgba(200,188,255,0.95)" fontFamily={FONT} fontSize="8.2" fontWeight="500">
            {badge}
          </text>
        </g>
      ) : null}
      <line x1="0" y1="48" x2="640" y2="48" stroke={LINE} />
    </g>
  );
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label={label}
      className="block h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="640" height="400" fill="#0a0a12" />
      {children}
    </svg>
  );
}

function GridDefs({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.028)" strokeWidth="1" />
      </pattern>
    </defs>
  );
}

function FinoraArt() {
  return (
    <Frame label="Finora AI interface concept: balance chart beside an AI coach that cites its sources.">
      <GridDefs id="finora" />
      <rect width="640" height="400" fill="url(#finora-grid)" />
      <defs>
        <linearGradient id="finora-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={VIOLET} stopOpacity="0.45" />
          <stop offset="100%" stopColor={VIOLET} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="finora-glow" cx="20%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#957cff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#957cff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="400" fill="url(#finora-glow)" />
      <Chrome title="finora — your financial coach" badge="grounded" />

      <g>
        <rect x="28" y="70" width="300" height="296" rx="12" fill={PANEL} stroke={LINE} />
        <text x="46" y="96" fill={DIM} fontFamily={FONT} fontSize="8" letterSpacing="1.4">
          TOTAL BALANCE
        </text>
        <text x="46" y="130" fill={INK} fontFamily={FONT} fontSize="27" fontWeight="600" letterSpacing="-0.6">
          ₹42,850
        </text>
        <rect x="166" y="112" width="58" height="18" rx="9" fill="rgba(110,231,168,0.12)" />
        <text x="177" y="124.5" fill={GREEN} fontFamily={FONT} fontSize="8">
          +12.4% MoM
        </text>

        <g transform="translate(46,154)">
          <path
            d="M0 92 L38 78 L76 84 L114 58 L152 64 L190 36 L232 44 L262 20"
            fill="none"
            stroke={VIOLET}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0 92 L38 78 L76 84 L114 58 L152 64 L190 36 L232 44 L262 20 L262 104 L0 104 Z"
            fill="url(#finora-area)"
          />
          <circle cx="262" cy="20" r="3.5" fill="#fff" />
          <circle cx="262" cy="20" r="7" fill="none" stroke={VIOLET} strokeOpacity="0.4" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="0" y1={i * 34 + 4} x2="262" y2={i * 34 + 4} stroke="rgba(255,255,255,0.055)" />
          ))}
          {["Apr", "May", "Jun", "Jul", "Aug"].map((label, i) => (
            <text key={label} x={i * 64} y="120" fill={FAINT} fontFamily={FONT} fontSize="7">
              {label}
            </text>
          ))}
        </g>

        <line x1="46" y1="300" x2="310" y2="300" stroke={LINE} />
        <text x="46" y="320" fill={DIM} fontFamily={FONT} fontSize="7.5" letterSpacing="1.1">
          INCOME VS EXPENSES
        </text>
        {[38, 26, 44, 31, 50, 35, 28].map((h, i) => (
          <g key={i}>
            <rect x={46 + i * 36} y={340 - h} width="9" height={h} rx="2" fill="rgba(149,124,255,0.6)" />
            <rect x={57 + i * 36} y={340 - h * 0.62} width="9" height={h * 0.62} rx="2" fill="rgba(86,224,211,0.35)" />
          </g>
        ))}
      </g>

      <g>
        <rect x="344" y="70" width="268" height="152" rx="12" fill={PANEL} stroke={LINE} />
        <circle cx="368" cy="94" r="9" fill="rgba(149,124,255,0.18)" />
        <path d="M368 89 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6 Z" fill={VIOLET} />
        <text x="384" y="97" fill={INK} fontFamily={FONT} fontSize="9" fontWeight="500">
          AI Coach
        </text>
        <rect x="384" y="86" width="62" height="11" rx="5.5" fill="rgba(255,255,255,0.05)" />
        <text x="392" y="94" fill={FAINT} fontFamily={FONT} fontSize="6.4">
          reads verified data only
        </text>

        <rect x="360" y="112" width="200" height="36" rx="8" fill="rgba(255,255,255,0.045)" />
        <rect x="370" y="122" width="168" height="4" rx="2" fill="rgba(255,255,255,0.28)" />
        <rect x="370" y="132" width="122" height="4" rx="2" fill="rgba(255,255,255,0.16)" />

        <text x="360" y="170" fill={DIM} fontFamily={FONT} fontSize="7" letterSpacing="1.1">
          SOURCES USED
        </text>
        {["This month", "Top categories", "6-month trend"].map((source, i) => {
          const widths = [66, 80, 78];
          const x = 360 + widths.slice(0, i).reduce((a, b) => a + b + 6, 0);
          return (
            <g key={source}>
              <rect x={x} y="178" width={widths[i]} height="17" rx="8.5" fill="rgba(86,224,211,0.08)" stroke="rgba(86,224,211,0.2)" />
              <text x={x + 8} y="189.4" fill="rgba(160,240,230,0.86)" fontFamily={FONT} fontSize="6.8">
                {source}
              </text>
            </g>
          );
        })}
        <text x="360" y="211" fill={FAINT} fontFamily={FONT} fontSize="6.6">
          every number computed before generation
        </text>
      </g>

      <g>
        <rect x="344" y="234" width="268" height="132" rx="12" fill={PANEL} stroke={LINE} />
        <text x="360" y="256" fill={DIM} fontFamily={FONT} fontSize="7" letterSpacing="1.2">
          INTELLIGENCE
        </text>
        <g>
          <circle cx="379" cy="284" r="15" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="3" />
          <circle
            cx="379"
            cy="284"
            r="15"
            fill="none"
            stroke={AMBER}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="66 94"
            transform="rotate(-90 379 284)"
          />
          <text x="379" y="287.5" textAnchor="middle" fill={INK} fontFamily={FONT} fontSize="8" fontWeight="600">
            68
          </text>
        </g>
        <text x="402" y="279" fill={INK} fontFamily={FONT} fontSize="8.4">
          Spending risk
        </text>
        <text x="402" y="291" fill={DIM} fontFamily={FONT} fontSize="7">
          moderate · not a credit score
        </text>

        <line x1="360" y1="310" x2="596" y2="310" stroke={LINE} />
        <text x="360" y="327" fill={DIM} fontFamily={FONT} fontSize="7">
          NEXT-MONTH FORECAST
        </text>
        <text x="360" y="345" fill={INK} fontFamily={FONT} fontSize="12" fontWeight="600">
          ₹38,200
        </text>
        <g>
          <rect x="470" y="332" width="118" height="5" rx="2.5" fill="rgba(255,255,255,0.08)" />
          <rect x="470" y="332" width="78" height="5" rx="2.5" fill={VIOLET} />
          <text x="470" y="349" fill={FAINT} fontFamily={FONT} fontSize="6.4">
            model confidence 66%
          </text>
        </g>
      </g>
    </Frame>
  );
}

function ResearchArt() {
  return (
    <Frame label="ResearchAI concept: document chunks retrieved into a grounded chat answer with flashcards.">
      <GridDefs id="research" />
      <rect width="640" height="400" fill="url(#research-grid)" />
      <defs>
        <radialGradient id="research-glow" cx="70%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#56e0d3" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#56e0d3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="400" fill="url(#research-glow)" />
      <Chrome title="researchai — document workspace" badge="rag" />

      <g>
        <rect x="28" y="70" width="196" height="296" rx="12" fill={PANEL} stroke={LINE} />
        <rect x="44" y="88" width="26" height="15" rx="3" fill="rgba(255,138,155,0.14)" stroke="rgba(255,138,155,0.3)" />
        <text x="49" y="98.5" fill={ROSE} fontFamily={FONT} fontSize="6.8" fontWeight="600">
          PDF
        </text>
        <text x="80" y="99" fill={INK} fontFamily={FONT} fontSize="8.4">
          annual-report.pdf
        </text>

        <rect x="44" y="118" width="150" height="7" rx="3.5" fill="rgba(255,255,255,0.35)" />
        <rect x="44" y="132" width="118" height="7" rx="3.5" fill="rgba(255,255,255,0.2)" />

        <rect x="44" y="154" width="164" height="52" rx="6" fill="rgba(149,124,255,0.1)" stroke="rgba(149,124,255,0.28)" />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="52"
            y={164 + i * 10}
            width={i === 3 ? 92 : 148}
            height="4"
            rx="2"
            fill={`rgba(255,255,255,${0.26 - i * 0.03})`}
          />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={`a-${i}`}
            x="44"
            y={220 + i * 11}
            width={i % 3 === 0 ? 138 : 164}
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.14)"
          />
        ))}
        <rect x="44" y="290" width="164" height="34" rx="6" fill="rgba(86,224,211,0.08)" stroke="rgba(86,224,211,0.22)" />
        {[0, 1].map((i) => (
          <rect key={`b-${i}`} x="52" y={300 + i * 10} width={i === 0 ? 146 : 108} height="4" rx="2" fill="rgba(160,240,230,0.4)" />
        ))}
        <text x="44" y="346" fill={FAINT} fontFamily={FONT} fontSize="6.6">
          14 chunks · embedded
        </text>
      </g>

      <g opacity="0.85">
        {[
          { x: 224, y: 142, label: "chunk 03" },
          { x: 224, y: 182, label: "chunk 07" },
          { x: 224, y: 222, label: "chunk 11" },
          { x: 224, y: 262, label: "chunk 12" },
        ].map((chunk, i) => (
          <g key={chunk.label}>
            <rect x={chunk.x} y={chunk.y} width="86" height="26" rx="7" fill="rgba(255,255,255,0.045)" stroke={LINE} />
            <rect x={chunk.x + 8} y={chunk.y + 8} width="42" height="3.5" rx="1.75" fill="rgba(255,255,255,0.26)" />
            <rect x={chunk.x + 8} y={chunk.y + 16} width="62" height="3.5" rx="1.75" fill="rgba(255,255,255,0.14)" />
            <text x={chunk.x + 56} y={chunk.y + 18} textAnchor="middle" fill={i === 1 ? CYAN : FAINT} fontFamily={FONT} fontSize="6">
              {i === 1 ? "0.91" : "0.7"}
            </text>
            <path
              d={`M ${chunk.x + 86} ${chunk.y + 13} C ${chunk.x + 110} ${chunk.y + 13}, 330 206, 348 206`}
              fill="none"
              stroke={i === 1 ? "rgba(86,224,211,0.35)" : "rgba(255,255,255,0.09)"}
              strokeWidth="1"
              strokeDasharray={i === 1 ? "0" : "2 3"}
            />
          </g>
        ))}
        <circle cx="352" cy="206" r="2.5" fill={CYAN} />
      </g>

      <g>
        <rect x="360" y="70" width="252" height="296" rx="12" fill={PANEL} stroke={LINE} />
        <text x="378" y="94" fill={DIM} fontFamily={FONT} fontSize="7" letterSpacing="1.2">
          CHAT WITH DOCUMENT
        </text>
        <rect x="444" y="106" width="150" height="34" rx="10" fill="rgba(149,124,255,0.14)" stroke="rgba(149,124,255,0.24)" />
        <rect x="456" y="118" width="118" height="4" rx="2" fill="rgba(255,255,255,0.34)" />
        <rect x="456" y="128" width="86" height="4" rx="2" fill="rgba(255,255,255,0.22)" />

        <rect x="378" y="152" width="196" height="104" rx="10" fill="rgba(255,255,255,0.045)" stroke={LINE} />
        <rect x="390" y="166" width="168" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
        <rect x="390" y="178" width="146" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="390" y="192" width="120" height="16" rx="4" fill="rgba(86,224,211,0.12)" stroke="rgba(86,224,211,0.25)" />
        <text x="397" y="203" fill="rgba(160,240,230,0.9)" fontFamily={FONT} fontSize="6.4">
          p.12 · revenue ↑ 18%
        </text>
        <rect x="390" y="216" width="156" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="390" y="228" width="132" height="4" rx="2" fill="rgba(255,255,255,0.14)" />

        <rect x="378" y="268" width="212" height="44" rx="10" fill="rgba(255,255,255,0.045)" stroke={LINE} />
        <rect x="390" y="280" width="60" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
        <text x="390" y="301" fill={FAINT} fontFamily={FONT} fontSize="6.6">
          0.91 similarity · 3 chunks retrieved
        </text>

        <g>
          <rect x="378" y="326" width="120" height="30" rx="8" fill="rgba(149,124,255,0.1)" stroke="rgba(149,124,255,0.22)" />
          <text x="390" y="340" fill={DIM} fontFamily={FONT} fontSize="6.4">
            FLASHCARDS
          </text>
          <text x="390" y="350" fill={INK} fontFamily={FONT} fontSize="9" fontWeight="600">
            12 generated
          </text>
          <rect x="470" y="326" width="120" height="30" rx="8" fill="rgba(242,182,109,0.08)" stroke="rgba(242,182,109,0.2)" />
          <text x="482" y="340" fill={DIM} fontFamily={FONT} fontSize="6.4">
            QUIZ
          </text>
          <text x="482" y="350" fill={INK} fontFamily={FONT} fontSize="9" fontWeight="600">
            10 questions
          </text>
        </g>
      </g>
    </Frame>
  );
}

function ComplyArt() {
  const rows = [
    { label: "Business registration", state: "ok" },
    { label: "Tax clearance certificate", state: "ok" },
    { label: "Data protection policy", state: "missing" },
    { label: "ISO 27001 attestation", state: "conflict" },
    { label: "Insurance coverage", state: "ok" },
  ];
  return (
    <Frame label="ComplyFlow concept: requirement checklist with a 75 percent readiness score and remediation tasks.">
      <GridDefs id="comply" />
      <rect width="640" height="400" fill="url(#comply-grid)" />
      <defs>
        <radialGradient id="comply-glow" cx="30%" cy="80%" r="70%">
          <stop offset="0%" stopColor="#957cff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#957cff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="400" fill="url(#comply-glow)" />
      <Chrome title="complyflow — nova tech certification" badge="agent running" />

      <g>
        <rect x="28" y="70" width="356" height="296" rx="12" fill={PANEL} stroke={LINE} />
        <text x="46" y="94" fill={DIM} fontFamily={FONT} fontSize="7" letterSpacing="1.2">
          REQUIREMENT → EVIDENCE
        </text>
        {rows.map((row, i) => {
          const y = 108 + i * 46;
          const isOk = row.state === "ok";
          const isConflict = row.state === "conflict";
          const color = isOk ? GREEN : isConflict ? AMBER : ROSE;
          return (
            <g key={row.label}>
              <rect x="46" y={y} width="320" height="36" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
              <circle cx="64" cy={y + 18} r="7.5" fill="rgba(255,255,255,0.04)" stroke={color} strokeOpacity="0.5" />
              {isOk ? (
                <path d={`M60.5 ${y + 18} l2.6 2.6 l4.4 -5`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
              ) : isConflict ? (
                <text x="64" y={y + 21.5} textAnchor="middle" fill={color} fontFamily={FONT} fontSize="9" fontWeight="600">
                  !
                </text>
              ) : (
                <path d={`M61 ${y + 18} h6`} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
              )}
              <text x="80" y={y + 15} fill={INK} fontFamily={FONT} fontSize="8">
                {row.label}
              </text>
              <rect x="80" y={y + 21} width={isOk ? 132 : 104} height="3.5" rx="1.75" fill="rgba(255,255,255,0.12)" />
              <rect x="288" y={y + 11} width="66" height="15" rx="7.5" fill={`${color}1f`} stroke={`${color}44`} />
              <text x="321" y={y + 21.5} textAnchor="middle" fill={color} fontFamily={FONT} fontSize="6.2" letterSpacing="0.4">
                {isOk ? "SATISFIED" : isConflict ? "CONFLICT" : "MISSING"}
              </text>
            </g>
          );
        })}
        <text x="46" y="352" fill={FAINT} fontFamily={FONT} fontSize="6.8">
          12 requirements · 9 satisfied · 2 missing · 1 conflict
        </text>
      </g>

      <g>
        <rect x="400" y="70" width="212" height="176" rx="12" fill={PANEL} stroke={LINE} />
        <g transform="translate(506,138)">
          <circle r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
          <circle
            r="38"
            fill="none"
            stroke={AMBER}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="179 239"
            transform="rotate(-90)"
          />
          <text y="2" textAnchor="middle" fill={INK} fontFamily={FONT} fontSize="20" fontWeight="600" letterSpacing="-0.6">
            75%
          </text>
          <text y="16" textAnchor="middle" fill={AMBER} fontFamily={FONT} fontSize="6.4" letterSpacing="0.8">
            ACTION REQUIRED
          </text>
        </g>
        <text x="418" y="92" fill={DIM} fontFamily={FONT} fontSize="7" letterSpacing="1.2">
          READINESS
        </text>
        <text x="418" y="198" textAnchor="middle" fill={FAINT} fontFamily={FONT} fontSize="6.6">
          re-verify after remediation
        </text>
        <text x="530" y="198" textAnchor="middle" fill={FAINT} fontFamily={FONT} fontSize="6.6">
          audit trail
        </text>
        <line x1="418" y1="210" x2="594" y2="210" stroke={LINE} />
        <text x="418" y="228" fill={DIM} fontFamily={FONT} fontSize="6.8">
          6 tools · 1 agent loop
        </text>
      </g>

      <g>
        <rect x="400" y="256" width="212" height="110" rx="12" fill={PANEL} stroke={LINE} />
        <text x="418" y="278" fill={DIM} fontFamily={FONT} fontSize="7" letterSpacing="1.2">
          REMEDIATION PLAN
        </text>
        {["Upload data protection policy", "Resolve date conflict on ISO attestation", "Re-run verification"].map(
          (task, i) => (
            <g key={task}>
              <rect x="418" y={290 + i * 22} width="10" height="10" rx="2.5" fill="none" stroke={i === 2 ? VIOLET : "rgba(255,255,255,0.18)"} />
              {i === 2 ? <path d={`M420.4 ${295 + i * 22} l2 2 l4 -4.4`} fill="none" stroke={VIOLET} strokeWidth="1.3" /> : null}
              <text x="436" y={299 + i * 22} fill={i === 2 ? "rgba(200,188,255,0.9)" : DIM} fontFamily={FONT} fontSize="7">
                {task}
              </text>
            </g>
          ),
        )}
      </g>
    </Frame>
  );
}

function BynovixArt() {
  const modules = ["Overview", "Analytics", "Insights", "Forecasts", "Security"];
  return (
    <Frame label="Bynovix AI concept: enterprise dashboard with KPI tiles, an analytics chart and a governed security feed.">
      <GridDefs id="bynovix" />
      <rect width="640" height="400" fill="url(#bynovix-grid)" />
      <defs>
        <linearGradient id="bynovix-bars" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CYAN} stopOpacity="0.75" />
          <stop offset="100%" stopColor={CYAN} stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="bynovix-glow" cx="80%" cy="15%" r="70%">
          <stop offset="0%" stopColor="#56e0d3" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#56e0d3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="400" fill="url(#bynovix-glow)" />
      <Chrome title="bynovix — enterprise intelligence" badge="governed" />

      <g>
        <rect x="28" y="70" width="118" height="296" rx="12" fill={PANEL} stroke={LINE} />
        <rect x="42" y="86" width="42" height="8" rx="4" fill="rgba(255,255,255,0.32)" />
        {modules.map((module, i) => (
          <g key={module}>
            {i === 1 ? (
              <rect x="38" y={108 + i * 30} width="98" height="24" rx="6" fill="rgba(86,224,211,0.1)" stroke="rgba(86,224,211,0.18)" />
            ) : null}
            <rect x="46" y={116 + i * 30} width="8" height="8" rx="2" fill={i === 1 ? CYAN : "rgba(255,255,255,0.16)"} />
            <text x="62" y={124 + i * 30} fill={i === 1 ? "rgba(200,255,250,0.92)" : DIM} fontFamily={FONT} fontSize="7.4">
              {module}
            </text>
          </g>
        ))}
        <line x1="38" y1="290" x2="136" y2="290" stroke={LINE} />
        <text x="46" y="308" fill={FAINT} fontFamily={FONT} fontSize="6.2">
          12 modules
        </text>
        <text x="46" y="322" fill={FAINT} fontFamily={FONT} fontSize="6.2">
          RLS enforced
        </text>
        <rect x="38" y="334" width="98" height="20" rx="6" fill="rgba(255,255,255,0.035)" />
        <text x="46" y="347" fill={DIM} fontFamily={FONT} fontSize="6.2">
          Audit log · live
        </text>
      </g>

      <g>
        {[
          { label: "Revenue", value: "₹1.24Cr", delta: "+8.2%" },
          { label: "Forecast", value: "₹1.31Cr", delta: "94% conf." },
          { label: "Open risks", value: "03", delta: "1 critical" },
        ].map((kpi, i) => (
          <g key={kpi.label}>
            <rect x={160 + i * 146} y="70" width="132" height="64" rx="10" fill={PANEL} stroke={LINE} />
            <text x={174 + i * 146} y="90" fill={FAINT} fontFamily={FONT} fontSize="6.4" letterSpacing="0.9">
              {kpi.label.toUpperCase()}
            </text>
            <text x={174 + i * 146} y="110" fill={INK} fontFamily={FONT} fontSize="15" fontWeight="600" letterSpacing="-0.3">
              {kpi.value}
            </text>
            <text x={174 + i * 146} y="124" fill={i === 2 ? AMBER : GREEN} fontFamily={FONT} fontSize="6.4">
              {kpi.delta}
            </text>
          </g>
        ))}

        <rect x="160" y="146" width="278" height="220" rx="10" fill={PANEL} stroke={LINE} />
        <text x="176" y="168" fill={DIM} fontFamily={FONT} fontSize="7" letterSpacing="1.1">
          SEGMENT PERFORMANCE
        </text>
        <text x="400" y="168" textAnchor="end" fill={FAINT} fontFamily={FONT} fontSize="6.2">
          last 6 quarters
        </text>
        {[22, 38, 30, 52, 44, 66, 58, 74, 62, 86].map((h, i) => (
          <rect
            key={i}
            x={176 + i * 24}
            y={330 - h}
            width="13"
            height={h}
            rx="3"
            fill={i > 6 ? "rgba(86,224,211,0.6)" : "rgba(255,255,255,0.1)"}
          />
        ))}
        <path
          d="M182 292 L206 278 L230 286 L254 262 L278 270 L302 248 L326 256 L350 232 L374 240 L398 216"
          fill="none"
          stroke={VIOLET}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="398" cy="216" r="3" fill={VIOLET} />
        <line x1="176" y1="330" x2="398" y2="330" stroke="rgba(255,255,255,0.1)" />
        {["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"].map((label, i) => (
          <text key={label} x={176 + i * 44} y="346" fill={FAINT} fontFamily={FONT} fontSize="6.2">
            {label}
          </text>
        ))}
      </g>

      <g>
        <rect x="452" y="146" width="160" height="132" rx="10" fill={PANEL} stroke={LINE} />
        <text x="466" y="166" fill={DIM} fontFamily={FONT} fontSize="6.8" letterSpacing="1.1">
          AI INSIGHT
        </text>
        <path d="M468 182 l2 4.2 4.2 2 -4.2 2 -2 4.2 -2 -4.2 -4.2 -2 4.2 -2 Z" fill={VIOLET} />
        <rect x="466" y="200" width="128" height="4" rx="2" fill="rgba(255,255,255,0.28)" />
        <rect x="466" y="210" width="112" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
        <rect x="466" y="220" width="122" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
        <rect x="466" y="236" width="76" height="15" rx="7.5" fill="rgba(149,124,255,0.12)" stroke="rgba(149,124,255,0.24)" />
        <text x="476" y="246.5" fill="rgba(200,188,255,0.9)" fontFamily={FONT} fontSize="6">
          confidence gate
        </text>
        <text x="466" y="266" fill={FAINT} fontFamily={FONT} fontSize="6">
          requires human approval
        </text>

        <rect x="452" y="290" width="160" height="76" rx="10" fill={PANEL} stroke={LINE} />
        <text x="466" y="308" fill={DIM} fontFamily={FONT} fontSize="6.8" letterSpacing="1.1">
          SECURITY FEED
        </text>
        {["Anomaly access · blocked", "Policy drift · flagged", "Approval · logged"].map((item, i) => (
          <g key={item}>
            <circle cx="470" cy={321 + i * 15} r="2" fill={i === 0 ? ROSE : i === 1 ? AMBER : GREEN} />
            <text x="478" y={324 + i * 15} fill={DIM} fontFamily={FONT} fontSize="6.2">
              {item}
            </text>
          </g>
        ))}
      </g>
    </Frame>
  );
}

function SupplyArt() {
  const stages = ["Monitor", "Detect", "Plan", "Act", "Verify"];
  return (
    <Frame label="Supply chain agent concept: a rerouted delivery network beside a recovery loop with verification.">
      <GridDefs id="supply" />
      <rect width="640" height="400" fill="url(#supply-grid)" />
      <defs>
        <radialGradient id="supply-glow" cx="25%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#f2b66d" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#f2b66d" stopOpacity="0" />
        </radialGradient>
        <marker id="supply-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={CYAN} />
        </marker>
      </defs>
      <rect width="640" height="400" fill="url(#supply-glow)" />
      <Chrome title="recovery agent — retail network" badge="replanned" />

      <g>
        <rect x="28" y="70" width="360" height="296" rx="12" fill={PANEL} stroke={LINE} />
        <text x="46" y="92" fill={DIM} fontFamily={FONT} fontSize="7" letterSpacing="1.2">
          SIMULATED NETWORK
        </text>

        <g opacity="0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`gv-${i}`} x1={46 + i * 68} y1="108" x2={46 + i * 68} y2="330" stroke="rgba(255,255,255,0.04)" />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line key={`gh-${i}`} x1="46" y1={108 + i * 56} x2="370" y2={108 + i * 56} stroke="rgba(255,255,255,0.04)" />
          ))}
        </g>

        <path
          d="M92 300 L186 250 L286 274 L340 190"
          fill="none"
          stroke="rgba(255,138,155,0.55)"
          strokeWidth="1.6"
          strokeDasharray="5 5"
        />
        <text x="236" y="232" fill={ROSE} fontFamily={FONT} fontSize="6.4">
          route closed
        </text>
        <path
          d="M92 300 L152 186 L286 274 L340 190"
          fill="none"
          stroke={CYAN}
          strokeWidth="2"
          markerEnd="url(#supply-arrow)"
        />
        <circle cx="152" cy="186" r="4" fill={CYAN} />
        <text x="134" y="174" fill={CYAN} fontFamily={FONT} fontSize="6.4">
          alt. supplier
        </text>

        {[
          { x: 92, y: 300, label: "Warehouse A", tone: VIOLET },
          { x: 186, y: 250, label: "Vendor B", tone: "rgba(255,255,255,0.6)" },
          { x: 286, y: 274, label: "Hub", tone: "rgba(255,255,255,0.6)" },
          { x: 340, y: 190, label: "Store", tone: CYAN },
        ].map((node) => (
          <g key={node.label}>
            <rect x={node.x - 9} y={node.y - 9} width="18" height="18" rx="5" fill="#111119" stroke={node.tone} strokeOpacity="0.55" />
            <circle cx={node.x} cy={node.y} r="3" fill={node.tone} />
            <text
              x={node.x}
              y={node.y + 24}
              textAnchor="middle"
              fill={node.tone === CYAN ? CYAN : DIM}
              fontFamily={FONT}
              fontSize="6.4"
            >
              {node.label}
            </text>
          </g>
        ))}

        <rect x="46" y="332" width="150" height="20" rx="6" fill="rgba(255,138,155,0.08)" stroke="rgba(255,138,155,0.2)" />
        <text x="56" y="345.5" fill="rgba(255,190,200,0.9)" fontFamily={FONT} fontSize="6.4">
          shortage · shipment delay
        </text>
        <rect x="204" y="332" width="166" height="20" rx="6" fill="rgba(86,224,211,0.07)" stroke="rgba(86,224,211,0.18)" />
        <text x="214" y="345.5" fill="rgba(160,240,230,0.9)" fontFamily={FONT} fontSize="6.4">
          recoverable · replan triggered
        </text>
      </g>

      <g>
        <rect x="404" y="70" width="208" height="296" rx="12" fill={PANEL} stroke={LINE} />
        <text x="420" y="92" fill={DIM} fontFamily={FONT} fontSize="7" letterSpacing="1.2">
          RECOVERY LOOP
        </text>
        {stages.map((stage, i) => {
          const y = 116 + i * 40;
          const state = i < 4 ? "done" : "active";
          return (
            <g key={stage}>
              <circle cx="430" cy={y} r="8" fill={state === "done" ? "rgba(110,231,168,0.1)" : "rgba(149,124,255,0.14)"} stroke={state === "done" ? "rgba(110,231,168,0.35)" : "rgba(149,124,255,0.4)"} />
              {state === "done" ? (
                <path d={`M426.5 ${y} l2.4 2.4 l4.2 -4.6`} fill="none" stroke={GREEN} strokeWidth="1.4" strokeLinecap="round" />
              ) : (
                <circle cx="430" cy={y} r="2.4" fill={VIOLET} />
              )}
              {i < stages.length - 1 ? (
                <line x1="430" y1={y + 9} x2="430" y2={y + 31} stroke="rgba(255,255,255,0.1)" />
              ) : null}
              <text x="446" y={y + 1} fill={i === 4 ? INK : DIM} fontFamily={FONT} fontSize="8">
                {stage}
              </text>
              <text x="446" y={y + 12} fill={FAINT} fontFamily={FONT} fontSize="6.2">
                {["watch state", "constraint fail", "alternatives", "purchase · reroute", "state verified"][i]}
              </text>
            </g>
          );
        })}
        <rect x="420" y="316" width="176" height="34" rx="8" fill="rgba(149,124,255,0.1)" stroke="rgba(149,124,255,0.24)" />
        <text x="432" y="330" fill={DIM} fontFamily={FONT} fontSize="6.2">
          OUTCOME
        </text>
        <text x="432" y="342" fill="rgba(220,212,255,0.95)" fontFamily={FONT} fontSize="7.6" fontWeight="600">
          Recovered · 1 action executed
        </text>
      </g>
    </Frame>
  );
}

const art: Record<ProjectVisual, () => JSX.Element> = {
  finora: FinoraArt,
  research: ResearchArt,
  comply: ComplyArt,
  bynovix: BynovixArt,
  supply: SupplyArt,
};

export function ProjectArtwork({ visual }: { visual: ProjectVisual }) {
  const Artwork = art[visual];
  return <Artwork />;
}
