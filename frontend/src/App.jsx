import { useState } from "react"
import axios from "axios"
import PredictionForm from "./components/PredictionForm"
import ResultCard from "./components/ResultCard"
import Dashboard from "./components/Dashboard"

const API_URL = "https://fouad1239-air-quality-morocco.hf.space"

export default function App() {
  const [page, setPage] = useState("predict")
  const [form, setForm] = useState({
    city: "Fes",
    temperature: "",
    humidity: "",
    pressure: "",
    wind_speed: ""
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.temperature || !form.humidity || !form.pressure || !form.wind_speed) {
      setError("Veuillez remplir tous les champs.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await axios.post(`${API_URL}/predict`, form)
      setResult(res.data)
    } catch {
      setError("Impossible de contacter l'API Flask. Vérifiez que Flask tourne sur le port 5000.")
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.08)", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 0" }}>
          <span style={{ fontSize: 22 }}>🌍</span>
          <span style={{ fontWeight: "bold", fontSize: 18, color: "#1e293b" }}>Air Quality Morocco</span>
          <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11,
            fontWeight: 600, padding: "2px 10px", borderRadius: 12 }}>ML Powered</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { id: "predict", label: "🔍 Prédiction" },
            { id: "dashboard", label: "📊 Dashboard" }
          ].map(tab => (
            <button key={tab.id} onClick={() => setPage(tab.id)}
              style={{
                padding: "8px 20px", borderRadius: 8, border: "none",
                background: page === tab.id ? "#3b82f6" : "transparent",
                color: page === tab.id ? "white" : "#64748b",
                fontWeight: page === tab.id ? 600 : 400,
                cursor: "pointer", fontSize: 14,
                transition: "all 0.2s"
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ textAlign: "center", padding: "32px 20px 24px" }}>
        <h1 style={{ fontSize: 28, fontWeight: "bold", color: "#1e293b", margin: 0 }}>
          {page === "predict" ? "🔍 Prédiction de la Qualité de l'Air" : "📊 Dashboard Analytique"}
        </h1>
        <p style={{ color: "#64748b", marginTop: 8 }}>
          {page === "predict"
            ? "Entrez les paramètres météo pour prédire le niveau PM2.5"
            : "Statistiques réelles collectées sur 5 jours via OpenWeatherMap"}
        </p>
      </div>

      {/* CONTENU */}
      <div style={{ padding: "0 20px 60px" }}>
        {page === "predict" ? (
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 24, flexWrap: "wrap" }}>
            <PredictionForm
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
            <ResultCard result={result} />
          </div>
        ) : (
          <Dashboard />
        )}
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "20px", color: "#94a3b8", fontSize: 13,
        borderTop: "1px solid #e2e8f0", background: "white" }}>
        Air Quality Prediction 🇲🇦 | Flask + scikit-learn + React
      </div>
    </div>
  )
}





// import { useState } from "react"
// import axios from "axios"
// import PredictionForm from "./components/PredictionForm"
// import ResultCard from "./components/ResultCard"

// const API_URL = "http://localhost:5000"

// export default function App() {
//   const [form, setForm] = useState({
//     city: "Fes",
//     temperature: "",
//     humidity: "",
//     pressure: "",
//     wind_speed: ""
//   })
//   const [result, setResult] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async () => {
//     if (!form.temperature || !form.humidity || !form.pressure || !form.wind_speed) {
//       setError("Veuillez remplir tous les champs.")
//       return
//     }
//     setLoading(true)
//     setError(null)
//     try {
//       const res = await axios.post(`${API_URL}/predict`, form)
//       setResult(res.data)
//     } catch (err) {
//       setError("Impossible de contacter l'API Flask. Vérifiez que Flask tourne sur le port 5000.")
//     }
//     setLoading(false)
//   }

//   return (
//     <div style={{ minHeight: "100vh", background: "#f1f5f9", padding: "40px 20px", fontFamily: "'Segoe UI', sans-serif" }}>

//       {/* HEADER */}
//       <div style={{ textAlign: "center", marginBottom: 40 }}>
//         <h1 style={{ fontSize: 32, fontWeight: "bold", color: "#1e293b", margin: 0 }}>
//           🌍 Air Quality Prediction
//         </h1>
//         <p style={{ color: "#64748b", marginTop: 8, fontSize: 16 }}>
//           Prédiction de la qualité de l'air dans les villes marocaines
//         </p>
//         <div style={{ display: "inline-block", marginTop: 8, padding: "4px 16px",
//           background: "#dcfce7", borderRadius: 20, color: "#16a34a", fontSize: 13, fontWeight: 600 }}>
//           ✅ Powered by Machine Learning
//         </div>
//       </div>

//       {/* CONTENU */}
//       <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 24, flexWrap: "wrap" }}>
//         <PredictionForm
//           form={form}
//           onChange={handleChange}
//           onSubmit={handleSubmit}
//           loading={loading}
//           error={error}
//         />
//         <ResultCard result={result} />
//       </div>

//       {/* FOOTER */}
//       <div style={{ textAlign: "center", marginTop: 48, color: "#94a3b8", fontSize: 13 }}>
//         Air Quality Prediction — Villes Marocaines 🇲🇦 | ML Backend: Flask + scikit-learn
//       </div>
//     </div>
//   )
// }