import type { NextConfig } from "next";
<<<<<<< HEAD
import path from "path";
=======
import path from "node:path";
>>>>>>> origin/main

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
<<<<<<< HEAD
  images: {
    remotePatterns: [],
  },
=======
>>>>>>> origin/main
};

export default nextConfig;