"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, BellOff, Settings } from 'lucide-react';
import { notificationService } from '@/app/utils/notifications';
import { googleSheetsService } from '@/app/services/GoogleSheetsService';
import type { AnnouncementData } from '@/app/api/sheet/type';

export default function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setIsSupported(notificationService.isSupported());
    setPermission(notificationService.getPermissionStatus());
    
    // Load last checked time from localStorage
    const stored = localStorage.getItem('masjid-notifications-last-checked');
    setLastChecked(stored);

    // Check for new announcements every 5 minutes
    const interval = setInterval(checkForNewAnnouncements, 5 * 60 * 1000);
    
    // Check immediately on load
    checkForNewAnnouncements();

    return () => clearInterval(interval);
  }, []);

  const checkForNewAnnouncements = async () => {
    if (permission !== 'granted') return;

    try {
      const announcements = await googleSheetsService.getAnnouncements();
      const now = new Date().toISOString();
      const lastCheck = lastChecked ? new Date(lastChecked) : new Date(Date.now() - 24 * 60 * 60 * 1000);

      // Find new announcements since last check
      const newAnnouncements = announcements.filter(announcement => {
        const announcementDate = new Date(announcement.startDate || now);
        return announcementDate > lastCheck;
      });

      // Show notifications for new announcements
      for (const announcement of newAnnouncements) {
        await notificationService.showAnnouncementNotification(announcement);
        
        // Small delay between notifications
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Update last checked time
      localStorage.setItem('masjid-notifications-last-checked', now);
      setLastChecked(now);

    } catch (error) {
      console.error('Error checking for new announcements:', error);
    }
  };

  const requestPermission = async () => {
    const newPermission = await notificationService.requestPermission();
    setPermission(newPermission);
    
    if (newPermission === 'granted') {
      // Show welcome notification
      await notificationService.showNotification(
        '🕌 Notifikasi Masjid Ulul Albaab Aktif',
        {
          body: 'Anda akan mendapat notifikasi untuk pengumuman dan kajian terbaru',
          tag: 'welcome-notification'
        }
      );
      
      // Check for announcements immediately
      checkForNewAnnouncements();
    }
  };

  const testNotification = async () => {
    await notificationService.showNotification(
      '🧪 Test Notifikasi',
      {
        body: 'Notifikasi berfungsi dengan baik! Anda akan mendapat update pengumuman dan kajian terbaru.',
        tag: 'test-notification'
      }
    );
  };

  if (!isSupported) {
    return null; // Don't show if notifications not supported
  }

  return (
    <>
      {/* Notification Bell Button */}
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          onClick={() => setShowSettings(!showSettings)}
          className={`rounded-full w-12 h-12 shadow-lg ${
            permission === 'granted' 
              ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800' 
              : 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800'
          }`}
          title="Pengaturan Notifikasi"
        >
          {permission === 'granted' ? (
            <Bell className="h-5 w-5 text-white" />
          ) : (
            <BellOff className="h-5 w-5 text-white" />
          )}
        </Button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed bottom-20 right-4 z-50">
          <Card className="w-80 shadow-xl border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                Notifikasi Browser
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p className="mb-2">
                  Aktifkan notifikasi untuk mendapat info pengumuman dan kajian terbaru langsung di perangkat Anda.
                </p>
                
                <div className={`p-2 rounded text-xs ${
                  permission === 'granted' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : permission === 'denied'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  Status: {
                    permission === 'granted' ? '✅ Aktif' :
                    permission === 'denied' ? '❌ Ditolak' :
                    '⏳ Belum Diatur'
                  }
                </div>
              </div>

              <div className="space-y-2">
                {permission !== 'granted' && (
                  <Button 
                    onClick={requestPermission}
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                    size="sm"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Aktifkan Notifikasi
                  </Button>
                )}

                {permission === 'granted' && (
                  <Button 
                    onClick={testNotification}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    🧪 Test Notifikasi
                  </Button>
                )}

                <Button 
                  onClick={() => setShowSettings(false)}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  Tutup
                </Button>
              </div>

              {permission === 'denied' && (
                <div className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-gray-100 dark:bg-gray-800 rounded">
                  <p className="font-medium mb-1">Cara mengaktifkan:</p>
                  <p>1. Klik ikon gembok di address bar</p>
                  <p>2. Ubah "Notifications" ke "Allow"</p>
                  <p>3. Refresh halaman</p>
                </div>
              )}

              {lastChecked && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Terakhir dicek: {new Date(lastChecked).toLocaleString('id-ID')}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}