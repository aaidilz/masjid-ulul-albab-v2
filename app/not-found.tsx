import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, Building } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Building className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-3xl text-gray-900 mb-2">404</CardTitle>
            <p className="text-xl text-gray-600">Halaman Tidak Ditemukan</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-8">
              Maaf, halaman yang Anda cari tidak dapat ditemukan di website Masjid Ulul Albab.
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

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold mb-4">Halaman Populer</h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <Link href="/" className="text-green-600 hover:text-green-800">
                  • Beranda
                </Link>
                <Link href="/#finance" className="text-green-600 hover:text-green-800">
                  • Laporan Keuangan
                </Link>
                <Link href="/kegiatan" className="text-green-600 hover:text-green-800">
                  • Kegiatan Masjid
                </Link>
                <Link href="/artikel" className="text-green-600 hover:text-green-800">
                  • Artikel & Tulisan
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-500">
                Jika Anda merasa ini adalah kesalahan, silakan hubungi administrator website.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
