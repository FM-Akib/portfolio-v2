import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co", pathname: "/**" },
      { protocol: "https", hostname: "i.ibb.co.com", pathname: "/**" },
      { protocol: "https", hostname: "ibb.co", pathname: "/**" },
      { protocol: "https", hostname: "media.licdn.com", pathname: "/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
      { protocol: "https", hostname: "pixabay.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
