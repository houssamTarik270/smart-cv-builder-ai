import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Historique() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/cv/history", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }); 
        
        if (!response.ok) {
           throw new Error("Mochkil f API: ma-9drnach n-jibo l-historique");
        }
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Mochkil f tjab dyal l-historique:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  
  const handleDelete = async (cvId) => {
    
    const confirmation = window.confirm("Wesh mte2ked bghiti tems7 had l-CV?");
    if (!confirmation) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/cv/delete/${cvId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        
        setHistory(prevHistory => prevHistory.filter(item => item._id !== cvId));
      } else {
        alert("Mochkil f msi7 dyal CV. 3awd jereb.");
      }
    } catch (error) {
      console.error("Erreur serveur f lmsi7:", error);
    }
  };

  
  const handleOpen = (item) => {
    
    navigate('/builder', { state: { cvDataLoaded: item.cvData } });
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px", background: "#0d0d1a", color: "white", fontFamily: "'Inter', sans-serif" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <h1 style={{ margin: 0, fontSize: "32px", background: "linear-gradient(90deg, #a78bfa, #38bdf8)", WebkitBackgroundClip: "text", color: "transparent" }}>
          🕒 Mon Historique
        </h1>
        <button 
          onClick={() => navigate(-1)} 
          style={{ padding: "10px 20px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", cursor: "pointer", transition: "0.3s" }}
        >
          ← Retour à l'éditeur
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", color: "#888", fontSize: "18px" }}>Chargement de l'historique...</div>
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {history.length === 0 ? (
            <div style={{ width: "100%", textAlign: "center", padding: "60px", background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: "1px dashed rgba(255,255,255,0.1)", color: "#888" }}>
              <p style={{ fontSize: "18px", margin: "0 0 10px 0" }}>Mazal ma 3ndk 7ta CV f l-historique.</p>
              <p style={{ fontSize: "14px", margin: 0 }}>Cliqui 3la "Download PDF" f l-éditeur bach t-sauvgardi CV jdida.</p>
            </div>
          ) : (
            history.map((item, index) => (
              <div key={item._id || index} style={{ width: "300px", border: "1px solid rgba(255,255,255,0.1)", padding: "24px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", transition: "0.3s" }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "20px" }}>{item.cvData?.name || "CV sans nom"}</h3>
                <p style={{ margin: "0 0 16px 0", color: "#a78bfa", fontSize: "14px" }}>{item.cvData?.title || "Pas de titre"}</p>
                <div style={{ fontSize: "12px", color: "#888", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
                  Sauvegardé le: {new Date(item.createdAt).toLocaleDateString()}
                </div>
                
                {/*  */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button 
                    style={{ flex: 1, padding: "10px", background: "linear-gradient(90deg, #38bdf8, #818cf8)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", transition: "0.3s" }}
                    onClick={() => handleOpen(item)} 
                  >
                    Ouvrir ce CV
                  </button>
                  
                  <button 
                    style={{ padding: "10px 15px", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.4)", borderRadius: "8px", cursor: "pointer", transition: "0.3s" }}
                    onClick={() => handleDelete(item._id)}
                    title="Supprimer ce CV"
                  >
                    🗑️
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}