"use client"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div style={{ maxWidth: 400, margin: "100px auto", padding: 20, textAlign: "center" }}>
        <h1>Письмо отправлено! ✅</h1>
        <p>Проверь почту и нажми на ссылку в письме.</p>
        <a href="/login">Вернуться к входу</a>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20 }}>
      <h1>Забыли пароль?</h1>
      <p>Введи email — отправим ссылку для сброса.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: 10, fontSize: 16 }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: 10, fontSize: 16, background: "#0070f3", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}
        >
          {loading ? "Отправляем..." : "Отправить ссылку"}
        </button>
        <p style={{ marginTop: 12, textAlign: "center" }}>
          <a href="/login">Вернуться к входу</a>
        </p>
      </form>
    </div>
  )
}
