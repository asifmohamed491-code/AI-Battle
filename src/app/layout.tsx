import type { Metadata } from "next";
import type { Viewport } from "next";
import PwaServiceWorker from "@/components/PwaServiceWorker";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Campus Wayfinder | Find your way around campus",
    template: "%s | Campus Wayfinder",
  },
  description:
    "Search campus facilities naturally, explore the illustrated campus map, and follow clear walking directions.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Wayfinder",
  },
  icons: {
    icon: [
      {
        url: "/icons/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/campus-wayfinder-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        {children}
        <PwaServiceWorker />
      </body>
    </html>
  );
}
