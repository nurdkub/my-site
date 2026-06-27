import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function POST(req) {
  const { token, password } = await req.json()

  // Проверяем токен
  const { data: resetToken } = await supabase
    .from("password_reset_tokens")
    .select("*")
    .eq("token", token)
    .single()

  if (!resetToken) {
    return NextResponse.json({ error: "Неверная ссылка" }, { status: 400 })
  }

  if (new Date(resetToken.expires_at) < new Date()) {
    return NextResponse.json({ error: "Ссылка устарела" }, { status: 400 })
  }

  // Меняем пароль
  const hashedPassword = await bcrypt.hash(password, 10)

  await supabase
    .from("users")
    .update({ password: hashedPassword })
    .eq("email", resetToken.email)

  // Удаляем токен
  await supabase
    .from("password_reset_tokens")
    .delete()
    .eq("token", token)

  return NextResponse.json({ success: true })
}