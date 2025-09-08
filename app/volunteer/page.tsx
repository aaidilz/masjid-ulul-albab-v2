'use client';

// import type { Metadata, Viewport } from "next";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, HandHeart, Clock, MapPin, User, Search, Filter, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { googleSheetsService } from "@/app/services/GoogleSheetsService";
import type { VolunteerData } from "@/app/api/sheet/type";
import Link from "next/link";

export default function VolunteerPage() {
  const [volunteers, setVolunteers] = useState<VolunteerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredVolunteers, setFilteredVolunteers] = useState<VolunteerData[]>([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        const data = await googleSheetsService.getVolunteers();
        setVolunteers(data);
        setFilteredVolunteers(data);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  useEffect(() => {
    let filtered = volunteers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (volunteer) =>
          volunteer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          volunteer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          volunteer.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (volunteer) => volunteer.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredVolunteers(filtered);
  }, [volunteers, searchTerm, selectedCategory]);

  const categories = Array.from(new Set(volunteers.map(volunteer => volunteer.category)));

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "pendidikan":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pemeliharaan":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "organisasi":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "media":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-green-400 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Memuat program volunteer...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-300">Program Volunteer</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
            <p className="text-green-100 dark:text-green-200 mb-6 max-w-2xl mx-auto">
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
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Cari program volunteer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Peluang Volunteer</h2>
          {filteredVolunteers.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {filteredVolunteers.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(opportunity.category)}>
                        {opportunity.category}
                      </Badge>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {opportunity.spots} posisi tersedia
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">
                      {opportunity.title}
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-300">
                      {opportunity.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                        {opportunity.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="mr-2 h-4 w-4 text-red-600 dark:text-red-400" />
                        {opportunity.location}
                      </div>
                      <div className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <User className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-100">Persyaratan:</div>
                          <div>{opportunity.requirements}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Heart className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                        Komitmen: {opportunity.commitment}
                      </div>
                    </div>
                    <Link href="/volunteer/daftar">
                      <Button className="w-full group">
                        Daftar Volunteer
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HandHeart className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                {searchTerm || selectedCategory !== "all"
                  ? "Tidak ada program volunteer yang ditemukan"
                  : "Belum ada program volunteer tersedia"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || selectedCategory !== "all"
                  ? "Coba ubah kata kunci pencarian atau filter kategori"
                  : "Program volunteer akan segera ditambahkan"}
              </p>
              {(searchTerm || selectedCategory !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4"
                >
                  Reset Filter
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{volunteers.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Program</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{categories.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Kategori</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{filteredVolunteers.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Ditampilkan</div>
            </div>
          </div>
        </div>

        {/* Old static content - keeping for fallback */}
        {volunteers.length === 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Peluang Volunteer (Data Statis)</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {[
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
                }
              ].map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(opportunity.category)}>
                      {opportunity.category}
                    </Badge>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {opportunity.spots} posisi tersedia
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {opportunity.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    {opportunity.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                      {opportunity.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="mr-2 h-4 w-4 text-red-600 dark:text-red-400" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                      <User className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-100">Persyaratan:</div>
                        <div>{opportunity.requirements}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Heart className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                      Komitmen: {opportunity.commitment}
                    </div>
                  </div>
                  <Link href="/volunteer/daftar">
                    <Button className="w-full">
                      Daftar Volunteer
                    </Button>
                  </Link>
                </CardContent>
                </Card>
              ))}
          </div>
          </div>
        )}

      {/* Benefits Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Manfaat Menjadi Volunteer</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="text-green-600 dark:text-green-400 text-3xl mb-2">
                <Heart className="h-8 w-8 mx-auto" />
              </div>
              <CardTitle>Pahala & Berkah</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mendapatkan pahala dari Allah SWT atas setiap kebaikan yang dilakukan untuk kemajuan masjid dan umat
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-blue-600 dark:text-blue-400 text-3xl mb-2">
                <Users className="h-8 w-8 mx-auto" />
              </div>
              <CardTitle>Komunitas Positif</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bergabung dengan komunitas yang positif dan saling mendukung dalam kebaikan
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-purple-600 dark:text-purple-400 text-3xl mb-2">
                <HandHeart className="h-8 w-8 mx-auto" />
              </div>
              <CardTitle>Pengembangan Diri</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mengembangkan skill, pengalaman, dan kepribadian melalui berbagai kegiatan volunteer
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How to Join */}
      {/* How to Join */}
      <Card className="max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-800 dark:text-gray-100">Cara Bergabung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="bg-green-100 dark:bg-green-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 dark:text-green-400 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Pilih Program</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pilih program volunteer yang sesuai dengan minat dan kemampuan Anda
              </p>
            </div>
            <div>
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Daftar & Interview</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Isi formulir pendaftaran dan ikuti sesi wawancara singkat
              </p>
            </div>
            <div>
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Mulai Berkontribusi</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ikuti orientasi dan mulai berkontribusi sesuai program yang dipilih
              </p>
            </div>
          </div>
        </CardContent>
      </Card>        {/* Contact for Volunteer */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-center">Tertarik Bergabung?</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Hubungi koordinator volunteer untuk informasi lebih lanjut dan proses pendaftaran
          </p>
          <div className="space-y-2 mb-6">
            <div className="text-sm">
              <span className="font-medium text-gray-800 dark:text-gray-100">WhatsApp:</span> 0812-2476-4338
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-800 dark:text-gray-100">Email:</span> sekretariat.albaab@gmail.com
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
    </section >
  );
}