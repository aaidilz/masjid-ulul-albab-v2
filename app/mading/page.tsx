"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Construction, BookOpen, PenTool, Clock, User, FileText, Search, Filter, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { googleSheetsService } from "@/app/services/GoogleSheetsService";
import type { MadingData } from "@/app/api/sheet/type";
import Image from "next/image";


export default function MadingPage() {
  const [madingItems, setMadingItems] = useState<MadingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState<MadingData[]>([]);

  useEffect(() => {
    const fetchMadingItems = async () => {
      try {
        setLoading(true);
        const data = await googleSheetsService.getMadingItems();
        setMadingItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching mading items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMadingItems();
  }, []);

  useEffect(() => {
    let filtered = madingItems;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredItems(filtered);
  }, [madingItems, searchTerm, selectedCategory]);

  const categories = Array.from(new Set(madingItems.map(item => item.category)));

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-green-400 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Memuat mading digital...</p>
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
          <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-300">Mading Digital</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Majalah dinding digital yang berisi informasi terkini, pengumuman, dan konten edukatif dari Masjid Ulul Albab
          </p>
        </div>

        {/* Search and Filter */}
        {madingItems.length > 0 && (
          <div className="mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="Cari konten mading..."
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
        )}

        {/* Mading Content */}
        {filteredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  {item.imageUrl && (
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{item.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="mr-1 h-4 w-4" />
                      {formatDate(item.date)}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2 line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <User className="mr-1 h-4 w-4" />
                    {item.author}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {truncateContent(item.content)}
                  </p>
                  <Button className="w-full group">
                    Baca Selengkapnya
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : madingItems.length === 0 ? (
          /* Under Construction Notice - shown when no data from API */
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
        ) : (
          /* No results found */
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Tidak ada konten yang ditemukan
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Coba ubah kata kunci pencarian atau filter kategori
            </p>
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
          </div>
        )}

        {/* Stats */}
        {madingItems.length > 0 && (
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{madingItems.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Konten</div>
              </div>
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{categories.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Kategori</div>
              </div>
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{filteredItems.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Ditampilkan</div>
              </div>
            </div>
          </div>
        )}

        {/* Preview of Mading Features */}
        {madingItems.length === 0 && (
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
        )}

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