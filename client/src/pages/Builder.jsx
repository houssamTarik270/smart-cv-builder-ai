import { useState, useRef, useEffect, useCallback } from "react";
import "../App.css";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import bgVideo from "../assets/bg-video.mp4";
import BlueTemplate from "../templates/BlueTemplate"; // Zid hadi
import WavyTemplate from "../templates/WavyTemplate";


import ModernTemplate  from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";


import TemplateSwitcher from "../components/TemplateSwitcher";
import OliveTemplate from "../templates/OliveTemplate";
import OrganicTemplate from "../templates/OrganicTemplate";
import { useNavigate } from "react-router-dom";




const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="url(#spark1)" />
    <path d="M19 15L19.8 17.2L22 18L19.8 18.8L19 21L18.2 18.8L16 18L18.2 17.2L19 15Z" fill="url(#spark2)" />
    <path d="M5 3L5.6 4.9L7.5 5.5L5.6 6.1L5 8L4.4 6.1L2.5 5.5L4.4 4.9L5 3Z"  fill="url(#spark3)" />
    <defs>
      <linearGradient id="spark1" x1="4"   y1="2"  x2="20" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#38bdf8" />
      </linearGradient>
      <linearGradient id="spark2" x1="16" y1="15" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f472b6" /><stop offset="1" stopColor="#a78bfa" />
      </linearGradient>
      <linearGradient id="spark3" x1="2.5" y1="3"  x2="7.5" y2="8"  gradientUnits="userSpaceOnUse">
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
  name:     "Alexandra Chen",
  title:    "Senior Product Designer & UX Strategist",
  email:    "alex.chen@designstudio.io",
  phone:    "+1 (415) 820-9341",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/alexchen",
  summary:  "Visionary product designer with 8+ years crafting award-winning digital experiences for Fortune 500 companies. Specializing in design systems, user research, and cross-functional leadership that transforms complex problems into elegant, intuitive solutions.",
  experience: [
    {
      id:      1,
      role:    "Lead Product Designer",
      company: "Stripe",
      period:  "2021 — Present",
      bullets: [
        "Redesigned the merchant dashboard, increasing task completion rates by 34% across 2M+ users",
        "Led a team of 6 designers to ship the new Stripe Checkout experience",
        "Established design system with 120+ components adopted across 12 product teams",
      ],
    },
    {
      id:      2,
      role:    "Senior UX Designer",
      company: "Airbnb",
      period:  "2018 — 2021",
      bullets: [
        "Drove the redesign of the host onboarding flow, reducing drop-off by 28%",
        "Partnered with engineering to introduce motion design principles across the app",
        "Conducted 60+ user research sessions informing the 2020 product roadmap",
      ],
    },
  ],
  skills: [
    "Figma", "Design Systems", "User Research", "Prototyping",
    "React", "Motion Design", "A/B Testing", "Design Strategy",
  ],
  education: {
    degree: "B.F.A. in Interaction Design",
    school: "California College of the Arts",
    year:   "2016",
  },
};


const TEMPLATES = [
  {
    id:          "modern",
    label:       "Modern",
    description: "Glassmorphism · Couleurs",
    component:   ModernTemplate,
  },
  {
    id:          "wavy",
    label:       "Wavy",
    description: "Organic Wave · Bold Red",
    component:   WavyTemplate,
  },
  {
    id:          "blue", // Hada l-jdid
    label:       "Professional",
    description: "Blue Header · 2 Columns",
    component:   BlueTemplate,
  },
  {
    id:          "classic",
    label:       "Classic",
    description: "Typographie · Noir & Blanc",
    component:   ClassicTemplate,
  },
  {
    id:          "olive",
    label:       "Olive Professional",
    description: "Khaki Green · Corporate",
    component:   OliveTemplate,
  },
  {
    id:          "organic",
    label:       "Organic Mindmap",
    description: "Creative Blob · Curved Typography",
    component:   OrganicTemplate,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const navigate = useNavigate(); 
  const [cv, setCv]                         = useState(initialCV);
  const [loadingField, setLoadingField]     = useState(null);
  const [updatedField, setUpdatedField]     = useState(null);
  const [activeSection, setActiveSection]   = useState("basics");
  const [tilt, setTilt]                     = useState({ x: 0, y: 0 });
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const previewRef = useRef(null);
  const cardRef    = useRef(null); 
  const printRef   = useRef(null); 

  const ActiveTemplate =
    TEMPLATES.find((t) => t.id === selectedTemplate)?.component ?? ModernTemplate;

  const nextTemplate = () => {
    const currentIndex = TEMPLATES.findIndex(t => t.id === selectedTemplate);
    const nextIndex = (currentIndex + 1) % TEMPLATES.length;
    setSelectedTemplate(TEMPLATES[nextIndex].id);
  };

  const prevTemplate = () => {
    const currentIndex = TEMPLATES.findIndex(t => t.id === selectedTemplate);
    const prevIndex = (currentIndex - 1 + TEMPLATES.length) % TEMPLATES.length;
    setSelectedTemplate(TEMPLATES[prevIndex].id);
  };

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCv(prev => ({ ...prev, profileImage: imageUrl }));
    }
  };
  

  
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
      .cv-card {
        transform: none !important;
        box-shadow: none !important;
      }
      .cv-shadow-layer {
        display: none !important;
      }
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


  const saveCvToDatabase = async (cvData) => {
    try {
      const token = localStorage.getItem('token'); 

      const response = await fetch("http://localhost:5000/api/cv/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          
          cvData: cvData,
          createdAt: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error("Mochkil f l-hifd dyal CV");
      }
      
      const data = await response.json();
      console.log("CV t-sauvgarda b naja7 f MongoDB!", data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleDownloadPDF = async () => {
   
    try {
      await saveCvToDatabase(cv); 
    } catch (error) {
      console.error("Mochkil f sauvegarde dyal CV 9bel téléchargement:", error);
    }

    
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
        onclone: (clonedDoc) => {
          const card   = clonedDoc.querySelector(".cv-card");
          const layers = clonedDoc.querySelectorAll(".cv-shadow-layer");
          if (card) card.style.transform = "none";
          layers.forEach(l => (l.style.display = "none"));
        },
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };
  
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  

  
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;
    const cx   = rect.width  / 2;
    const cy   = rect.height / 2;
    setTilt({
      x: -((y - cy) / cy) * 4,
      y:  ((x - cx) / cx) * 6,
    });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });
  

  // ── AI helpers ────────────────────────────────────────────────────────────
  const callAI = async (fieldKey, prompt, currentValue) => {
    setLoadingField(fieldKey);
    setUpdatedField(null);
    try {
      const token = localStorage.getItem('token'); 

      
      const response = await fetch("http://localhost:5000/api/ai/optimize", {
        method:  "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          field: fieldKey,
          text: currentValue
        }),
      });

      if (!response.ok) {
        throw new Error("Mochkil f l-Backend dyal IA");
      }

      const data = await response.json();
      
     
      const result = data.optimizedText || currentValue;
      return result;

    } catch (err) {
      console.error("Erreur f t-7sin b l-IA:", err);
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
      const newBullets = val
        .split("\n")
        .map(b  => b.replace(/^[•\-\*]\s*/, "").trim())
        .filter(Boolean);
      setCv(p => ({
        ...p,
        experience: p.experience.map(exp =>
          exp.id === id ? { ...exp, bullets: newBullets } : exp
        ),
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

      {/* ── Ambient Background ─────────────────────────────────────────────── */}
      <div className="ambient-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
      </div>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
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
          <TemplateSwitcher
            templates={TEMPLATES}
            selected={selectedTemplate}
            onSelect={setSelectedTemplate}
          />
          <button className="nav-btn" onClick={handlePrint}>⤓ Export PDF</button>
          <button className="nav-btn primary-btn">
            <SparkleIcon /> Upgrade Pro
          </button>
        </nav>
      </header>

      {/* ── Main Layout ────────────────────────────────────────────────────── */}
      <main className="main-layout">

        {/* ── LEFT : Editor Panel ────────────────────────────────────────── */}
        <aside className="editor-panel">

          <div className="panel-header">
            <h2>Editor</h2>
            <div className="autosave">
              <span className="dot" />
              Auto-saved
            </div>
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

            {/* 1. Basics / Identity */}
            {activeSection === "basics" && (
              <div className="form-section fade-in">

                <div className="field-group">
                  <label>Full Name</label>
                  <input
                    className="field-input"
                    value={cv.name}
                    onChange={e => setCv(p => ({ ...p, name: e.target.value }))}
                  />
                </div>

                <div className="field-group">
                  <label>Professional Title</label>
                  <input
                    className="field-input"
                    value={cv.title}
                    onChange={e => setCv(p => ({ ...p, title: e.target.value }))}
                  />
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label>Email</label>
                    <input
                      className="field-input"
                      value={cv.email}
                      onChange={e => setCv(p => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                  <div className="field-group">
                    <label>Phone</label>
                    <input
                      className="field-input"
                      value={cv.phone}
                      onChange={e => setCv(p => ({ ...p, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label>Location</label>
                    <input
                      className="field-input"
                      value={cv.location}
                      onChange={e => setCv(p => ({ ...p, location: e.target.value }))}
                    />
                  </div>
                  <div className="field-group">
                    <label>LinkedIn</label>
                    <input
                      className="field-input"
                      value={cv.linkedin}
                      onChange={e => setCv(p => ({ ...p, linkedin: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-section-separator" style={{ margin: "20px 0", borderTop: "1px solid #444" }} />

                <div className="field-group">
                  <label>Custom Fields</label>
                  {cv.customFields?.map((field, index) => (
                    <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                      <input
                        className="field-input"
                        placeholder="Label"
                        value={field.label}
                        onChange={e => {
                          const newFields = [...cv.customFields];
                          newFields[index].label = e.target.value;
                          setCv(p => ({ ...p, customFields: newFields }));
                        }}
                      />
                      <input
                        className="field-input"
                        placeholder="Value"
                        value={field.value}
                        onChange={e => {
                          const newFields = [...cv.customFields];
                          newFields[index].value = e.target.value;
                          setCv(p => ({ ...p, customFields: newFields }));
                        }}
                      />
                      <button
                        className="delete-btn"
                        onClick={() => setCv(p => ({
                          ...p,
                          customFields: p.customFields.filter((_, i) => i !== index),
                        }))}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-btn"
                    onClick={() => setCv(p => ({
                      ...p,
                      customFields: [...(p.customFields || []), { label: "", value: "" }],
                    }))}
                  >
                    + Add Custom Field
                  </button>
                </div>

              </div>
            )}

            {/* 2. Summary */}
            {activeSection === "summary" && (
              <div className="form-section fade-in">

                <div className="field-group">
                  <label>Professional Summary</label>
                  <textarea
                    className="field-textarea"
                    rows={5}
                    value={cv.summary}
                    onChange={e => setCv(p => ({ ...p, summary: e.target.value }))}
                  />
                </div>

                <button
                  className={`magic-btn ${loadingField === "summary" ? "loading" : ""} ${updatedField === "summary" ? "success" : ""}`}
                  onClick={optimizeSummary}
                  disabled={loadingField === "summary"}
                >
                  <SparkleIcon />
                  {loadingField === "summary"
                    ? <><LoadingDots /> Optimizing...</>
                    : updatedField === "summary"
                      ? "✓ Optimized!"
                      : "Optimize with AI"
                  }
                </button>

                <div className="form-section-separator" style={{ margin: "20px 0", borderTop: "1px solid #444" }} />

                <div className="field-group">
                  <label>Summary Custom Fields</label>
                  {cv.summaryCustomFields?.map((field, index) => (
                    <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                      <input
                        className="field-input"
                        placeholder="Label"
                        value={field.label}
                        onChange={e => {
                          const newFields = [...cv.summaryCustomFields];
                          newFields[index].label = e.target.value;
                          setCv(p => ({ ...p, summaryCustomFields: newFields }));
                        }}
                      />
                      <input
                        className="field-input"
                        placeholder="Value"
                        value={field.value}
                        onChange={e => {
                          const newFields = [...cv.summaryCustomFields];
                          newFields[index].value = e.target.value;
                          setCv(p => ({ ...p, summaryCustomFields: newFields }));
                        }}
                      />
                      <button
                        className="delete-btn"
                        onClick={() => setCv(p => ({
                          ...p,
                          summaryCustomFields: p.summaryCustomFields.filter((_, i) => i !== index),
                        }))}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-btn"
                    onClick={() => setCv(p => ({
                      ...p,
                      summaryCustomFields: [...(p.summaryCustomFields || []), { label: "", value: "" }],
                    }))}
                  >
                    + Add Summary Custom Field
                  </button>
                </div>

              </div>
            )}

            {/* 3. Experience */}
            {activeSection === "experience" && (
              <div className="form-section fade-in">

                {cv.experience.map((exp, idx) => (
                  <div key={exp.id} className="exp-card" style={{ marginBottom: "20px" }}>

                    <div className="exp-card-header">
                      <span className="exp-number">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="exp-header-fields">
                        <input
                          className="field-input"
                          placeholder="Role"
                          value={exp.role}
                          onChange={e => setCv(p => ({
                            ...p,
                            experience: p.experience.map(x =>
                              x.id === exp.id ? { ...x, role: e.target.value } : x
                            ),
                          }))}
                        />
                        <input
                          className="field-input"
                          placeholder="Company"
                          value={exp.company}
                          onChange={e => setCv(p => ({
                            ...p,
                            experience: p.experience.map(x =>
                              x.id === exp.id ? { ...x, company: e.target.value } : x
                            ),
                          }))}
                        />
                        <input
                          className="field-input"
                          placeholder="Period"
                          value={exp.period}
                          onChange={e => setCv(p => ({
                            ...p,
                            experience: p.experience.map(x =>
                              x.id === exp.id ? { ...x, period: e.target.value } : x
                            ),
                          }))}
                        />
                      </div>
                    </div>

                    <div className="field-group">
                      <label>BULLET POINTS (ONE PER LINE)</label>
                      <textarea
                        className="field-textarea"
                        rows={4}
                        value={exp.bullets.join("\n")}
                        onChange={e => setCv(p => ({
                          ...p,
                          experience: p.experience.map(x =>
                            x.id === exp.id
                              ? { ...x, bullets: e.target.value.split("\n") }
                              : x
                          ),
                        }))}
                      />
                    </div>

                    <button
                      className="magic-btn"
                      onClick={() => optimizeExperience(exp.id, exp.bullets)}
                    >
                      <SparkleIcon /> Boost with AI
                    </button>

                  </div>
                ))}

                <button
                  className="add-btn"
                  style={{ marginTop: "10px", width: "100%", padding: "10px" }}
                  onClick={() => setCv(p => ({
                    ...p,
                    experience: [
                      ...p.experience,
                      { id: Date.now(), role: "", company: "", period: "", bullets: [] },
                    ],
                  }))}
                >
                  + Add Experience
                </button>

              </div>
            )}

            {/* 4. Skills */}
            {activeSection === "skills" && (
              <div className="form-section fade-in">
                <h3>Skills</h3>
                <input
                  className="field-input"
                  value={cv.skills.join(" , ")}
                  placeholder="Skill 1, Skill 2"
                  onChange={e => setCv(p => ({ ...p, skills: e.target.value.split(", ") }))}
                />
              </div>
            )}

            {/* 5. Education */}
            {activeSection === "education" && (
              <div className="form-section fade-in">

                <div className="field-group">
                  <label>Degree</label>
                  <input
                    className="field-input"
                    value={cv.education.degree}
                    onChange={e => setCv(p => ({ ...p, education: { ...p.education, degree: e.target.value } }))}
                  />
                </div>

                <div className="field-group">
                  <label>School / University</label>
                  <input
                    className="field-input"
                    value={cv.education.school}
                    onChange={e => setCv(p => ({ ...p, education: { ...p.education, school: e.target.value } }))}
                  />
                </div>

                <div className="field-group">
                  <label>Year</label>
                  <input
                    className="field-input"
                    value={cv.education.year}
                    onChange={e => setCv(p => ({ ...p, education: { ...p.education, year: e.target.value } }))}
                  />
                </div>

              </div>
            )}

          </div>
        </aside>

        {/* ── RIGHT : Live Preview ────────────────────────────────────────── */}
        <section className="preview-panel" ref={previewRef}>

          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position:      "absolute",
              inset:         0,
              width:         "100%",
              height:        "100%",
              objectFit:     "cover",
              zIndex:        -1,
              pointerEvents: "none",
            }}
          >
            <source src={bgVideo} type="video/mp4" />
          </video>

          {/* Overlay semi-transparent pour préserver la lisibilité du CV */}
          <div
            className="video-overlay"
            style={{
              position:      "absolute",
              inset:         0,
              background:    "rgba(8, 8, 20, 0.55)",
              zIndex:        0,
              pointerEvents: "none",
            }}
          />

          <div className="preview-header">
            <span className="preview-label">Live Preview</span>
            <div className="preview-actions">
              {/*  */}
              <button 
                className="preview-btn" 
                onClick={() => navigate('/historique')}
              >
                🕒 Consulter Historique
              </button>
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <label htmlFor="imageUpload" className="preview-btn" style={{ cursor: "pointer" }}>
                📷 Import Image
              </label>
              <button className="preview-btn">A4 ↕</button>
              <button className="preview-btn" onClick={handleDownloadPDF}>⤓ Download PDF</button>
            </div>
          </div>
{/**/}
          <div style={{ position: "relative", width: "100%", height: "calc(100% - 60px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            
            {/*  */}
            <button 
              onClick={prevTemplate} 
              style={{ position: "absolute", left: "20px", zIndex: 10, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", color: "white", borderRadius: "50%", width: "50px", height: "50px", fontSize: "24px", cursor: "pointer", backdropFilter: "blur(5px)" }}
            >
              ❮
            </button>

            {/* */}
            <div style={{ width: "100%", height: "100%", overflowY: "auto", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px 0" }}>
              
              {/* L-CODE DYAL 3D CARD DYALK KIMA HOWA */}
              <div
                className="cv-scene"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ paddingBottom: "40px" }}
              >
                <div
                  className="cv-card"
                  ref={cardRef}
                  style={{
                    transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  }}
                >
                  <div className="cv-paper" ref={printRef}>
                    <ActiveTemplate data={cv} updatedField={updatedField} />
                  </div>
                  <div className="cv-shadow-layer layer-1" />
                  <div className="cv-shadow-layer layer-2" />
                  <div className="cv-shadow-layer layer-3" />
                </div>
              </div>

            </div>

            {/**/}
            <button 
              onClick={nextTemplate} 
              style={{ position: "absolute", right: "20px", zIndex: 10, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", color: "white", borderRadius: "50%", width: "50px", height: "50px", fontSize: "24px", cursor: "pointer", backdropFilter: "blur(5px)" }}
            >
              ❯
            </button>
            
          </div>
        </section>

      </main>
    </div>
  );
}

