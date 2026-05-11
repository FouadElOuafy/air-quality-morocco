const CITIES = ["Fes", "Casablanca", "Rabat", "Marrakech"]

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box"
}

export default function PredictionForm({ form, onChange, onSubmit, loading, error }) {
  return (
    <div style={{
      flex: 1,
      background: "white",
      borderRadius: 16,
      padding: "20px 16px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
    }}>
      <h2 style={{ fontSize: 17, fontWeight: "bold", color: "#1e293b", marginTop: 0, marginBottom: 16 }}>
        📍 Paramètres météo
      </h2>

      {[
        { name: "city", label: "Ville", type: "select" },
        { name: "temperature", label: "🌡️ Température (°C)", placeholder: "ex: 18" },
        { name: "humidity", label: "💧 Humidité (%)", placeholder: "ex: 63" },
        { name: "pressure", label: "📊 Pression (hPa)", placeholder: "ex: 1011" },
        { name: "wind_speed", label: "💨 Vitesse du vent (m/s)", placeholder: "ex: 2.06" }
      ].map(field => (
        <div key={field.name} style={{ marginBottom: 14 }}>
          <label style={{ display: "block", marginBottom: 5, color: "#475569", fontWeight: 600, fontSize: 13 }}>
            {field.label}
          </label>
          {field.type === "select" ? (
            <select name="city" value={form.city} onChange={onChange} style={inputStyle}>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          ) : (
            <input type="number" name={field.name} value={form[field.name]}
              onChange={onChange} placeholder={field.placeholder} style={inputStyle} />
          )}
        </div>
      ))}

      <button onClick={onSubmit} disabled={loading} style={{
        width: "100%", padding: "13px", borderRadius: 10, border: "none",
        background: loading ? "#94a3b8" : "#3b82f6",
        color: "white", fontSize: 15, fontWeight: "bold",
        cursor: loading ? "not-allowed" : "pointer",
        marginTop: 4
      }}>
        {loading ? "⏳ Calcul..." : "🔍 Prédire la qualité de l'air"}
      </button>

      {error && (
        <div style={{ marginTop: 12, padding: "10px 14px", background: "#fef2f2",
          borderRadius: 8, color: "#ef4444", fontSize: 13 }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}


// const CITIES = ["Fes", "Casablanca", "Rabat", "Marrakech"]

// const inputStyle = {
//   width: "100%",
//   padding: "10px 12px",
//   borderRadius: 8,
//   border: "1px solid #e2e8f0",
//   fontSize: 15,
//   outline: "none",
//   boxSizing: "border-box"
// }

// const labelStyle = {
//   display: "block",
//   marginBottom: 6,
//   color: "#475569",
//   fontWeight: 600,
//   fontSize: 14
// }

// export default function PredictionForm({ form, onChange, onSubmit, loading, error }) {
//   return (
//     <div style={{ flex: 1, minWidth: 300, background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
//       <h2 style={{ fontSize: 18, fontWeight: "bold", color: "#1e293b", marginTop: 0, marginBottom: 20 }}>
//         📍 Paramètres météo
//       </h2>

//       <div style={{ marginBottom: 16 }}>
//         <label style={labelStyle}>Ville</label>
//         <select name="city" value={form.city} onChange={onChange} style={inputStyle}>
//           {CITIES.map(c => <option key={c}>{c}</option>)}
//         </select>
//       </div>

//       <div style={{ marginBottom: 16 }}>
//         <label style={labelStyle}>🌡️ Température (°C)</label>
//         <input type="number" name="temperature" value={form.temperature} onChange={onChange} placeholder="ex: 18" style={inputStyle} />
//       </div>

//       <div style={{ marginBottom: 16 }}>
//         <label style={labelStyle}>💧 Humidité (%)</label>
//         <input type="number" name="humidity" value={form.humidity} onChange={onChange} placeholder="ex: 63" style={inputStyle} />
//       </div>

//       <div style={{ marginBottom: 16 }}>
//         <label style={labelStyle}>📊 Pression (hPa)</label>
//         <input type="number" name="pressure" value={form.pressure} onChange={onChange} placeholder="ex: 1011" style={inputStyle} />
//       </div>

//       <div style={{ marginBottom: 24 }}>
//         <label style={labelStyle}>💨 Vitesse du vent (m/s)</label>
//         <input type="number" name="wind_speed" value={form.wind_speed} onChange={onChange} placeholder="ex: 2.06" style={inputStyle} />
//       </div>

//       <button onClick={onSubmit} disabled={loading} style={{
//         width: "100%", padding: "12px", borderRadius: 10, border: "none",
//         background: loading ? "#94a3b8" : "#3b82f6",
//         color: "white", fontSize: 16, fontWeight: "bold",
//         cursor: loading ? "not-allowed" : "pointer",
//         transition: "background 0.2s"
//       }}>
//         {loading ? "⏳ Calcul en cours..." : "🔍 Prédire la qualité de l'air"}
//       </button>

//       {error && (
//         <div style={{ marginTop: 12, padding: "10px 14px", background: "#fef2f2", borderRadius: 8, color: "#ef4444", fontSize: 14 }}>
//           ⚠️ {error}
//         </div>
//       )}
//     </div>
//   )
// }