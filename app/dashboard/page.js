"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status])

  if (status === "loading") {
    return <p>Загрузка...</p>
  }

  if (!session) return null

  return (
    <div style={{ maxWidth: 600, margin: "100px auto", padding: 20 }}>
      <h1>Добро пожаловать, {session.user.name}! 👋</h1>
      <p>Ты вошёл как {session.user.email}</p>
      <a href="/api/auth/signout" style={{ color: "red" }}>Выйти</a>
    </div>
  )
}