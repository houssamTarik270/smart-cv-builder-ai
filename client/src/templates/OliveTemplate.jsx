import React from "react";

export default function DarkTemplate({ data, updatedField }) {
  // L-alwan l-asasiya dyal l-design
  const bgMain = "#1a1c23"; // Dark slate/black background
  const bgSidebar = "#232732"; // Loun dyal l-jiha l-isriya
  const accent = "#00e5ff"; // L-loun l-mjehed (Cyan/Neon) li kay-siyi l-design
  const textMain = "#ffffff";
  const textMuted = "#9ca3af";

  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      color: textMain,
      background: bgMain,
      display: "flex",
      width: "100%",
      minHeight: "297mm",
      boxSizing: "border-box",
      overflow: "hidden",
      lineHeight: "1.6"
    }}>
      
      {/* ── LEFT SIDEBAR ── */}
      <div style={{
        width: "35%",
        background: bgSidebar,
        padding: "50px 30px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        boxSizing: "border-box",
        borderRight: `2px solid rgba(255, 255, 255, 0.05)`
      }}>
        
        {/* Profile Image */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: `4px solid ${accent}`,
            padding: "4px",
            boxSizing: "border-box"
          }}>
            {data.profileImage ? (
              <img 
                src={data.profileImage} 
                alt={data.name} 
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} 
              />
            ) : (
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#333" }} />
            )}
          </div>
        </div>

        {/* Contact / Identity */}
        <div>
          <h3 style={{ 
            color: textMain, 
            fontSize: "16px", 
            fontWeight: "700", 
            textTransform: "uppercase", 
            letterSpacing: "2px", 
            borderBottom: `2px solid ${accent}`, 
            paddingBottom: "8px",
            marginBottom: "20px"
          }}>
            Contact
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: textMuted }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: accent, fontSize: "16px" }}>✉</span> {data.email}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: accent, fontSize: "16px" }}>☏</span> {data.phone}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: accent, fontSize: "16px" }}>⚲</span> {data.location}
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 style={{ 
            color: textMain, 
            fontSize: "16px", 
            fontWeight: "700", 
            textTransform: "uppercase", 
            letterSpacing: "2px", 
            borderBottom: `2px solid ${accent}`, 
            paddingBottom: "8px",
            marginBottom: "20px"
          }}>
            Education
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div style={{ color: accent, fontWeight: "bold", fontSize: "14px" }}>
              {data.education?.year}
            </div>
            <div style={{ fontWeight: "600", fontSize: "14px", color: textMain }}>
              {data.education?.degree}
            </div>
            <div style={{ fontSize: "12px", color: textMuted }}>
              {data.education?.school}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 style={{ 
            color: textMain, 
            fontSize: "16px", 
            fontWeight: "700", 
            textTransform: "uppercase", 
            letterSpacing: "2px", 
            borderBottom: `2px solid ${accent}`, 
            paddingBottom: "8px",
            marginBottom: "20px"
          }}>
            Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {data.skills?.map((skill, index) => (
              <span key={index} style={{
                background: "rgba(0, 229, 255, 0.1)",
                color: accent,
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "600",
                border: `1px solid rgba(0, 229, 255, 0.3)`
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ── RIGHT MAIN CONTENT ── */}
      <div style={{
        width: "65%",
        padding: "60px 50px",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        boxSizing: "border-box"
      }}>
        
        {/* Header: Name & Title */}
        <div>
          <h1 style={{ 
            fontSize: "52px", 
            fontWeight: "900", 
            margin: "0 0 10px 0", 
            lineHeight: "1",
            textTransform: "uppercase",
            letterSpacing: "2px"
          }}>
            <span style={{ color: textMain }}>{data.name.split(" ")[0]}</span>{" "}
            <span style={{ color: accent }}>{data.name.split(" ").slice(1).join(" ")}</span>
          </h1>
          <h2 style={{ 
            fontSize: "20px", 
            fontWeight: "400", 
            color: textMuted, 
            margin: 0,
            letterSpacing: "4px",
            textTransform: "uppercase"
          }}>
            {data.title}
          </h2>
        </div>

        {/* Summary / Profile */}
        <div>
          <h3 style={{ 
            display: "flex",
            alignItems: "center",
            gap: "15px",
            color: textMain, 
            fontSize: "20px", 
            fontWeight: "700", 
            textTransform: "uppercase", 
            letterSpacing: "2px", 
            marginBottom: "20px"
          }}>
            <div style={{ width: "40px", height: "3px", background: accent }}></div>
            Profile
          </h3>
          <p style={{ fontSize: "14px", color: textMuted, margin: 0, textAlign: "justify" }}>
            {data.summary}
          </p>
        </div>

        {/* Experience Timeline */}
        <div>
          <h3 style={{ 
            display: "flex",
            alignItems: "center",
            gap: "15px",
            color: textMain, 
            fontSize: "20px", 
            fontWeight: "700", 
            textTransform: "uppercase", 
            letterSpacing: "2px", 
            marginBottom: "30px"
          }}>
            <div style={{ width: "40px", height: "3px", background: accent }}></div>
            Experience
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "30px", borderLeft: `2px solid rgba(255,255,255,0.1)`, paddingLeft: "25px", marginLeft: "10px" }}>
            {data.experience?.map((exp, index) => (
              <div key={index} style={{ position: "relative" }}>
                {/* Timeline Dot */}
                <div style={{
                  position: "absolute",
                  left: "-32px",
                  top: "4px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: bgMain,
                  border: `3px solid ${accent}`
                }}></div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "16px", color: textMain, fontWeight: "700" }}>{exp.role}</h4>
                    <div style={{ fontSize: "14px", color: accent, fontWeight: "600", marginTop: "4px" }}>{exp.company}</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", color: textMuted, fontWeight: "600" }}>
                    {exp.period}
                  </div>
                </div>

                <ul style={{ margin: 0, paddingLeft: "15px", fontSize: "13px", color: textMuted }}>
                  {exp.bullets?.map((bullet, i) => (
                    <li key={i} style={{ marginBottom: "6px" }}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}