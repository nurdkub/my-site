"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const categoryLabels = { tech: "Техника", photo: "Фото и видео", transport: "Транспорт", tourism: "Туризм", tools: "Инструменты", clothes: "Одежда", music: "Музыка" }
const categoryIcons = { tech: "💻", photo: "📷", transport: "🚗", tourism: "⛺", tools: "🔧", clothes: "👕", music: "🎸" }

export default function MyListings() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status])

  useEffect(() => {
    if (session) {
      fetch("/api/my-listings?email=" + session.user.email)
        .then(r => r.json())
        .then(data => { setListings(data); setLoading(false) })
    }
  }, [session])

  if (status === "loading" || loading) return <p style={{ padding: 40, textAlign: "center" }}>Загрузка...</p>
  if (!session) return null

  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <a href="/dashboard" style={{ fontSize: 20, fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>🔄 Прокат</a>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a href="/listings/new" style={{ padding: "8px 16px", fontSize: 14, background: "#2563eb", color: "#fff", borderRadius: 8, textDecoration: "none" }}>+ Новое объявление</a>
            <a href="/dashboard" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>← Назад</a>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24, color: "#111827" }}>Мои объявления</h1>
        {listings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
            <p style={{ fontSize: 48, marginBottom: 12 }}>📋</p>
            <p style={{ fontSize: 16, marginBottom: 20 }}>У тебя пока нет объявлений</p>
            <a href="/listings/new" style={{ padding: "10px 24px", background: "#2563eb", color: "#fff", borderRadius: 8, textDecoration: "none", fontSize: 14 }}>
              Подать первое объявление
            </a>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {listings.map(item => (
              <div key={item.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: "#eff6ff", height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
                  {categoryIcons[item.category] || "📦"}
                </div>
                <div style={{ padding: 14 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", marginBottom: 6 }}>{item.title}</p>
                  <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 4 }}>{item.city} · {categoryLabels[item.category]}</p>
                  <p style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>{item.price.toLocaleString()} ₸ / день</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
