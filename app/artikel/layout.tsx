import type { Viewport } from "next";

export const metadata = {
  title: "Artikel | Masjid Ulul Albab",
  description: "Artikel dan tulisan tentang Islam, kehidupan, dan kegiatan masjid",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#16a34a" },
    { media: "(prefers-color-scheme: dark)", color: "#15803d" },
  ],
};

export default function ArtikelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
