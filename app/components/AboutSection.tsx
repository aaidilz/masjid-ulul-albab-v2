"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Users, Calendar, Award } from "lucide-react";

export default function AboutSection() {
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fullContent = [
    { type: "title", text: "Sejarah Singkat" },
    {
      type: "paragraph",
      text: "Dewan Kemakmuran Masjid Ulul Albaab Universitas Pasundan (DKM UAB UNPAS) didirikan di Bandung pada tahun 2002. Organisasi ini berkedudukan di Masjid Jami Ulul Albaab Kampus IV UNPAS, Jl. Dr. Setiabudhi No. 193 Bandung.",
    },
    {
      type: "paragraph",
      text: "Sebagai lembaga yang bergerak dalam pembinaan keislaman di lingkungan kampus, DKM UAB UNPAS berkoordinasi secara internal dengan Majelis Syuro untuk memastikan setiap keputusan sesuai dengan syariat Islam.",
    },
    {
      type: "paragraph",
      text: "Dalam koordinasi eksternal, DKM UAB UNPAS bekerja sama dengan LPPSI (Lembaga Pengembangan dan Pengkajian Syiar Islam), Ketua DKM Pusat, dan Pembina DKM Ulul Albaab Universitas Pasundan untuk mengembangkan program-program dakwah yang lebih komprehensif.",
    },
    { type: "title", text: "Perkembangan Organisasi" },
    {
      type: "paragraph",
      text: "Sejak berdiri, DKM UAB UNPAS telah mengalami perkembangan signifikan dalam menjalankan misi dakwah di lingkungan akademis. Berbagai program telah dilaksanakan untuk membina mahasiswa dan sivitas akademika dalam pemahaman Islam yang kaffah.",
    },
    {
      type: "paragraph",
      text: "Organisasi ini juga aktif dalam kegiatan sosial kemasyarakatan, tidak hanya terbatas pada lingkungan kampus tetapi juga melayani masyarakat umum di sekitar lokasi masjid.",
    },
    { type: "title", text: "Program dan Kegiatan" },
    {
      type: "paragraph",
      text: "Program pemberdayaan ekonomi umat dan pendidikan Islam menjadi fokus utama dalam pengembangan organisasi. DKM UAB UNPAS menyelenggarakan berbagai kegiatan rutin seperti kajian, TPA, dan majelis taklim.",
    },
    {
      type: "paragraph",
      text: "Selain itu, organisasi ini juga mengadakan program khusus seperti Ramadhan bersama, bakti sosial, dan kegiatan pemberdayaan masyarakat sekitar kampus.",
    },
    { type: "title", text: "Visi ke Depan" },
    {
      type: "paragraph",
      text: "DKM UAB UNPAS terus berkomitmen untuk menjadi pusat dakwah yang modern dan komprehensif, mengintegrasikan nilai-nilai Islam dengan perkembangan teknologi dan kebutuhan zaman.",
    },
    {
      type: "paragraph",
      text: "Dengan dukungan Universitas Pasundan dan masyarakat, DKM UAB UNPAS optimis dapat berkontribusi lebih besar dalam pembinaan umat dan dakwah Islam di Indonesia.",
    },
  ];

  const shortContent = fullContent.slice(0, 4); // Hanya 4 item pertama untuk preview

  return (
    <section ref={sectionRef} id="about" className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-gray-900 dark:text-white font-poppins transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Tentang Masjid Ulul Albaab
        </h2>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-green-700 dark:text-green-400 font-poppins">
              Masjid di Kampus UNPAS
            </h3>

            {/* Desktop Content */}
            <div className="hidden lg:block">
              <div className="space-y-4 text-gray-700 dark:text-gray-300 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {fullContent.map((content, index) =>
                  content.type === "title" ? (
                    <p
                      key={index}
                      className="font-bold text-green-700 dark:text-green-400 mt-4 first:mt-0 font-poppins"
                    >
                      {content.text}
                    </p>
                  ) : (
                    <p key={index} className="leading-relaxed font-inter">
                      {content.text}
                    </p>
                  )
                )}
              </div>
            </div>

            {/* Mobile Content */}
            <div className="block lg:hidden">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-h-80 overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 pr-2">
                  {(showFullHistory ? fullContent : shortContent).map(
                    (content, index) =>
                      content.type === "title" ? (
                        <p
                          key={index}
                          className="font-bold text-green-700 dark:text-green-400 mt-3 first:mt-0 font-poppins"
                        >
                          {content.text}
                        </p>
                      ) : (
                        <p key={index} className="leading-relaxed font-inter">
                          {content.text}
                        </p>
                      )
                  )}

                  {!showFullHistory && (
                    <button
                      onClick={() => setShowFullHistory(true)}
                      className="text-green-600 dark:text-green-400 font-medium text-sm hover:text-green-700 dark:hover:text-green-300 transition-colors mt-3 block flex items-center gap-1 font-poppins"
                    >
                      Baca selengkapnya...
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  )}

                  {showFullHistory && (
                    <button
                      onClick={() => setShowFullHistory(false)}
                      className="text-green-600 dark:text-green-400 font-medium text-sm hover:text-green-700 dark:hover:text-green-300 transition-colors mt-3 block flex items-center gap-1 font-poppins"
                    >
                      Tampilkan lebih sedikit
                      <ChevronUp className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:scale-105 group">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 font-poppins">
                  20+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-inter">Tahun Berdiri</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:scale-105 group">
                <Users className="h-6 w-6 mx-auto mb-2 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 font-poppins">
                  500+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-inter">Jamaah Aktif</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 col-span-2 md:col-span-1 transition-all duration-300 hover:shadow-md hover:scale-105 group">
                <Award className="h-6 w-6 mx-auto mb-2 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 font-poppins">
                  50+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-inter">Kegiatan/Tahun</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`order-1 lg:order-2 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              <Image
                src="/img/about.jpg"
                alt="Masjid Ulul Albaab"
                width={600}
                height={400}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse font-poppins">
                Est. 2002
              </div>
              
              {/* Floating decoration */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl animate-float delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
