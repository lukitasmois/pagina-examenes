import type { NextConfig } from "next";

const nextConfig = {
  typescript: {
    // !! ADVERTENCIA !!
    // Esto permite que el build termine aunque haya errores de TypeScript.
    ignoreBuildErrors: true,
  },
  eslint: {
    // También suele ser necesario ignorar ESLint si da errores
    ignoreDuringBuilds: true,
  },
}

export default nextConfig;
