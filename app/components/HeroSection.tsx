"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/hero.jpg"
          alt="Masjid Ulul Albaab Background"
          fill
          priority
          className="object-cover"
          style={{
            objectPosition: "center center",
          }}
          sizes="100vw" // Add sizes for better performance
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Masjid Ulul Albaab
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Pusat Ibadah dan Dakwah di Kampus Universitas Pasundan
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <a
            href="#about"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition block md:inline-block"
          >
            Tentang Kami
          </a>
          <a
            href="#contact"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 rounded-lg font-medium transition block md:inline-block"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}
