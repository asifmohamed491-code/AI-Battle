import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Campus Wayfinder",
    short_name: "Wayfinder",
    description: "Campus navigation and facility finder",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    theme_color: "#4f46e5",
    background_color: "#f5f7fb",
    icons: [
      {
        src: "/icons/campus-wayfinder-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/campus-wayfinder-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
