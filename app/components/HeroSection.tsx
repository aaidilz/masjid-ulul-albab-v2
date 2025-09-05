"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, Heart, Users, BookOpen, Calendar } from "lucide-react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      title: "Masjid Ulul Albaab",
      subtitle: "Pusat Ibadah dan Dakwah di Kampus UNPAS",
      // description: "Masjid yang hangat untuk seluruh keluarga besar Universitas Pasundan",
      image: "/img/hero.jpg"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={slides[currentSlide].image}
          alt="Masjid Ulul Albaab Background"
          fill
          priority
          className="object-cover transition-transform duration-1000 hover:scale-105"
          style={{
            objectPosition: "center center",
          }}
          sizes="100vw" // Add sizes for better performance
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
        
        {/* Animated overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
        </div>
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center text-white px-8 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Welcome badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-bounce">
          <Heart className="h-4 w-4 text-red-400" />
          <span className="text-sm font-medium">Selamat Datang di Rumah Allah</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold mb-4 font-poppins leading-tight">
          {slides[currentSlide].title}
        </h1>
        
        <h2 className="text-xl md:text-2xl font-medium mb-4 text-green-300 font-inter">
          {slides[currentSlide].subtitle}
        </h2>
        
        {/* <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90 font-inter">
          {slides[currentSlide].description}
        </p> */}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <Users className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold">500+</div>
            <div className="text-xs opacity-75">Jamaah Aktif</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold">20+</div>
            <div className="text-xs opacity-75">Tahun Berdiri</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold">50+</div>
            <div className="text-xs opacity-75">Kegiatan/Tahun</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <Heart className="h-6 w-6 mx-auto mb-2 text-red-400" />
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-xs opacity-75">Terbuka</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center mb-12">
          <a
            href="#about"
            className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 block md:inline-block transform hover:scale-105 hover:shadow-lg font-poppins"
          >
            <span className="flex items-center justify-center gap-2">
              Tentang Kami
              <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </a>
          <a
            href="#contact"
            className="group border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 rounded-full font-semibold transition-all duration-300 block md:inline-block transform hover:scale-105 backdrop-blur-sm font-poppins"
          >
            <span className="flex items-center justify-center gap-2">
              Hubungi Kami
              <Heart className="h-4 w-4 group-hover:text-red-500 transition-colors" />
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/70" />
        </div> */}
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
    </section>
  );
}
