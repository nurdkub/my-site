"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const categories = [
  { id: "tech", label: "Техника" },
  { id: "photo", label: "Фото и видео" },
  { id: "transport", label: "Транспорт" },
  { id: "tourism", label: "Туризм" },
  { id: "tools", label: "Инструменты" },
  { id: "clothes", label: "Одежда" },
  { id: "music", label: "Музыка" },
]

export default function NewListing() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ title: "", description: "", category: "tech", city: "", price: "" })

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status])

  if (status === "loading") return <p style={{ padding: 40, textAlign: "center" }}>Загрузка...</p>
  if (!session) return null

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, user_id: session.user.email })
    })
    const data = await res.json()
    if (res.ok) {
      router.push("/my-listings")
    } else {
      setError(data.error || "Ошибка")
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <a href="/dashboard" style={{ fontSize: 20, fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>🔄 Прокат</a>
          <a href="/dashboard" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>← Назад</a>
        </div>
      </header>
      <main style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24, color: "#111827" }}>Новое объявление</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>Название</label>
            <input
              type="text"
              placeholder="Например: Canon EOS R5 + объектив"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
              style={{ width: "100%", padding: "10px 14px", fontSize: 14, border: "1px solid #e5e7eb", borderRadius: 8 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>Описание</label>
            <textarea
              placeholder="Опишите вещь подробнее..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={4}
              style={{ width: "100%", padding: "10px 14px", fontSize: 14, border: "1px solid #e5e7eb", borderRadius: 8, resize: "vertical" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>Категория</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", fontSize: 14, border: "1px solid #e5e7eb", borderRadius: 8 }}
            >
              {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>Город</label>
            <input
              type="text"
              placeholder="Алматы"
              value={form.city}
              onChange={e => setForm({ ...form, city: e.target.value })}
              required
              style={{ width: "100%", padding: "10px 14px", fontSize: 14, border: "1px solid #e5e7eb", borderRadius: 8 }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>Цена за день (₸)</label>
            <input
              type="number"
              placeholder="5000"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              required
              style={{ width: "100%", padding: "10px 14px", fontSize: 14, border: "1px solid #e5e7eb", borderRadius: 8 }}
            />
          </div>
          {error && <p style={{ color: "red", marginBottom: 16 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "12px", fontSize: 15, background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
          >
            {loading ? "Публикуем..." : "Опубликовать"}
          </button>
        </form>
      </main>
    </div>
  )
}
