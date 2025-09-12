"use client";

import { MapPinned, Clock, Expand, Info } from "lucide-react";

export default function MapSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center section-title text-gray-900 dark:text-white">
          Lokasi Kami
        </h2>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                  Masjid Jami&apos; Ulul Albaab
                </h3>
                <p className="text-gray-600 dark:text-gray-400 flex items-center">
                  <MapPinned className="mr-2 text-green-600 dark:text-green-400" />
                  Jl. Dr. Setiabudhi No. 193, Bandung
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <a
                  href="https://maps.app.goo.gl/RJv2uqVD2fwq7vEx5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition inline-flex items-center"
                >
                  <MapPinned className="mr-2" />
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Google Maps */}
          <div className="h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15844.813056748633!2d107.58189495744877!3d-6.866228899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6be11116b83%3A0x21025c959e0ce093!2sMasjid%20Ulul%20Albab!5e0!3m2!1sid!2sid!4v1755323938340!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Masjid Ulul Albaab"
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Additional Info */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <MapPinned className="text-green-600 dark:text-green-400 mr-2" />
                <span className="text-gray-900 dark:text-gray-100">
                  Kampus IV Universitas Pasundan
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="text-green-600 dark:text-green-400 mr-2" />
                <span className="text-gray-900 dark:text-gray-100">
                  Buka 24 jam untuk jamaah
                </span>
              </div>
              <div className="flex items-center">
                <Expand className="text-green-600 dark:text-green-400 mr-2" />
                <span className="text-gray-900 dark:text-gray-100">
                  Parkir tersedia
                </span>
              </div>
            </div>
          </div>

          {/* Transportation Info */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700">
              <h4 className="font-bold mb-3 text-green-700 dark:text-green-400 flex items-center">
                <MapPinned className="mr-2" />
                Transportasi Umum
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Angkot jurusan Cicaheum - Ledeng</li>
                <li>• Trans Studio Bandung (TSB) - turun di Dago</li>
                <li>• Ojek online dari berbagai titik di Bandung</li>
                <li>• Bus kampus UNPAS (jadwal terbatas)</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700">
              <h4 className="font-bold mb-3 text-green-700 dark:text-green-400 flex items-center">
                <Info className="mr-2" />
                Petunjuk Arah
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Dari Dago Plaza: ±5 menit berkendara</li>
                <li>• Dari Bandung Supermall: ±15 menit</li>
                <li>• Dari Stasiun Bandung: ±20 menit</li>
                <li>• Landmark: Borma Toserba Setiabudhi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
