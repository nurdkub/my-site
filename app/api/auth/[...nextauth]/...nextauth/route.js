cat > "app/api/auth/[...nextauth]/route.js" << 'EOF'
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Пароль", type: "password" }
      },
      async authorize(credentials) {
        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single()

        if (!user) return null

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)
        if (!passwordMatch) return null

        return { id: user.id, name: user.name, email: user.email }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  }
})

export { handler as GET, handler as POST }
EOF