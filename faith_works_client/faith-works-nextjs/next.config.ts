import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(import.meta.dirname),
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig
