function CVPreview({ cvData, selectedTemplate, cvRef }) {
  return (
    <div ref={cvRef} className={`preview-card ${selectedTemplate}`}>
      <h2>{cvData.fullName || "Your Name"}</h2>

      <div className="contact-line">
        <span>{cvData.email || "email@example.com"}</span>
        <span>{cvData.phone || "+212 600000000"}</span>
        <span>{cvData.address || "Your address"}</span>
      </div>

      <hr />

      <section>
        <h3>Profile</h3>
        <p>
          {cvData.summary ||
            "Your professional summary will appear here as you type."}
        </p>
      </section>

      <section>
        <h3>Education</h3>
        <p>{cvData.education || "Your education will appear here."}</p>
      </section>

      <section>
        <h3>Work Experience</h3>
        <p>{cvData.experience || "Your experience will appear here."}</p>
      </section>

      <section>
        <h3>Skills</h3>
        <p>{cvData.skills || "Your skills will appear here."}</p>
      </section>

      <section>
        <h3>Projects</h3>
        <p>{cvData.projects || "Your projects will appear here."}</p>
      </section>
    </div>
  );
}

export default CVPreview;