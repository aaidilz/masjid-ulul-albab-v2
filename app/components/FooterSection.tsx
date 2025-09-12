"use client";

import MosqueIcon from "@mui/icons-material/Mosque";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FooterSectionProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function FooterSection({ setActiveTab }: FooterSectionProps) {
  const handleActivityLink = (tab: string) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    // Scroll to activities section
    const activitiesSection = document.getElementById("activities");
    if (activitiesSection) {
      activitiesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 md:py-12 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <MosqueIcon className="text-green-500 mr-2" />
              <h3 className="text-lg md:text-xl font-bold font-poppins">
                Masjid <span className="text-green-500">Ulul Albaab</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-4 text-sm md:text-base font-inter">
              Pusat kegiatan keislaman yang membina umat menuju masyarakat yang
              berakhlak mulia dan berilmu.
            </p>
            <p className="text-gray-400 text-sm md:text-base font-inter">
              © 2025 Masjid Ulul Albaab. All rights reserved.
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-bold mb-4 font-poppins">
              Tautan Cepat
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-white hover:text-green-400 transition text-sm md:text-base font-inter"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white hover:text-green-400 transition text-sm md:text-base font-inter"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#organization"
                  className="text-gray-400 hover:text-white hover:text-green-400 transition text-sm md:text-base font-inter"
                >
                  Struktur Organisasi
                </a>
              </li>
              <li>
                <a
                  href="#finance"
                  className="text-gray-400 hover:text-white hover:text-green-400 transition text-sm md:text-base font-inter"
                >
                  Laporan Keuangan
                </a>
              </li>
              <li>
                <a
                  href="#activities"
                  className="text-gray-400 hover:text-white hover:text-green-400 transition text-sm md:text-base font-inter"
                >
                  Kegiatan
                </a>
              </li>
              <li>
                <a
                  href="#articles"
                  className="text-gray-400 hover:text-white hover:text-green-400 transition text-sm md:text-base font-inter"
                >
                  Artikel
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="text-gray-400 hover:text-white hover:text-green-400 transition text-sm md:text-base font-inter"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="/volunteer"
                  className="text-gray-400 hover:text-white hover:text-green-400 transition text-sm md:text-base font-inter"
                >
                  Volunteer
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-bold mb-4 font-poppins">Kegiatan</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleActivityLink("rutin")}
                  className="text-gray-400 hover:text-white hover:text-green-400 transition text-left text-sm md:text-base font-inter"
                >
                  Rutin
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleActivityLink("khusus")}
                  className="text-gray-400 hover:text-white hover:text-green-400 transition text-left text-sm md:text-base font-inter"
                >
                  Khusus
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleActivityLink("jadwal")}
                  className="text-gray-400 hover:text-white hover:text-green-400 transition text-left text-sm md:text-base font-inter"
                >
                  Jadwal
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-bold mb-4 font-poppins">
              Berlangganan
            </h4>
            <p className="text-gray-400 mb-4 text-sm md:text-base font-inter">
              Dapatkan update kegiatan terbaru melalui email Anda.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Sedang Dalam Perbaikan"
                className="rounded-l-lg rounded-r-none bg-white text-black flex-1"
                disabled
              />
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 rounded-l-none rounded-r-lg px-4"
                disabled
              >
                <Send />
              </Button>
            </div>

            <div className="mt-6">
              <h5 className="font-bold mb-2 text-sm md:text-base font-poppins">
                Donasi
              </h5>
              <p className="text-gray-400 mb-2 text-sm md:text-base font-inter">
                SeaBank
              </p>
              <p className="font-mono bg-gray-700 dark:bg-gray-800 p-2 rounded-lg text-xs md:text-sm transition-colors">
                9013 7458 0025 (a.n. Azhar Muttaqien (Bendahara Periode
                2025/2026))
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-600 mt-8 pt-8 text-center text-gray-400 transition-colors">
          <p className="text-sm md:text-base font-inter">
            Dibangun dengan ❤ oleh Tim IT Masjid Ulul Albaab
          </p>
        </div>
      </div>
    </footer>
  );
}
