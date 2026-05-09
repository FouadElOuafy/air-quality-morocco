function getAQILevel(pm25) {
  if (pm25 <= 2) return { label: "Bon 😊", color: "#22c55e", bg: "#f0fdf4" }
  if (pm25 <= 4) return { label: "Modéré 😐", color: "#eab308", bg: "#fefce8" }
  if (pm25 <= 7) return { label: "Mauvais 😷", color: "#f97316", bg: "#fff7ed" }
  return { label: "Dangereux ☠️", color: "#ef4444", bg: "#fef2f2" }
}

const GUIDE = [
  { range: "0 – 2", label: "Bon", color: "#22c55e" },
  { range: "2 – 4", label: "Modéré", color: "#eab308" },
  { range: "4 – 7", label: "Mauvais", color: "#f97316" },
  { range: "> 7",   label: "Dangereux", color: "#ef4444" }
]

export default function ResultCard({ result }) {
  if (!result) return (
    <div style={{ flex: 1, minWidth: 300, background: "white", borderRadius: 16, padding: 40,
      textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", color: "#94a3b8" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🌤️</div>
      <p style={{ margin: 0, fontSize: 15 }}>Remplis le formulaire et clique sur Prédire</p>
    </div>
  )

  const level = getAQILevel(result.pm2_5_random_forest)
  const pct = Math.min((result.pm2_5_random_forest / 12) * 100, 100)

  return (
    <div style={{ flex: 1, minWidth: 300, display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Carte principale */}
      <div style={{ background: level.bg, border: `2px solid ${level.color}`, borderRadius: 16, padding: 28, textAlign: "center" }}>
        <p style={{ margin: 0, color: "#64748b", fontSize: 14, marginBottom: 8 }}>📍 {result.city}</p>
        <div style={{ fontSize: 72, fontWeight: "bold", color: level.color, lineHeight: 1 }}>
          {result.pm2_5_random_forest}
        </div>
        <p style={{ margin: "8px 0", color: "#64748b", fontSize: 13 }}>µg/m³ — PM2.5</p>

        {/* Barre de progression */}
        <div style={{ background: "#e2e8f0", borderRadius: 99, height: 10, margin: "16px 0" }}>
          <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99, background: level.color, transition: "width 0.5s" }} />
        </div>

        <div style={{ display: "inline-block", background: level.color, color: "white",
          borderRadius: 20, padding: "6px 24px", fontWeight: "bold", fontSize: 16 }}>
          {level.label}
        </div>
      </div>

      {/* Comparaison modèles */}
      <div style={{ background: "white", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, color: "#1e293b" }}>🤖 Comparaison des modèles</h3>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
          <span style={{ color: "#64748b", fontSize: 14 }}>🌲 Random Forest</span>
          <span style={{ fontWeight: "bold", color: "#1e293b" }}>{result.pm2_5_random_forest} µg/m³</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
          <span style={{ color: "#64748b", fontSize: 14 }}>📈 Linear Regression</span>
          <span style={{ fontWeight: "bold", color: "#1e293b" }}>{result.pm2_5_linear_regression} µg/m³</span>
        </div>
      </div>

      {/* Guide */}
      <div style={{ background: "white", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#1e293b" }}>📋 Guide PM2.5</h3>
        {GUIDE.map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
            <span style={{ color: "#64748b", fontSize: 13 }}>{item.range} µg/m³</span>
            <span style={{ fontWeight: 600, color: item.color, fontSize: 13, marginLeft: "auto" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}