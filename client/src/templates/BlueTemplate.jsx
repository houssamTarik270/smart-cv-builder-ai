// src/templates/BlueTemplate.jsx
import React from "react";

export default function BlueTemplate({ data }) {
  const cv = data;

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", display: "flex", flexDirection: "column", height: "100%", background: "#ffffff", color: "#333", overflow: "hidden" }}>
      
      {/* Header (L-azra9 l-foq) */}
      <div style={{ display: "flex", background: "linear-gradient(to right, #6b8cce, #9cb3e6)", color: "white", padding: "30px 40px", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "28px", textTransform: "uppercase", letterSpacing: "1px" }}>{cv.name}</h1>
          <hr style={{ width: "60%", margin: "8px 0", border: "none", borderTop: "2px solid white", marginLeft: 0 }} />
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "normal", textTransform: "uppercase" }}>{cv.title}</h2>
        </div>
        {/* Tswira Mrab3a */}
        {cv.profileImage && (
          <div style={{ width: "110px", height: "140px", overflow: "hidden", border: "3px solid white", flexShrink: 0, background: "#ccc" }}>
            <img src={cv.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
      </div>

      {/* L-Corps dyal CV (M9ssem 3la 2) */}
      <div style={{ display: "flex", flex: 1 }}>
        
        {/* L-jiha l-isriya (Kbira - Bida) */}
        <div style={{ flex: 2, padding: "20px 30px", background: "#ffffff" }}>
          {/* Profile */}
          <h3 style={{ color: "#4a70ba", textTransform: "uppercase", borderBottom: "1px solid #4a70ba", paddingBottom: "4px", fontSize: "14px", marginTop: 0 }}>Profile</h3>
          <p style={{ fontSize: "12px", lineHeight: "1.5", textAlign: "justify" }}>{cv.summary}</p>
          
          {/* Experience */}
          <h3 style={{ color: "#4a70ba", textTransform: "uppercase", borderBottom: "1px solid #4a70ba", paddingBottom: "4px", fontSize: "14px", marginTop: "20px" }}>Expérience</h3>
          {cv.experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: "12px" }}>
               <div style={{ fontWeight: "bold", fontSize: "13px", color: "#333" }}>{exp.role}</div>
               <div style={{ fontStyle: "italic", fontSize: "11px", color: "#666" }}>{exp.company} | {exp.period}</div>
               <ul style={{ fontSize: "11.5px", paddingLeft: "16px", margin: "4px 0", lineHeight: "1.4" }}>
                 {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
               </ul>
            </div>
          ))}
        </div>

        {/* L-jiha l-imniya (Sghira - Zre9 mftou7) */}
        <div style={{ flex: 1, padding: "20px", background: "#f0f4fa", borderLeft: "3px solid #e0e8f5" }}>
          {/* Identity */}
          <h3 style={{ color: "#4a70ba", textTransform: "uppercase", borderBottom: "1px solid #4a70ba", paddingBottom: "4px", fontSize: "14px", marginTop: 0 }}>Identity</h3>
          <div style={{ fontSize: "11px", lineHeight: "1.8", marginBottom: "20px", wordBreak: "break-word" }}>
            <div>{cv.email}</div>
            <div>{cv.phone}</div>
            <div>{cv.location}</div>
            <div>{cv.linkedin}</div>
          </div>

          {/* Skills */}
          <h3 style={{ color: "#4a70ba", textTransform: "uppercase", borderBottom: "1px solid #4a70ba", paddingBottom: "4px", fontSize: "14px" }}>Skills</h3>
          <div style={{ fontSize: "11.5px", lineHeight: "1.8", marginBottom: "20px" }}>
            {cv.skills.map((s, i) => <div key={i}>• {s}</div>)}
          </div>

          {/* Education */}
          <h3 style={{ color: "#4a70ba", textTransform: "uppercase", borderBottom: "1px solid #4a70ba", paddingBottom: "4px", fontSize: "14px" }}>Education</h3>
          <div style={{ fontSize: "11.5px", lineHeight: "1.5" }}>
            <div style={{ fontWeight: "bold", color: "#333" }}>{cv.education.degree}</div>
            <div style={{ color: "#555" }}>{cv.education.school}</div>
            <div style={{ color: "#777", fontSize: "10px" }}>{cv.education.year}</div>
          </div>
        </div>

      </div>
    </div>
  );
}