export default function Home() {
  return (
    <div style={{ maxWidth: 500, margin: "100px auto", padding: 20, textAlign: "center" }}>
      <h1>Добро пожаловать!</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>Войди или создай аккаунт чтобы продолжить</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <a href="/login" style={{ padding: "12px 32px", background: "#0070f3", color: "white", borderRadius: 8, textDecoration: "none", fontSize: 16 }}>
          Войти
        </a>
        <a href="/register" style={{ padding: "12px 32px", background: "#f0f0f0", color: "#333", borderRadius: 8, textDecoration: "none", fontSize: 16 }}>
          Регистрация
        </a>
      </div>
    </div>
  )
}
