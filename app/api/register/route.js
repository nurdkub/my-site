import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function POST(req) {
  const { name, email, password } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Заполни все поля" }, { status: 400 })
  }

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single()

  if (existing) {
    return NextResponse.json({ error: "Email уже занят" }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const { error } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassword }])

  if (error) {
    console.log("Supabase error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}