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
  Calendar,
  Users,
  MapPin,
  Search,
  Filter,
  ArrowRight,
  Clock,
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
import type { ActivityData } from "@/app/api/sheet/type";
import Link from "next/link";
import Image from "next/image";

export default function KegiatanPage() {
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredActivities, setFilteredActivities] = useState<ActivityData[]>(
    [],
  );
  const [loadingActivityId, setLoadingActivityId] = useState<string | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 6;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await googleSheetsService.getActivities();
        setActivities(data);
        setFilteredActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Reset loading state when activities change
  useEffect(() => {
    setLoadingActivityId(null);
  }, [filteredActivities]);

  // Cleanup loading state on unmount
  useEffect(() => {
    return () => {
      setLoadingActivityId(null);
    };
  }, []);

  useEffect(() => {
    let filtered = activities;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          activity.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (activity) =>
          activity.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    setFilteredActivities(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [activities, searchTerm, selectedCategory]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "rutin":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "khusus":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "jadwal":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "rutin":
        return <Calendar className="h-4 w-4" />;
      case "khusus":
        return <Users className="h-4 w-4" />;
      case "jadwal":
        return <Clock className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const handleActivityClick = async (activityId: string) => {
    setLoadingActivityId(activityId);
    // Add a small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 300));
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);
  const startIndex = (currentPage - 1) * activitiesPerPage;
  const endIndex = startIndex + activitiesPerPage;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of articles section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const truncateDescription = (
    description: string,
    maxLength: number = 120,
  ) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
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
            Kegiatan Masjid
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Berbagai kegiatan dan acara yang diselenggarakan oleh Masjid Ulul
            Albab untuk meningkatkan keimanan dan kualitas hidup masyarakat
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Cari kegiatan..."
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
                <SelectItem value="rutin">Rutin</SelectItem>
                <SelectItem value="khusus">Khusus</SelectItem>
                <SelectItem value="jadwal">Jadwal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Activities Grid with Pagination */}
        {filteredActivities.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {currentActivities.map((activity, index) => (
                <Card
                  key={`${activity.id}-${index}`}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="pb-3">
                    {activity.imageUrl && (
                      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={activity.imageUrl}
                          alt={activity.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(activity.category)}>
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(activity.category)}
                          {activity.category}
                        </div>
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2 line-clamp-2">
                      {activity.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                      {truncateDescription(activity.description)}
                    </p>

                    <div className="space-y-2 mb-4">
                      {activity.schedule && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                          {activity.schedule}
                        </div>
                      )}
                      {activity.location && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="mr-2 h-4 w-4 text-red-600 dark:text-red-400" />
                          {activity.location}
                        </div>
                      )}
                      {activity.participants && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Users className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                          {activity.participants}
                        </div>
                      )}
                    </div>

                    <Link href={`/kegiatan/${activity.id}`}>
                      <Button
                        className="w-full group"
                        disabled={loadingActivityId === activity.id}
                        onClick={() => handleActivityClick(activity.id)}
                      >
                        {loadingActivityId === activity.id ? (
                          <>
                            Memuat{" "}
                            <Loader className="inline h-4 w-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            Lihat Detail
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
            {filteredActivities.length > activitiesPerPage && (
              <div className="text-center mt-6 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Menampilkan {startIndex + 1} -{" "}
                  {Math.min(endIndex, filteredActivities.length)} dari{" "}
                  {filteredActivities.length} kegiatan
                </p>
              </div>
            )}

            {/* Pagination Controls */}
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
                    {/* Page numbers with ellipsis */}
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
            <Calendar className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              {searchTerm || selectedCategory !== "all"
                ? "Tidak ada kegiatan yang ditemukan"
                : "Belum ada kegiatan tersedia"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || selectedCategory !== "all"
                ? "Coba ubah kata kunci pencarian atau filter kategori"
                : "Kegiatan akan segera ditambahkan"}
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
