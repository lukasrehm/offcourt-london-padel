import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/offcourt-london-padel",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
