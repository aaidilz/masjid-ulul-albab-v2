"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  User,
  Share2,
  Calendar,
  Loader,
} from "lucide-react";
import { googleSheetsService } from "@/app/services/GoogleSheetsService";
import type { ActivityData } from "@/app/api/sheet/type";
import Image from "next/image";
import Link from "next/link";

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedActivities, setRelatedActivities] = useState<ActivityData[]>(
    [],
  );
  const [loadingActivityId, setLoadingActivityId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const id = params.id as string;

        // Fetch all activities once
        const allActivities = await googleSheetsService.getActivities();
        const activityData = allActivities.find((a) => a.id === id) || null;
        setActivity(activityData);

        // Filter related activities from same dataset (no extra network call)
        if (activityData) {
          const related = allActivities
            .filter((a) => a.id !== id && a.category === activityData.category)
            .slice(0, 3);
          setRelatedActivities(related);
        }
      } catch (error) {
        console.error("Error fetching activity:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchActivity();
    }
  }, [params.id]);

  // Reset loading state when activities change
  useEffect(() => {
    setLoadingActivityId(null);
  }, [relatedActivities]);

  // Cleanup loading state on unmount
  useEffect(() => {
    return () => {
      setLoadingActivityId(null);
    };
  }, []);

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

  const handleShare = async () => {
    if (navigator.share && activity) {
      try {
        await navigator.share({
          title: activity.title,
          text: activity.description.substring(0, 100) + "...",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link kegiatan telah disalin ke clipboard!");
    }
  };

  const handleRelatedClick = async (activityId: string) => {
    setLoadingActivityId(activityId);
    // Add a small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 300));
  };

  const formatDescription = (description: string) => {
    return description.split("\n").map((paragraph, index) => (
      <p key={index} className="mb-4 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-green-400 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">
              Memuat kegiatan...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!activity) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Calendar className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Kegiatan Tidak Ditemukan
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Kegiatan yang Anda cari tidak dapat ditemukan atau mungkin telah
              dihapus.
            </p>
            <Link href="/kegiatan">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Daftar Kegiatan
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Activity Header */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className={getCategoryColor(activity.category)}>
                  <div className="flex items-center gap-1">
                    {getCategoryIcon(activity.category)}
                    {activity.category}
                  </div>
                </Badge>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Bagikan
                </Button>
              </div>

              <CardTitle className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {activity.title}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Featured Image */}
          {activity.imageUrl && (
            <Card className="mb-8">
              <CardContent className="p-0">
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={activity.imageUrl}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activity Details */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Deskripsi Kegiatan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-800 dark:text-gray-100 leading-relaxed">
                      {formatDescription(activity.description)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Activity Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informasi Kegiatan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activity.schedule && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-100">
                          Jadwal
                        </div>
                        <div className="text-gray-600 dark:text-gray-300">
                          {activity.schedule}
                        </div>
                      </div>
                    </div>
                  )}

                  {activity.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-100">
                          Lokasi
                        </div>
                        <div className="text-gray-600 dark:text-gray-300">
                          {activity.location}
                        </div>
                      </div>
                    </div>
                  )}

                  {activity.participants && (
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-100">
                          Peserta
                        </div>
                        <div className="text-gray-600 dark:text-gray-300">
                          {activity.participants}
                        </div>
                      </div>
                    </div>
                  )}

                  {activity.instructor && (
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-100">
                          Pembimbing
                        </div>
                        <div className="text-gray-600 dark:text-gray-300">
                          {activity.instructor}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Informasi Lebih Lanjut
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Untuk informasi lebih lanjut tentang kegiatan ini, silakan
                    hubungi:
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        WhatsApp:
                      </span>{" "}
                      0812-2476-4338
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        Email:
                      </span>{" "}
                      sekretariat.albaab@gmail.com
                    </div>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <a
                      href="https://wa.me/6281224764338?text=Assalamu'alaikum, saya ingin bertanya tentang kegiatan di Masjid Ulul Albaab"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hubungi via WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Activities */}
          {relatedActivities.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Kegiatan Terkait
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedActivities.map((relatedActivity) => (
                  <Card
                    key={relatedActivity.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      {relatedActivity.imageUrl && (
                        <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                          <Image
                            src={relatedActivity.imageUrl}
                            alt={relatedActivity.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>
                      )}
                      <Badge
                        className={getCategoryColor(relatedActivity.category)}
                      >
                        {relatedActivity.category}
                      </Badge>
                      <CardTitle className="text-lg line-clamp-2 mt-2">
                        {relatedActivity.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {relatedActivity.description}
                      </p>
                      <Link href={`/kegiatan/${relatedActivity.id}`}>
                        <Button
                          size="sm"
                          className="w-full"
                          disabled={loadingActivityId === relatedActivity.id}
                          onClick={() => handleRelatedClick(relatedActivity.id)}
                        >
                          {loadingActivityId === relatedActivity.id ? (
                            <>
                              Memuat <Loader className="h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <>Lihat Detail</>
                          )}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
