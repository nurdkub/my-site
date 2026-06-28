"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const categories = [
  { id: "all", label: "Все", icon: "🔍" },
  { id: "tech", label: "Техника", icon: "💻" },
  { id: "photo", label: "Фото и видео", icon: "📷" },
  { id: "transport", label: "Транспорт", icon: "🚗" },
  { id: "tourism", label: "Туризм", icon: "⛺" },
  { id: "tools", label: "Инструменты", icon: "🔧" },
  { id: "clothes", label: "Одежда", icon: "👕" },
  { id: "music", label: "Музыка", icon: "🎸" },
]

const listings = [
  { id: 1, title: "Canon EOS R5 + объектив 24-70mm", category: "photo", city: "Алматы", price: 5000, rating: 4.9 },
  { id: 2, title: "Палатка 4-местная Salewa", category: "tourism", city: "Астана", price: 2000, rating: 4.7 },
  { id: 3, title: "Дрель Bosch Professional 18V", category: "tools", city: "Алматы", price: 1500, rating: 5.0 },
  { id: 4, title: "MacBook Pro 16\" M3 Pro", category: "tech", city: "Астана", price: 8000, rating: 4.8 },
  { id: 5, title: "Гитара Fender Stratocaster + усилитель", category: "music", city: "Алматы", price: 3500, rating: 4.6 },
  { id: 6, title: "Велосипед горный Trek X-Caliber 8", category: "transport", city: "Астана", price: 4000, rating: 4.9 },
]

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status])

  if (status === "loading") return <p style={{ padding: 40, textAlign: "center" }}>Загрузка...</p>
  if (!session) return null

  const filtered = listings.filter(item => {
    const matchCat = activeCategory === "all" || item.category === activeCategory
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>

      {/* Хедер */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, height: 60 }}>
          <a href="/" style={{ fontSize: 20, fontWeight: 700, color: "#2563eb", textDecoration: "none", flexShrink: 0 }}>
            🔄 Прокат
          </a>
          <input
            type="text"
            placeholder="Поиск вещей для аренды..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, maxWidth: 400, margin: "0 auto", padding: "8px 14px", fontSize: 14, border: "1px solid #e5e7eb", borderRadius: 8, outline: "none" }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <span style={{ fontSize: 14, color: "#374151" }}>👋 {session.user.name}</span>
            <a href="/my-listings" style={{ padding: "8px 16px", fontSize: 14, border: "1px solid #e5e7eb", borderRadius: 8, textDecoration: "none", color: "#2563eb" }}>
              Мои объявления
            </a>
            <a href="/listings/new" style={{ padding: "8px 16px", fontSize: 14, background: "#2563eb", color: "#fff", borderRadius: 8, textDecoration: "none" }}>
              + Подать
            </a>
            <a href="/api/auth/signout" style={{ padding: "8px 16px", fontSize: 14, border: "1px solid #e5e7eb", borderRadius: 8, textDecoration: "none", color: "#ef4444" }}>
              Выйти
            </a>
          </div>
        </div>
      </header>

      {/* Контент */}
      <main style={{ flex: 1, maxWidth: 900, margin: "0 auto", padding: "24px 16px", width: "100%" }}>

        {/* Категории */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 10 }}>Категории</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "6px 14px",
                  fontSize: 13,
                  border: "1px solid",
                  borderColor: activeCategory === cat.id ? "#2563eb" : "#e5e7eb",
                  borderRadius: 20,
                  cursor: "pointer",
                  background: activeCategory === cat.id ? "#eff6ff" : "#fff",
                  color: activeCategory === cat.id ? "#2563eb" : "#6b7280",
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Кнопка подать объявление */}
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#1e40af", marginBottom: 4 }}>Есть вещи для сдачи в аренду?</p>
            <p style={{ fontSize: 13, color: "#3b82f6" }}>Подайте объявление и начните зарабатывать</p>
          </div>
          <button style={{ padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, cursor: "pointer", flexShrink: 0 }}>
            + Подать объявление
          </button>
        </div>

        {/* Заголовок списка */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <p style={{ fontSize: 15, fontWeight: 500, color: "#111827" }}>{filtered.length} объявлений</p>
          <select style={{ fontSize: 13, padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: 8, color: "#374151" }}>
            <option>Сначала новые</option>
            <option>Дешевле</option>
            <option>Дороже</option>
          </select>
        </div>

        {/* Карточки */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ background: "#eff6ff", height: 140, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
                {categories.find(c => c.id === item.category)?.icon}
              </div>
              <div style={{ padding: 14 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", marginBottom: 6, lineHeight: 1.4 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 10 }}>{item.city}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>{item.price.toLocaleString()} ₸</span>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}> / день</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#6b7280" }}>⭐ {item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🔍</p>
            <p>Ничего не найдено</p>
          </div>
        )}
      </main>

      {/* Футер */}
      <footer style={{ borderTop: "1px solid #e5e7eb", padding: "32px 24px", marginTop: 32 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24, marginBottom: 24 }}>
          {[
            { title: "Прокат", links: ["О нас", "Как это работает", "Блог"] },
            { title: "Арендаторам", links: ["Как арендовать", "Безопасность", "Страхование"] },
            { title: "Арендодателям", links: ["Подать объявление", "Советы", "Тарифы"] },
            { title: "Поддержка", links: ["Помощь", "Контакты", "Правила"] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", marginBottom: 10 }}>{col.title}</p>
              {col.links.map(link => (
                <p key={link} style={{ fontSize: 13, color: "#9ca3af", marginBottom: 6 }}>{link}</p>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto", borderTop: "1px solid #e5e7eb", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 12, color: "#9ca3af" }}>© 2026 Прокат. Все права защищены.</p>
          <div style={{ display: "flex", gap: 12, fontSize: 18 }}>📷 ✈️ 💬</div>
        </div>
      </footer>

    </div>
  )
}