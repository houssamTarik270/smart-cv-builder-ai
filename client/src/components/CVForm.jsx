import { useState } from "react";

function CVForm({ cvData, setCvData, selectedTemplate, setSelectedTemplate }) {
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCvData({
      ...cvData,
      [name]: value,
    });
  };

  const nextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="form-card">
      <h2>CV Builder</h2>

      <div className="steps">
        <span className={step === 1 ? "active-step" : ""}>1</span>
        <span className={step === 2 ? "active-step" : ""}>2</span>
        <span className={step === 3 ? "active-step" : ""}>3</span>
        <span className={step === 4 ? "active-step" : ""}>4</span>
        <span className={step === 5 ? "active-step" : ""}>5</span>
        <span className={step === 6 ? "active-step" : ""}>6</span>
      </div>

      {step === 1 && (
        <div>
          <h3>Personal Information</h3>

          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={cvData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={cvData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={cvData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={cvData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />

          <label>Profile Summary</label>
          <textarea
            name="summary"
            value={cvData.summary}
            onChange={handleChange}
            placeholder="Write a short professional summary"
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Education</h3>

          <label>Education</label>
          <textarea
            name="education"
            value={cvData.education}
            onChange={handleChange}
            placeholder="Example: DUT in Computer Science - EST Fquih Ben Salah - 2024/2026"
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Work Experience</h3>

          <label>Experience</label>
          <textarea
            name="experience"
            value={cvData.experience}
            onChange={handleChange}
            placeholder="Describe your internships, work experience, or academic practice"
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <h3>Skills</h3>

          <label>Skills</label>
          <textarea
            name="skills"
            value={cvData.skills}
            onChange={handleChange}
            placeholder="Example: React, Node.js, Java, MySQL, Linux"
          />
        </div>
      )}

      {step === 5 && (
        <div>
          <h3>Projects</h3>

          <label>Projects</label>
          <textarea
            name="projects"
            value={cvData.projects}
            onChange={handleChange}
            placeholder="Describe your academic or personal projects"
          />
        </div>
      )}

      {step === 6 && (
        <div>
          <h3>Choose CV Template</h3>

          <label>Template</label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="classic">Classic Template</option>
            <option value="modern">Modern Template</option>
          </select>

          <p className="helper-text">
            Choose a design. Your CV information will stay the same.
          </p>
        </div>
      )}

      <div className="form-buttons">
        <button onClick={previousStep} disabled={step === 1}>
          Previous
        </button>

        <button onClick={nextStep} disabled={step === 6}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CVForm;