
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  devIndicators: false,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "syntroper-media.sfo3.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig
