import { useState, useRef, useEffect, useCallback } from "react";
import "../App.css";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import bgVideo from "../assets/bg-video.mp4";
// ── Template imports ──────────────────────────────────────────────────────────
import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
// ── Components ────────────────────────────────────────────────────────────────
import TemplateSwitcher from "../components/TemplateSwitcher";
// ─────────────────────────────────────────────────────────────────────────────

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="url(#spark1)" />
    <path d="M19 15L19.8 17.2L22 18L19.8 18.8L19 21L18.2 18.8L16 18L18.2 17.2L19 15Z" fill="url(#spark2)" />
    <path d="M5 3L5.6 4.9L7.5 5.5L5.6 6.1L5 8L4.4 6.1L2.5 5.5L4.4 4.9L5 3Z" fill="url(#spark3)" />
    <defs>
      <linearGradient id="spark1" x1="4" y1="2" x2="20" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#38bdf8" />
      </linearGradient>
      <linearGradient id="spark2" x1="16" y1="15" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f472b6" /><stop offset="1" stopColor="#a78bfa" />
      </linearGradient>
      <linearGradient id="spark3" x1="2.5" y1="3" x2="7.5" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" /><stop offset="1" stopColor="#34d399" />
      </linearGradient>
    </defs>
  </svg>
);

const LoadingDots = () => (
  <span className="loading-dots">
    <span /><span /><span />
  </span>
);

const initialCV = {
  name: "Alexandra Chen",
  title: "Senior Product Designer & UX Strategist",
  email: "alex.chen@designstudio.io",
  phone: "+1 (415) 820-9341",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/alexchen",
  summary: "Visionary product designer with 8+ years crafting award-winning digital experiences for Fortune 500 companies. Specializing in design systems, user research, and cross-functional leadership that transforms complex problems into elegant, intuitive solutions.",
  experience: [
    {
      id: 1,
      role: "Lead Product Designer",
      company: "Stripe",
      period: "2021 — Present",
      bullets: [
        "Redesigned the merchant dashboard, increasing task completion rates by 34% across 2M+ users",
        "Led a team of 6 designers to ship the new Stripe Checkout experience",
        "Established design system with 120+ components adopted across 12 product teams"
      ]
    },
    {
      id: 2,
      role: "Senior UX Designer",
      company: "Airbnb",
      period: "2018 — 2021",
      bullets: [
        "Drove the redesign of the host onboarding flow, reducing drop-off by 28%",
        "Partnered with engineering to introduce motion design principles across the app",
        "Conducted 60+ user research sessions informing the 2020 product roadmap"
      ]
    }
  ],
  skills: ["Figma", "Design Systems", "User Research", "Prototyping", "React", "Motion Design", "A/B Testing", "Design Strategy"],
  education: {
    degree: "B.F.A. in Interaction Design",
    school: "California College of the Arts",
    year: "2016"
  }
};

// ── Template registry ─────────────────────────────────────────────────────────
// Pour ajouter un nouveau template : insérez une entrée ici uniquement.
// Les champs `description` et `icon` sont transmis au TemplateSwitcher.
const TEMPLATES = [
  {
    id:          "modern",
    label:       "Modern",
    description: "Glassmorphism · Couleurs",
    component:   ModernTemplate,
  },
  {
    id:          "classic",
    label:       "Classic",
    description: "Typographie · Noir & Blanc",
    component:   ClassicTemplate,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [cv, setCv] = useState(initialCV);
  const [loadingField, setLoadingField] = useState(null);
  const [updatedField, setUpdatedField] = useState(null);
  const [activeSection, setActiveSection] = useState("basics");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const previewRef = useRef(null);
  const cardRef    = useRef(null);  // 3D tilt — inchangé
  const printRef   = useRef(null);  // cible d'impression : .cv-paper uniquement

  // ── Print / Export PDF ────────────────────────────────────────────────────
  // pageStyle injecté dans le <head> pendant l'impression uniquement.
  // • Remplace backdrop-filter et rgba semi-transparents par leurs équivalents
  //   opaques pour que le rendu PDF conserve le style glassmorphism.
  // • Réinitialise le transform 3D (tilt) à l'identité pour une page plate.
  // • @page force le format A4 sans marges navigateur.
  const PRINT_PAGE_STYLE = `
    @page {
      size: A4 portrait;
      margin: 0;
    }
    @media print {
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: #0d0d1a !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      /* Neutralise le tilt 3D pendant l'impression */
      .cv-card {
        transform: none !important;
        box-shadow: none !important;
      }
      /* Rend les calques de profondeur invisibles */
      .cv-shadow-layer {
        display: none !important;
      }
      /* Glassmorphism : remplace backdrop-filter par un fond opaque équivalent */
      .cv-paper {
        background: rgba(255, 255, 255, 0.08) !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        box-shadow: none !important;
        width: 210mm !important;
        min-height: 297mm !important;
        margin: 0 !important;
        padding: 12mm 14mm !important;
        border-radius: 0 !important;
      }
      /* Supprime les animations de surbrillance AI au print */
      .field-updated {
        animation: none !important;
        background: transparent !important;
      }
    }
  `;

  const handlePrint = useReactToPrint({
    contentRef:    printRef,
    documentTitle: `CV_${cv.name.replace(/\s+/g, "_")}`,
    pageStyle:     PRINT_PAGE_STYLE,
  });
  // ─────────────────────────────────────────────────────────────────────────────

  // ── Download PDF via html2pdf.js ──────────────────────────────────────────
  // Cible cardRef.current (le wrapper .cv-card) pour capturer le rendu complet.
  // Téléchargement direct sans boîte de dialogue, haute qualité (scale: 2).
  const handleDownloadPDF = () => {
    const element = cardRef.current;
    if (!element) return;

    const options = {
      margin:      0,
      filename:    `${cv.name.replace(/\s+/g, "_")}_Resume.pdf`,
      image:       { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale:           2,
        useCORS:         true,
        backgroundColor: "#0d0d1a",
        // Neutralise le transform 3D (tilt) au moment du snapshot
        onclone: (clonedDoc) => {
          const card = clonedDoc.querySelector(".cv-card");
          if (card) card.style.transform = "none";
          const layers = clonedDoc.querySelectorAll(".cv-shadow-layer");
          layers.forEach(l => (l.style.display = "none"));
        },
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };
  // ─────────────────────────────────────────────────────────────────────────────

  // ── Wizard steps (inchangé) ────────────────────────────────────────────────
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  // ─────────────────────────────────────────────────────────────────────────────

  // ── Template state ────────────────────────────────────────────────────────
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  // Composant résolu depuis le registre
  const ActiveTemplate = TEMPLATES.find((t) => t.id === selectedTemplate)?.component ?? ModernTemplate;
  // ─────────────────────────────────────────────────────────────────────────────

  // ── 3D Tilt (inchangé) ────────────────────────────────────────────────────
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 6;
    const rotX = -((y - cy) / cy) * 4;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });
  // ─────────────────────────────────────────────────────────────────────────────

  // ── AI helpers (inchangés) ────────────────────────────────────────────────
  const callAI = async (fieldKey, prompt, currentValue) => {
    setLoadingField(fieldKey);
    setUpdatedField(null);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a professional CV/resume writer. ${prompt}\n\nCurrent text:\n"${currentValue}"\n\nReturn ONLY the improved text, no explanations, no quotes, no markdown.`
          }]
        })
      });
      const data = await response.json();
      const result = data.content?.[0]?.text?.trim() || currentValue;
      return result;
    } catch (err) {
      console.error(err);
      return currentValue;
    } finally {
      setLoadingField(null);
    }
  };

  const optimizeField = async (fieldKey, prompt, currentValue, setter) => {
    const result = await callAI(fieldKey, prompt, currentValue);
    setter(result);
    setUpdatedField(fieldKey);
    setTimeout(() => setUpdatedField(null), 2000);
  };

  const optimizeSummary = () => optimizeField(
    "summary",
    "Rewrite this professional summary to be more compelling, specific, and impactful. Use strong action verbs and quantify achievements where possible. Keep it 2-3 sentences.",
    cv.summary,
    (val) => setCv(p => ({ ...p, summary: val }))
  );

  const optimizeExperience = (id, bullets) => optimizeField(
    `exp-${id}`,
    "Improve these bullet points to be more impactful with stronger action verbs and quantified results. Return each bullet on a new line starting with •",
    bullets.join("\n"),
    (val) => {
      const newBullets = val.split("\n").map(b => b.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean);
      setCv(p => ({
        ...p,
        experience: p.experience.map(exp =>
          exp.id === id ? { ...exp, bullets: newBullets } : exp
        )
      }));
    }
  );
  // ─────────────────────────────────────────────────────────────────────────────

  const sections = [
    { id: "basics",     label: "Identity",   icon: "◈" },
    { id: "summary",    label: "Summary",    icon: "◉" },
    { id: "experience", label: "Experience", icon: "◆" },
    { id: "skills",     label: "Skills",     icon: "◇" },
    { id: "education",  label: "Education",  icon: "△" },
  ];

  return (
    <div className="app">
      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
      </div>

      {/* Header */}
      <header className="app-header">
        <div className="logo">
          <div className="logo-icon">
            <span>CV</span>
            <div className="logo-glow" />
          </div>
          <div className="logo-text">
            <span className="logo-title">CraftCV</span>
            <span className="logo-sub">AI-Powered Resume Builder</span>
          </div>
        </div>
        <nav className="header-nav">

          {/* ── Template Picker ────────────────────────────────────────────── */}
          <TemplateSwitcher
            templates={TEMPLATES}
            selected={selectedTemplate}
            onSelect={setSelectedTemplate}
          />
          {/* ─────────────────────────────────────────────────────────────── */}

          <button className="nav-btn" onClick={handlePrint}>⤓ Export PDF</button>
          <button className="nav-btn primary-btn">
            <SparkleIcon /> Upgrade Pro
          </button>
        </nav>
      </header>

      {/* Main Layout */}
      <main className="main-layout">
        {/* LEFT: Editor Panel */}
        <aside className="editor-panel">
          <div className="panel-header">
            <h2>Editor</h2>
            <div className="autosave"><span className="dot" />Auto-saved</div>
          </div>

          {/* Section Nav */}
          <div className="section-nav">
            {sections.map(s => (
              <button
                key={s.id}
                className={`section-btn ${activeSection === s.id ? "active" : ""}`}
                onClick={() => setActiveSection(s.id)}
              >
                <span className="section-icon">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Form Areas */}
          <div className="form-body">

            {activeSection === "basics" && (
              <div className="form-section fade-in">
                <div className="field-group">
                  <label>Full Name</label>
                  <input className="field-input" value={cv.name}
                    onChange={e => setCv(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="field-group">
                  <label>Professional Title</label>
                  <input className="field-input" value={cv.title}
                    onChange={e => setCv(p => ({ ...p, title: e.target.value }))} />
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label>Email</label>
                    <input className="field-input" value={cv.email}
                      onChange={e => setCv(p => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="field-group">
                    <label>Phone</label>
                    <input className="field-input" value={cv.phone}
                      onChange={e => setCv(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label>Location</label>
                    <input className="field-input" value={cv.location}
                      onChange={e => setCv(p => ({ ...p, location: e.target.value }))} />
                  </div>
                  <div className="field-group">
                    <label>LinkedIn</label>
                    <input className="field-input" value={cv.linkedin}
                      onChange={e => setCv(p => ({ ...p, linkedin: e.target.value }))} />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "summary" && (
              <div className="form-section fade-in">
                <div className="field-group">
                  <label>Professional Summary</label>
                  <textarea className="field-textarea" rows={5} value={cv.summary}
                    onChange={e => setCv(p => ({ ...p, summary: e.target.value }))} />
                </div>
                <button
                  className={`magic-btn ${loadingField === "summary" ? "loading" : ""} ${updatedField === "summary" ? "success" : ""}`}
                  onClick={optimizeSummary}
                  disabled={loadingField === "summary"}
                >
                  <SparkleIcon />
                  {loadingField === "summary" ? <><LoadingDots /> Optimizing...</> : updatedField === "summary" ? "✓ Optimized!" : "Optimize with AI"}
                </button>
              </div>
            )}

            {activeSection === "experience" && (
              <div className="form-section fade-in">
                {cv.experience.map((exp, idx) => (
                  <div className="exp-card" key={exp.id}>
                    <div className="exp-card-header">
                      <span className="exp-number">0{idx + 1}</span>
                      <div className="exp-header-fields">
                        <input className="field-input" placeholder="Role" value={exp.role}
                          onChange={e => setCv(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, role: e.target.value } : x) }))} />
                        <input className="field-input" placeholder="Company" value={exp.company}
                          onChange={e => setCv(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, company: e.target.value } : x) }))} />
                        <input className="field-input" placeholder="Period" value={exp.period}
                          onChange={e => setCv(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, period: e.target.value } : x) }))} />
                      </div>
                    </div>
                    <div className="field-group">
                      <label>Bullet Points (one per line)</label>
                      <textarea className="field-textarea" rows={4}
                        value={exp.bullets.join("\n")}
                        onChange={e => setCv(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, bullets: e.target.value.split("\n") } : x) }))} />
                    </div>
                    <button
                      className={`magic-btn ${loadingField === `exp-${exp.id}` ? "loading" : ""} ${updatedField === `exp-${exp.id}` ? "success" : ""}`}
                      onClick={() => optimizeExperience(exp.id, exp.bullets)}
                      disabled={!!loadingField}
                    >
                      <SparkleIcon />
                      {loadingField === `exp-${exp.id}` ? <><LoadingDots /> Rewriting...</> : updatedField === `exp-${exp.id}` ? "✓ Done!" : "Boost with AI"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "skills" && (
              <div className="form-section fade-in">
                <div className="field-group">
                  <label>Skills (comma separated)</label>
                  <textarea className="field-textarea" rows={3}
                    value={cv.skills.join(", ")}
                    onChange={e => setCv(p => ({ ...p, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))} />
                </div>
                <div className="skills-preview-chips">
                  {cv.skills.map((sk, i) => <span className="skill-chip" key={i}>{sk}</span>)}
                </div>
              </div>
            )}

            {activeSection === "education" && (
              <div className="form-section fade-in">
                <div className="field-group">
                  <label>Degree</label>
                  <input className="field-input" value={cv.education.degree}
                    onChange={e => setCv(p => ({ ...p, education: { ...p.education, degree: e.target.value } }))} />
                </div>
                <div className="field-group">
                  <label>School / University</label>
                  <input className="field-input" value={cv.education.school}
                    onChange={e => setCv(p => ({ ...p, education: { ...p.education, school: e.target.value } }))} />
                </div>
                <div className="field-group">
                  <label>Year</label>
                  <input className="field-input" value={cv.education.year}
                    onChange={e => setCv(p => ({ ...p, education: { ...p.education, year: e.target.value } }))} />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT: Live Preview */}
        <section className="preview-panel" ref={previewRef}>

          {/* ── Background Video ──────────────────────────────────────────── */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position:   "absolute",
              inset:      0,
              width:      "100%",
              height:     "100%",
              objectFit:  "cover",
              zIndex:     -1,
              pointerEvents: "none",
            }}
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          {/* Overlay semi-transparent pour préserver la lisibilité du CV */}
          <div
            className="video-overlay"
            style={{
              position:   "absolute",
              inset:      0,
              background: "rgba(8, 8, 20, 0.55)",
              zIndex:     0,
              pointerEvents: "none",
            }}
          />
          {/* ─────────────────────────────────────────────────────────────── */}
          <div className="preview-header">
            <span className="preview-label">Live Preview</span>
            <div className="preview-actions">
              <button className="preview-btn">A4 ↕</button>
              <button className="preview-btn" onClick={handleDownloadPDF}>⤓ Download PDF</button>
            </div>
          </div>

          {/* 3D Card Wrapper */}
          <div
            className="cv-scene"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="cv-card"
              ref={cardRef}
              style={{
                transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              {/* ── CV Paper : rendu conditionnel selon le template choisi ── */}
              {/* printRef cible uniquement ce nœud — cardRef (tilt 3D) inchangé */}
              <div className="cv-paper" ref={printRef}>
                <ActiveTemplate data={cv} updatedField={updatedField} />
              </div>
              {/* ──────────────────────────────────────────────────────────── */}

              {/* 3D depth layers */}
              <div className="cv-shadow-layer layer-1" />
              <div className="cv-shadow-layer layer-2" />
              <div className="cv-shadow-layer layer-3" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
