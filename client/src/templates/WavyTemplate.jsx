import React from "react";

export default function WavyTemplate({ data, updatedField }) {
  return (
    <div style={{
      fontFamily: "'Montserrat', 'Arial', sans-serif",
      color: "#222",
      background: "#ffffff",
      display: "flex",
      position: "relative",
      width: "100%",
      minHeight: "297mm",
      boxSizing: "border-box",
      overflow: "hidden"
    }}>
      
      {/* ── Background Wave Panel (Using SVG for perfect scaling) ── */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "42%",
        zIndex: 1,
        pointerEvents: "none"
      }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path 
            d="M 0 0 L 82 0 C 98 18, 76 38, 86 58 C 96 78, 76 90, 82 100 L 0 100 Z" 
            fill="#eed6d3" /* Dak l-rose pastel exact dyal l-tswira */
          />
        </svg>
      </div>

      {/* ── LEFT SIDE: Profile & Skills (Inside the Wave) ── */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "38%",
        padding: "40px 20px 40px 30px",
        display: "flex",
        flexDirection: "column",
        gap: "35px",
        boxSizing: "border-box"
      }}>
        
        {/* Profile Image with Hello Sticker */}
        <div style={{ position: "relative", width: "130px", height: "130px", marginTop: "20px" }}>
          {data.profileImage ? (
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "3px solid #b01712" }}>
              <img src={data.profileImage} alt={data.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ) : (
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#ccc" }} />
          )}
          {/* Hello Sticker Badge */}
          <div style={{
            position: "absolute",
            bottom: "-10px",
            right: "-10px",
            background: "#b01712",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontFamily: "'Georgia', serif",
            fontWeight: "bold",
            fontSize: "16px",
            transform: "rotate(-5deg)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
          }}>
            Hello
          </div>
        </div>

        {/* Profile/Summary Section */}
        <div>
          <h3 style={{ color: "#b01712", fontSize: "14px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px", fontWeight: "800" }}>
            Profile
          </h3>
          <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#444", margin: 0 }}>
            {data.summary}
          </p>
        </div>

        {/* Competences / Skills Section */}
        <div>
          <h3 style={{ color: "#b01712", fontSize: "14px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px", fontWeight: "800" }}>
            Compétences
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {data.skills?.map((skill, i) => (
              <span key={i} style={{ fontSize: "12px", color: "#444", fontWeight: "500" }}>• {skill}</span>
            ))}
          </div>
        </div>

        {/* Identity / Contact Section */}
        <div>
          <h3 style={{ color: "#b01712", fontSize: "14px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px", fontWeight: "800" }}>
            Identity
          </h3>
          <div style={{ fontSize: "11px", color: "#444", display: "flex", flexDirection: "column", gap: "6px" }}>
            <div>{data.email}</div>
            <div>{data.phone}</div>
            <div>{data.location}</div>
          </div>
        </div>

      </div>

      {/* ── RIGHT SIDE: Name & Main Content ── */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "62%",
        padding: "40px 40px 40px 45px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "40px"
      }}>
        
        {/* Big Bold Header */}
        <div style={{ marginTop: "15px" }}>
          <h1 style={{ 
            color: "#b01712", 
            fontSize: "54px", 
            fontWeight: "900", 
            lineHeight: "0.9", 
            margin: "0 0 8px 0",
            textTransform: "uppercase",
            letterSpacing: "-1px"
          }}>
            {data.name.split(" ")[0]} <br />
            {data.name.split(" ").slice(1).join(" ")}
          </h1>
          <p style={{ color: "#b01712", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", margin: 0, letterSpacing: "1px" }}>
            {data.title}
          </p>
        </div>

        {/* Experience Section */}
        <div>
          <h3 style={{ color: "#b01712", fontSize: "15px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "15px", fontWeight: "800" }}>
            Experience
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {data.experience?.map((exp) => (
              <div key={exp.id} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: "700", fontSize: "13px", color: "#111" }}>{exp.role}</span>
                  <span style={{ fontSize: "11px", color: "#666", fontWeight: "600" }}>{exp.period}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#b01712", fontWeight: "600" }}>{exp.company}</div>
                <ul style={{ margin: "5px 0 0 0", paddingLeft: "15px", fontSize: "12px", color: "#444", lineHeight: "1.5" }}>
                  {exp.bullets?.map((b, i) => <li key={i} style={{ marginBottom: "3px" }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h3 style={{ color: "#b01712", fontSize: "15px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "15px", fontWeight: "800" }}>
            Education
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: "700", fontSize: "13px", color: "#111" }}>{data.education?.degree}</span>
              <span style={{ fontSize: "11px", color: "#666", fontWeight: "600" }}>{data.education?.year}</span>
            </div>
            <div style={{ fontSize: "12px", color: "#444" }}>{data.education?.school}</div>
          </div>
        </div>

      </div>

    </div>
  );
}