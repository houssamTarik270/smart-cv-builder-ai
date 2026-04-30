import { useState } from "react";
import CVForm from "../components/CVForm";
import CVPreview from "../components/CVPreview";
import "../App.css";

function CVBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState("classic");

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

  return (
    <div className="builder-page">
      <header className="header">
        <h1>Smart CV Builder AI</h1>
        <p>Create your professional CV with a step-by-step builder and live preview</p>
      </header>

      <main className="builder-container">
        <CVForm
          cvData={cvData}
          setCvData={setCvData}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />

        <CVPreview cvData={cvData} selectedTemplate={selectedTemplate} />
      </main>
    </div>
  );
}

export default CVBuilder;