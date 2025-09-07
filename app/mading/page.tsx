// import type { Metadata, Viewport } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, BookOpen, PenTool, Clock, User, FileText } from "lucide-react";


export default function MadingPage() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-300">Mading Digital</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Majalah dinding digital yang berisi informasi terkini, pengumuman, dan konten edukatif dari Masjid Ulul Albab
          </p>
        </div>

        {/* Under Construction Notice */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Construction className="h-16 w-16 text-orange-500 dark:text-orange-400" />
            </div>
            <CardTitle className="text-2xl text-orange-600 dark:text-orange-400">Halaman Dalam Pengembangan</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Kami sedang membangun mading digital yang akan menampilkan berbagai informasi menarik dan bermanfaat untuk jamaah.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Baca Artikel
              </Button>
              <Button variant="outline">
                <PenTool className="mr-2 h-4 w-4" />
                Kirim Kontribusi
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview of Mading Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                Pengumuman Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Informasi terkini tentang kegiatan, jadwal, dan pengumuman penting dari masjid
              </p>
              <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
                <p className="text-xs text-green-700 dark:text-green-300 font-medium">Coming Soon</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                Artikel Islami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Kumpulan artikel, kajian, dan tulisan inspiratif tentang Islam dan kehidupan
              </p>
              <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">Coming Soon</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                Profil Tokoh
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Mengenal lebih dekat tokoh-tokoh Islam dan pengurus masjid
              </p>
              <div className="bg-purple-50 dark:bg-purple-900 p-3 rounded-lg">
                <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">Coming Soon</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-red-600 dark:text-red-400" />
                Jadwal Kegiatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Kalender kegiatan bulanan dan jadwal rutin masjid
              </p>
              <div className="bg-red-50 dark:bg-red-900 p-3 rounded-lg">
                <p className="text-xs text-red-700 dark:text-red-300 font-medium">Coming Soon</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PenTool className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                Karya Jamaah
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Tulisan, puisi, dan karya kreatif dari jamaah masjid
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900 p-3 rounded-lg">
                <p className="text-xs text-yellow-700 dark:text-yellow-300 font-medium">Coming Soon</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Tips & Motivasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Tips kehidupan Islami dan motivasi untuk meningkatkan iman
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-900 p-3 rounded-lg">
                <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">Coming Soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Ingin Berkontribusi?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Kami mengundang jamaah untuk berkontribusi dalam mading digital ini dengan mengirimkan artikel, puisi, atau karya kreatif lainnya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button disabled>
                  <PenTool className="mr-2 h-4 w-4" />
                  Kirim Karya
                </Button>
                <Button variant="outline" disabled>
                  Panduan Kontribusi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}