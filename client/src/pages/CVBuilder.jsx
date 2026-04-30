import { useState } from "react";
import CVForm from "../components/CVForm";
import CVPreview from "../services/CVPreview";
import "../App.css";

function CVBuilder() {
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
        <CVForm cvData={cvData} setCvData={setCvData} />
        <CVPreview cvData={cvData} />
      </main>
    </div>
  );
}

export default CVBuilder;