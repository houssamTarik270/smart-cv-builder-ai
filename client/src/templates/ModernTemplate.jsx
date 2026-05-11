// src/templates/ModernTemplate.jsx
// Design glassmorphism extrait de Builder.jsx
// Props : data (objet CV), updatedField (string | null)

export default function ModernTemplate({ data, updatedField }) {
  const cv = data;

  return (
    <>
      {/* Header Strip */}
      <div className="cv-header-strip">
        <div className="cv-avatar">
          {cv.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="cv-identity">
          <h1 className={`cv-name ${updatedField === "name" ? "field-updated" : ""}`}>
            {cv.name}
          </h1>
          <p className="cv-title">{cv.title}</p>
          <div className="cv-contacts">
            <span>✉ {cv.email}</span>
            <span>✆ {cv.phone}</span>
            <span>⌖ {cv.location}</span>
            <span>⬡ {cv.linkedin}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="cv-body">
        {/* Summary */}
        <div className="cv-section">
          <div className="cv-section-label">Profile</div>
          <p className={`cv-summary-text ${updatedField === "summary" ? "field-updated" : ""}`}>
            {cv.summary}
          </p>
        </div>

        {/* Experience */}
        <div className="cv-section">
          <div className="cv-section-label">Experience</div>
          {cv.experience.map((exp) => (
            <div
              className={`cv-exp-item ${updatedField === `exp-${exp.id}` ? "field-updated" : ""}`}
              key={exp.id}
            >
              <div className="cv-exp-header">
                <div>
                  <div className="cv-exp-role">{exp.role}</div>
                  <div className="cv-exp-company">{exp.company}</div>
                </div>
                <div className="cv-exp-period">{exp.period}</div>
              </div>
              <ul className="cv-bullets">
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="cv-section">
          <div className="cv-section-label">Skills</div>
          <div className="cv-skills-grid">
            {cv.skills.map((sk, i) => (
              <span className="cv-skill-tag" key={i}>{sk}</span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="cv-section">
          <div className="cv-section-label">Education</div>
          <div className="cv-edu">
            <div className="cv-exp-role">{cv.education.degree}</div>
            <div className="cv-exp-company">{cv.education.school}</div>
            <div className="cv-exp-period">{cv.education.year}</div>
          </div>
        </div>
      </div>
    </>
  );
}
