import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { Resend } from "resend"
import crypto from "crypto"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: "Введи email" }, { status: 400 })
  }

  // Проверяем есть ли такой пользователь
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single()

  if (!user) {
    // Не говорим что пользователь не найден — это безопасно
    return NextResponse.json({ success: true })
  }

  // Создаём токен
  const token = crypto.randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 часа

  await supabase.from("password_reset_tokens").insert([{
    email,
    token,
    expires_at: expiresAt.toISOString()
  }])

  // Отправляем письмо
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Сброс пароля",
    html: `
      <h2>Сброс пароля</h2>
      <p>Нажми на ссылку чтобы сбросить пароль:</p>
      <a href="http://localhost:3000/reset-password?token=${token}">
        Сбросить пароль
      </a>
      <p>Ссылка действует 1 час.</p>
    `
  })

  return NextResponse.json({ success: true })
}