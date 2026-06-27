import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["bcryptjs"],
};

// Отключаем проверку SSL для Node.js (как мы делали с npm)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default nextConfig;