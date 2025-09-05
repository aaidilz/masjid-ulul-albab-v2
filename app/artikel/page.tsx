"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, Clock, Search, Filter, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { googleSheetsService } from "@/app/services/GoogleSheetsService";
import type { ArticleData } from "@/app/api/sheet/type";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Artikel | Masjid Ulul Albab",
  description: "Artikel dan tulisan tentang Islam, kehidupan, dan kegiatan masjid",
};

export default function ArtikelPage() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredArticles, setFilteredArticles] = useState<ArticleData[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await googleSheetsService.getArticles();
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (article) => article.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredArticles(filtered);
  }, [articles, searchTerm, selectedCategory]);

  const categories = Array.from(new Set(articles.map(article => article.category)));

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
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat artikel...</p>
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
          <h1 className="text-4xl font-bold mb-4 text-green-700">Artikel & Tulisan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kumpulan artikel, khutbah, dan tulisan inspiratif tentang Islam, kehidupan sehari-hari, dan kegiatan masjid
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Cari artikel..."
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

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  {article.imageUrl && (
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1 h-4 w-4" />
                      {formatDate(article.date)}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2 line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="mr-1 h-4 w-4" />
                    {article.author}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {truncateContent(article.content)}
                  </p>
                  <Link href={`/artikel/${article.id}`}>
                    <Button className="w-full group">
                      Baca Selengkapnya
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm || selectedCategory !== "all" 
                ? "Tidak ada artikel yang ditemukan" 
                : "Belum ada artikel tersedia"}
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== "all"
                ? "Coba ubah kata kunci pencarian atau filter kategori"
                : "Artikel akan segera ditambahkan"}
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
              <div className="text-2xl font-bold text-green-600">{articles.length}</div>
              <div className="text-sm text-gray-600">Total Artikel</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-sm text-gray-600">Kategori</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{filteredArticles.length}</div>
              <div className="text-sm text-gray-600">Ditampilkan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}