function CVPreview({ cvData }) {
  return (
    <div className="preview-card">
      <h2>{cvData.fullName || "Your Name"}</h2>
      <p>{cvData.email || "email@example.com"}</p>
      <p>{cvData.phone || "+212 600000000"}</p>
      <p>{cvData.address || "Your address"}</p>

      <hr />

      <h3>Profile</h3>
      <p>
        {cvData.summary ||
          "Your professional summary will appear here as you type."}
      </p>
    </div>
  );
}

export default CVPreview;