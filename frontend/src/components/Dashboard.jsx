import { useEffect, useState } from "react"
import axios from "axios"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts"

const API_URL = "https://fouad1239-air-quality-morocco.hf.space"

const CITY_COLORS = {
  Fes: "#3b82f6",
  Casablanca: "#f97316",
  Rabat: "#22c55e",
  Marrakech: "#ef4444"
}

export default function Dashboard() {
  const [cityStats, setCityStats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API_URL}/cities`)
      .then(res => {
        setCityStats(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
      <div style={{ fontSize: 40 }}>⏳</div>
      <p>Chargement des données...</p>
    </div>
  )

  const barData = cityStats.map(c => ({
    name: c.city,
    Moyenne: c.avg,
    Min: c.min,
    Max: c.max
  }))

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>

      {/* TITRE */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 22, fontWeight: "bold", color: "#1e293b", margin: 0 }}>
          📊 Dashboard — Qualité de l'air
        </h2>
        <p style={{ color: "#64748b", marginTop: 8 }}>
          Statistiques PM2.5 sur 5 jours de données réelles
        </p>
      </div>

      {/* CARTES STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {cityStats.map(city => {
          const level = city.avg <= 2 ? { label: "Bon", color: "#22c55e" }
            : city.avg <= 4 ? { label: "Modéré", color: "#eab308" }
            : city.avg <= 7 ? { label: "Mauvais", color: "#f97316" }
            : { label: "Dangereux", color: "#ef4444" }

          return (
            <div key={city.city} style={{
              background: "white", borderRadius: 16, padding: 20,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              borderTop: `4px solid ${CITY_COLORS[city.city]}`
            }}>
              <p style={{ margin: 0, fontWeight: "bold", color: "#1e293b", fontSize: 15 }}>
                📍 {city.city}
              </p>
              <div style={{ fontSize: 32, fontWeight: "bold", color: CITY_COLORS[city.city], margin: "8px 0" }}>
                {city.avg}
              </div>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: 12 }}>µg/m³ moyenne</p>
              <div style={{ marginTop: 8, display: "inline-block", background: level.color,
                color: "white", borderRadius: 12, padding: "3px 12px", fontSize: 12, fontWeight: 600 }}>
                {level.label}
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: "#64748b" }}>
                <span>Min: <b>{city.min}</b></span>
                <span style={{ marginLeft: 10 }}>Max: <b>{city.max}</b></span>
              </div>
            </div>
          )
        })}
      </div>

      {/* GRAPHIQUE BARRES */}
      <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <h3 style={{ margin: "0 0 20px", fontSize: 16, color: "#1e293b" }}>
          📊 Comparaison PM2.5 par ville (Moyenne / Min / Max)
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 13 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} unit=" µg" />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0" }}
              formatter={(val) => [`${val} µg/m³`]}
            />
            <Legend />
            <Bar dataKey="Min" fill="#86efac" radius={[4,4,0,0]} />
            <Bar dataKey="Moyenne" radius={[4,4,0,0]}>
              {barData.map((entry) => (
                <Cell key={entry.name} fill={CITY_COLORS[entry.name]} />
              ))}
            </Bar>
            <Bar dataKey="Max" fill="#fca5a5" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* INFO FOOTER */}
      <div style={{ background: "#f8fafc", borderRadius: 16, padding: 20, border: "1px solid #e2e8f0" }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#1e293b" }}>💡 Interprétation</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { city: "Marrakech", reason: "Proche du désert, vent faible (1.54 m/s), sable saharien" },
            { city: "Casablanca", reason: "Vent fort de l'Atlantique (5.08 m/s) qui disperse la pollution" },
            { city: "Rabat", reason: "Capitale bien ventilée, proche de l'océan" },
            { city: "Fès", reason: "Ville intérieure, vent modéré, medina dense" }
          ].map(item => (
            <div key={item.city} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%",
                background: CITY_COLORS[item.city], flexShrink: 0, marginTop: 4 }} />
              <div>
                <span style={{ fontWeight: 600, color: "#1e293b", fontSize: 13 }}>{item.city} : </span>
                <span style={{ color: "#64748b", fontSize: 13 }}>{item.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}