"use client";

import { useState, useEffect } from "react";
import { X, Info, AlertTriangle, Calendar, ExternalLink } from "lucide-react";
import { googleSheetsService } from "@/app/services/GoogleSheetsService";
import type { AnnouncementData } from "@/app/api/sheet/type";

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await googleSheetsService.getAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [announcements.length]);

  if (loading || !isVisible || announcements.length === 0) {
    return null;
  }

  const currentAnnouncement = announcements[currentIndex];

  const getIcon = (category: string) => {
    switch (category) {
      case "urgent":
        return <AlertTriangle className="h-4 w-4" />;
      case "event":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getBgColor = (category: string) => {
    switch (category) {
      case "urgent":
        return "bg-red-600 dark:bg-red-700";
      case "event":
        return "bg-blue-600 dark:bg-blue-700";
      default:
        return "bg-green-600 dark:bg-green-700";
    }
  };

  return (
    <div className={`${getBgColor(currentAnnouncement.category)} text-white relative overflow-hidden`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {getIcon(currentAnnouncement.category)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {currentAnnouncement.title}
              </p>
              <p className="text-xs opacity-90 truncate">
                {currentAnnouncement.content}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {currentAnnouncement.buttonText && currentAnnouncement.buttonLink && (
              <a
                href={currentAnnouncement.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1"
              >
                {currentAnnouncement.buttonText}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            {announcements.length > 1 && (
              <div className="flex gap-1">
                {announcements.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}

            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
      </div>
    </div>
  );
}