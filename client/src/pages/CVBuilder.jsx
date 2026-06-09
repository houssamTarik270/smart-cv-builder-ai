import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import CVForm from "../components/CVForm";
import CVPreview from "../components/CVPreview";
import "../App.css";

// ── TrashIcon for removing custom fields ─────────────────────────────────────
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

function CVBuilder() {
  const cvRef = useRef();
  const [selectedTemplate, setSelectedTemplate] = useState("classic");

  // ── Existing CV state (UNCHANGED) ─────────────────────────────────────────
  const [cvData, setCvData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    education: "",
    experience: "",
    skills: "",
    projects: "",
  });

  // ── NEW: custom fields state, one array per section ───────────────────────
  const [customFields, setCustomFields] = useState({
    basics:     [],
    summary:    [],
    experience: [],
    skills:     [],
    education:  [],
    projects:   [],
  });

  // ── Existing downloadPDF (UNCHANGED) ──────────────────────────────────────
  const downloadPDF = () => {
    const element = cvRef.current;
    const options = {
      margin: 0.5,
      filename: `${cvData.fullName || "my-cv"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  // ── NEW: Custom fields helpers ────────────────────────────────────────────
  const addCustomField = (section) => {
    setCustomFields(prev => ({
      ...prev,
      [section]: [...prev[section], { label: "", value: "" }],
    }));
  };

  const updateCustomField = (section, index, key, val) => {
    setCustomFields(prev => {
      const updated = [...prev[section]];
      updated[index] = { ...updated[index], [key]: val };
      return { ...prev, [section]: updated };
    });
  };

  const removeCustomField = (section, index) => {
    setCustomFields(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  // ── NEW: CustomFieldsBlock component ─────────────────────────────────────
  const CustomFieldsBlock = ({ section }) => {
    const fields = customFields[section] || [];
    return (
      <div className="custom-fields-block">
        {fields.map((field, i) => (
          <div className="custom-field-row" key={i}>
            <input
              className="field-input custom-field-label"
              placeholder="Field Label (e.g. Portfolio)"
              value={field.label}
              onChange={e => updateCustomField(section, i, "label", e.target.value)}
            />
            <input
              className="field-input custom-field-value"
              placeholder="Value"
              value={field.value}
              onChange={e => updateCustomField(section, i, "value", e.target.value)}
            />
            <button
              type="button"
              className="custom-field-delete"
              title="Remove field"
              onClick={() => removeCustomField(section, i)}
            >
              <TrashIcon />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-custom-field-btn"
          onClick={() => addCustomField(section)}
        >
          <span>＋</span> Add Custom Field
        </button>
      </div>
    );
  };

  return (
    <div className="builder-page">
      <header className="header">
        <h1>Smart CV Builder AI</h1>
        <p>Create your professional CV with a step-by-step builder and live preview</p>
      </header>

      <main className="builder-container">
        <div className="form-column">
          <CVForm
            cvData={cvData}
            setCvData={setCvData}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            customFields={customFields}
            CustomFieldsBlock={CustomFieldsBlock}
          />

          {/* ── Active Fallback Panel ── */}
          <div className="custom-fields-panel" style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 className="custom-fields-panel-title" style={{ fontSize: '15px', marginBottom: '12px', color: '#6ee7f7' }}>Custom Fields Configuration</h3>
            <div className="custom-fields-section-group" style={{ marginBottom: '14px' }}>
              <p className="custom-fields-section-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Identity / Basics</p>
              <CustomFieldsBlock section="basics" />
            </div>
            <div className="custom-fields-section-group" style={{ marginBottom: '14px' }}>
              <p className="custom-fields-section-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Summary</p>
              <CustomFieldsBlock section="summary" />
            </div>
            <div className="custom-fields-section-group" style={{ marginBottom: '14px' }}>
              <p className="custom-fields-section-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Experience</p>
              <CustomFieldsBlock section="experience" />
            </div>
            <div className="custom-fields-section-group" style={{ marginBottom: '14px' }}>
              <p className="custom-fields-section-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Skills</p>
              <CustomFieldsBlock section="skills" />
            </div>
            <div className="custom-fields-section-group">
              <p className="custom-fields-section-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Education</p>
              <CustomFieldsBlock section="education" />
            </div>
          </div>
        </div>

        <div>
          <CVPreview
            cvData={cvData}
            selectedTemplate={selectedTemplate}
            cvRef={cvRef}
            customFields={customFields}
          />
          <button className="download-btn" onClick={downloadPDF}>
            Download PDF
          </button>
        </div>
      </main>
    </div>
  );
}

export default CVBuilder;