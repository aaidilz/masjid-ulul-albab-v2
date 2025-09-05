"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Image as ImageIcon, Calendar, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { googleSheetsService } from "@/app/services/GoogleSheetsService";
import type { GalleryData } from "@/app/api/sheet/type";
import Image from "next/image";

export const metadata = {
  title: "Gallery | Masjid Ulul Albab",
  description: "Galeri foto kegiatan dan momen bersejarah di Masjid Ulul Albab",
};

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState<GalleryData[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryData | null>(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const data = await googleSheetsService.getGalleryItems();
        setGalleryItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  useEffect(() => {
    let filtered = galleryItems;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredItems(filtered);
  }, [galleryItems, searchTerm, selectedCategory]);

  const categories = Array.from(new Set(galleryItems.map(item => item.category)));

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

  const openImageModal = (item: GalleryData) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat galeri...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-700">Galeri Foto</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dokumentasi kegiatan dan momen bersejarah di Masjid Ulul Albab
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Cari foto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
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

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                onClick={() => openImageModal(item)}
              >
                <CardContent className="p-0">
                  <div className="relative h-64 overflow-hidden rounded-t-lg">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(item.date)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm || selectedCategory !== "all" 
                ? "Tidak ada foto yang ditemukan" 
                : "Belum ada foto tersedia"}
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== "all"
                ? "Coba ubah kata kunci pencarian atau filter kategori"
                : "Foto akan segera ditambahkan"}
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

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-white p-4 rounded-lg shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{galleryItems.length}</div>
              <div className="text-sm text-gray-600">Total Foto</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-sm text-gray-600">Kategori</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{filteredItems.length}</div>
              <div className="text-sm text-gray-600">Ditampilkan</div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeImageModal}
          >
            <div
              className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {selectedImage.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <Badge variant="secondary">{selectedImage.category}</Badge>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(selectedImage.date)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={closeImageModal}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ✕ Tutup
                </Button>
              </div>
              <div className="p-6">
                <div className="relative mb-4">
                  <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}