import type { Viewport } from "next";

export const metadata = {
  title: "Gallery | Masjid Ulul Albab",
  description: "Galeri foto kegiatan dan momen bersejarah di Masjid Ulul Albab",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#16a34a" },
    { media: "(prefers-color-scheme: dark)", color: "#15803d" },
  ],
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
