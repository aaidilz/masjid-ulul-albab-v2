"use client";

import { useState, useEffect, useCallback } from 'react';
import { Expand } from 'lucide-react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Image from "next/image";

interface OrganizationSectionProps {
  showOrgChart?: boolean;
  setShowOrgChart?: (show: boolean) => void;
  downloadOrgChart?: () => void;
}

export default function OrganizationSection({
  showOrgChart: externalShowOrgChart,
  setShowOrgChart: externalSetShowOrgChart,
  downloadOrgChart: externalDownloadOrgChart,
}: OrganizationSectionProps) {
  // Internal state management
  const [internalShowOrgChart, setInternalShowOrgChart] = useState(false);

  // Use external props if provided, otherwise use internal state
  const showOrgChart = externalShowOrgChart !== undefined ? externalShowOrgChart : internalShowOrgChart;
  const setShowOrgChart = externalSetShowOrgChart || setInternalShowOrgChart;

  // Default download function
  const handleDownloadOrgChart = () => {
    if (externalDownloadOrgChart) {
      externalDownloadOrgChart();
    } else {
      // Default download implementation
      try {
        const link = document.createElement('a');
        link.href = '/img/struktur-organisasi.jpg';
        link.download = 'struktur-organisasi-dkm-ulul-albaab.jpg';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading organization chart:', error);
        // Fallback: open in new tab
        window.open('/img/struktur-organisasi.jpg', '_blank');
      }
    }
  };

  // Handle modal close with ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && showOrgChart) {
      setShowOrgChart(false);
    }
  }, [showOrgChart, setShowOrgChart]);

  // Add/remove event listener for ESC key and prevent body scroll
  useEffect(() => {
    if (showOrgChart) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showOrgChart, handleKeyDown]);
  return (
    <section id="organization" className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center section-title text-gray-900 dark:text-white">
          Struktur Organisasi
        </h2>

        {/* Card dengan gambar struktur organisasi */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div
              className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setShowOrgChart(true)}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400 text-center">
                  Bagan Struktur Organisasi DKM Ulul Albaab
                </h3>
                <div className="relative">
                  <Image
                    src="/img/struktur-organisasi.jpg"
                    alt="Struktur Organisasi DKM Ulul Albaab"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg"
                    style={{
                      objectFit: "contain",
                      maxHeight: "400px",
                    }}
                  />
                  <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-90 px-4 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        Klik untuk melihat detail
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    <Expand className="mr-1 text-xs" />
                    Klik untuk memperbesar
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadOrgChart();
                    }}
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-3 py-1 rounded text-sm font-medium transition flex items-center cursor-pointer"
                  >
                    <PictureAsPdfIcon className="mr-1 text-xs" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal untuk menampilkan gambar full */}
        {showOrgChart && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setShowOrgChart(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Struktur Organisasi DKM Ulul Albaab
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowOrgChart(false)}
                    className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    ✕ Tutup
                  </button>
                </div>
              </div>
              <div className="p-6">
                <Image
                  src="/img/struktur-organisasi.jpg"
                  alt="Struktur Organisasi DKM Ulul Albaab"
                  width={1200}
                  height={900}
                  className="w-full h-auto"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Existing content - Tugas dan Fungsi */}
        <div className="mt-12 bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
          <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">
            Tugas dan Fungsi
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-2 text-gray-900 dark:text-gray-100">Dewan Kemakmuran Masjid DKM</h4>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>
                  DKM UAB UNPAS berfungsi sebagai Lembaga Dakwah Kampus (LDK)
                </li>
                <li>Mengelola kegiatan masjid sehari-hari dan sebagai</li>
                <li>Fasilitator umat di lingkungan Kampus IV UNPAS.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-gray-900 dark:text-gray-100">Departemen DKM UAB</h4>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>
                  <strong className="text-gray-900 dark:text-gray-100">Syiar Media:</strong> Menyebarkan dakwah Islam melalui
                  media cetak dan media sosial.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-gray-100">Pelayanan Umat:</strong> Mengelola masjid dan
                  memfasilitasi kebutuhan ibadah jamaah.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-gray-100">Kaderisasi:</strong> Mengembangkan SDM pengurus
                  melalui pelatihan fisik dan spiritual, serta merekrut dan
                  membina anggota DKM.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-gray-100">Kemuslimahan:</strong> Membina dan mengkoordinasi
                  kegiatan pengurus Akhwat DKM Ulul Albaab.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
