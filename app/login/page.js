"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    })
    if (result.ok) {
      router.push("/dashboard")
    } else {
      setError("Неверный email или пароль")
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20 }}>
      <h1>Вход</h1>
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
        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, fontSize: 16 }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{ width: "100%", padding: 10, fontSize: 16, background: "#0070f3", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}
        >
          Войти
        </button>
        <p style={{ marginTop: 12, textAlign: "center" }}>
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
        </p>
        <p style={{ marginTop: 8, textAlign: "center" }}>
          <a href="/forgot-password">Забыли пароль?</a>
        </p>
      </form>
    </div>
  )
}