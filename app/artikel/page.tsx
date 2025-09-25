"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  BookOpen,
  User,
  Clock,
  Search,
  Filter,
  ArrowRight,
  Loader,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { googleSheetsService } from "@/app/services/GoogleSheetsService";
import type { ArticleData } from "@/app/api/sheet/type";
import Link from "next/link";
import Image from "next/image";

export default function ArtikelPage() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredArticles, setFilteredArticles] = useState<ArticleData[]>([]);
  const [loadingActivityId, setLoadingActivityId] = useState<string | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset loading state when activities change
  useEffect(() => {
    setLoadingActivityId(null);
  }, [filteredArticles]);

  // Cleanup loading state on unmount
  useEffect(() => {
    return () => {
      setLoadingActivityId(null);
    };
  }, []);

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
          article.author.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (article) =>
          article.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [articles, searchTerm, selectedCategory]);

  const categories = Array.from(
    new Set(articles.map((article) => article.category)),
  );

  const formatDate = (dateStr: string) => {
    try {
      // Parse DD/MM/YYYY format
      const [day, month, year] = dateStr.split("/");
      if (day && month && year) {
        const date = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
        );
        if (isNaN(date.getTime())) throw new Error("Invalid date");
        return date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      }
      throw new Error("Invalid format");
    } catch {
      return dateStr;
    }
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const handleActivityClick = async (activityId: string) => {
    setLoadingActivityId(activityId);
    // Add a small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 300));
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of articles section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4 rounded" />
            <Skeleton className="h-6 w-96 mx-auto rounded" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <Skeleton className="h-6 w-40 rounded" />
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-10 w-full rounded" />
              </div>
            ))}
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
          <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-300">
            Artikel & Tulisan
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Kumpulan artikel, khutbah, dan tulisan inspiratif tentang Islam,
            kehidupan sehari-hari, dan kegiatan masjid
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Cari artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
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
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {currentArticles.map((article, index) => (
                <Card
                  key={`${article.id}-${index}`}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
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
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="mr-1 h-4 w-4" />
                        {formatDate(article.date)}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <User className="mr-1 h-4 w-4" />
                      {article.author}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                      {truncateContent(article.content)}
                    </p>
                    <Link href={`/artikel/${article.id}`}>
                      <Button
                        className="w-full group"
                        disabled={loadingActivityId === article.id}
                        onClick={() => handleActivityClick(article.id)}
                      >
                        {loadingActivityId === article.id ? (
                          <>
                            Memuat{" "}
                            <Loader className="inline h-4 w-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            Baca Selengkapnya
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Info */}
            {filteredArticles.length > itemsPerPage && (
              <div className="text-center mt-6 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Menampilkan {startIndex + 1} -{" "}
                  {Math.min(endIndex, filteredArticles.length)} dari{" "}
                  {filteredArticles.length} artikel
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1)
                            handlePageChange(currentPage - 1);
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {/* Page numbers */}
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      const isActive = pageNumber === currentPage;

                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        Math.abs(pageNumber - currentPage) <= 1;

                      if (!showPage) {
                        // Show ellipsis for gaps
                        if (
                          (pageNumber === 2 && currentPage > 4) ||
                          (pageNumber === totalPages - 1 &&
                            currentPage < totalPages - 3)
                        ) {
                          return (
                            <PaginationItem key={`ellipsis-${pageNumber}`}>
                              <span className="flex h-9 w-9 items-center justify-center text-sm">
                                ...
                              </span>
                            </PaginationItem>
                          );
                        }
                        return null;
                      }

                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNumber);
                            }}
                            isActive={isActive}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            handlePageChange(currentPage + 1);
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              {searchTerm || selectedCategory !== "all"
                ? "Tidak ada artikel yang ditemukan"
                : "Belum ada artikel tersedia"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
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
      </div>
    </section>
  );
}
