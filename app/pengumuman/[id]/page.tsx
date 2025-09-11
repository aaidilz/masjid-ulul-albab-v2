"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Users, User, Share2, Info, AlertTriangle } from "lucide-react";
import { googleSheetsService } from "@/app/services/GoogleSheetsService";
import type { AnnouncementDetailData } from "@/app/api/sheet/type";
import Link from "next/link";

export default function AnnouncementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [announcement, setAnnouncement] = useState<AnnouncementDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        setLoading(true);
        const id = params.id as string;
        
        // Fetch announcement detail
        const announcementData = await googleSheetsService.getAnnouncementDetailById(id);
        setAnnouncement(announcementData);
      } catch (error) {
        console.error("Error fetching announcement:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAnnouncement();
    }
  }, [params.id]);

  const handleShare = async () => {
    if (navigator.share && announcement) {
      try {
        await navigator.share({
          title: announcement.title,
          text: announcement.description.substring(0, 100) + "...",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link pengumuman telah disalin ke clipboard!");
    }
  };

  const formatDescription = (description: string) => {
    return description.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  const formatDateTime = (dateTimeStr: string) => {
    try {
      const date = new Date(dateTimeStr);
      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateTimeStr;
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat pengumuman...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!announcement) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Info className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Pengumuman Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">
              Pengumuman yang Anda cari tidak dapat ditemukan atau mungkin telah dihapus.
            </p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Beranda
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
          className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Announcement Header */}
        <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge
                variant="secondary"
                className="text-sm bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
              >
                <Info className="mr-1 h-3 w-3" />
                Pengumuman
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="dark:border-gray-600 dark:text-gray-200"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Bagikan
              </Button>
            </div>

            <CardTitle className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-gray-800 dark:text-white">
              {announcement.title}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Announcement Details */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 dark:text-white">
                  Detail Pengumuman
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-200">
                  {formatDescription(announcement.description)}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Event Info */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 dark:text-white">
                  Informasi Acara
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {announcement.datetime && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">Waktu</div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {formatDateTime(announcement.datetime)}
                      </div>
                    </div>
                  </div>
                )}

                {announcement.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">Lokasi</div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {announcement.location}
                      </div>
                    </div>
                  </div>
                )}

                {announcement.participants && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">Peserta</div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {announcement.participants}
                      </div>
                    </div>
                  </div>
                )}

                {announcement.speaker && (
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        Pemateri/Pembicara
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">{announcement.speaker}</div>
                    </div>
                  </div>
                )}

                {announcement.staff && (
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        Penanggung Jawab
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">{announcement.staff}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 dark:text-white">
                  Informasi Lebih Lanjut
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Untuk informasi lebih lanjut tentang pengumuman ini, silakan hubungi:
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">WhatsApp:</span> 0812-2476-4338
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Email:</span> sekretariat.albaab@gmail.com
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white" asChild>
                  <a
                    href="https://wa.me/6281224764338?text=Assalamu'alaikum, saya ingin bertanya tentang pengumuman di Masjid Ulul Albaab"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hubungi via WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900 dark:border-orange-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-orange-800 dark:text-orange-300">
                  <AlertTriangle className="h-5 w-5" />
                  Penting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 dark:text-orange-200 text-sm">
                  Pastikan untuk mengkonfirmasi kehadiran Anda dan membaca semua informasi dengan teliti. 
                  Jika ada perubahan jadwal atau lokasi, akan diumumkan melalui media sosial resmi masjid.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleShare}
                className="dark:border-gray-600 dark:text-gray-200"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Bagikan Pengumuman
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="dark:border-gray-600 dark:text-gray-200"
              >
                <Link href="/">Kembali ke Beranda</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

}