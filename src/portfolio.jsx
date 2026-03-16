import { useState, useEffect, useRef } from "react";
import Vaibav from "./assets/Vaibav.jpg"
import RiceLogo from "./assets/rice-logo.jpeg";
import SRMLogo from "./assets/srm-logo.png";
import WinnipegLogo from "./assets/winnipeg-logo.jpeg";
import AffeftaLogo from "./assets/affekta-logo.jpeg";


const NAV_LINKS = ["About", "Education", "Experience", "Projects", "Publications & Articles", "Skills", "Contact"];

const SKILLS = {
  Programming: ["Python", "Java", "C++", "JavaScript", "SQL"],
  Frameworks: ["FastAPI", "React", "Flask", "Spring Boot", "Node.js"],
  Tools: ["Docker", "Git", "ROS", "CUDA", "Linux"],
  "Cloud / Data": ["AWS", "PostgreSQL", "Bigtable", "Vector DBs"],
  "Machine Learning": ["TensorFlow", "PyTorch", "Scikit-learn", "Transformers", "Hugging Face", "LangChain"],
  "Distributed Systems": ["REST APIs", "Microservices", "JWT Authentication", "System Design", "Caching"],
  "Communication Skills": ["Cross-functional Coordination", "Team Collaboration", "Presentation Skills"],
  Hobbies: ["Solving Puzzles", "Chess", "Soccer", "Art", "Music"],
};

const EXPERIENCES = [
  {
    company: "Affekta LLC",
    role: "Software Engineer Intern - AI/Machine Learning",
    period: "Oct 2025 – Dec 2025",
    color: "#00f5ff",
    logo: AffeftaLogo,
    bullets: [
      "Built an anomaly detection evaluation framework for NASA STTR Phase II space habitat telemetry systems",
      "Generated synthetic fault scenarios to test unknown-unknown failures in machine learning models",
      "Improved reliability of ML pipelines through automated testing and data validation workflows",
    ],
  },
  {
    company: "Rice University (HCAIR Group)",
    role: "Software Engineer Intern - AI/Robotics",
    period: "Jun 2025 – Aug 2025",
    color: "#bf00ff",
    logo: RiceLogo,
    bullets: [
      "Built a high-fidelity digital twin pipeline using 10,000+ RGB-D frames to reconstruct indoor task environments for robotic simulation",
      "Developed CUDA-accelerated processing to improve reconstruction speed and reduce latency in simulation pipelines",
      "Integrated simulation environments with Genesis simulator and ROS-based robotics workflows",
    ],
  },
  {
    company: "University of Winnipeg",
    role: "NLP Research Intern",
    period: "Mar 2023 – Aug 2023",
    color: "#0066ff",
    logo: WinnipegLogo,
    bullets: [
      "Developed text classification models using XLNet and transformer architectures on 50k+ records",
      "Improved classification accuracy by 12% through feature engineering and hyperparameter tuning",
      "Built scalable preprocessing pipelines for large-scale text data",
    ],
  },
];

const PROJECTS = [
  {
    title: "RAGBot — Retrieval Augmented Chatbot",
    description: "Built a retrieval-augmented chatbot capable of answering questions using semantic search and contextual LLM responses. Processed over 1 million Reddit posts using vector embeddings, FAISS indexing, and similarity search to retrieve relevant context for generation.",
    tech: ["Python", "FastAPI", "Vector DBs", "LLM APIs"],
    color: "#bf00ff",
    icon: "🧠",
    link: "https://github.com/ShrikantMalagiRice/Computer-Science-Student-Helper",
  },
  {
    title: "TicketTron — Online Movie Ticket Booking Platform",
    description: "Built a full-stack movie ticket booking platform allowing users to browse movies, select seats, complete reservations through a responsive interface. Implemented secure backend booking workflows with validation and concurrency-safe services supporting 100+ parallel reservation requests.",
    tech: ["React", "Spring Boot", "JavaScript", "SQL"],
    color: "#00d4ff",
    icon: "🎟️",
    link: "https://github.com/vaibav-malpeddi/MovieTicket-Booking"
  },
  {
    title: "URLino — Distributed URL Shortener",
    description: "Built URLino, a distributed URL shortener using FastAPI, React, and Google Bigtable for scalable key-value storage. Implemented APIs for short URL generation and redirection with efficient lookup operations. Applied caching and distributed systems principles to support concurrent requests with low-latency redirects. Designed a modular backend architecture for reliable and scalable URL resolution.",
    tech: ["FastAPI", "Bigtable", "React", "Distributed Systems"],
    color: "#00ff88",
    icon: "🔗",
    link: "https://github.com/AlexXiang604/URLino"
  },
  {
    title: "Adaptive Face Creation Through Iterative Feedback",
    description: "Built a generative AI image refinement pipeline using GLIGEN and ControlNet with region-based inpainting guided by MediaPipe facial landmarks, enabling targeted facial edits through iterative user feedback. Evaluated outputs across 250+ prompt-feedback iterations using CLIP similarity scoring and region-level alignment checks to stabilize facial structure during refinement.",
    tech: ["Python", "GLIGEN", "ControlNet", "MediaPipe", "CLIP"],
    color: "#ff4d9d",
    icon: "🎨",
    link: "https://github.com/ShrikantMalagiRice/Adaptive-Face-Creation-Through-Iterative-Feedback"
  },
  {
    title: "Malicious URL Detection with Hybrid Bloom Filters",
    description: "Designed a multi-stage malicious URL detection system combining dual-layer Bloom filters with LSTM-based classifiers to improve detection reliability. Reduced false positives by 20–30% while achieving 93.8% detection accuracy through optimized hash functions and scalable URL analysis pipelines.",
    tech: ["Python", "NumPy", "scikit-learn", "TensorFlow", "Bloom Filters"],
    color: "#ffaa00",
    icon: "🛡️",
    link: "https://github.com/vaibav-malpeddi/LearnedBloomFilter"
  },
  {
    title: "ECG Abnormality Detection",
    description: "Achieved 98.8% accuracy using CNN ensembles on 5,000+ ECG samples. Built preprocessing, evaluation pipelines for medical image analysis. Implemented signal normalization, feature extraction to improve model stability. Designed training and validation workflows to evaluate model performance.",
    tech: ["Python", "TensorFlow", "CNN", "Machine Learning"],
    color: "#ff6b35",
    icon: "❤️",
  },
];

const SKILL_BARS = [
  { label: "Software Engineering", level: 92, color: "#00f5ff" },
  { label: "AI/Machine Learning", level: 88, color: "#bf00ff" },
  { label: "Distributed Systems", level: 82, color: "#0066ff" },
  { label: "Backend Systems", level: 85, color: "#00ff88" },
  { label: "Data Engineering", level: 78, color: "#ff6b35" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      color: ["#00f5ff", "#bf00ff", "#0066ff"][Math.floor(Math.random() * 3)],
      alpha: Math.random() * 0.6 + 0.2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });
      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,245,255,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} />;
}

function GlowText({ children, color = "#00f5ff", className = "" }) {
  return (
    <span
      className={className}
      style={{ color, textShadow: `0 0 20px ${color}, 0 0 40px ${color}80, 0 0 80px ${color}40` }}
    >
      {children}
    </span>
  );
}

function NeonButton({ children, onClick, color = "#00f5ff", outline = false, href }) {
  const style = outline
    ? {
        border: `1px solid ${color}`,
        color,
        background: "transparent",
        boxShadow: `0 0 10px ${color}40, inset 0 0 10px ${color}10`,
      }
    : {
        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
        border: `1px solid ${color}`,
        color,
        boxShadow: `0 0 20px ${color}60, 0 0 40px ${color}30`,
      };

  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      style={{
        ...style,
        padding: "10px 24px",
        borderRadius: "4px",
        fontFamily: "'Orbitron', monospace",
        fontSize: "12px",
        letterSpacing: "2px",
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-block",
        transition: "all 0.3s ease",
        textTransform: "uppercase",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 30px ${color}90, 0 0 60px ${color}50`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = outline
          ? `0 0 10px ${color}40, inset 0 0 10px ${color}10`
          : `0 0 20px ${color}60, 0 0 40px ${color}30`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </Tag>
  );
}

function GlassCard({ children, color = "#00f5ff", className = "", style: extraStyle = {} }) {
  return (
    <div
      className={className}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${color}30`,
        borderRadius: "12px",
        boxShadow: `0 0 20px ${color}15, inset 0 0 20px ${color}05`,
        transition: "all 0.3s ease",
        ...extraStyle,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `1px solid ${color}70`;
        e.currentTarget.style.boxShadow = `0 0 40px ${color}30, inset 0 0 20px ${color}10`;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = `1px solid ${color}30`;
        e.currentTarget.style.boxShadow = `0 0 20px ${color}15, inset 0 0 20px ${color}05`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </div>
  );
}

// Social Icons
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// eslint-disable-next-line no-unused-vars
function SocialLink({ href, icon: IconComponent, color = "#00f5ff", label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "44px",
        height: "44px",
        border: `1px solid ${color}50`,
        borderRadius: "8px",
        background: `${color}10`,
        transition: "all 0.3s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = color;
        e.currentTarget.style.background = `${color}25`;
        e.currentTarget.style.boxShadow = `0 0 20px ${color}60`;
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `${color}10`;
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <IconComponent />
    </a>
  );
}

export default function Portfolio() {
  const [activeNav] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Software Engineer | AI/ML | Distributed Systems";

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div style={{ background: "#020817", minHeight: "100vh", fontFamily: "'Share Tech Mono', monospace", color: "#e0e0e0", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020817; }
        ::-webkit-scrollbar-thumb { background: #00f5ff50; border-radius: 3px; }
        .fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-in.visible { opacity: 1; transform: translateY(0); }
        .scan-line {
          background: linear-gradient(transparent 50%, rgba(0,245,255,0.02) 50%);
          background-size: 100% 4px;
          pointer-events: none;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px #00f5ff40; }
          50% { box-shadow: 0 0 40px #00f5ff80, 0 0 80px #00f5ff40; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slide-right { from { width: 0; } to { width: var(--target-width); } }
        .skill-bar-fill { animation: slide-right 1.5s ease forwards; }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hero-name {
          background: linear-gradient(135deg, #00f5ff, #bf00ff, #0066ff, #00f5ff);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease infinite;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hero-name-text { font-size: 2.5rem !important; }
          .hero-buttons { flex-wrap: wrap; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Particles />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(2,8,23,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,245,255,0.15)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "18px" }}>
          <GlowText color="#00f5ff">V.R.M</GlowText>
          <span style={{ color: "#ffffff40", margin: "0 6px" }}>://</span>
          <GlowText color="#bf00ff" style={{ fontSize: "12px" }}>portfolio</GlowText>
        </div>

        <div className="nav-links" style={{ display: "flex", gap: "32px" }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Orbitron', monospace", fontSize: "11px",
                letterSpacing: "2px", textTransform: "uppercase",
                color: activeNav === link ? "#00f5ff" : "#888",
                transition: "color 0.3s ease",
                padding: "4px 0",
                borderBottom: activeNav === link ? "1px solid #00f5ff" : "1px solid transparent",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#00f5ff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = activeNav === link ? "#00f5ff" : "#888"; }}
            >
              {link}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          style={{ display: "none", background: "none", border: "none", color: "#00f5ff", cursor: "pointer", fontSize: "24px" }}
          className="mobile-menu-btn"
        >
          ☰
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 40px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "900px", width: "100%", textAlign: "center" }}>

          {/* Profile Image */}
          <img
            src={Vaibav}
            alt="Vaibav Malpeddi"
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #00f5ff",
              boxShadow: "0 0 30px #00f5ff60",
              marginBottom: "24px"
            }}
          />

          {/* Status badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(0,245,255,0.08)",
            border: "1px solid #00f5ff30",
            borderRadius: "20px",
            padding: "6px 16px",
            marginBottom: "32px"
          }}>
            <span style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00ff88",
              boxShadow: "0 0 8px #00ff88",
              animation: "pulse-glow 2s infinite"
            }} />
            <span style={{
              fontSize: "11px",
              color: "#00f5ff",
              letterSpacing: "2px",
              fontFamily: "'Orbitron', monospace"
            }}>
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          <h1 className="hero-name hero-name-text" style={{
            fontFamily: "'Orbitron', monospace",
            fontWeight: 900,
            fontSize: "4.5rem",
            lineHeight: 1.1,
            marginBottom: "20px",
            letterSpacing: "-1px"
          }}>
            Vaibav Malpeddi
          </h1>

          <div style={{ fontSize: "14px", color: "#888", letterSpacing: "3px", marginBottom: "24px", fontFamily: "'Share Tech Mono', monospace", minHeight: "22px" }}>
            {typedText}
            <span style={{ animation: "blink 1s infinite", color: "#00f5ff" }}>_</span>
          </div>

          <p style={{ fontSize: "16px", color: "#aaa", lineHeight: 1.8, maxWidth: "640px", margin: "0 auto 48px", fontFamily: "'Share Tech Mono', monospace" }}>
            Master of Computer Science graduate from{" "}
            <span style={{ color: "#00f5ff" }}>Rice University</span>{" "}
            passionate about building intelligent systems, scalable software, and AI-driven solutions.
          </p>

          <div className="hero-buttons" style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "48px", flexWrap: "wrap" }}>
            <NeonButton color="#00f5ff" onClick={() => scrollTo("Projects")}>View Projects</NeonButton>
            <NeonButton color="#bf00ff" outline href="Vaibav_Malpeddi_Resume_Portfolio.pdf" target="_blank">Download Resume</NeonButton>
            <NeonButton color="#0066ff" outline onClick={() => scrollTo("Contact")}>Contact Me</NeonButton>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <SocialLink href="https://www.linkedin.com/in/vaibavrmalpeddi" icon={LinkedInIcon} color="#00f5ff" label="LinkedIn" />
            <SocialLink href="https://github.com/vaibavrmalpeddi" icon={GitHubIcon} color="#bf00ff" label="GitHub" />
            <SocialLink href="mailto:vaibavrmalpeddi@gmail.com" icon={EmailIcon} color="#0066ff" label="Email" />
          </div>

          {/* Scroll hint */}
          <div style={{ marginTop: "80px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.4 }}>
            <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, transparent, #00f5ff)", animation: "float 2s ease-in-out infinite" }} />
            <span style={{ fontSize: "10px", letterSpacing: "3px", color: "#00f5ff" }}>SCROLL</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 40px", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeader title="About Me" subtitle="01" color="#00f5ff" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }} className="about-grid">
          <div>
            <p style={{ fontSize: "15px", lineHeight: 2, color: "#bbb", marginBottom: "24px" }}>
              I am a Software Engineer with experience in{" "}
              <span style={{ color: "#00f5ff" }}>Machine learning</span>,{" "}
              <span style={{ color: "#bf00ff" }}>AI simulation</span>,{" "}
              <span style={{ color: "#0066ff" }}>Distributed systems</span>, and data-driven applications.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 2, color: "#bbb" }}>
              I completed my Master’s in Computer Science at Rice University, where I worked on projects involving high-fidelity digital twin environments for AI research, scalable retrieval systems, and distributed backend platforms. Through these experiences, I explored how intelligent systems interact with complex environments, how large datasets can be efficiently indexed and retrieved, and how modern software architectures support real-world AI applications. My work focuses on building scalable software systems, intelligent ML pipelines, and data-driven applications that operate reliably at scale, combining strong software engineering principles with machine learning to develop systems that can move from research concepts into practical, real-world deployment.
            </p>
          </div>

          <div>
            <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {Object.entries(SKILLS).map(([category, items]) => (
                <GlassCard key={category} color="#00f5ff" style={{ padding: "16px" }}>
                  <div style={{ fontSize: "10px", color: "#00f5ff", letterSpacing: "2px", fontFamily: "'Orbitron', monospace", marginBottom: "12px", textTransform: "uppercase" }}>{category}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {items.map((skill) => (
                      <span key={skill} style={{ fontSize: "11px", color: "#ccc", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: "3px", padding: "3px 8px" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      
        {/* EDUCATION */}
  <section id="education" style={{ padding: "100px 40px", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
    <SectionHeader title="Education" subtitle="02" color="#ff6b35" />

    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

      {/* Rice University */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <img src={RiceLogo} alt="Rice University" style={{ width: "50px", height: "50px", borderRadius: "8px" }} />
        <div>
          <h3 style={{ fontSize: "18px", color: "#fff", marginBottom: "4px" }}>Rice University</h3>
          <p style={{ fontSize: "14px", color: "#bbb", marginBottom: "8px" }}>
            Master of Computer Science • GPA: 3.9 / 4.0
          </p>

          <ul style={{ color: "#bbb", fontSize: "14px", lineHeight: "1.6" }}>

            <li>
              <strong><GlowText color="#00f5ff">Software Engineering Methodology:</GlowText></strong>  Designed and built <b>URLino</b>, a distributed URL shortener using React, Spring Boot, Redis caching, and Google Bigtable; implemented JWT-secured REST APIs, caching strategies, and high-availability architecture to support scalable URL redirection services.
            </li>

            <li>
              <strong><GlowText color="#00f5ff">Design & Analysis of Algorithms:</GlowText></strong> Analyzed and implemented a 2-approximation treewidth algorithm using tree decomposition and balanced separators to evaluate graph complexity, studying optimization techniques that reduce decomposition width while preserving computational guarantees.
            </li>

            <li>
              <strong><GlowText color="#00f5ff">Deep Learning Vision & Language:</GlowText></strong> Built an adaptive face generation pipeline using GLIGEN and ControlNet with region-guided inpainting based on MediaPipe facial landmarks, iteratively refining images through user feedback and evaluating outputs with CLIP similarity metrics.
            </li>

            <li>
              <strong><GlowText color="#00f5ff">Information Retrieval:</GlowText></strong> Developed <b>RAGBot</b>, a scalable retrieval system indexing 1M+ documents using FAISS and MiniLM embeddings with an LLM inference layer (Qwen-1.5B), improving top-5 retrieval relevance by 25% while maintaining sub-300ms query latency.
            </li>

          </ul>
        </div>
      </div>


      {/* SRM University */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <img src={SRMLogo} alt="SRM University" style={{ width: "50px", height: "50px", borderRadius: "8px" }} />
        <div>
          <h3 style={{ fontSize: "18px", color: "#fff", marginBottom: "4px" }}>SRM University</h3>
          <p style={{ fontSize: "14px", color: "#bbb" }}>
            Bachelor of Technology in Computer Science • GPA: 3.9 / 4.0
          </p>
          <ul style={{ color: "#bbb", fontSize: "14px", lineHeight: "1.6", marginTop: "10px" }}>

          <li>
            <strong><GlowText color="#00f5ff">Data Structures:</GlowText></strong> Developed a strong foundation in fundamental data structures and algorithms, applying them to solve computational problems and optimize program efficiency.
          </li>

          <li>
            <strong><GlowText color="#00f5ff">Object-Oriented Programming:</GlowText></strong> Learned the principles of object-oriented design including encapsulation, inheritance, and polymorphism, and applied them in multiple software development projects.
          </li>

          <li>
            <strong><GlowText color="#00f5ff">Python Programming:</GlowText></strong> Built several applications using Python while gaining experience with scripting, automation, and problem-solving through real-world programming assignments.
          </li>

          <li>
            <strong><GlowText color="#00f5ff">Artificial Intelligence:</GlowText></strong> Studied foundational AI concepts including machine learning models and intelligent systems, and developed a document classification project using TensorFlow and Ludwig.
          </li>

        </ul>
        </div>
      </div>

    </div>
  </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px 40px", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeader title="Experience" subtitle="03" color="#bf00ff" />

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 40px", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeader title="Projects" subtitle="04" color="#0066ff" />

        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* PUBLICATIONS & ARTICLES */}
    <section id="publications" style={{ padding: "100px 40px", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
      <SectionHeader title="Publications & Articles" subtitle="05" color="#ff6b35" />

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <GlassCard color="#ff6b35" style={{ padding: "28px" }}>

          <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "16px", color: "#ff6b35", marginBottom: "8px" }}>
            A Random-key Based Second-level Encryption for Reversible Data Hiding in Encrypted Images
          </h3>

          <p style={{ fontSize: "13px", color: "#888", marginBottom: "14px", fontFamily: "'Share Tech Mono', monospace" }}>
            IEEE Xplore Publication
          </p>

          <p style={{ fontSize: "14px", color: "#bbb", lineHeight: 1.7, marginBottom: "18px" }}>
            This work explores secure data embedding within encrypted images using a reversible data hiding approach. 
            The proposed method introduces a second-layer encryption mechanism driven by random key generation, enabling 
            hidden information to be embedded while still allowing full recovery of the original image. By improving the 
            embedding strategy and encryption structure, the system increases payload capacity while maintaining reliable 
            image reconstruction and minimizing decoding errors.
          </p>

          <NeonButton
            color="#ff6b35"
            outline
            href="https://ieeexplore.ieee.org/document/10067978"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Publication
          </NeonButton>

        </GlassCard>
      </div>
    </section>

      {/* SKILLS VIZ */}
      <section id="skills" style={{ padding: "100px 40px", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeader title="Core Skills" subtitle="06" color="#00ff88" />
        <SkillBars />
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 40px", position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeader title="Contact" subtitle="07" color="#00f5ff" />

        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <GlassCard color="#00f5ff" style={{ padding: "48px", animation: "pulse-glow 3s ease-in-out infinite" }}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>📡</div>
            <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "20px", color: "#00f5ff", marginBottom: "16px" }}>
              Let's Build Something
            </h3>
            <p style={{ color: "#999", lineHeight: 1.8, marginBottom: "36px", fontSize: "14px" }}>
              Interested in collaborating or discussing opportunities? Let's connect.
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}>
              <NeonButton color="#00f5ff" href="mailto:vaibavrmalpeddi@gmail.com">Email Me</NeonButton>
              <NeonButton color="#bf00ff" outline href="https://www.linkedin.com/in/vaibavrmalpeddi">LinkedIn</NeonButton>
              <NeonButton color="#0066ff" outline href="https://github.com/vaibav-malpeddi">GitHub</NeonButton>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <SocialLink href="https://www.linkedin.com/in/vaibavrmalpeddi" icon={LinkedInIcon} color="#00f5ff" label="LinkedIn" />
              <SocialLink href="https://github.com/vaibav-malpeddi" icon={GitHubIcon} color="#bf00ff" label="GitHub" />
              <SocialLink href="mailto:vaibavrmalpeddi@gmail.com" icon={EmailIcon} color="#0066ff" label="Email" />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(0,245,255,0.1)", padding: "32px 40px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "12px", color: "#555" }}>
          © 2026{" "}
          <GlowText color="#00f5ff">Vaibav Malpeddi</GlowText>
          <span style={{ color: "#333", margin: "0 8px" }}>|</span>
          <span>All Rights Reserved</span>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <SocialLink href="https://www.linkedin.com/in/vaibavrmalpeddi" icon={LinkedInIcon} color="#00f5ff" label="LinkedIn" />
          <SocialLink href="https://github.com/vaibav-malpeddi" icon={GitHubIcon} color="#bf00ff" label="GitHub" />
          <SocialLink href="mailto:vaibavrmalpeddi@gmail.com" icon={EmailIcon} color="#0066ff" label="Email" />
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ title, subtitle, color }) {
  return (
    <div style={{ marginBottom: "60px", display: "flex", alignItems: "center", gap: "24px" }}>
      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "64px", fontWeight: 900, color: `${color}15`, letterSpacing: "-2px", lineHeight: 1 }}>
        {subtitle}
      </span>
      <div>
        <div style={{ width: "40px", height: "2px", background: color, boxShadow: `0 0 10px ${color}`, marginBottom: "8px" }} />
        <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "32px", fontWeight: 700, color: "#fff", letterSpacing: "2px" }}>
          <GlowText color={color}>{title}</GlowText>
        </h2>
      </div>
    </div>
  );
}

function ExperienceCard({ exp, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-40px)",
        transition: `all 0.6s ease ${index * 0.15}s`,
      }}
    >
      <GlassCard color={exp.color} style={{ padding: "28px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <img src={exp.logo} alt={exp.company} style={{ width: "40px", height: "40px", borderRadius: "8px", marginBottom: "8px" }} />
            <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "16px", color: exp.color, marginBottom: "4px", textShadow: `0 0 15px ${exp.color}80` }}>
              {exp.company}
            </h3>
            <div style={{ fontSize: "13px", color: "#ccc" }}>{exp.role}</div>
          </div>
          <div style={{ fontSize: "11px", color: `${exp.color}90`, fontFamily: "'Orbitron', monospace", background: `${exp.color}10`, border: `1px solid ${exp.color}30`, borderRadius: "4px", padding: "4px 12px", whiteSpace: "nowrap" }}>
            {exp.period}
          </div>
        </div>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
          {exp.bullets.map((b, i) => (
            <li key={i} style={{ display: "flex", gap: "12px", fontSize: "13px", color: "#aaa", lineHeight: 1.7 }}>
              <span style={{ color: exp.color, flexShrink: 0, marginTop: "4px" }}>▶</span>
              {b}
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.6s ease ${index * 0.1}s`,
      }}
    >
      <GlassCard color={project.color} style={{ padding: "28px", height: "100%" }}>
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>{project.icon}</div>
        <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "14px", color: project.color, marginBottom: "12px", lineHeight: 1.4, textShadow: `0 0 15px ${project.color}60` }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "13px", color: "#999", lineHeight: 1.8, marginBottom: "20px" }}>
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "10px",
                color: project.color,
                background: `${project.color}15`,
                border: `1px solid ${project.color}40`,
                borderRadius: "3px",
                padding: "3px 8px",
                fontFamily: "'Orbitron', monospace",
                letterSpacing: "1px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        {project.link && (
          <div style={{ marginTop: "16px" }}>
            <NeonButton color={project.color} outline href={project.link} target="_blank" rel="noopener noreferrer">
              View Repository
            </NeonButton>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

function SkillBars() {
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "28px", maxWidth: "700px" }}>
      {SKILL_BARS.map((skill, i) => (
        <div key={skill.label} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)", transition: `all 0.6s ease ${i * 0.12}s` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "#ccc", fontFamily: "'Orbitron', monospace", letterSpacing: "1px" }}>{skill.label}</span>
            <span style={{ fontSize: "12px", color: skill.color, fontFamily: "'Orbitron', monospace" }}>{skill.level}%</span>
          </div>
          <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden", border: `1px solid ${skill.color}20` }}>
            <div
              style={{
                height: "100%",
                width: inView ? `${skill.level}%` : "0%",
                background: `linear-gradient(to right, ${skill.color}80, ${skill.color})`,
                boxShadow: `0 0 10px ${skill.color}`,
                borderRadius: "3px",
                transition: `width 1.2s ease ${i * 0.15}s`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
