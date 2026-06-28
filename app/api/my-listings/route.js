import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get("email")
  const { data, error } = await supabase.from("listings").select("*").eq("user_id", email).order("created_at", { ascending: false })
  if (error) return NextResponse.json({ error: "Ошибка" }, { status: 500 })
  return NextResponse.json(data)
}
