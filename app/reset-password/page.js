"use client"
import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"

function ResetForm() {
  const [password, setPassword] = useState("")
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password })
    })
    const data = await res.json()
    if (res.ok) {
      setDone(true)
      setTimeout(() => router.push("/login"), 2000)
    } else {
      setError(data.error)
    }
    setLoading(false)
  }

  if (done) {
    return (
      <div style={{ maxWidth: 400, margin: "100px auto", padding: 20, textAlign: "center" }}>
        <h1>Пароль изменён! ✅</h1>
        <p>Перенаправляем на страницу входа...</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20 }}>
      <h1>Новый пароль</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="Новый пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, fontSize: 16 }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: 10, fontSize: 16, background: "#0070f3", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}
        >
          {loading ? "Сохраняем..." : "Сохранить пароль"}
        </button>
      </form>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetForm />
    </Suspense>
  )
}
