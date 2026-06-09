import React from "react";

export default function PremiumTemplate({ data, updatedField }) {
  // L-alwan l-asasiya dyal l-Theme (Modern Slate & Sky Blue)
  const colors = {
    primary: "#1e293b", // Dark Slate (L-loun l-ghameq dyal l-header)
    accent: "#38bdf8",  // Sky Blue (L-loun l-mftou7 dyal tstirat o l-icons)
    textDark: "#334155",
    textLight: "#64748b",
    bgLight: "#f8fafc",
    white: "#ffffff"
  };

  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif",
      background: colors.white,
      width: "100%",
      minHeight: "297mm",
      position: "relative",
      color: colors.textDark,
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box"
    }}>
      
      {/* ─── HEADER AREA ─── */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, #0f172a 100%)`,
        color: colors.white,
        padding: "50px 40px 90px 40px",
        textAlign: "center",
        position: "relative"
      }}>
        <h1 style={{ margin: "0 0 10px 0", fontSize: "42px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "800" }}>
          {data.name || "Chloé Vallet"}
        </h1>
        <h2 style={{ margin: 0, fontSize: "20px", color: colors.accent, fontWeight: "400", letterSpacing: "2px" }}>
          {data.title || "Développeur & Designer"}
        </h2>
      </div>

      {/* ─── FLOATING PROFILE IMAGE ─── */}
      <div style={{
        position: "absolute",
        top: "160px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "140px",
        height: "140px",
        borderRadius: "50%",
        border: `6px solid ${colors.white}`,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        overflow: "hidden",
        background: "#e2e8f0",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {data.profileImage ? (
          <img src={data.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ color: "#94a3b8", fontSize: "14px" }}>Photo</span>
        )}
      </div>

      {/* ─── MAIN CONTENT (2 Columns) ─── */}
      <div style={{ display: "flex", flex: 1, marginTop: "60px" }}>

        {/* LEFT COLUMN: Contact, Skills, Education */}
        <div style={{ 
          width: "35%", 
          background: colors.bgLight, 
          padding: "70px 30px 40px 40px", 
          borderRight: "1px solid #e2e8f0",
          boxSizing: "border-box"
        }}>
          
          {/* Contact */}
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "16px", color: colors.primary, borderBottom: `2px solid ${colors.accent}`, paddingBottom: "8px", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "700" }}>
              Contact
            </h3>
            <div style={{ fontSize: "12px", lineHeight: "2", color: colors.textDark, fontWeight: "500" }}>
              <div style={{ marginBottom: "8px" }}>
                 <span style={{color: colors.accent, marginRight: "8px", fontSize: "14px"}}>✉</span> {data.email || "hello@votre-email.com"}
              </div>
              <div style={{ marginBottom: "8px" }}>
                 <span style={{color: colors.accent, marginRight: "8px", fontSize: "14px"}}>☏</span> {data.phone || "+212 600 000 000"}
              </div>
              <div>
                 <span style={{color: colors.accent, marginRight: "8px", fontSize: "14px"}}>📍</span> {data.location || "Maroc"}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "16px", color: colors.primary, borderBottom: `2px solid ${colors.accent}`, paddingBottom: "8px", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "700" }}>
              Compétences
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {data.skills?.length > 0 ? data.skills.map((s, i) => (
                <span key={i} style={{ background: colors.primary, color: colors.white, padding: "6px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.5px" }}>
                  {s}
                </span>
              )) : (
                <>
                  <span style={{ background: colors.primary, color: colors.white, padding: "6px 12px", borderRadius: "20px", fontSize: "11px" }}>React JS</span>
                  <span style={{ background: colors.primary, color: colors.white, padding: "6px 12px", borderRadius: "20px", fontSize: "11px" }}>UI/UX</span>
                  <span style={{ background: colors.primary, color: colors.white, padding: "6px 12px", borderRadius: "20px", fontSize: "11px" }}>Figma</span>
                </>
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 style={{ fontSize: "16px", color: colors.primary, borderBottom: `2px solid ${colors.accent}`, paddingBottom: "8px", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "700" }}>
              Formation
            </h3>
            <div style={{ fontSize: "12px", color: colors.textLight }}>
              <div style={{ fontWeight: "700", color: colors.primary, fontSize: "14px", marginBottom: "4px" }}>
                {data.education?.degree || "Diplôme Universitaire"}
              </div>
              <div style={{ marginBottom: "4px", fontWeight: "500" }}>
                {data.education?.school || "Nom de l'Université"}
              </div>
              <div style={{ fontStyle: "italic", color: colors.accent, fontWeight: "600" }}>
                {data.education?.year || "2024 - 2026"}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Profile, Experience */}
        <div style={{ 
          width: "65%", 
          padding: "70px 50px 40px 40px",
          boxSizing: "border-box"
        }}>
          
          {/* Profile Summary */}
          <div style={{ marginBottom: "45px" }}>
            <h3 style={{ fontSize: "16px", color: colors.primary, borderBottom: `2px solid ${colors.accent}`, paddingBottom: "8px", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "700" }}>
              Profil
            </h3>
            <p style={{ fontSize: "13px", lineHeight: "1.8", color: colors.textLight, margin: 0, textAlign: "justify" }}>
              {data.summary || "Un résumé professionnel mettant en valeur votre parcours, vos objectifs et votre passion. Ce texte est généré pour donner un aperçu visuel du rendu final."}
            </p>
          </div>

          {/* Experience with Timeline UI */}
          <div>
            <h3 style={{ fontSize: "16px", color: colors.primary, borderBottom: `2px solid ${colors.accent}`, paddingBottom: "8px", marginBottom: "30px", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "700" }}>
              Expérience
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              {data.experience?.length > 0 ? data.experience.map((exp, i) => (
                <div key={i} style={{ position: "relative" }}>
                  {/* Timeline Dot */}
                  <div style={{ position: "absolute", left: "-25px", top: "5px", width: "12px", height: "12px", borderRadius: "50%", background: colors.accent, border: `3px solid ${colors.white}`, boxShadow: `0 0 0 2px ${colors.primary}` }}></div>
                  
                  {/* Timeline Line (except last item) */}
                  {i !== data.experience.length - 1 && (
                    <div style={{ position: "absolute", left: "-20px", top: "25px", bottom: "-35px", width: "2px", background: "#e2e8f0" }}></div>
                  )}
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                    <div style={{ fontWeight: "800", color: colors.primary, fontSize: "15px" }}>{exp.role}</div>
                    <div style={{ fontSize: "11px", color: colors.accent, fontWeight: "700", background: "#f0f9ff", padding: "4px 10px", borderRadius: "12px" }}>
                      {exp.period}
                    </div>
                  </div>
                  <div style={{ fontSize: "13px", color: colors.textDark, fontWeight: "600", marginBottom: "10px" }}>
                    {exp.company}
                  </div>
                  
                  <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12.5px", color: colors.textLight, lineHeight: "1.7" }}>
                    {exp.bullets?.map((b, idx) => (
                      <li key={idx} style={{ marginBottom: "5px" }}>{b}</li>
                    ))}
                  </ul>
                </div>
              )) : (
                <div style={{ fontSize: "13px", color: colors.textLight, fontStyle: "italic" }}>
                  Vos expériences professionnelles s'afficheront ici avec un design de timeline élégant.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}