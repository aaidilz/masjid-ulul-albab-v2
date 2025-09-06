import type { Metadata } from "next";
import type { Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import HeaderSection from "./components/HeaderSection";
import FooterSection from "./components/FooterSection";
import { ThemeProvider } from "./components/ThemeProvider";
import AnnouncementBanner from "./components/AnnouncementBanner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://masjidululalbab.unpas.ac.id'),
  title: "Masjid Ulul Albab UNPAS - Pusat Ibadah dan Dakwah Kampus",
  description: "Masjid Ulul Albab Universitas Pasundan - Pusat kegiatan keislaman yang membina umat menuju masyarakat yang berakhlak mulia dan berilmu. Lokasi: Jl. Dr. Setiabudhi No. 193, Bandung.",
  keywords: "masjid, ulul albab, unpas, universitas pasundan, bandung, islam, dakwah, kajian, sholat, jadwal sholat",
  authors: [{ name: "DKM Ulul Albab UNPAS" }],
  creator: "DKM Ulul Albab UNPAS",
  publisher: "Masjid Ulul Albab UNPAS",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://masjidululalbab.unpas.ac.id",
    siteName: "Masjid Ulul Albab UNPAS",
    title: "Masjid Ulul Albab UNPAS - Pusat Ibadah dan Dakwah Kampus",
    description: "Pusat kegiatan keislaman di Universitas Pasundan yang membina umat menuju masyarakat yang berakhlak mulia dan berilmu.",
    images: [
      {
        url: "/img/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Masjid Ulul Albab UNPAS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Masjid Ulul Albab UNPAS",
    description: "Pusat kegiatan keislaman di Universitas Pasundan",
    images: ["/img/hero.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#16a34a" },
    { media: "(prefers-color-scheme: dark)", color: "#15803d" },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AnnouncementBanner />
          <HeaderSection />
          {children}
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  );
}
