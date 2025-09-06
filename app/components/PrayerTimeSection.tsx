"use client";

import { useCallback } from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import RefreshIcon from '@mui/icons-material/Refresh';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { usePrayerTimes } from '@/app/hooks/usePrayerTimes';
import { PrayerTime } from '@/app/types/prayer';


interface PrayerTimesSectionProps {
  prayerTimes?: PrayerTime | null;
  loading?: boolean;
  error?: string | null;
  location?: string;
  onRefresh?: () => void;
  meta?: {
    methodName?: string;
    schoolName?: string;
    fajrDegree?: string;
    ishaDegree?: string;
  };
}

export default function PrayerTimesSection({
  prayerTimes: externalPrayerTimes = null,
  loading: externalLoading = false,
  error: externalError = null,
  location: externalLocation,
  onRefresh: externalOnRefresh,
  meta: externalMeta = {},
}: PrayerTimesSectionProps) {
  // Use the custom hook for internal state management
  const {
    prayerTimes: internalPrayerTimes,
    loading: internalLoading,
    error: internalError,
    refetch: internalRefetch,
  } = usePrayerTimes();

  // Use external props if provided, otherwise use internal state from hook
  const prayerTimes = externalPrayerTimes !== null ? externalPrayerTimes : internalPrayerTimes;
  const loading = externalLoading || internalLoading;
  const error = externalError || internalError;
  const location = externalLocation || "Bandung, Indonesia";
  const meta = externalMeta;

  // Default/fallback jika meta tidak ada
  const methodName = meta?.methodName || "KEMENAG (Kementerian Agama RI)";
  const schoolName = meta?.schoolName || "Syafi'i";
  const fajrDegree = meta?.fajrDegree || "20°";
  const ishaDegree = meta?.ishaDegree || "18°";

  const handleRefresh = useCallback(() => {
    if (externalOnRefresh) {
      externalOnRefresh();
    } else {
      internalRefetch();
    }
  }, [externalOnRefresh, internalRefetch]);

  return (
    <section id="prayer-times" className="bg-gradient-to-b from-green-600 to-green-800 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <AccessTimeIcon className="text-green-200" />
            <h2 className="text-2xl md:text-3xl font-bold">Waktu Sholat Hari Ini</h2>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="bg-green-700 hover:bg-green-800 disabled:bg-green-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <AutorenewIcon className="animate-spin" />
              ) : (
                <RefreshIcon />
              )}
              {loading ? "Memuat..." : "Perbarui"}
            </button>
          </div>
        </div>

        {/* Location Info */}
        <div className="flex items-center justify-center gap-2 mb-4 text-green-100">
          <LocationOnIcon className="text-sm" />
          <span className="text-sm font-medium">{location}</span>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-red-300">⚠️</span>
              <p className="text-sm font-medium">{error}</p>
            </div>
            <p className="text-xs mt-1 opacity-75">Menggunakan data cadangan</p>
          </div>
        )}

        {/* Prayer Times Grid */}
        {prayerTimes && (
          <>
            {/* Date Info */}
            <div className="text-center mb-6">
              <p className="text-lg md:text-xl font-medium opacity-90 mb-1">
                {prayerTimes.date}
              </p>
              <p className="text-sm md:text-base opacity-75">{prayerTimes.hijriDate}</p>
            </div>

            {/* Main Prayer Times */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
              <div className="prayer-time p-4 md:p-6 rounded-lg text-center bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200">
                <h3 className="font-bold text-base md:text-lg mb-2">Subuh</h3>
                <p className="text-xl md:text-2xl font-mono font-bold">{prayerTimes.fajr}</p>
              </div>
              <div className="prayer-time p-4 md:p-6 rounded-lg text-center bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200">
                <h3 className="font-bold text-base md:text-lg mb-2">Dzuhur</h3>
                <p className="text-xl md:text-2xl font-mono font-bold">{prayerTimes.dhuhr}</p>
              </div>
              <div className="prayer-time p-4 md:p-6 rounded-lg text-center bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200">
                <h3 className="font-bold text-base md:text-lg mb-2">Ashar</h3>
                <p className="text-xl md:text-2xl font-mono font-bold">{prayerTimes.asr}</p>
              </div>
              <div className="prayer-time p-4 md:p-6 rounded-lg text-center bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200">
                <h3 className="font-bold text-base md:text-lg mb-2">Maghrib</h3>
                <p className="text-xl md:text-2xl font-mono font-bold">{prayerTimes.maghrib}</p>
              </div>
              <div className="prayer-time p-4 md:p-6 rounded-lg text-center bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200 md:col-span-1 col-span-2">
                <h3 className="font-bold text-base md:text-lg mb-2">Isya</h3>
                <p className="text-xl md:text-2xl font-mono font-bold">{prayerTimes.isha}</p>
              </div>
            </div>

            {/* Additional prayer times */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="text-center bg-white/5 rounded-lg p-3 border border-white/10">
                <span className="opacity-75 text-sm">Imsak</span>
                <p className="font-mono font-semibold">{prayerTimes.imsak}</p>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3 border border-white/10">
                <span className="opacity-75 text-sm">Terbit</span>
                <p className="font-mono font-semibold">{prayerTimes.sunrise}</p>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3 border border-white/10">
                <span className="opacity-75 text-sm">Tenggelam</span>
                <p className="font-mono font-semibold">{prayerTimes.sunset}</p>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3 border border-white/10">
                <span className="opacity-75 text-sm">Sumber</span>
                <p className="text-xs font-semibold">Aladhan API</p>
              </div>
            </div>

            {/* Method Info */}
            <div className="text-center border-t border-white/20 pt-4">
              <p className="text-xs md:text-sm opacity-75">
                Metode: {methodName} (Subuh: {fajrDegree}, Isya: {ishaDegree}) |
                Mazhab: {schoolName}
              </p>
            </div>
          </>
        )}

        {/* Loading State */}
        {loading && !prayerTimes && (
          <div className="text-center py-12">
            <AutorenewIcon className="animate-spin text-4xl mb-4 text-green-200" />
            <p className="text-lg font-medium">Memuat jadwal sholat...</p>
            <p className="text-sm opacity-75 mt-2">Mohon tunggu sebentar</p>
          </div>
        )}

        {/* No Data State */}
        {!loading && !prayerTimes && !error && (
          <div className="text-center py-12">
            <AccessTimeIcon className="text-4xl mb-4 text-green-200 opacity-50" />
            <p className="text-lg font-medium">Jadwal sholat tidak tersedia</p>
            <p className="text-sm opacity-75 mt-2">Silakan periksa koneksi internet Anda</p>
          </div>
        )}
      </div>
    </section>
  );
}
