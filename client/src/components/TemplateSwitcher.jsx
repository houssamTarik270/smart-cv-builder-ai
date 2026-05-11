// src/components/TemplateSwitcher.jsx
//
// Props
// ─────
//   templates   : Array<{ id: string, label: string, icon?: ReactNode, description?: string }>
//   selected    : string        – id du template actif
//   onSelect    : (id: string) => void
//
// Le composant gère son propre état d'ouverture/fermeture du menu.
// Il se ferme automatiquement sur clic extérieur (via useEffect).

import { useState, useRef, useEffect } from "react";

// ── Icônes SVG intégrées (pas de dépendance externe) ─────────────────────────

const IconChevron = ({ open }) => (
  <svg
    width="10" height="10" viewBox="0 0 10 10" fill="none"
    style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6L5 9L10 3" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Icônes par défaut pour "modern" et "classic"
const IconModern = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" rx="3" stroke="url(#gm)" strokeWidth="1.2" />
    <rect x="3.5" y="3.5" width="4" height="4" rx="1" fill="url(#gm)" opacity="0.7" />
    <rect x="3.5" y="9" width="9" height="1.2" rx="0.6" fill="url(#gm)" opacity="0.5" />
    <rect x="3.5" y="11.2" width="6" height="1.2" rx="0.6" fill="url(#gm)" opacity="0.3" />
    <defs>
      <linearGradient id="gm" x1="1" y1="1" x2="15" y2="15" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#38bdf8" />
      </linearGradient>
    </defs>
  </svg>
);

const IconClassic = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" rx="2" stroke="#94a3b8" strokeWidth="1.2" />
    <line x1="3.5" y1="4" x2="12.5" y2="4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="3.5" y1="6.5" x2="12.5" y2="6.5" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="3.5" y1="8.5" x2="10" y2="8.5" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="3.5" y1="10.5" x2="12.5" y2="10.5" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <line x1="3.5" y1="12.5" x2="8" y2="12.5" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
  </svg>
);

// Map d'icônes par défaut (utilisée si le template n'en fournit pas)
const DEFAULT_ICONS = {
  modern:  <IconModern />,
  classic: <IconClassic />,
};

// ── Styles constants ──────────────────────────────────────────────────────────

const S = {
  wrapper: {
    position: "relative",
    display: "inline-block",
  },

  trigger: (isOpen) => ({
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "7px 14px",
    background: isOpen
      ? "rgba(167,139,250,0.15)"
      : "rgba(255,255,255,0.06)",
    border: `1px solid ${isOpen ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "9px",
    color: isOpen ? "#c4b5fd" : "#e2e8f0",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.01em",
    backdropFilter: "blur(8px)",
    transition: "all 0.18s ease",
    whiteSpace: "nowrap",
  }),

  triggerDot: (color) => ({
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: color,
    flexShrink: 0,
  }),

  dropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    background: "rgba(13,13,26,0.92)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "6px",
    listStyle: "none",
    margin: 0,
    minWidth: "190px",
    zIndex: 200,
    backdropFilter: "blur(20px)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.08)",
    // Animation via className (voir ci-dessous)
    animation: "ts-fade-in 0.15s ease",
  },

  dropdownHeader: {
    padding: "6px 10px 8px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    marginBottom: "4px",
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
  },

  item: (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    padding: "9px 12px",
    background: isActive ? "rgba(167,139,250,0.14)" : "transparent",
    border: `1px solid ${isActive ? "rgba(167,139,250,0.25)" : "transparent"}`,
    borderRadius: "8px",
    color: isActive ? "#c4b5fd" : "#cbd5e1",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: isActive ? 600 : 400,
    transition: "all 0.12s ease",
    marginBottom: "2px",
  }),

  itemIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "6px",
    flexShrink: 0,
  },

  itemBody: {
    flex: 1,
    minWidth: 0,
  },

  itemLabel: {
    display: "block",
    lineHeight: 1.3,
  },

  itemDesc: {
    display: "block",
    fontSize: "10.5px",
    color: "rgba(255,255,255,0.35)",
    fontWeight: 400,
    marginTop: "1px",
    lineHeight: 1.2,
  },

  checkSlot: {
    width: "16px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

// ── Couleur indicatrice par template ─────────────────────────────────────────
const TEMPLATE_COLORS = {
  modern:  "linear-gradient(135deg, #a78bfa, #38bdf8)",
  classic: "#64748b",
};

// ── Animation keyframe injectée une seule fois ────────────────────────────────
let _animInjected = false;
function injectAnimation() {
  if (_animInjected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ts-fade-in {
      from { opacity: 0; transform: translateY(-6px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0)    scale(1);    }
    }
    .ts-item:hover {
      background: rgba(167,139,250,0.08) !important;
      border-color: rgba(167,139,250,0.15) !important;
      color: #e2e8f0 !important;
    }
  `;
  document.head.appendChild(style);
  _animInjected = true;
}

// ── Composant ─────────────────────────────────────────────────────────────────

export default function TemplateSwitcher({ templates, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  injectAnimation();

  // Fermeture sur clic extérieur
  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  // Fermeture sur Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const selectedDef = templates.find((t) => t.id === selected);
  const dotColor = TEMPLATE_COLORS[selected] ?? "#64748b";

  return (
    <div style={S.wrapper} ref={wrapperRef}>
      {/* ── Trigger button ─────────────────────────────────────────────────── */}
      <button
        style={S.trigger(isOpen)}
        onClick={() => setIsOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Changer de template"
      >
        <span style={S.triggerDot(dotColor)} />
        Templates
        <span style={{ opacity: 0.6, fontSize: "11px", marginLeft: "1px" }}>
          {selectedDef?.label}
        </span>
        <IconChevron open={isOpen} />
      </button>

      {/* ── Dropdown ───────────────────────────────────────────────────────── */}
      {isOpen && (
        <ul style={S.dropdown} role="listbox" aria-label="Sélection de template">
          <li style={S.dropdownHeader}>Choisir un template</li>

          {templates.map((t) => {
            const isActive = t.id === selected;
            const icon = t.icon ?? DEFAULT_ICONS[t.id] ?? null;

            return (
              <li key={t.id}>
                <button
                  className="ts-item"
                  role="option"
                  aria-selected={isActive}
                  style={S.item(isActive)}
                  onClick={() => {
                    onSelect(t.id);
                    setIsOpen(false);
                  }}
                >
                  {icon && <span style={S.itemIcon}>{icon}</span>}

                  <span style={S.itemBody}>
                    <span style={S.itemLabel}>{t.label}</span>
                    {t.description && (
                      <span style={S.itemDesc}>{t.description}</span>
                    )}
                  </span>

                  <span style={S.checkSlot}>
                    {isActive && <IconCheck />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
