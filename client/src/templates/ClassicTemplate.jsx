// src/templates/ClassicTemplate.jsx
// Design classique : typographie sobre, noir & blanc, style traditionnel
// Props : data (objet CV), updatedField (string | null)

const styles = {
  wrapper: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: "#1a1a1a",
    padding: "32px 36px",
    background: "#ffffff",
    lineHeight: 1.5,
    fontSize: "13px",
  },
  header: {
    borderBottom: "2px solid #1a1a1a",
    paddingBottom: "12px",
    marginBottom: "18px",
  },
  name: {
    fontSize: "26px",
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "uppercase",
    margin: "0 0 4px 0",
    fontFamily: "'Georgia', serif",
  },
  title: {
    fontSize: "13px",
    color: "#444",
    margin: "0 0 8px 0",
    fontStyle: "italic",
  },
  contacts: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px 16px",
    fontSize: "11.5px",
    color: "#555",
  },
  sectionTitle: {
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "2px",
    textTransform: "uppercase",
    borderBottom: "1px solid #888",
    paddingBottom: "3px",
    marginBottom: "10px",
    marginTop: "16px",
    color: "#222",
  },
  summaryText: {
    margin: 0,
    color: "#333",
    textAlign: "justify",
  },
  expItem: {
    marginBottom: "12px",
  },
  expHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "3px",
  },
  expRole: {
    fontWeight: "bold",
    fontSize: "13px",
  },
  expCompany: {
    fontStyle: "italic",
    color: "#444",
    fontSize: "12.5px",
  },
  expPeriod: {
    fontSize: "11.5px",
    color: "#666",
    whiteSpace: "nowrap",
    marginLeft: "8px",
  },
  bullets: {
    paddingLeft: "16px",
    margin: "4px 0 0 0",
    color: "#333",
  },
  bullet: {
    marginBottom: "2px",
    fontSize: "12px",
  },
  skillsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px 12px",
  },
  skillTag: {
    fontSize: "12px",
    color: "#333",
  },
  eduDegree: {
    fontWeight: "bold",
    fontSize: "13px",
  },
  eduSchool: {
    fontStyle: "italic",
    color: "#444",
    fontSize: "12.5px",
  },
  eduYear: {
    fontSize: "11.5px",
    color: "#666",
    marginTop: "2px",
  },
  fieldUpdated: {
    transition: "background 0.4s",
    background: "rgba(167, 243, 208, 0.3)",
    borderRadius: "3px",
  },
};

export default function ClassicTemplate({ data, updatedField }) {
  const cv = data;

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <h1
          style={{
            ...styles.name,
            ...(updatedField === "name" ? styles.fieldUpdated : {}),
          }}
        >
          {cv.name}
        </h1>
        <p style={styles.title}>{cv.title}</p>
        <div style={styles.contacts}>
          <span>{cv.email}</span>
          <span>{cv.phone}</span>
          <span>{cv.location}</span>
          <span>{cv.linkedin}</span>
        </div>
      </div>

      {/* Profile */}
      <div style={styles.sectionTitle}>Profile</div>
      <p
        style={{
          ...styles.summaryText,
          ...(updatedField === "summary" ? styles.fieldUpdated : {}),
        }}
      >
        {cv.summary}
      </p>

      {/* Experience */}
      <div style={styles.sectionTitle}>Professional Experience</div>
      {cv.experience.map((exp) => (
        <div
          key={exp.id}
          style={{
            ...styles.expItem,
            ...(updatedField === `exp-${exp.id}` ? styles.fieldUpdated : {}),
          }}
        >
          <div style={styles.expHeader}>
            <div>
              <span style={styles.expRole}>{exp.role}</span>
              {" — "}
              <span style={styles.expCompany}>{exp.company}</span>
            </div>
            <span style={styles.expPeriod}>{exp.period}</span>
          </div>
          <ul style={styles.bullets}>
            {exp.bullets.filter(Boolean).map((b, i) => (
              <li key={i} style={styles.bullet}>{b}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Skills */}
      <div style={styles.sectionTitle}>Core Skills</div>
      <div style={styles.skillsGrid}>
        {cv.skills.map((sk, i) => (
          <span key={i} style={styles.skillTag}>
            {i < cv.skills.length - 1 ? `${sk} ·` : sk}
          </span>
        ))}
      </div>

      {/* Education */}
      <div style={styles.sectionTitle}>Education</div>
      <div>
        <div style={styles.eduDegree}>{cv.education.degree}</div>
        <div style={styles.eduSchool}>{cv.education.school}</div>
        <div style={styles.eduYear}>{cv.education.year}</div>
      </div>
    </div>
  );
}
