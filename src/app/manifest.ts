import type { MetadataRoute } from "next";

const LOGO = "https://i.ibb.co/DWxtttS/logo.png";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Muntasir Akib — Portfolio",
    short_name: "Akib",
    description:
      "Portfolio of Fahim Muntasir Akib — Full-Stack Developer specialising in React, Next.js, Node.js & TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5efe3",
    theme_color: "#1c1814",
    icons: [
      { src: LOGO, sizes: "any", type: "image/png" },
      { src: LOGO, sizes: "512x512", type: "image/png" },
    ],
  };
}
