import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req) {
  const { title, description, category, city, price, user_id } = await req.json()
  if (!title || !category || !city || !price) {
    return NextResponse.json({ error: "Заполни все поля" }, { status: 400 })
  }
  const { error } = await supabase.from("listings").insert([{ title, description, category, city, price: parseInt(price), user_id }])
  if (error) {
    console.log(error)
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}

export async function GET() {
  const { data, error } = await supabase.from("listings").select("*").order("created_at", { ascending: false })
  if (error) return NextResponse.json({ error: "Ошибка" }, { status: 500 })
  return NextResponse.json(data)
}
