"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Clock, Share2, BookOpen, Tag } from "lucide-react";
import { googleSheetsService } from "@/app/services/GoogleSheetsService";
import type { ArticleData } from "@/app/api/sheet/type";
import Image from "next/image";
import Link from "next/link";

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<ArticleData[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const id = params.id as string;

        // Fetch article detail
        const articleData = await googleSheetsService.getArticleById(id);
        setArticle(articleData);

        // Fetch related articles (same category, excluding current article)
        if (articleData) {
          const allArticles = await googleSheetsService.getArticles();
          const related = allArticles
            .filter(a => a.id !== id && a.category === articleData.category)
            .slice(0, 3);
          setRelatedArticles(related);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.content.substring(0, 100) + "...",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link artikel telah disalin ke clipboard!");
    }
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 leading-relaxed">
        {paragraph}
      </p>
    ));
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

  if (!article) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Artikel Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">
              Artikel yang Anda cari tidak dapat ditemukan atau mungkin telah dihapus.
            </p>
            <Link href="/artikel">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Daftar Artikel
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
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
          {/* Article Header */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="text-sm">
                  <Tag className="mr-1 h-3 w-3" />
                  {article.category}
                </Badge>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Bagikan
                </Button>
              </div>

              <CardTitle className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {article.title}
              </CardTitle>

              <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{formatDate(article.date)}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Featured Image */}
          {article.imageUrl && (
            <Card className="mb-8">
              <CardContent className="p-0">
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Article Content */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed">
                  {formatContent(article.content)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Article Footer */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Tentang Penulis</h4>
                  <p className="text-gray-600">{article.author}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Bagikan Artikel
                  </Button>
                  <Link href="/artikel">
                    <Button variant="outline" size="sm">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Artikel Lainnya
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Artikel Terkait</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Card key={relatedArticle.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      {relatedArticle.imageUrl && (
                        <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                          <Image
                            src={relatedArticle.imageUrl}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>
                      )}
                      <CardTitle className="text-lg line-clamp-2">
                        {relatedArticle.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="mr-1 h-3 w-3" />
                        {relatedArticle.author}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/artikel/${relatedArticle.id}`}>
                        <Button size="sm" className="w-full">
                          Baca Artikel
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