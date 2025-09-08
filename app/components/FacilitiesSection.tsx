"use client";

import { Ruler, BookOpenText, BookCopy, Wifi, Network} from 'lucide-react';
import MosqueIcon from "@mui/icons-material/Mosque";

export default function FacilitiesSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center section-title text-gray-900 dark:text-white">
          Fasilitas Kami
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
            <div className="text-green-600 text-4xl mb-4">
              <MosqueIcon />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Ruang Sholat</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Kapasitas 500 jamaah dengan alas sajadah yang nyaman dan kipas
              angin.
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Ruler className="mr-2" />
              <span>+-800 m²</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
            <div className="text-green-600 text-4xl mb-4">
              <BookOpenText />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Pojok Baca</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Koleksi lebih dari 200 buku Islami berbagai disiplin ilmu, terbuka
              untuk umum.
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <BookCopy className="mr-2" />
              <span>200+ buku</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
            <div className="text-green-600 text-4xl mb-4">
              <Wifi />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">WiFi Gratis</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Akses internet gratis untuk jamaah, mendukung kegiatan kajian
              online dan kemudahan ibadah digital.
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Network className="mr-2" />
              <span>24/7 tersedia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
