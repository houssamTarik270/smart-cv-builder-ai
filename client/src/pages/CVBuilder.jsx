import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import CVForm from "../components/CVForm";
import CVPreview from "../components/CVPreview";
import "../App.css";

function CVBuilder() {
  const cvRef = useRef();

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

  const downloadPDF = () => {
    const element = cvRef.current;

    const options = {
      margin: 0.5,
      filename: `${cvData.fullName || "my-cv"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(options).from(element).save();
  };

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

        <div>
          <CVPreview
            cvData={cvData}
            selectedTemplate={selectedTemplate}
            cvRef={cvRef}
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