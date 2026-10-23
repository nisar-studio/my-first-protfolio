import { useEffect, useRef } from "react";

const particles = [
  { x: 108, y: 190, r: 2, delay: 0 },
  { x: 462, y: 152, r: 1.6, delay: 900 },
  { x: 92, y: 402, r: 1.4, delay: 1800 },
  { x: 486, y: 352, r: 2.2, delay: 600 },
  { x: 156, y: 108, r: 1.3, delay: 2400 },
  { x: 420, y: 96, r: 1.8, delay: 1400 },
  { x: 72, y: 300, r: 1.2, delay: 3200 },
  { x: 500, y: 244, r: 1.5, delay: 2100 },
  { x: 132, y: 552, r: 1.6, delay: 2800 },
  { x: 438, y: 572, r: 1.3, delay: 1100 },
  { x: 206, y: 92, r: 1.2, delay: 3600 },
  { x: 372, y: 70, r: 1.4, delay: 3000 },
];

export function RobotVisual() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const apply = () => {
      frame = 0;
      stage.style.setProperty("--tilt-x", `${(-pointerY * 4).toFixed(2)}deg`);
      stage.style.setProperty("--tilt-y", `${(pointerX * 6).toFixed(2)}deg`);
      stage.style.setProperty("--shift-x", `${(pointerX * 10).toFixed(2)}px`);
      stage.style.setProperty("--shift-y", `${(pointerY * 8).toFixed(2)}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
      if (frame === 0) frame = window.requestAnimationFrame(apply);
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
      if (frame === 0) frame = window.requestAnimationFrame(apply);
    };

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (finePointer) {
      stage.addEventListener("pointermove", onPointerMove);
      stage.addEventListener("pointerleave", onPointerLeave);
    }

    const onScroll = () => {
      if (window.scrollY < 1000) {
        stage.style.setProperty("--scroll-y", `${Math.min(window.scrollY * 0.05, 30).toFixed(2)}px`);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={stageRef} className="robot-stage relative mx-auto w-full max-w-[36rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-10 bottom-16 rounded-full bg-[radial-gradient(closest-side,rgba(149,124,255,0.22),rgba(86,224,211,0.06)_55%,transparent_75%)] blur-2xl"
      />

      <div className="robot-tilt relative">
        <svg
          viewBox="0 0 560 640"
          role="img"
          aria-labelledby="robot-title robot-desc"
          className="block h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
        >
          <title id="robot-title">Animated futuristic android interface</title>
          <desc id="robot-desc">
            A stylised android bust with a glowing cyan visor and a violet core, framed by orbital
            interface rings and HUD markers. The visor scans and the core pulses; motion pauses when
            reduced motion is enabled.
          </desc>

          <defs>
            <pattern id="rb-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--robot-line)" strokeWidth="1" opacity="0.7" />
            </pattern>
            <radialGradient id="rb-ambient" cx="50%" cy="48%" r="50%">
              <stop offset="0%" stopColor="#957cff" stopOpacity="0.22" />
              <stop offset="55%" stopColor="#6d5bd0" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#08080b" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="rb-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#56e0d3" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#957cff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#957cff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="rb-metal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2b2d3d" />
              <stop offset="48%" stopColor="#191a25" />
              <stop offset="100%" stopColor="#101018" />
            </linearGradient>
            <linearGradient id="rb-metal-soft" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#252735" />
              <stop offset="100%" stopColor="#12131b" />
            </linearGradient>
            <linearGradient id="rb-head" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#2c2e3f" />
              <stop offset="42%" stopColor="#1b1c27" />
              <stop offset="100%" stopColor="#0d0e15" />
            </linearGradient>
            <linearGradient id="rb-plate" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#303244" />
              <stop offset="55%" stopColor="#1b1c27" />
              <stop offset="100%" stopColor="#0f1017" />
            </linearGradient>
            <linearGradient id="rb-plate-inner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#171821" />
              <stop offset="100%" stopColor="#0b0c12" />
            </linearGradient>
            <radialGradient id="rb-face" cx="48%" cy="30%" r="78%">
              <stop offset="0%" stopColor="#1d2030" />
              <stop offset="55%" stopColor="#12141d" />
              <stop offset="100%" stopColor="#0a0b11" />
            </radialGradient>
            <linearGradient id="rb-visor" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0a1218" />
              <stop offset="55%" stopColor="#0a1016" />
              <stop offset="100%" stopColor="#060a0e" />
            </linearGradient>
            <linearGradient id="rb-eye" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#56e0d3" stopOpacity="0.15" />
              <stop offset="30%" stopColor="#7cf1e6" />
              <stop offset="70%" stopColor="#56e0d3" />
              <stop offset="100%" stopColor="#957cff" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="rb-scan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#56e0d3" stopOpacity="0" />
              <stop offset="50%" stopColor="#b8fff8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#56e0d3" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rb-rim-violet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b7a4ff" stopOpacity="0" />
              <stop offset="30%" stopColor="#957cff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#957cff" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="rb-rim-cyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#56e0d3" stopOpacity="0" />
              <stop offset="35%" stopColor="#56e0d3" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#56e0d3" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="rb-core" cx="42%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#f1ecff" />
              <stop offset="25%" stopColor="#c6b6ff" />
              <stop offset="65%" stopColor="#8b6cff" />
              <stop offset="100%" stopColor="#4630a8" />
            </radialGradient>
            <radialGradient id="rb-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#957cff" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#957cff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#957cff" stopOpacity="0" />
            </radialGradient>
            <clipPath id="rb-visor-clip">
              <rect x="228" y="210" width="104" height="54" rx="27" />
            </clipPath>
          </defs>

          <rect width="560" height="640" fill="url(#rb-grid)" opacity="0.65" />
          <ellipse cx="280" cy="308" rx="238" ry="252" fill="url(#rb-ambient)" />
          <circle cx="280" cy="238" r="142" fill="url(#rb-halo)" className="robot-glow" />

          {/* orbital rings */}
          <g className="robot-rings">
            <circle cx="280" cy="310" r="212" fill="none" stroke="var(--robot-line)" />
            <circle
              cx="280"
              cy="310"
              r="186"
              fill="none"
              stroke="rgba(149,124,255,0.24)"
              strokeWidth="1"
              strokeDasharray="1 9"
              className="robot-ring-slow"
            />
            <circle
              cx="280"
              cy="310"
              r="236"
              fill="none"
              stroke="rgba(86,224,211,0.12)"
              strokeWidth="1"
              strokeDasharray="70 280"
              className="robot-ring-rev"
            />
            <g className="robot-ring-slow">
              <circle cx="466" cy="310" r="2.6" fill="#56e0d3" opacity="0.9" />
              <circle cx="94" cy="310" r="2" fill="#957cff" opacity="0.8" />
            </g>
            {[0, 1, 2, 3, 4, 5, 6].map((index) => {
              const angle = (index / 7) * Math.PI * 2 - Math.PI / 2;
              return (
                <circle
                  key={index}
                  cx={280 + Math.cos(angle) * 212}
                  cy={310 + Math.sin(angle) * 212}
                  r="1.4"
                  fill="var(--robot-hud-faint)"
                />
              );
            })}
          </g>

          {/* robot */}
          <g className="robot-boot">
            <g className="robot-float">
              {/* shoulders and arms */}
              <path
                d="M 208 404 C 162 412 128 444 118 496 L 160 516 C 170 470 190 440 218 426 Z"
                fill="url(#rb-metal)"
                stroke="rgba(255,255,255,0.12)"
              />
              <path
                d="M 352 404 C 398 412 432 444 442 496 L 400 516 C 390 470 370 440 342 426 Z"
                fill="url(#rb-metal)"
                stroke="rgba(255,255,255,0.12)"
              />
              <path
                d="M 120 502 C 110 542 108 580 114 620 L 158 620 C 150 580 152 542 158 516 Z"
                fill="url(#rb-metal-soft)"
                stroke="rgba(255,255,255,0.08)"
              />
              <path
                d="M 440 502 C 450 542 452 580 446 620 L 402 620 C 410 580 408 542 402 516 Z"
                fill="url(#rb-metal-soft)"
                stroke="rgba(255,255,255,0.08)"
              />
              <circle cx="140" cy="510" r="11" fill="#15161f" stroke="rgba(149,124,255,0.35)" />
              <circle cx="420" cy="510" r="11" fill="#15161f" stroke="rgba(86,224,211,0.28)" />
              <path d="M 122 548 L 156 548" stroke="rgba(255,255,255,0.09)" />
              <path d="M 404 548 L 438 548" stroke="rgba(255,255,255,0.09)" />

              {/* torso */}
              <path
                d="M 214 398 L 346 398 L 382 472 L 356 576 L 280 608 L 204 576 L 178 472 Z"
                fill="url(#rb-plate)"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1.2"
              />              <path d="M 232 418 L 328 418 L 356 478 L 334 558 L 280 588 L 226 558 L 204 478 Z"
                fill="url(#rb-plate-inner)"
                stroke="rgba(149,124,255,0.22)"
              />
              <path d="M 196 408 C 164 414 140 432 126 460 L 158 478 C 172 452 192 432 214 424 Z" fill="url(#rb-metal-soft)" stroke="rgba(149,124,255,0.28)" />
              <path d="M 364 408 C 396 414 420 432 434 460 L 402 478 C 388 452 368 432 346 424 Z" fill="url(#rb-metal-soft)" stroke="rgba(86,224,211,0.24)" />
              <path d="M 232 438 L 328 438" stroke="rgba(255,255,255,0.07)" />
              <path d="M 216 476 L 344 476" stroke="rgba(255,255,255,0.07)" />
              <path
                d="M 214 400 L 182 472 L 206 574"
                fill="none"
                stroke="url(#rb-rim-violet)"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M 346 400 L 378 472 L 354 574"
                fill="none"
                stroke="url(#rb-rim-cyan)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M 198 414 C 172 432 154 456 146 486"
                fill="none"
                stroke="url(#rb-rim-violet)"
                strokeWidth="1.4"
                opacity="0.7"
              />
              <path
                d="M 362 414 C 388 432 406 456 414 486"
                fill="none"
                stroke="url(#rb-rim-cyan)"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <path d="M 232 424 L 232 466" stroke="rgba(255,255,255,0.05)" />
              <path d="M 328 424 L 328 466" stroke="rgba(255,255,255,0.05)" />
              <path d="M 206 398 L 354 398 L 372 426 L 188 426 Z" fill="#14151e" stroke="rgba(255,255,255,0.09)" />
              <path d="M 236 426 L 236 446" stroke="rgba(149,124,255,0.4)" />
              <path d="M 324 426 L 324 446" stroke="rgba(86,224,211,0.32)" />

              {/* neck */}
              <path d="M 252 338 L 308 338 L 316 396 L 244 396 Z" fill="url(#rb-metal)" stroke="rgba(255,255,255,0.1)" />
              <path d="M 248 356 L 312 356" stroke="rgba(255,255,255,0.14)" />
              <path d="M 246 374 L 314 374" stroke="rgba(255,255,255,0.09)" />

              {/* head */}
              <ellipse cx="280" cy="352" rx="36" ry="9" fill="#000000" opacity="0.35" />
              <path
                d="M 210 236 C 210 174 236 140 280 140 C 324 140 350 174 350 236 L 344 288 C 340 324 316 346 280 346 C 244 346 220 324 216 288 Z"
                fill="url(#rb-head)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.2"
              />
              <path
                d="M 226 240 C 226 190 246 160 280 160 C 314 160 334 190 334 240 L 329 284 C 326 312 306 330 280 330 C 254 330 234 312 231 284 Z"
                fill="url(#rb-face)"
                stroke="rgba(255,255,255,0.11)"
              />
              <path
                d="M 216 214 C 219 184 228 166 242 154 L 252 178 C 240 188 232 204 230 224 Z"
                fill="url(#rb-metal-soft)"
                stroke="rgba(255,255,255,0.13)"
              />
              <path
                d="M 344 214 C 341 184 332 166 318 154 L 308 178 C 320 188 328 204 330 224 Z"
                fill="url(#rb-metal-soft)"
                stroke="rgba(255,255,255,0.13)"
              />
              <path d="M 242 198 L 318 198" stroke="rgba(255,255,255,0.1)" strokeLinecap="round" />

              {/* rim lights */}
              <path
                d="M 212 230 C 212 172 238 142 276 140"
                fill="none"
                stroke="url(#rb-rim-violet)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M 348 234 C 348 176 322 142 284 140"
                fill="none"
                stroke="url(#rb-rim-cyan)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              {/* visor */}
              <rect
                x="228"
                y="210"
                width="104"
                height="54"
                rx="27"
                fill="url(#rb-visor)"
                stroke="rgba(86,224,211,0.38)"
                strokeWidth="1.2"
              />
              <g clipPath="url(#rb-visor-clip)">
                <rect x="228" y="234" width="104" height="2.4" fill="url(#rb-scan)" className="robot-scan" />
                <rect x="228" y="210" width="104" height="54" fill="url(#rb-scan)" opacity="0.05" />
              </g>
              <rect x="242" y="231" width="76" height="12" rx="6" fill="url(#rb-eye)" className="robot-eye" />
              <rect x="253" y="235" width="54" height="3.5" rx="1.75" fill="#f0fffd" opacity="0.92" className="robot-eye" />
              <circle cx="236" cy="237" r="2.2" fill="#56e0d3" opacity="0.9" />
              <circle cx="324" cy="237" r="2.2" fill="#957cff" opacity="0.9" />

              {/* head details */}
              <path d="M 268 143 L 280 122 L 292 143" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.6" strokeLinejoin="round" />
              <line x1="280" y1="122" x2="280" y2="104" stroke="rgba(255,255,255,0.22)" />
              <circle cx="280" cy="101" r="3.4" fill="#56e0d3" className="robot-eye" />
              <circle cx="280" cy="101" r="8" fill="none" stroke="rgba(86,224,211,0.24)" />
              <circle cx="280" cy="180" r="2.6" fill="#957cff" opacity="0.9" />
              <path d="M 240 276 L 258 279" stroke="rgba(255,255,255,0.16)" strokeLinecap="round" />
              <path d="M 302 279 L 320 276" stroke="rgba(255,255,255,0.16)" strokeLinecap="round" />
              <path d="M 240 284 L 254 286" stroke="rgba(255,255,255,0.09)" strokeLinecap="round" />
              <path d="M 306 286 L 320 284" stroke="rgba(255,255,255,0.09)" strokeLinecap="round" />
              <path
                d="M 252 304 L 280 320 L 308 304 L 313 312 C 305 329 293 337 280 337 C 267 337 255 329 247 312 Z"
                fill="#0f111a"
                stroke="rgba(255,255,255,0.09)"
              />
              <g stroke="rgba(86,224,211,0.28)" strokeLinecap="round">
                <path d="M 268 314 L 274 314" />
                <path d="M 278 318 L 284 318" />
                <path d="M 288 314 L 294 314" />
              </g>

              {/* ear discs */}
              <g>
                <circle cx="198" cy="258" r="22" fill="#15161f" stroke="rgba(255,255,255,0.14)" />
                <circle cx="198" cy="258" r="12" fill="none" stroke="rgba(149,124,255,0.5)" />
                <circle cx="198" cy="258" r="4" fill="#957cff" />
              </g>
              <g>
                <circle cx="362" cy="258" r="22" fill="#15161f" stroke="rgba(255,255,255,0.14)" />
                <circle cx="362" cy="258" r="12" fill="none" stroke="rgba(86,224,211,0.4)" />
                <circle cx="362" cy="258" r="4" fill="#56e0d3" />
              </g>

              {/* chest */}
              <text
                x="280"
                y="450"
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontFamily="Inter, system-ui, sans-serif"
                fontSize="10"
                letterSpacing="3"
              >
                MN.
              </text>
              <g className="robot-core">
                <circle cx="280" cy="500" r="62" fill="url(#rb-core-glow)" />
                <circle
                  cx="280"
                  cy="500"
                  r="44"
                  fill="none"
                  stroke="rgba(149,124,255,0.3)"
                  strokeDasharray="2 6"
                  className="robot-core-ring"
                />
                <circle cx="280" cy="500" r="30" fill="url(#rb-core)" stroke="rgba(255,255,255,0.3)" />
                <circle cx="280" cy="500" r="19" fill="none" stroke="rgba(255,255,255,0.28)" />
                <circle cx="280" cy="500" r="7" fill="#f4efff" />
              </g>
              <path d="M 216 500 L 236 486" stroke="rgba(255,255,255,0.1)" strokeLinecap="round" />
              <path d="M 344 500 L 324 486" stroke="rgba(255,255,255,0.1)" strokeLinecap="round" />
              <path d="M 220 534 L 244 540" stroke="rgba(149,124,255,0.25)" strokeLinecap="round" />
              <path d="M 340 534 L 316 540" stroke="rgba(86,224,211,0.25)" strokeLinecap="round" />
              <g stroke="rgba(255,255,255,0.12)" strokeLinecap="round">
                <path d="M 214 520 L 228 520" />
                <path d="M 212 530 L 228 530" />
                <path d="M 346 520 L 332 520" />
                <path d="M 348 530 L 332 530" />
              </g>
              <g stroke="rgba(255,255,255,0.1)" strokeLinecap="round">
                <path d="M 128 576 L 150 576" />
                <path d="M 128 584 L 150 584" />
                <path d="M 410 576 L 432 576" />
                <path d="M 410 584 L 432 584" />
              </g>
              <path d="M 232 566 L 328 566" stroke="rgba(255,255,255,0.08)" />
            </g>
          </g>

          {/* particles */}
          <g aria-hidden="true">
            {particles.map((particle) => (
              <circle
                key={`${particle.x}-${particle.y}`}
                cx={particle.x}
                cy={particle.y}
                r={particle.r}
                fill={particle.delay % 2 === 0 ? "#957cff" : "#56e0d3"}
                className="robot-particle"
                style={{ animationDelay: `${particle.delay}ms` }}
              />
            ))}
          </g>

          {/* HUD */}
          <g className="robot-boot robot-hud" style={{ animationDelay: "220ms" }}>
            <path d="M 34 66 L 34 50 L 50 50" fill="none" stroke="var(--robot-hud-faint)" />
            <path d="M 526 66 L 526 50 L 510 50" fill="none" stroke="var(--robot-hud-faint)" />
            <path d="M 34 578 L 34 594 L 50 594" fill="none" stroke="var(--robot-line)" />
            <path d="M 526 578 L 526 594 L 510 594" fill="none" stroke="var(--robot-line)" />

            <text x="52" y="46" fill="var(--robot-hud-ink)" fontFamily="Inter, system-ui, sans-serif" fontSize="9" letterSpacing="2.4">
              MN.OS
            </text>
            <text x="52" y="60" fill="var(--robot-hud-faint)" fontFamily="Inter, system-ui, sans-serif" fontSize="6.6" letterSpacing="1.8">
              ANDROID INTERFACE
            </text>

            <circle cx="490" cy="42" r="2.2" fill="#56e0d3" className="robot-eye" />
            <text x="498" y="45.5" fill="var(--robot-hud-ink)" fontFamily="Inter, system-ui, sans-serif" fontSize="7" letterSpacing="1.4">
              ONLINE
            </text>

            <g>
              <path d="M 78 250 L 78 258 L 172 258" fill="none" stroke="rgba(86,224,211,0.4)" strokeDasharray="2 4" />
              <circle cx="172" cy="258" r="2" fill="#56e0d3" opacity="0.75" />
              <text x="78" y="242" fill="var(--robot-hud-ink)" fontFamily="Inter, system-ui, sans-serif" fontSize="6.8" letterSpacing="1.6">
                OPTICS
              </text>
              <text x="78" y="272" fill="var(--robot-hud-faint)" fontFamily="Inter, system-ui, sans-serif" fontSize="6" letterSpacing="1.2">
                01 / SENSOR
              </text>
            </g>
            <g>
              <path d="M 496 462 L 484 462 L 484 480" fill="none" stroke="rgba(149,124,255,0.38)" strokeDasharray="2 4" />
              <text x="512" y="459" textAnchor="end" fill="var(--robot-hud-ink)" fontFamily="Inter, system-ui, sans-serif" fontSize="6.8" letterSpacing="1.6">
                MN.OS
              </text>
              <text x="512" y="472" textAnchor="end" fill="var(--robot-hud-faint)" fontFamily="Inter, system-ui, sans-serif" fontSize="6" letterSpacing="1.2">
                02 / CORE
              </text>
            </g>
            <text x="280" y="612" textAnchor="middle" fill="var(--robot-hud-faint)" fontFamily="Inter, system-ui, sans-serif" fontSize="6.6" letterSpacing="2.6">
              AI · ML · FULL-STACK
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
