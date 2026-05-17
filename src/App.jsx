import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  html, body, #root { background: #050508; font-family: 'Space Grotesk', sans-serif; color: #E8EAF0; }
  ::selection { background: #6C63FF33; }
  ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0a10; } ::-webkit-scrollbar-thumb { background: #6C63FF; border-radius: 2px; }
  a { color: inherit; text-decoration: none; }
`;

// ── constants ────────────────────────────────────────────────────
const ACCENT = "#6C63FF";
const ACCENT2 = "#00D4FF";
const DARK = "#050508";
const SURFACE = "#0D0D18";
const BORDER = "rgba(108,99,255,0.18)";

const skills = [
  { cat: "Frontend", items: ["Angular", "React", "TypeScript", "JavaScript", "HTML5", "CSS3"] },
  { cat: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT", "Java", "C# / .NET"] },
  { cat: "Python & AI", items: ["OpenCV", "YOLOv8", "Whisper", "MoviePy", "Computer Vision"] },
  { cat: "Databases", items: ["MongoDB", "MySQL", "SQL Server", "JDBC"] },
  { cat: "AI Tools", items: ["ChatGPT", "Claude", "GitHub Copilot", "Cursor AI", "Gemini", "v0"] },
  { cat: "Tools", items: ["Git", "Postman", "Figma", "VS Code", "Google Analytics"] },
];

const experiences = [
  {
    role: "Assistant Professor",
    company: "Sanjay Bhokre Group of Institutes, Miraj",
    period: "Aug 2025 – Present",
    type: "Academic",
    color: "#00D4FF",
    points: [
      "Teaching 7 B.Tech subjects: BI, Web Tech, IoT, Data Structures Lab, UHV, Seminar & Constitution",
      "Designing assignments, question papers, and lab manuals for 200+ students",
      "9 months of academic instruction, mentoring, and curriculum delivery",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "AIQoD",
    period: "Feb 2025 – Jul 2025",
    type: "Full Stack · MEAN Stack",
    color: ACCENT,
    points: [
      "Built full-stack Social Media Management platform with scheduling, analytics & multi-platform posting",
      "Designed secure RESTful APIs with JWT auth and role-based access control",
      "Optimised MongoDB aggregation pipelines, significantly reducing query response time",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "SysTech Software",
    period: "Mar 2023 – Aug 2023",
    type: "Java · Desktop",
    color: "#FF6B9D",
    points: [
      "Developed full-featured Tour Management System using Java, Swing, MySQL & JDBC",
      "Implemented clean three-layer architecture: UI, business logic, and data access",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Itian Solution",
    period: "Jan 2022 – Mar 2022",
    type: ".NET · Windows",
    color: "#FFB347",
    points: [
      "Built Task Manager desktop app with C#, .NET, MySQL, and ADO.NET",
      "Implemented reporting module with filtering, sorting, and export capabilities",
    ],
  },
];

const projects = [
  { name: "BuildMyCV", stack: "React · Node.js · Express", desc: "AI-powered resume builder with template selection, real-time preview, and one-click PDF export.", link: "https://resumeforge-gamma.vercel.app/", tag: "Live" },
  { name: "AirWriter", stack: "Python · OpenCV · Gemini AI · MediaPipe", desc: "Gesture-based virtual writing system with hand tracking and Gemini AI for intelligent text interaction.", link: "https://air-writer.vercel.app/", tag: "Live" },
  { name: "Social Media Platform", stack: "MEAN Stack · JWT · WebSockets", desc: "Full-stack social media management with OAuth, post scheduling, analytics dashboard, and real-time notifications.", link: "https://github.com/nikhilpowar09/Social-Media-Management-", tag: "GitHub" },
  { name: "CaptionGen-AI", stack: "Python · Whisper · Grok API · MoviePy", desc: "AI-powered caption generator that extracts audio from video, converts speech to text, and auto-syncs subtitles.", link: "https://github.com/nikhilpowar09/CaptionGen-AI", tag: "GitHub" },
  { name: "Drowning Detector", stack: "Python · YOLOv8 · OpenCV", desc: "Real-time AI safety monitoring using YOLOv8 object detection with automated alerts for drowning pattern detection.", link: "#", tag: "CV/AI" },
  { name: "EduWatch", stack: "React.js · REST API", desc: "Educational platform UI with interactive learning modules and modern responsive design.", link: "https://eduwatch-ivory.vercel.app/", tag: "Live" },
];

// ── helpers ──────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const Tag = ({ children, color = ACCENT }) => (
  <span style={{
    background: color + "18", border: `1px solid ${color}44`,
    color, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600,
    letterSpacing: "0.04em", textTransform: "uppercase",
  }}>{children}</span>
);

// ── Navbar ────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(24px,5vw,80px)",
        height: 70,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(5,5,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
        transition: "all 0.4s ease",
      }}
    >
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", letterSpacing: "-0.02em" }}>
        NP<span style={{ color: ACCENT }}>.</span>
      </span>
      <div style={{ display: "flex", gap: "clamp(20px,3vw,40px)" }}>
        {["About", "Skills", "Experience", "Projects", "Creator", "Contact"].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} style={{
            fontSize: 14, fontWeight: 500, color: "#9DA0B0", letterSpacing: "0.03em",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = "#fff"}
            onMouseLeave={e => e.target.style.color = "#9DA0B0"}
          >{n}</a>
        ))}
      </div>
    </motion.nav>
  );
};

// ── Hero ──────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "120px clamp(24px,5vw,80px) 80px" }}>
      {/* background grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`, backgroundSize: "60px 60px", opacity: 0.4 }} />
      {/* glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT}22 0%, transparent 70%)`, pointerEvents: "none" }} />

      <motion.div style={{ y, opacity, position: "relative", zIndex: 2, maxWidth: 900, textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <Tag color={ACCENT2}>Available for opportunities</Tag>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(3rem,8vw,7rem)", lineHeight: 1.02,
            letterSpacing: "-0.03em", color: "#fff",
            margin: "24px 0 0",
          }}
        >
          Nikhil<br />
          <span style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT2} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Powar
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ fontSize: "clamp(1rem,2vw,1.3rem)", color: "#9DA0B0", marginTop: 24, lineHeight: 1.7, maxWidth: 680, margin: "24px auto 0" }}
        >
          Full Stack Developer · MEAN Stack · Python & Computer Vision · AI-Powered Development · Technical Educator
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ fontSize: "clamp(0.9rem,1.4vw,1.05rem)", color: "#6B6E80", marginTop: 16, maxWidth: 640, margin: "16px auto 0", lineHeight: 1.8 }}
        >
          Results-driven developer with 3+ years of hands-on experience, B.Tech CS&E (CGPA 8.25), and a published research paper. Currently also an Assistant Professor teaching 7 B.Tech subjects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 48 }}
        >
          <a href="mailto:nikhilpowar4032@gmail.com" style={{
            background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
            color: "#fff", padding: "14px 36px", borderRadius: 12, fontWeight: 600, fontSize: 15,
            letterSpacing: "0.02em", display: "inline-flex", alignItems: "center", gap: 8,
            transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: `0 0 30px ${ACCENT}44`,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 40px ${ACCENT}66`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 0 30px ${ACCENT}44`; }}
          >
            ✉ Get in Touch
          </a>
          <a href="https://github.com/nikhilpowar09" target="_blank" rel="noreferrer" style={{
            background: "transparent", color: "#E8EAF0", padding: "14px 36px", borderRadius: 12, fontWeight: 600, fontSize: 15,
            border: `1px solid ${BORDER}`, letterSpacing: "0.02em",
            transition: "border-color 0.2s, color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = "#E8EAF0"; }}
          >
            GitHub →
          </a>
        </motion.div>

        {/* quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{ display: "flex", gap: "clamp(24px,4vw,64px)", justifyContent: "center", marginTop: 64, flexWrap: "wrap" }}
        >
          {[["3+", "Years Experience"], ["16+", "Projects Built"], ["7", "Subjects Taught"], ["8.25", "B.Tech CGPA"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 13, color: "#6B6E80", marginTop: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

// ── Skills ────────────────────────────────────────────────────────
const Skills = () => (
  <section id="skills" style={{ padding: "100px clamp(24px,5vw,80px)", background: SURFACE }}>
    <FadeUp>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <Tag color={ACCENT}>Expertise</Tag>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", marginTop: 16, letterSpacing: "-0.02em" }}>Technical Skills</h2>
      </div>
    </FadeUp>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
      {skills.map((sk, i) => (
        <FadeUp key={sk.cat} delay={i * 0.07}>
          <div style={{
            background: "#0a0a15", border: `1px solid ${BORDER}`, borderRadius: 16,
            padding: "24px 28px", transition: "border-color 0.3s, transform 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT + "66"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "none"; }}
          >
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: ACCENT, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>{sk.cat}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {sk.items.map(item => (
                <span key={item} style={{ background: "#15152A", color: "#B0B3C8", borderRadius: 8, padding: "5px 12px", fontSize: 13, fontWeight: 500, border: "1px solid rgba(255,255,255,0.06)" }}>{item}</span>
              ))}
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  </section>
);

// ── Experience ────────────────────────────────────────────────────
const Experience = () => (
  <section id="experience" style={{ padding: "100px clamp(24px,5vw,80px)", background: DARK }}>
    <FadeUp>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <Tag color="#FF6B9D">Career</Tag>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", marginTop: 16, letterSpacing: "-0.02em" }}>Experience</h2>
      </div>
    </FadeUp>
    <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
      {/* timeline line */}
      <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 1, background: BORDER }} />
      {experiences.map((exp, i) => (
        <FadeUp key={exp.company} delay={i * 0.1}>
          <div style={{ display: "flex", gap: 32, marginBottom: 48, position: "relative" }}>
            <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: exp.color + "22", border: `2px solid ${exp.color}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: exp.color }} />
            </div>
            <div style={{
              flex: 1, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px 28px",
              transition: "border-color 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = exp.color + "55"}
              onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}
            >
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                <Tag color={exp.color}>{exp.type}</Tag>
                <span style={{ fontSize: 13, color: "#6B6E80", fontWeight: 500 }}>{exp.period}</span>
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(1rem,2vw,1.25rem)", color: "#fff", marginBottom: 4 }}>{exp.role}</h3>
              <p style={{ fontSize: 14, color: exp.color, fontWeight: 600, marginBottom: 14 }}>{exp.company}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {exp.points.map(p => (
                  <li key={p} style={{ fontSize: 14, color: "#9DA0B0", lineHeight: 1.65, paddingLeft: 16, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 8, width: 5, height: 5, borderRadius: "50%", background: exp.color }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  </section>
);

// ── Projects ──────────────────────────────────────────────────────
const Projects = () => {
  const colors = [ACCENT, ACCENT2, "#FF6B9D", "#FFB347", "#00E5A0", "#BF5FFF"];
  return (
    <section id="projects" style={{ padding: "100px clamp(24px,5vw,80px)", background: SURFACE }}>
      <FadeUp>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Tag color={ACCENT2}>Portfolio</Tag>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", marginTop: 16, letterSpacing: "-0.02em" }}>Selected Projects</h2>
          <p style={{ color: "#6B6E80", marginTop: 12, fontSize: 16 }}>16 projects built · 6 highlighted below</p>
        </div>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
        {projects.map((p, i) => (
          <FadeUp key={p.name} delay={i * 0.08}>
            <a href={p.link} target="_blank" rel="noreferrer" style={{ display: "block", textDecoration: "none" }}>
              <div style={{
                background: "#0a0a15", border: `1px solid ${BORDER}`, borderRadius: 16, padding: "28px",
                height: "100%", transition: "border-color 0.3s, transform 0.3s",
                position: "relative", overflow: "hidden",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = colors[i] + "66"; e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: colors[i] + "12", pointerEvents: "none" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <Tag color={colors[i]}>{p.tag}</Tag>
                  <span style={{ color: colors[i], fontSize: 20, opacity: 0.8 }}>↗</span>
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(1.1rem,2vw,1.3rem)", color: "#fff", marginBottom: 10 }}>{p.name}</h3>
                <p style={{ fontSize: 13, color: "#6B6E80", marginBottom: 14, lineHeight: 1.6 }}>{p.desc}</p>
                <p style={{ fontSize: 12, color: colors[i], fontWeight: 600, letterSpacing: "0.03em" }}>{p.stack}</p>
              </div>
            </a>
          </FadeUp>
        ))}
      </div>
      <FadeUp delay={0.3}>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="https://github.com/nikhilpowar09" target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8, color: ACCENT, fontWeight: 600, fontSize: 15,
            border: `1px solid ${ACCENT}44`, padding: "12px 28px", borderRadius: 10, transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = ACCENT + "14"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            View all 16 projects on GitHub →
          </a>
        </div>
      </FadeUp>
    </section>
  );
};

// ── Social / Creator Section ───────────────────────────────────────
const socialChannels = [
  {
    id: "yt1",
    platform: "YouTube",
    handle: "@a-zcontentt",
    desc: "A–Z Content hub covering diverse topics, tutorials, and insights.",
    url: "https://youtube.com/@a-zcontentt?si=yUKfydNE6BPTcKKU",
    color: "#FF0000",
    gradient: "linear-gradient(135deg,#FF0000,#FF4444)",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    tag: "YouTube",
  },
  {
    id: "yt2",
    platform: "YouTube",
    handle: "@fulltocontent",
    desc: "Full-to Content — packed with value-driven videos and creative content.",
    url: "https://youtube.com/@fulltocontent?si=iw3K9GA1bI7Asfay",
    color: "#FF0000",
    gradient: "linear-gradient(135deg,#CC0000,#FF0000)",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    tag: "YouTube",
  },
  {
    id: "yt3",
    platform: "YouTube",
    handle: "@jaymaharashtrachowk",
    desc: "Jay Maharashtra Chowk — regional culture, community, and Maharashtrian pride.",
    url: "https://youtube.com/@jaymaharashtrachowk?si=NbR312A3m-xFlmvc",
    color: "#FF6B00",
    gradient: "linear-gradient(135deg,#FF6B00,#FF0000)",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    tag: "YouTube",
  },
  {
    id: "fb1",
    platform: "Facebook",
    handle: "Facebook Page",
    desc: "Community updates, events, and social engagement on Facebook.",
    url: "https://www.facebook.com/profile.php?id=61571473962220",
    color: "#1877F2",
    gradient: "linear-gradient(135deg,#1877F2,#42A5F5)",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    tag: "Facebook",
  },
  {
    id: "ig1",
    platform: "Instagram",
    handle: "@swamisamarthparivaar",
    desc: "Swami Samarth Parivaar — devotional content, spiritual wisdom, and community.",
    url: "https://www.instagram.com/swamisamarthparivaar/",
    color: "#E1306C",
    gradient: "linear-gradient(135deg,#833AB4,#E1306C,#F77737)",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
    tag: "Instagram",
  },
  {
    id: "ig2",
    platform: "Instagram",
    handle: "@aestheticporga",
    desc: "Aesthetic vibes, creative photography, and lifestyle content.",
    url: "https://www.instagram.com/aestheticporga/",
    color: "#C13584",
    gradient: "linear-gradient(135deg,#405DE6,#C13584,#E1306C)",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
    tag: "Instagram",
  },
  {
    id: "ig3",
    platform: "Instagram",
    handle: "@kybhava",
    desc: "Kybhava — expressive, cultural, and relatable content in Marathi.",
    url: "https://www.instagram.com/kybhava/",
    color: "#F77737",
    gradient: "linear-gradient(135deg,#F77737,#E1306C,#833AB4)",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
    tag: "Instagram",
  },
];

const platformColors = {
  YouTube: "#FF0000",
  Instagram: "#E1306C",
  Facebook: "#1877F2",
};

const SocialCreator = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "YouTube", "Instagram", "Facebook"];
  const filtered = activeFilter === "All" ? socialChannels : socialChannels.filter(c => c.platform === activeFilter);

  return (
    <section id="creator" style={{ padding: "100px clamp(24px,5vw,80px)", background: DARK, position: "relative", overflow: "hidden" }}>
      {/* decorative blobs */}
      <div style={{ position: "absolute", top: "10%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,#FF000018 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,#E1306C14 0%,transparent 70%)", pointerEvents: "none" }} />

      <FadeUp>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Tag color="#FF0000">Beyond Code</Tag>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", marginTop: 16, letterSpacing: "-0.02em" }}>
            Content Creator
          </h2>
          <p style={{ color: "#6B6E80", marginTop: 12, fontSize: 16, maxWidth: 520, margin: "12px auto 0", lineHeight: 1.7 }}>
            Beyond development, I run multiple YouTube channels, Instagram pages, and a Facebook community — spanning tech, culture, spirituality, and aesthetics.
          </p>
        </div>
      </FadeUp>

      {/* stats bar */}
      <FadeUp delay={0.1}>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,5vw,64px)", flexWrap: "wrap", margin: "40px 0 48px", padding: "24px 40px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
          {[["3", "YouTube Channels"], ["3", "Instagram Pages"], ["1", "Facebook Page"], ["7", "Total Platforms"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#fff" }}>{n}</div>
              <div style={{ fontSize: 12, color: "#6B6E80", fontWeight: 500, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* filter tabs */}
      <FadeUp delay={0.15}>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: "9px 24px", borderRadius: 10, fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.25s",
              border: activeFilter === f ? "none" : `1px solid ${BORDER}`,
              background: activeFilter === f
                ? (f === "YouTube" ? "#FF0000" : f === "Instagram" ? "linear-gradient(135deg,#833AB4,#E1306C)" : f === "Facebook" ? "#1877F2" : `linear-gradient(135deg,${ACCENT},${ACCENT2})`)
                : "transparent",
              color: activeFilter === f ? "#fff" : "#9DA0B0",
              boxShadow: activeFilter === f ? `0 4px 20px ${platformColors[f] || ACCENT}44` : "none",
            }}>{f}</button>
          ))}
        </div>
      </FadeUp>

      {/* channel cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((ch, i) => (
            <motion.div
              key={ch.id}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: -16 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href={ch.url} target="_blank" rel="noreferrer" style={{ display: "block", textDecoration: "none" }}>
                <div style={{
                  background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20,
                  padding: "28px", position: "relative", overflow: "hidden",
                  transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = ch.color + "66";
                    e.currentTarget.style.boxShadow = `0 16px 40px ${ch.color}22`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* gradient strip at top */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: ch.gradient, borderRadius: "20px 20px 0 0" }} />
                  {/* glow blob */}
                  <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: ch.color + "18", pointerEvents: "none" }} />

                  {/* header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: ch.gradient,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", flexShrink: 0,
                      boxShadow: `0 6px 20px ${ch.color}44`,
                    }}>
                      {ch.icon}
                    </div>
                    <span style={{
                      background: ch.color + "1A", border: `1px solid ${ch.color}44`,
                      color: ch.color, borderRadius: 8, padding: "4px 12px",
                      fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>{ch.tag}</span>
                  </div>

                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(1rem,2vw,1.2rem)", color: "#fff", marginBottom: 6 }}>{ch.handle}</h3>
                  <p style={{ fontSize: 13, color: "#9DA0B0", lineHeight: 1.65, marginBottom: 20 }}>{ch.desc}</p>

                  {/* CTA */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: ch.color, fontWeight: 600, fontSize: 13 }}>
                    <span>Visit {ch.platform}</span>
                    <span style={{ fontSize: 16 }}>↗</span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* marquee strip */}
      <FadeUp delay={0.2}>
        <div style={{ marginTop: 64, overflow: "hidden", position: "relative" }}>
          <div style={{ display: "flex", gap: 32, animation: "marquee 18s linear infinite", width: "max-content" }}>
            {[...Array(3)].flatMap(() => ["YouTube Creator", "Instagram Pages", "Content Creator", "Maharashtrian Culture", "Spiritual Content", "Aesthetic Vibes", "Facebook Community", "Digital Storyteller"]).map((t, i) => (
              <span key={i} style={{ whiteSpace: "nowrap", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(1.2rem,2vw,1.6rem)", color: i % 2 === 0 ? "#fff" : "#6B6E80", letterSpacing: "-0.01em" }}>
                {t} <span style={{ color: ACCENT, marginRight: 16 }}>·</span>
              </span>
            ))}
          </div>
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
      </FadeUp>
    </section>
  );
};

// ── Education & Certs ─────────────────────────────────────────────
const EducationCerts = () => (
  <section style={{ padding: "100px clamp(24px,5vw,80px)", background: DARK }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48 }}>
      {/* Education */}
      <div>
        <FadeUp>
          <Tag color={ACCENT}>Academic</Tag>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#fff", marginTop: 16, letterSpacing: "-0.02em", marginBottom: 32 }}>Education</h2>
        </FadeUp>
        {[
          { degree: "B.Tech — CS&E", school: "Sharad Institute of Technology", year: "2019–2023", grade: "CGPA: 8.25 / 10" },
          { degree: "HSC", school: "SMT Akkatai Narsappa Nandrekar Jr. College", year: "2018–2019", grade: "70.31%" },
          { degree: "SSC", school: "J.K.V and SMT A.N.N Jr. College", year: "2016–2017", grade: "87.20%" },
        ].map((e, i) => (
          <FadeUp key={e.degree} delay={i * 0.1}>
            <div style={{ borderLeft: `2px solid ${ACCENT}44`, paddingLeft: 20, marginBottom: 28 }}>
              <p style={{ fontWeight: 700, color: "#fff", fontSize: 16 }}>{e.degree}</p>
              <p style={{ color: "#9DA0B0", fontSize: 13, marginTop: 4 }}>{e.school}</p>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <span style={{ fontSize: 12, color: "#6B6E80" }}>{e.year}</span>
                <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600 }}>{e.grade}</span>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Certifications */}
      <div>
        <FadeUp>
          <Tag color={ACCENT2}>Certified</Tag>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#fff", marginTop: 16, letterSpacing: "-0.02em", marginBottom: 32 }}>Certifications</h2>
        </FadeUp>
        {[
          { name: "MEAN Stack Developer", org: "ITpreneur Institute, Pune" },
          { name: "Google Analytics Certified", org: "Google  ·  ID: 266087308", note: "Feb 2024 – Dec 2025" },
          { name: "Task Management Software (.NET/C#)", org: "Itian Software", note: "Jan–Mar 2022" },
          { name: "C Programming", org: "RacksonsIT, Jaysingpur", note: "Dec 2019 – Jan 2020" },
          { name: "AI for Educators", org: "Engineering Classrooms & Curriculum", note: "Jan 2026" },
          { name: "Project-Based Learning", org: "Outcome-Oriented Engineering Education", note: "April 2026" },
        ].map((c, i) => (
          <FadeUp key={c.name} delay={i * 0.08}>
            <div style={{ display: "flex", gap: 14, marginBottom: 20, alignItems: "flex-start" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT2, marginTop: 7, flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 600, color: "#E8EAF0", fontSize: 14 }}>{c.name}</p>
                <p style={{ color: "#6B6E80", fontSize: 12, marginTop: 2 }}>{c.org}{c.note ? " · " + c.note : ""}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ── Contact ────────────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" style={{ padding: "100px clamp(24px,5vw,80px)", background: SURFACE, textAlign: "center" }}>
    <FadeUp>
      <Tag color="#FF6B9D">Let's Connect</Tag>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,6vw,4rem)", color: "#fff", marginTop: 16, letterSpacing: "-0.03em" }}>
        Ready to build<br />something great?
      </h2>
      <p style={{ color: "#6B6E80", fontSize: 17, marginTop: 20, maxWidth: 480, margin: "20px auto 0", lineHeight: 1.7 }}>
        Open to full-stack development roles, freelance projects, and interesting collaborations.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 48 }}>
        {[
          { label: "Email", value: "nikhilpowar4032@gmail.com", href: "mailto:nikhilpowar4032@gmail.com", color: ACCENT },
          { label: "LinkedIn", value: "nikhil-powar", href: "https://linkedin.com/in/nikhil-powar-99577121a", color: ACCENT2 },
          { label: "GitHub", value: "nikhilpowar09", href: "https://github.com/nikhilpowar09", color: "#FF6B9D" },
          { label: "Phone", value: "+91 93593 66493", href: "tel:+919359366493", color: "#FFB347" },
        ].map(c => (
          <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{
            display: "flex", flexDirection: "column", gap: 6, alignItems: "center",
            background: "#0a0a15", border: `1px solid ${BORDER}`, borderRadius: 14,
            padding: "20px 28px", minWidth: 180, transition: "border-color 0.3s, transform 0.3s",
            textDecoration: "none",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = c.color + "66"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "none"; }}
          >
            <span style={{ fontSize: 12, color: c.color, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.label}</span>
            <span style={{ fontSize: 14, color: "#B0B3C8", fontWeight: 500 }}>{c.value}</span>
          </a>
        ))}
      </div>
    </FadeUp>
  </section>
);

// ── Footer ─────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: DARK, padding: "32px clamp(24px,5vw,80px)", borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>NP<span style={{ color: ACCENT }}>.</span></span>
    <span style={{ color: "#6B6E80", fontSize: 13 }}>Nikhil Powar · Full Stack Developer · Pune, India</span>
    <span style={{ color: "#6B6E80", fontSize: 13 }}>Published Researcher · IRJMETS50600114394</span>
  </footer>
);

// ── App ────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{style}</style>
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <SocialCreator />
      <EducationCerts />
      <Contact />
      <Footer />
    </>
  );
}
