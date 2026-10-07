import type { CampusPath } from "@/types";

export const paths: CampusPath[] = [
  { from: "main-gate", to: "administrative-office", distance: 100 },
  { from: "administrative-office", to: "cse-block", distance: 120 },
  { from: "cse-block", to: "ai-lab", distance: 100 },
  { from: "cse-block", to: "computer-lab", distance: 60 },
  { from: "administrative-office", to: "cafeteria", distance: 80 },
  { from: "cafeteria", to: "library", distance: 90 },
  { from: "library", to: "auditorium", distance: 110 },
  { from: "library", to: "seminar-hall", distance: 100 },
  { from: "cafeteria", to: "hostel", distance: 150 },
  { from: "cse-block", to: "cafeteria", distance: 90 },
];
