import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Campus navigation",
  description: "Find campus facilities and follow step by step walking routes.",
};

export default function NavigateLayout({ children }: { children: ReactNode }) {
  return children;
}
