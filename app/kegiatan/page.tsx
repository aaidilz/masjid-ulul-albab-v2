import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, Calendar, Users, MapPin } from "lucide-react";

export const metadata = {
  title: "Kegiatan | Masjid Ulul Albab",
  description: "Informasi kegiatan dan acara di Masjid Ulul Albab",
};

export default function KegiatanPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-700">Kegiatan Masjid</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Berbagai kegiatan dan acara yang diselenggarakan oleh Masjid Ulul Albab untuk meningkatkan keimanan dan kualitas hidup masyarakat
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
              Kami sedang mengembangkan halaman kegiatan ini untuk memberikan informasi yang lebih lengkap tentang berbagai acara dan program masjid.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Lihat Jadwal Sholat
              </Button>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Kontak Pengurus
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview of Upcoming Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-green-600" />
                Kajian Rutin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Kajian mingguan, bulanan, dan kajian khusus untuk meningkatkan pemahaman agama
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                Kegiatan Sosial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Program bakti sosial, pengajian anak, dan kegiatan kebersamaan warga
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-red-600" />
                Event Khusus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Hari besar Islam, peringatan hari-hari bersejarah, dan acara spesial lainnya
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Ingin Mengikuti Kegiatan?</h3>
              <p className="text-gray-600 mb-6">
                Untuk informasi lebih lanjut tentang kegiatan masjid, silakan hubungi pengurus atau datang langsung ke masjid.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button disabled>
                  <MapPin className="mr-2 h-4 w-4" />
                  Lokasi Masjid
                </Button>
                <Button variant="outline" disabled>
                  Hubungi Kami
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
