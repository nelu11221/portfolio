import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// ─── Project Data ───────────────────────────────────────────────
const projects = [
  {
    id: 1,
    image: '/images/project1.jpg',
    tags: ['UI/UX Design', 'React'],
    title: 'ShopFlow – E-commerce Redesign',
    desc: 'Full redesign of a fashion e-commerce platform, boosting conversion rate by 38%.',
    year: '2024',
    client: 'ShopFlow Inc.',
    duration: '6 weeks',
    role: 'UI/UX Designer & Frontend Developer',
    overview: 'ShopFlow came to us with a dated e-commerce platform that was bleeding potential customers. The checkout abandonment rate was over 70% and the mobile experience was practically unusable. We rebuilt everything from the ground up — research, architecture, design system, and React implementation.',
    challenge: 'The core challenge was simplifying a 9-step checkout process without losing the trust signals and upsell opportunities the business depended on. Every decision had to be validated against real user data.',
    solution: 'We condensed checkout to 3 steps using a progressive disclosure pattern, redesigned the product pages with social proof at every scroll point, and rebuilt the mobile nav from scratch using thumb-zone research.',
    results: [
      { label: 'Conversion Rate', value: '+38%' },
      { label: 'Cart Abandonment', value: '-52%' },
      { label: 'Mobile Sessions', value: '+91%' },
      { label: 'Page Load Time', value: '-1.4s' },
    ],
    images: ['/images/project1.jpg', '/images/project1.jpg'],
  },
  {
    id: 2,
    image: '/images/project2.jpg',
    tags: ['Dashboard', 'Next.js'],
    title: 'Nexus Analytics Dashboard',
    desc: 'Real-time data visualization platform for SaaS teams with dark-mode-first design.',
    year: '2024',
    client: 'Nexus Labs',
    duration: '3 weeks',
    role: 'Product Designer & Frontend Developer',
    overview: 'Nexus needed a real-time analytics dashboard that their enterprise clients could white-label. The existing solution was a tangled mix of third-party widgets that looked inconsistent and performed poorly under heavy data loads.',
    challenge: 'Displaying live data across 12+ chart types without UI jank, while keeping the interface clean enough for non-technical users to interpret at a glance.',
    solution: 'We designed a modular widget system with a dark-mode-first aesthetic, built on Next.js with server-side data streaming. Each chart was custom-built for performance, with skeleton loaders and graceful empty states.',
    results: [
      { label: 'Load Performance', value: '+3x faster' },
      { label: 'User Satisfaction', value: '4.9 / 5' },
      { label: 'Churn Reduction', value: '-28%' },
      { label: 'Delivery Time', value: '3 weeks' },
    ],
    images: ['/images/project2.jpg', '/images/project2.jpg'],
  },
  {
    id: 3,
    image: '/images/project3.jpg',
    tags: ['Branding', 'Motion'],
    title: 'Lumina Brand Identity',
    desc: 'Complete visual identity system for a creative studio — logo, type, motion guidelines.',
    year: '2023',
    client: 'Lumina Creative Studio',
    duration: '4 weeks',
    role: 'Brand Designer & Motion Artist',
    overview: 'Lumina was launching as a premium creative studio and needed a brand identity that communicated elegance, creativity, and technical precision simultaneously. The identity had to work across print, digital, and motion contexts.',
    challenge: 'Creating a mark that felt premium without being cold, creative without being chaotic — and that could animate beautifully for their showreel intros.',
    solution: 'We developed a wordmark with a custom ligature between the L and i, paired with a modular grid system for layouts and a motion language built around light refracting through glass.',
    results: [
      { label: 'Brand Recognition', value: 'Immediate' },
      { label: 'New Clients (Q1)', value: '+4 signed' },
      { label: 'Press Features', value: '3 publications' },
      { label: 'Awwwards', value: 'Honorable Mention' },
    ],
    images: ['/images/project3.jpg', '/images/project3.jpg'],
  },
  {
    id: 4,
    image: '/images/project4.jpg',
    tags: ['Mobile', 'UI Design'],
    title: 'FitTrack Mobile App',
    desc: 'Fitness tracking app UI designed for clarity under pressure — built for serious athletes.',
    year: '2023',
    client: 'FitTrack',
    duration: '5 weeks',
    role: 'Mobile UI/UX Designer',
    overview: 'FitTrack is a serious fitness tracking app for athletes who train in high-pressure environments. The existing UI failed during workouts — too many taps, too much information, fonts too small to read mid-exercise.',
    challenge: 'Designing an interface that works when your hands are sweaty, your heart rate is 180bpm, and you have 3 seconds to log a set. Clarity and speed were the only metrics that mattered.',
    solution: 'We introduced a one-handed mode, large touch targets, high-contrast color coding for effort zones, and a persistent workout HUD that shows only what matters mid-session.',
    results: [
      { label: 'App Store Rating', value: '4.9 ★' },
      { label: 'Daily Active Users', value: '+67%' },
      { label: 'Session Logging', value: '+83% faster' },
      { label: 'User Retention', value: '+41%' },
    ],
    images: ['/images/project4.jpg', '/images/project4.jpg'],
  },
  {
    id: 5,
    image: '/images/project5.jpg',
    tags: ['Web Dev', 'GSAP'],
    title: 'Vertex Agency Website',
    desc: 'Immersive agency portfolio with WebGL backgrounds and scroll-driven storytelling.',
    year: '2023',
    client: 'Vertex Agency',
    duration: '5 weeks',
    role: 'Creative Developer & Designer',
    overview: 'Vertex is a creative agency that needed a website as impressive as the work they sell. Their previous site was a generic WordPress theme that embarrassed them in client pitches.',
    challenge: 'Building a site that demonstrates creative and technical capability without sacrificing performance. Every animation had to feel intentional, not gratuitous.',
    solution: 'We designed and built a scroll-driven narrative using GSAP ScrollTrigger, with WebGL particle backgrounds, a custom work showcase with smooth transitions, and sub-2s load time despite the visual richness.',
    results: [
      { label: 'Awwwards', value: 'Honorable Mention' },
      { label: 'Inbound Leads', value: '+120%' },
      { label: 'Avg. Session', value: '4m 32s' },
      { label: 'Bounce Rate', value: '-38%' },
    ],
    images: ['/images/project5.jpg', '/images/project5.jpg'],
  },
  {
    id: 6,
    image: '/images/project6.jpg',
    tags: ['Branding', 'Identity'],
    title: 'Dimora del Tramonto',
    desc: 'Full brand identity for a luxury hospitality venue — logo, typography, print collateral, and visual guidelines.',
    year: '2024',
    client: 'Dimora del Tramonto',
    duration: '4 weeks',
    role: 'Brand Designer',
    overview: 'Dimora del Tramonto is a luxury agriturismo in southern Italy seeking to attract high-end international guests. Their existing visual identity was misaligned with their premium positioning and failing to communicate the warmth and authenticity of the experience.',
    challenge: 'Capturing the essence of golden-hour Puglia — terracotta, olive groves, slow living — in a mark that also feels sophisticated enough for a €500/night property.',
    solution: 'We built an identity around a custom serif logotype with hand-drawn olive branch motif, a warm earthy palette, and bespoke print collateral including menus, room cards, and a brand book.',
    results: [
      { label: 'Booking Inquiries', value: '+74%' },
      { label: 'Avg. Booking Value', value: '+28%' },
      { label: 'Press Features', value: '2 magazines' },
      { label: 'Social Followers', value: '+3,200' },
    ],
    images: ['/images/project6.jpg', '/images/project6.jpg'],
  },
  {
    id: 7,
    image: '/images/project7.jpg',
    tags: ['Branding', 'Motion'],
    title: 'Artmedia Branding',
    desc: 'Creative brand system for a media production company — bold visuals, motion identity, and digital assets.',
    year: '2024',
    client: 'Artmedia Production',
    duration: '3 weeks',
    role: 'Brand Designer & Motion Designer',
    overview: 'Artmedia is a rising media production company that needed a brand identity bold enough to stand out in a crowded market, with a motion language that could bring their reels, titles, and social content to life.',
    challenge: 'The identity had to work across both corporate video productions and creative art projects — a wide tonal range that required a flexible but cohesive design system.',
    solution: 'We developed a bold geometric mark with a dynamic color system that shifts between professional deep navy and vibrant gradient modes depending on context, paired with kinetic typography guidelines for motion.',
    results: [
      { label: 'Brand Perception', value: 'Premium ↑' },
      { label: 'New Contracts', value: '+5 in 60 days' },
      { label: 'Social Engagement', value: '+210%' },
      { label: 'Pitch Win Rate', value: '+35%' },
    ],
    images: ['/images/project7.jpg', '/images/project7.jpg'],
  },
];

// ─── Custom Cursor ───────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      if (followerRef.current) {
        followerRef.current.style.left = e.clientX + 'px';
        followerRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        Cod<span>][</span>ng
      </div>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <a href="#contact" className="nav-cta">Start a Project</a>
    </nav>
  );
}

// ─── Hero Section ────────────────────────────────────────────────
// ─── Tech Stack Icons ────────────────────────────────────────────
// ─── Browser Mockup ──────────────────────────────────────────────
const codeLines = [
  { indent: 0, tokens: [{ t: 'keyword', v: 'const ' }, { t: 'fn', v: 'Hero' }, { t: 'plain', v: ' = () => (' }] },
  { indent: 1, tokens: [{ t: 'tag', v: '<section ' }, { t: 'attr', v: 'className' }, { t: 'plain', v: '=' }, { t: 'str', v: '"hero"' }, { t: 'tag', v: '>' }] },
  { indent: 2, tokens: [{ t: 'tag', v: '<h1 ' }, { t: 'attr', v: 'className' }, { t: 'plain', v: '=' }, { t: 'str', v: '"hero-title"' }, { t: 'tag', v: '>' }] },
  { indent: 3, tokens: [{ t: 'plain', v: 'Design that ' }, { t: 'accent', v: 'converts.' }] },
  { indent: 2, tokens: [{ t: 'tag', v: '</h1>' }] },
  { indent: 2, tokens: [{ t: 'tag', v: '<p>' }, { t: 'plain', v: 'Code that ' }, { t: 'accent', v: 'scales.' }, { t: 'tag', v: '</p>' }] },
  { indent: 2, tokens: [{ t: 'tag', v: '<button ' }, { t: 'attr', v: 'className' }, { t: 'plain', v: '=' }, { t: 'str', v: '"btn-primary"' }, { t: 'tag', v: '>' }] },
  { indent: 3, tokens: [{ t: 'plain', v: 'Start a Project →' }] },
  { indent: 2, tokens: [{ t: 'tag', v: '</button>' }] },
  { indent: 1, tokens: [{ t: 'tag', v: '</section>' }] },
  { indent: 0, tokens: [{ t: 'plain', v: ');' }] },
];

function BrowserMockup() {
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveLine(l => (l + 1) % codeLines.length);
    }, 900);
    return () => clearInterval(t);
  }, []);

  const tokenClass = (t) => {
    const map = { keyword: 'tok-keyword', fn: 'tok-fn', tag: 'tok-tag', attr: 'tok-attr', str: 'tok-str', plain: 'tok-plain', accent: 'tok-accent' };
    return map[t] || 'tok-plain';
  };

  return (
    <div className="mockup-wrap">
      {/* Glow rings behind mockup */}
      <div className="mockup-glow-ring ring-a" />
      <div className="mockup-glow-ring ring-b" />

      <div className="mockup-browser">
        {/* Browser chrome */}
        <div className="mockup-bar">
          <div className="mockup-dots">
            <span className="mdot mdot-red" />
            <span className="mdot mdot-yellow" />
            <span className="mdot mdot-green" />
          </div>
          <div className="mockup-url">
            <span className="url-lock">🔒</span>
            <span>coding.studio</span>
          </div>
          <div className="mockup-bar-actions">
            <span className="mbar-icon">↻</span>
          </div>
        </div>

        {/* Code editor body */}
        <div className="mockup-body">
          {/* Line numbers */}
          <div className="mockup-line-nums">
            {codeLines.map((_, i) => (
              <span key={i} className={`line-num${activeLine === i ? ' line-num-active' : ''}`}>{i + 1}</span>
            ))}
          </div>

          {/* Code */}
          <div className="mockup-code">
            {codeLines.map((line, i) => (
              <div key={i} className={`code-line${activeLine === i ? ' code-line-active' : ''}`}>
                <span style={{ display: 'inline-block', width: line.indent * 16 }} />
                {line.tokens.map((tok, j) => (
                  <span key={j} className={tokenClass(tok.t)}>{tok.v}</span>
                ))}
                {activeLine === i && <span className="code-cursor" />}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="mockup-status">
          <span className="status-dot" />
          <span>React 18 · JSX · Sora Font</span>
          <span className="status-right">Ln {activeLine + 1}, Col 1</span>
        </div>
      </div>

      {/* Floating badges around mockup */}
      <div className="mockup-badge badge-tl">
        <img src="/images/react.svg" alt="React" className="badge-icon" />
        React
      </div>
      <div className="mockup-badge badge-tr">
        <img src="/images/figma.svg" alt="Figma" className="badge-icon" />
        Figma
      </div>
      <div className="mockup-badge badge-bl">
        <img src="/images/nextjs.svg" alt="Next.js" className="badge-icon" />
        Next.js
      </div>
      <div className="mockup-badge badge-br">
        <img src="/images/tailwind.svg" alt="Tailwind" className="badge-icon" />
        Tailwind
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero hero-with-mockup" id="home">
      {/* Background blobs */}
      <div className="hero-blob blob-1" />
      <div className="hero-blob blob-2" />
      <div className="hero-blob blob-3" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Available for projects · 2025
        </div>

        <h1 className="hero-title">
          <span className="line">Design that</span>
          <span className="line"><span className="accent-word">converts.</span></span>
          <span className="line"><span className="outline-word">Code</span> that scales.</span>
        </h1>

        <p className="hero-subtitle">
          I'm a UI/UX designer & developer crafting digital experiences
          that don't just look good — they perform. Let's build something
          that makes people stop scrolling.
        </p>

        <div className="hero-actions">
          <a href="#portfolio" className="btn-primary">
            <span>View My Work</span>
            <span>→</span>
          </a>
          <a href="#contact" className="btn-secondary">
            Get a Quote ↗
          </a>
        </div>
      </div>

      {/* Browser Mockup */}
      <BrowserMockup />

      {/* Stats panel */}
      <div className="hero-stats">
        <div className="stat-card">
          <div className="stat-number">48+</div>
          <div className="stat-label">Projects Done</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5yr</div>
          <div className="stat-label">Experience</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100%</div>
          <div className="stat-label">Client Satisfaction</div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span className="scroll-text">Scroll to explore</span>
      </div>
    </section>
  );
}

// ─── Case Study Page ─────────────────────────────────────────────
function CaseStudy({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div className="cs-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cs-panel">
        {/* Header */}
        <div className="cs-header">
          <button className="cs-back" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to work
          </button>
          <div className="cs-header-tags">
            {project.tags.map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>

        {/* Hero image */}
        <div className="cs-hero-img">
          <img src={project.image} alt={project.title} />
          <div className="cs-hero-overlay">
            <h1 className="cs-title">{project.title}</h1>
            <p className="cs-subtitle">{project.year} · {project.client}</p>
          </div>
        </div>

        {/* Content */}
        <div className="cs-content">
          {/* Meta row */}
          <div className="cs-meta-row">
            {[
              { label: 'Client', value: project.client },
              { label: 'Year', value: project.year },
              { label: 'Duration', value: project.duration },
              { label: 'My Role', value: project.role },
            ].map(m => (
              <div className="cs-meta-item" key={m.label}>
                <span className="cs-meta-label">{m.label}</span>
                <span className="cs-meta-value">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="cs-results">
            {project.results.map(r => (
              <div className="cs-result-card" key={r.label}>
                <div className="cs-result-value">{r.value}</div>
                <div className="cs-result-label">{r.label}</div>
              </div>
            ))}
          </div>

          {/* Text sections */}
          <div className="cs-sections">
            <div className="cs-section">
              <h3 className="cs-section-title">
                <span className="cs-section-num">01</span> Overview
              </h3>
              <p className="cs-section-text">{project.overview}</p>
            </div>
            <div className="cs-section">
              <h3 className="cs-section-title">
                <span className="cs-section-num">02</span> The Challenge
              </h3>
              <p className="cs-section-text">{project.challenge}</p>
            </div>
            <div className="cs-section">
              <h3 className="cs-section-title">
                <span className="cs-section-num">03</span> The Solution
              </h3>
              <p className="cs-section-text">{project.solution}</p>
            </div>
          </div>

          {/* Second image */}
          <div className="cs-gallery">
            <img src={project.images[1]} alt={project.title + ' detail'} className="cs-gallery-img" />
          </div>

          {/* CTA */}
          <div className="cs-cta">
            <p className="cs-cta-text">Like what you see?</p>
            <a href="#contact" className="btn-primary" onClick={onClose}>
              <span>Start a Project</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Project Card ────────────────────────────────────────────────
function ProjectCard({ project, onOpen }) {
  return (
    <div className="project-card" onClick={() => onOpen(project)}>
      <div className="card-image">
        <img
          src={project.image}
          alt={project.title}
          className="card-img"
        />
      </div>
      <div className="card-body">
        <div className="card-tags">
          {project.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.desc}</p>
      </div>
      <div className="card-footer">
        <span className="card-year">{project.year}</span>
        <div className="card-arrow">↗</div>
      </div>
    </div>
  );
}

// ─── Slider Section ──────────────────────────────────────────────
function ProjectSlider() {
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const cardWidth = 380 + 24; // card + gap
  const maxIdx = projects.length - 1;

  // Drag state
  const drag = useRef({ startX: 0, scrollLeft: 0, isDown: false });

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, maxIdx));
    setActiveIdx(clamped);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${clamped * cardWidth}px)`;
    }
  };

  // Mouse drag
  const handleMouseDown = (e) => {
    drag.current.isDown = true;
    drag.current.startX = e.pageX;
    drag.current.currentIdx = activeIdx;
  };

  const handleMouseUp = (e) => {
    if (!drag.current.isDown) return;
    drag.current.isDown = false;
    const diff = drag.current.startX - e.pageX;
    if (Math.abs(diff) > 60) {
      goTo(activeIdx + (diff > 0 ? 1 : -1));
    }
  };

  // Touch
  const handleTouchStart = (e) => {
    drag.current.startX = e.touches[0].pageX;
  };

  const handleTouchEnd = (e) => {
    const diff = drag.current.startX - e.changedTouches[0].pageX;
    if (Math.abs(diff) > 50) goTo(activeIdx + (diff > 0 ? 1 : -1));
  };

  return (
    <section className="slider-section" id="portfolio">
      <div className="slider-header">
        <div>
          <p className="section-label">Selected Work</p>
          <h2 className="section-title">Projects that<br />made an impact</h2>
        </div>
        <div className="slider-controls">
          <button className="slider-btn" onClick={() => goTo(activeIdx - 1)}>←</button>
          <button className="slider-btn" onClick={() => goTo(activeIdx + 1)}>→</button>
        </div>
      </div>

      <div
        className="slider-track-wrapper"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slider-track" ref={trackRef}>
          {selectedProject && <CaseStudy project={selectedProject} onClose={() => setSelectedProject(null)} />}
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setSelectedProject} />
          ))}
        </div>
      </div>

      <div className="slider-dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`dot${i === activeIdx ? ' active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}

// ─── About Section ───────────────────────────────────────────────
const skills = [
  { label: 'UI/UX Design', pct: 95 },
  { label: 'React / Next.js', pct: 90 },
  { label: 'Graphic Design', pct: 85 },
  { label: 'Website Development', pct: 88 },
];

const tools = ['Figma', 'React', 'Next.js', 'GSAP', 'Illustrator'];

function SkillBar({ label, pct }) {
  const barRef = useRef(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.width = pct + '%';
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [pct]);

  return (
    <div className="skill-item">
      <div className="skill-meta">
        <span className="skill-label">{label}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" ref={barRef} style={{ width: '0%' }} />
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        {/* Left col */}
        <div className="about-left">
          <p className="section-label">Who I Am</p>
          <h2 className="section-title">Turning ideas into<br /><span className="accent-word">digital reality</span></h2>
          <p className="about-text">
            Hey — I'm a designer & developer based in Europe with 5+ years of experience
            building products that blend clean aesthetics with rock-solid engineering.
            I obsess over every pixel, every interaction, every millisecond of load time.
          </p>
          <p className="about-text">
            From early-stage startups to established brands, I've helped clients launch
            platforms that users actually love using. My stack lives at the intersection
            of design thinking and modern frontend development.
          </p>
          <div className="about-tools">
            {tools.map(t => (
              <span className="tool-badge" key={t}>{t}</span>
            ))}
          </div>
          <a href="#contact" className="btn-primary" style={{ marginTop: '36px', display: 'inline-flex' }}>
            <span>Let's Work Together</span>
            <span>→</span>
          </a>
        </div>

        {/* Right col */}
        <div className="about-right">
          <div className="about-avatar-wrap">
            <div className="about-avatar">
              <img src="/images/profile.jpg" alt="Profile" className="about-avatar-img" />
            </div>
            <div className="avatar-ring ring-1" />
            <div className="avatar-ring ring-2" />
            <div className="avatar-float-card card-top">
              <span className="float-icon float-icon-blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="url(#boltGrad)" opacity="0.15"/>
                  <defs>
                    <linearGradient id="boltGrad" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#4f6ef7"/>
                      <stop offset="100%" stopColor="#00d4ff"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <div>
                <div className="float-title">48+ Projects</div>
                <div className="float-sub">Delivered on time</div>
              </div>
            </div>
            <div className="avatar-float-card card-bottom">
              <span className="float-icon float-icon-gold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
                    fill="url(#goldGrad)" stroke="#f59e0b" strokeWidth="1.2" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="goldGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fde68a"/>
                      <stop offset="50%" stopColor="#f59e0b"/>
                      <stop offset="100%" stopColor="#d97706"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <div>
                <div className="float-title">5.0 Rating</div>
                <div className="float-sub">48 reviews</div>
              </div>
            </div>
          </div>

          <div className="skills-list">
            {skills.map(s => <SkillBar key={s.label} {...s} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ────────────────────────────────────────────
const services = [
  {
    icon: '/images/figma.svg',
    title: 'UI/UX Design',
    desc: 'User-centered interfaces built on real research. From wireframes to polished, pixel-perfect Figma files ready for dev handoff.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    accent: '#4f6ef7',
  },
  {
    icon: '/images/react.svg',
    title: 'Website Development',
    desc: 'Fast, accessible, SEO-ready websites built with React or Next.js. Every build is optimized for performance and scalability.',
    features: ['React / Next.js', 'Responsive Design', 'Performance', 'SEO Ready'],
    accent: '#00d4ff',
    featured: true,
  },
  {
    icon: '/images/illustrator.svg',
    title: 'Graphic Design',
    desc: 'Brand identities, print, social, and everything in between. Visual storytelling that makes your brand instantly recognizable.',
    features: ['Brand Identity', 'Logo Design', 'Social Media', 'Print Design'],
    accent: '#7c3aed',
  },
];

function ServiceCard({ service }) {
  return (
    <div className={`service-card${service.featured ? ' service-featured' : ''}`}>
      {service.featured && <div className="service-badge">Most Popular</div>}
      <div className="service-icon" style={{ background: `${service.accent}18` }}>
        <img src={service.icon} alt={service.title} className="service-icon-img" />
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.desc}</p>
      <ul className="service-features">
        {service.features.map(f => (
          <li key={f}>
            <span className="feature-check" style={{ color: service.accent }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <a href="#contact" className="service-cta" style={{ '--sc': service.accent }}>
        Start a Project →
      </a>
    </div>
  );
}

function Services() {
  return (
    <section className="services-section" id="services">
      <div className="section-header-center">
        <p className="section-label">What I Offer</p>
        <h2 className="section-title">Services built for<br /><span className="accent-word">real results</span></h2>
        <p className="section-subtitle">
          Every service is designed to deliver measurable impact — not just beautiful deliverables.
        </p>
      </div>
      <div className="services-grid">
        {services.map(s => <ServiceCard key={s.title} service={s} />)}
      </div>
    </section>
  );
}

// ─── Process Section (REDESIGNED) ───────────────────────────────
const steps = [
  {
    num: '01',
    title: 'Discovery',
    tagline: 'We align before we act.',
    desc: 'A focused kickoff where I learn everything about your business, goals, and audience. We map out the project scope, define KPIs, and agree on a timeline — so there are zero surprises down the road.',
    deliverables: ['Project Brief', 'Competitor Analysis', 'Sitemap / Scope Doc', 'Timeline & Milestones'],
    duration: '1–2 days',
    color: '#4f6ef7',
  },
  {
    num: '02',
    title: 'Design',
    tagline: 'From blank canvas to pixel-perfect.',
    desc: 'Starting from rough wireframes and evolving into high-fidelity, interactive Figma prototypes. You review and give feedback at every stage — nothing goes to dev without your sign-off.',
    deliverables: ['Wireframes', 'Moodboard & Style Tile', 'Hi-Fi Mockups', 'Interactive Prototype'],
    duration: '3–7 days',
    color: '#00d4ff',
  },
  {
    num: '03',
    title: 'Development',
    tagline: 'Code that performs as good as it looks.',
    desc: 'I build using React or Next.js with clean, maintainable code. Fully responsive from mobile up, accessible by default, and performance-optimized — Lighthouse scores matter here.',
    deliverables: ['React / Next.js Build', 'Mobile Responsive', 'CMS Integration', 'Performance Audit'],
    duration: '5–14 days',
    color: '#7c3aed',
  },
  {
    num: '04',
    title: 'Launch',
    tagline: 'Go live with confidence.',
    desc: "Final QA across browsers and devices, domain setup, hosting, analytics tracking — then we launch. You get 30 days of post-launch support included, because bugs don't wait for business hours.",
    deliverables: ['Cross-browser QA', 'Domain & Hosting', 'Analytics Setup', '30-day Support'],
    duration: '1–2 days',
    color: '#f59e0b',
  },
];

function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];

  return (
    <section className="process-section" id="process">
      <div className="process-bg-num">{current.num}</div>

      <div className="process-layout">
        <div className="process-left">
          <p className="section-label">How I Work</p>
          <h2 className="section-title" style={{ marginBottom: '48px' }}>
            The blueprint<br />behind every<br /><span className="accent-word">great project</span>
          </h2>

          <div className="process-accordion">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`accordion-item${activeStep === i ? ' accordion-active' : ''}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="accordion-header">
                  <span className="accordion-num" style={{ color: activeStep === i ? step.color : 'var(--muted)' }}>
                    {step.num}
                  </span>
                  <span className="accordion-title">{step.title}</span>
                  <span className="accordion-arrow" style={{ color: activeStep === i ? step.color : 'var(--muted)' }}>
                    {activeStep === i ? '−' : '+'}
                  </span>
                </div>
                {activeStep === i && (
                  <div className="accordion-body">
                    <p className="accordion-tagline" style={{ color: step.color }}>{step.tagline}</p>
                    <p className="accordion-desc">{step.desc}</p>
                  </div>
                )}
                {activeStep === i && (
                  <div className="accordion-bar" style={{ background: step.color }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="process-right">
          <div className="process-detail-card">
            <div className="detail-header">
              <div className="detail-pill" style={{ background: `${current.color}20`, color: current.color, border: `1px solid ${current.color}40` }}>
                Phase {current.num}
              </div>
              <div className="detail-duration">
                <span className="duration-dot" style={{ background: current.color }} />
                {current.duration}
              </div>
            </div>

            <h3 className="detail-title">{current.title}</h3>
            <p className="detail-tagline" style={{ color: current.color }}>{current.tagline}</p>
            <p className="detail-desc">{current.desc}</p>

            <div className="detail-divider" />

            <p className="detail-deliverables-label">Deliverables</p>
            <div className="detail-deliverables">
              {current.deliverables.map((d) => (
                <div className="deliverable-item" key={d}>
                  <span className="deliverable-check" style={{ color: current.color }}>✓</span>
                  {d}
                </div>
              ))}
            </div>

            <div className="detail-progress">
              <div className="progress-label">
                <span>Overall Progress</span>
                <span style={{ color: current.color }}>{activeStep + 1} / {steps.length}</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((activeStep + 1) / steps.length) * 100}%`,
                    background: `linear-gradient(90deg, ${current.color}, ${current.color}80)`,
                    transition: 'width 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
                  }}
                />
              </div>
            </div>

            {activeStep < steps.length - 1 && (
              <button
                className="detail-next-btn"
                style={{ borderColor: `${current.color}50`, color: current.color }}
                onClick={() => setActiveStep(activeStep + 1)}
              >
                Next: {steps[activeStep + 1].title} →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'CEO',
    company: 'Luminary Studio',
    initials: 'SM',
    avatarColor: '#4f6ef7',
    rating: 5,
    text: 'Working with this team was a game-changer. They completely transformed our brand identity and the new website has tripled our inbound leads in just two months. The attention to detail is on another level.',
    project: 'Brand Identity + Website',
    result: '+214% leads',
    resultColor: '#4f6ef7',
  },
  {
    id: 2,
    name: 'James Okafor',
    role: 'Product Manager',
    company: 'Nexus Labs',
    initials: 'JO',
    avatarColor: '#00d4ff',
    rating: 5,
    text: "Delivered a complex SaaS dashboard in under 3 weeks on budget, pixel-perfect, and with animations that genuinely impressed our investors. I have worked with many devs and none come close.",
    project: 'SaaS Dashboard UI',
    result: 'On time & budget',
    resultColor: '#00d4ff',
  },
  {
    id: 3,
    name: 'Elena Rousseau',
    role: 'Founder',
    company: 'FitTrack App',
    initials: 'ER',
    avatarColor: '#7c3aed',
    rating: 5,
    text: "The mobile UI they designed for us has a 4.9 star rating on the App Store. Users specifically mention how intuitive it feels. That does not happen by accident — it is the result of real craft and user empathy.",
    project: 'Mobile App UI/UX',
    result: '4.9 App Store',
    resultColor: '#7c3aed',
  },
  {
    id: 4,
    name: 'Marco Delgado',
    role: 'Marketing Director',
    company: 'Vertex Agency',
    initials: 'MD',
    avatarColor: '#f59e0b',
    rating: 5,
    text: "Our agency site went from embarrassing to award-worthy. We submitted to Awwwards two weeks after launch and got Honorable Mention. Clients now come to us citing the website specifically.",
    project: 'Agency Website',
    result: 'Awwwards HM',
    resultColor: '#f59e0b',
  },
  {
    id: 5,
    name: 'Priya Nair',
    role: 'Head of Design',
    company: 'ShopFlow',
    initials: 'PN',
    avatarColor: '#10b981',
    rating: 5,
    text: 'The e-commerce redesign increased our conversion rate by 38% in the first month. The checkout flow is so smooth that cart abandonment dropped by half. ROI on this project was immediate.',
    project: 'E-commerce Redesign',
    result: '+38% conversion',
    resultColor: '#10b981',
  },
];

function StarRating({ count }) {
  return (
    <div className="star-rating">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star">★</span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isActive }) {
  return (
    <div className={`testi-card${isActive ? ' testi-active' : ''}`}>
      <div className="testi-quote-mark">"</div>
      <StarRating count={testimonial.rating} />
      <p className="testi-text">{testimonial.text}</p>
      <div
        className="testi-result-badge"
        style={{
          background: `${testimonial.resultColor}15`,
          color: testimonial.resultColor,
          borderColor: `${testimonial.resultColor}30`,
        }}
      >
        <span className="testi-result-dot" style={{ background: testimonial.resultColor }} />
        {testimonial.result}
      </div>
      <div className="testi-footer">
        <div className="testi-avatar" style={{ background: `${testimonial.avatarColor}18`, border: `1px solid ${testimonial.avatarColor}40` }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" fill={testimonial.avatarColor} opacity="0.9"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={testimonial.avatarColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
          </svg>
        </div>
        <div className="testi-author">
          <div className="testi-name">{testimonial.name}</div>
          <div className="testi-meta">{testimonial.role} · {testimonial.company}</div>
        </div>
        <div className="testi-project-tag">{testimonial.project}</div>
      </div>
    </div>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 220);
  };

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((active + 1) % testimonials.length);


  const visible = [
    (active - 1 + testimonials.length) % testimonials.length,
    active,
    (active + 1) % testimonials.length,
  ];

  return (
    <section className="testi-section" id="testimonials">
      <div className="testi-bg-glow" />

      <div className="section-header-center">
        <p className="section-label">Social Proof</p>
        <h2 className="section-title">
          Don't take my<br />word for it —<br /><span className="accent-word">theirs.</span>
        </h2>
        <p className="section-subtitle">
          Real results from real clients. Every number is verified, every quote is genuine.
        </p>
      </div>

      <div className="testi-stats-row">
        {[
          { num: '48+', label: 'Happy Clients' },
          { num: '5.0', label: 'Average Rating' },
          { num: '100%', label: 'On-time Delivery' },
          { num: '+38%', label: 'Avg. Conversion Lift' },
        ].map(s => (
          <div className="testi-stat" key={s.label}>
            <div className="testi-stat-num">{s.num}</div>
            <div className="testi-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="testi-stage">
        <button className="testi-nav-btn" onClick={prev}>←</button>

        <div className={`testi-cards-wrap${animating ? ' testi-fade' : ''}`}>
          {visible.map((idx, pos) => (
            <div
              key={idx}
              className={`testi-slot testi-slot-${pos}`}
              onClick={() => pos !== 1 && goTo(idx)}
            >
              <TestimonialCard testimonial={testimonials[idx]} isActive={pos === 1} />
            </div>
          ))}
        </div>

        <button className="testi-nav-btn" onClick={next}>→</button>
      </div>

      <div className="slider-dots" style={{ marginTop: '40px' }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`dot${i === active ? ' active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}

// ─── App ─────────────────────────────────────────────────────────
// ─── FAQ Section ─────────────────────────────────────────────────
const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'It depends on scope — a landing page can be done in 5–7 days, while a full product design + dev build typically takes 3–6 weeks. I give you a precise timeline after our discovery call, and I stick to it.',
  },
  {
    q: 'Do you work with clients outside of Europe?',
    a: 'Absolutely. I work async-first with clients across North America, the Middle East, and Southeast Asia. Time zones have never been a blocker — clear communication and good tooling make it seamless.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A brief (or even just a rough idea), your brand assets if you have them, and a 30-minute kickoff call. I handle the rest — research, structure, design, and code.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a: 'Yes. Every project includes 30 days of post-launch support at no extra cost. After that, I offer monthly retainer packages for clients who need continuous updates, new features, or A/B testing.',
  },
  {
    q: 'Can you redesign an existing website without breaking it?',
    a: 'That is one of my specialties. I audit your current site first — performance, UX, conversion gaps — then redesign and rebuild iteratively so the transition is smooth and your SEO is protected.',
  },
  {
    q: 'What is your pricing like?',
    a: 'Projects are quoted fixed-price based on scope, so you always know the total upfront — no surprise invoices. Landing pages start around €800, full websites from €2,500. Book a call and I will send a detailed quote within 24 hours.',
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' faq-open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-header">
        <span className="faq-num">0{index + 1}</span>
        <span className="faq-question">{faq.q}</span>
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div className="faq-body">
          <p className="faq-answer">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

function FAQ() {
  return (
    <section className="faq-section" id="faq">
      <div className="faq-inner">
        <div className="faq-left">
          <p className="section-label">Got Questions?</p>
          <h2 className="section-title">
            Everything you<br />need to know<br /><span className="accent-word">before we start.</span>
          </h2>
          <p className="about-text" style={{ marginTop: '20px' }}>
            Still have something on your mind? Drop me a message — I reply within a few hours.
          </p>
          <a href="#contact" className="btn-primary" style={{ marginTop: '32px', display: 'inline-flex' }}>
            <span>Ask Me Directly</span>
            <span>→</span>
          </a>
        </div>
        <div className="faq-right">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact SVG Icons ───────────────────────────────────────────
const IconEmail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="3" stroke="#4f6ef7" strokeWidth="1.8"/>
    <path d="M2 8l10 6 10-6" stroke="#4f6ef7" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IconLocation = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#4f6ef7" strokeWidth="1.8" fill="rgba(79,110,247,0.15)"/>
    <circle cx="12" cy="9" r="2.5" stroke="#4f6ef7" strokeWidth="1.8"/>
  </svg>
);

const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#4f6ef7" strokeWidth="1.8"/>
    <path d="M12 7v5l3 3" stroke="#4f6ef7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const contactInfoItems = [
  { icon: <IconEmail />, label: 'Email', value: 'hello@coding.studio' },
  { icon: <IconLocation />, label: 'Location', value: 'Europe (Remote Worldwide)' },
  { icon: <IconClock />, label: 'Response Time', value: 'Within 24 hours' },
];

// ─── Contact Section ──────────────────────────────────────────────
// EmailJS config — replace with your real IDs from emailjs.com
const EMAILJS_SERVICE_ID  = 'service_w0bf1rd';
const EMAILJS_TEMPLATE_ID = 'template_op0wa7q';
const EMAILJS_PUBLIC_KEY  = 'dzh_MYVldtKHUDQQG';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name:  form.name,
        from_email: form.email,
        budget:     form.budget,
        message:    form.message,
      },
      EMAILJS_PUBLIC_KEY
    ).then(() => {
      setStatus('success');
    }).catch(() => {
      setStatus('error');
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-bg-grid" />

      <div className="contact-inner">
        {/* Left info */}
        <div className="contact-left">
          <p className="section-label">Let's Talk</p>
          <h2 className="section-title">
            Ready to build<br />something<br /><span className="accent-word">remarkable?</span>
          </h2>
          <p className="about-text" style={{ marginTop: '20px', marginBottom: '40px' }}>
            Tell me about your project and I will get back to you within 24 hours with ideas, a rough timeline, and a fair quote.
          </p>

          <div className="contact-info-list">
            {contactInfoItems.map(item => (
              <div className="contact-info-item" key={item.label}>
                <div className="contact-info-icon">{item.icon}</div>
                <div>
                  <div className="contact-info-label">{item.label}</div>
                  <div className="contact-info-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-socials">
            {['Dribbble', 'Behance', 'GitHub', 'LinkedIn'].map(s => (
              <a key={s} href="#contact" className="social-link">{s} ↗</a>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div className="contact-right">
          {status === 'success' ? (
            <div className="contact-success">
              <div className="success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1.5"/>
                  <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="success-title">Message sent!</h3>
              <p className="success-desc">Thanks for reaching out. I will get back to you within 24 hours.</p>
              <button className="btn-primary" style={{ marginTop: '24px' }} onClick={() => { setStatus('idle'); setForm({ name: '', email: '', budget: '', message: '' }); }}>
                <span>Send another</span>
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input className="form-input" type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" name="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Budget Range</label>
                <select className="form-input form-select" name="budget" value={form.budget} onChange={handleChange}>
                  <option value="">Select a budget range</option>
                  <option>Under €1,000</option>
                  <option>€1,000 – €3,000</option>
                  <option>€3,000 – €7,000</option>
                  <option>€7,000+</option>
                  <option>Let's discuss</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tell me about your project</label>
                <textarea className="form-input form-textarea" name="message" placeholder="What are you building? What's the goal? Any deadline?" value={form.message} onChange={handleChange} required />
              </div>

              {status === 'error' && (
                <p className="form-error">Something went wrong. Please try again or email me directly.</p>
              )}

              <button type="submit" className="btn-primary form-submit" disabled={status === 'sending'}>
                <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                {status !== 'sending' && <span>→</span>}
              </button>

              <p className="form-note">No spam, no unsolicited follow-ups. Just a real reply.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="nav-logo" style={{ fontSize: '1.6rem', marginBottom: '16px' }}>
            Cod<span>][</span>ng
          </div>
          <p className="footer-tagline">
            Design that converts.<br />Code that scales.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <p className="footer-col-title">Navigation</p>
            {['About', 'Services', 'Portfolio', 'Process', 'Testimonials', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="footer-link">{l}</a>
            ))}
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Services</p>
            {['UI/UX Design', 'Web Development', 'Graphic Design', 'Brand Identity', 'Motion Design'].map(l => (
              <a key={l} href="#services" className="footer-link">{l}</a>
            ))}
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Connect</p>
            {['Dribbble', 'Behance', 'GitHub', 'LinkedIn', 'Twitter / X'].map(l => (
              <a key={l} href="#contact" className="footer-link">{l} ↗</a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <p className="footer-copy">© {new Date().getFullYear()} Cod][ng. All rights reserved.</p>
        <div className="footer-cta-mini">
          <span className="footer-available-dot" />
          <span>Available for new projects</span>
          <a href="#contact" className="footer-cta-link">Start one →</a>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────
function App() {
  return (
    <div className="App">
      <CustomCursor />
      <Navbar />
      <Hero />
      <ProjectSlider />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;