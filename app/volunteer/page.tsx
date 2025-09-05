"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Construction, Users, Heart, HandHeart, Clock, MapPin, User } from "lucide-react";

export const metadata = {
  title: "Volunteer | Masjid Ulul Albab",
  description: "Program relawan dan kesempatan berkontribusi di Masjid Ulul Albab",
};

export default function VolunteerPage() {
  const volunteerOpportunities = [
    {
      id: 1,
      title: "Pengajar TPA",
      description: "Mengajar anak-anak membaca Al-Quran dan pendidikan Islam dasar",
      category: "Pendidikan",
      time: "Senin-Jumat, 16:00-17:30",
      location: "Ruang TPA Masjid",
      requirements: "Mampu membaca Al-Quran dengan baik, sabar dengan anak-anak",
      commitment: "Minimal 3 bulan",
      spots: 5
    },
    {
      id: 2,
      title: "Tim Kebersihan Masjid",
      description: "Membantu menjaga kebersihan dan kerapihan area masjid",
      category: "Pemeliharaan",
      time: "Fleksibel, 1-2 jam per minggu",
      location: "Area Masjid",
      requirements: "Sehat jasmani, komitmen tinggi",
      commitment: "Minimal 1 bulan",
      spots: 10
    },
    {
      id: 3,
      title: "Koordinator Acara",
      description: "Membantu mengorganisir dan mengkoordinasi kegiatan masjid",
      category: "Organisasi",
      time: "Sesuai jadwal acara",
      location: "Masjid dan sekitarnya",
      requirements: "Pengalaman organisasi, komunikasi baik",
      commitment: "Per acara",
      spots: 3
    },
    {
      id: 4,
      title: "Tim Media & Dokumentasi",
      description: "Mendokumentasikan kegiatan dan mengelola media sosial masjid",
      category: "Media",
      time: "Fleksibel",
      location: "Masjid dan online",
      requirements: "Skill fotografi/videografi, familiar dengan media sosial",
      commitment: "Minimal 6 bulan",
      spots: 4
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "pendidikan":
        return "bg-green-100 text-green-800";
      case "pemeliharaan":
        return "bg-blue-100 text-blue-800";
      case "organisasi":
        return "bg-purple-100 text-purple-800";
      case "media":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-700">Program Volunteer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bergabunglah dengan tim relawan Masjid Ulul Albab dan berkontribusi untuk kemajuan umat
          </p>
        </div>

        {/* Hero Section */}
        <Card className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="flex justify-center mb-4">
              <HandHeart className="h-16 w-16" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Jadilah Bagian dari Perubahan</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Setiap kontribusi Anda, sekecil apapun, memiliki dampak besar bagi kemajuan masjid dan pembinaan umat. 
              Mari bersama-sama membangun komunitas yang lebih baik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                <Heart className="mr-2 h-4 w-4" />
                Daftar Sekarang
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Volunteer Opportunities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Peluang Volunteer</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {volunteerOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(opportunity.category)}>
                      {opportunity.category}
                    </Badge>
                    <div className="text-sm text-gray-500">
                      {opportunity.spots} posisi tersedia
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {opportunity.title}
                  </CardTitle>
                  <p className="text-gray-600">
                    {opportunity.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="mr-2 h-4 w-4 text-green-600" />
                      {opportunity.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-2 h-4 w-4 text-red-600" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-start text-sm text-gray-600">
                      <User className="mr-2 h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Persyaratan:</div>
                        <div>{opportunity.requirements}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Heart className="mr-2 h-4 w-4 text-purple-600" />
                      Komitmen: {opportunity.commitment}
                    </div>
                  </div>
                  <Button className="w-full">
                    Daftar Volunteer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Manfaat Menjadi Volunteer</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="text-green-600 text-3xl mb-2">
                  <Heart className="h-8 w-8 mx-auto" />
                </div>
                <CardTitle>Pahala & Berkah</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Mendapatkan pahala dari Allah SWT atas setiap kebaikan yang dilakukan untuk kemajuan masjid dan umat
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-blue-600 text-3xl mb-2">
                  <Users className="h-8 w-8 mx-auto" />
                </div>
                <CardTitle>Komunitas Positif</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Bergabung dengan komunitas yang positif dan saling mendukung dalam kebaikan
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-purple-600 text-3xl mb-2">
                  <HandHeart className="h-8 w-8 mx-auto" />
                </div>
                <CardTitle>Pengembangan Diri</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Mengembangkan skill, pengalaman, dan kepribadian melalui berbagai kegiatan volunteer
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Join */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800">Cara Bergabung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold mb-2">Pilih Program</h3>
                <p className="text-sm text-gray-600">
                  Pilih program volunteer yang sesuai dengan minat dan kemampuan Anda
                </p>
              </div>
              <div>
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold mb-2">Daftar & Interview</h3>
                <p className="text-sm text-gray-600">
                  Isi formulir pendaftaran dan ikuti sesi wawancara singkat
                </p>
              </div>
              <div>
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold mb-2">Mulai Berkontribusi</h3>
                <p className="text-sm text-gray-600">
                  Ikuti orientasi dan mulai berkontribusi sesuai program yang dipilih
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact for Volunteer */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl text-center">Tertarik Bergabung?</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Hubungi koordinator volunteer untuk informasi lebih lanjut dan proses pendaftaran
            </p>
            <div className="space-y-2 mb-6">
              <div className="text-sm">
                <span className="font-medium">WhatsApp:</span> 0812-2476-4338
              </div>
              <div className="text-sm">
                <span className="font-medium">Email:</span> sekretariat.albaab@gmail.com
              </div>
            </div>
            <Button size="lg" className="w-full" asChild>
              <a
                href="https://wa.me/6281224764338?text=Assalamu'alaikum, saya tertarik untuk bergabung sebagai volunteer di Masjid Ulul Albaab"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hubungi Koordinator Volunteer
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}