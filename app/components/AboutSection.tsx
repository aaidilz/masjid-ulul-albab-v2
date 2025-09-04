"use client";

import { useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const [showFullHistory, setShowFullHistory] = useState(false);

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
    <section id="about" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center section-title">
          Tentang Masjid Ulul Albaab
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-green-700">
              Rumah Spiritual di Kampus UNPAS
            </h3>

            {/* Desktop Content */}
            <div className="hidden lg:block">
              <div className="space-y-4 text-gray-700 max-h-96 overflow-y-auto pr-2">
                {fullContent.map((content, index) =>
                  content.type === "title" ? (
                    <p
                      key={index}
                      className="font-bold text-green-700 mt-4 first:mt-0"
                    >
                      {content.text}
                    </p>
                  ) : (
                    <p key={index} className="leading-relaxed">
                      {content.text}
                    </p>
                  )
                )}
              </div>
            </div>

            {/* Mobile Content */}
            <div className="block lg:hidden">
              <div className="bg-white rounded-lg p-4 max-h-80 overflow-y-auto border border-gray-200 shadow-sm">
                <div className="space-y-3 text-sm text-gray-700 pr-2">
                  {(showFullHistory ? fullContent : shortContent).map(
                    (content, index) =>
                      content.type === "title" ? (
                        <p
                          key={index}
                          className="font-bold text-green-700 mt-3 first:mt-0"
                        >
                          {content.text}
                        </p>
                      ) : (
                        <p key={index} className="leading-relaxed">
                          {content.text}
                        </p>
                      )
                  )}

                  {!showFullHistory && (
                    <button
                      onClick={() => setShowFullHistory(true)}
                      className="text-green-600 font-medium text-sm hover:text-green-700 transition-colors mt-3 block"
                    >
                      Baca selengkapnya...
                    </button>
                  )}

                  {showFullHistory && (
                    <button
                      onClick={() => setShowFullHistory(false)}
                      className="text-green-600 font-medium text-sm hover:text-green-700 transition-colors mt-3 block"
                    >
                      Tampilkan lebih sedikit
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl md:text-3xl font-bold text-green-600">
                  20+
                </div>
                <div className="text-sm text-gray-600">Tahun Berdiri</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl md:text-3xl font-bold text-green-600">
                  500+
                </div>
                <div className="text-sm text-gray-600">Jamaah Aktif</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 col-span-2 md:col-span-1">
                <div className="text-2xl md:text-3xl font-bold text-green-600">
                  50+
                </div>
                <div className="text-sm text-gray-600">Kegiatan/Tahun</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <Image
                src="/img/about.jpg"
                alt="Masjid Ulul Albaab"
                width={600}
                height={400}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Est. 2002
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
