import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Construction, BookOpen, PenTool, Clock, User } from "lucide-react";

export const metadata = {
  title: "Artikel | Masjid Ulul Albab",
  description: "Artikel dan tulisan tentang Islam, kehidupan, dan kegiatan masjid",
};

export default function ArtikelPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-700">Artikel & Tulisan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kumpulan artikel, khutbah, dan tulisan inspiratif tentang Islam, kehidupan sehari-hari, dan kegiatan masjid
          </p>
        </div>

        {/* Under Construction Notice */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Construction className="h-16 w-16 text-orange-500" />
            </div>
            <CardTitle className="text-2xl text-orange-600">Halaman Dalam Pengembangan</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Kami sedang membangun arsip artikel dan konten yang bermanfaat untuk umat. Halaman ini akan segera diisi dengan berbagai tulisan inspiratif.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Baca Al-Quran
              </Button>
              <Button variant="outline">
                <PenTool className="mr-2 h-4 w-4" />
                Kirim Tulisan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview of Article Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-green-600" />
                Kajian Islam
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Artikel tentang tafsir Al-Quran, hadits, fiqih, dan berbagai aspek keislaman
              </p>
              <Badge variant="secondary">Coming Soon</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-blue-600" />
                Inspirasi Hidup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Cerita inspiratif, motivasi, dan pelajaran hidup dari sudut pandang Islam
              </p>
              <Badge variant="secondary">Coming Soon</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-purple-600" />
                Khutbah Jumat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Arsip khutbah-khutbah Jumat dan ceramah agama yang pernah disampaikan
              </p>
              <Badge variant="secondary">Coming Soon</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Sample Article Preview */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Artikel Terbaru</h2>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">Contoh Artikel: Keutamaan Sholat Berjamaah</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      Ustadz Ahmad
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      15 September 2024
                    </span>
                  </div>
                </div>
                <Badge>Sample</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Sholat berjamaah memiliki keutamaan yang luar biasa dalam Islam. Rasulullah SAW bersabda bahwa sholat berjamaah lebih utama 27 derajat dibandingkan sholat sendirian...
              </p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Badge variant="outline">Fiqih</Badge>
                  <Badge variant="outline">Sholat</Badge>
                </div>
                <Button variant="outline" disabled>
                  Baca Selengkapnya
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Halaman artikel akan segera diisi dengan konten bermanfaat untuk umat
            </p>
            <Button variant="outline" disabled>
              Berlangganan Update Artikel
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
