import type { Metadata, Viewport } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, Building } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan | Masjid Ulul Albab",
  description:
    "Halaman yang Anda cari tidak ditemukan di website Masjid Ulul Albab",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#16a34a" },
    { media: "(prefers-color-scheme: dark)", color: "#15803d" },
  ],
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Building className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-3xl text-gray-900 dark:text-gray-100 mb-2">
              404
            </CardTitle>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Halaman Tidak Ditemukan
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Maaf, halaman yang Anda cari tidak dapat ditemukan di website
              Masjid Ulul Albab.
            </p>

            <div className="space-y-4">
              <Link href="/">
                <Button className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Kembali ke Beranda
                </Button>
              </Link>

              <div className="flex space-x-2">
                <Button variant="outline" disabled>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali
                </Button>
                <Link href="/#finance">
                  <Button variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    Cari Informasi
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Halaman Populer
              </h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <Link
                  href="/"
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                >
                  • Beranda
                </Link>
                <Link
                  href="/#finance"
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                >
                  • Laporan Keuangan
                </Link>
                <Link
                  href="/kegiatan"
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                >
                  • Kegiatan Masjid
                </Link>
                <Link
                  href="/artikel"
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                >
                  • Artikel & Tulisan
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-500">
                Jika Anda merasa ini adalah kesalahan, silakan hubungi
                administrator website.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
