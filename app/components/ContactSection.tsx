"use client";

import { RefObject, useEffect, useState } from "react";
import { MapPin, Mail, Send, Info, CircleCheck, Ban, Loader, Phone, Clock } from 'lucide-react';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';


interface ContactSectionProps {
  contactLoading: boolean;
  contactMessage: { type: "success" | "error"; text: string } | null;
  namaRef: RefObject<HTMLInputElement | null>;
  emailRef: RefObject<HTMLInputElement | null>;
  subjekRef: RefObject<HTMLInputElement | null>;
  pesanRef: RefObject<HTMLTextAreaElement | null>;
  onSubmit: (e: React.FormEvent) => void;
  onClearMessage: () => void;
}

export default function ContactSection({
  contactLoading,
  contactMessage,
  namaRef,
  emailRef,
  subjekRef,
  pesanRef,
  onSubmit,
  onClearMessage,
}: ContactSectionProps) {
  const [clientDate, setClientDate] = useState<string>("");

  useEffect(() => {
    setClientDate(
      new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
        " pukul " +
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
    );
  }, []);
  return (
    <section id="contact" className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center section-title text-gray-900 dark:text-white">
          Hubungi Kami
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">
              Informasi Kontak
            </h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-green-600 dark:text-green-400 text-xl mr-4 mt-1">
                  <MapPin />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Alamat</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Jl. Dr. Setiabudhi No. 193 Bandung.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-green-600 dark:text-green-400 text-xl mr-4 mt-1">
                  <Phone />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Telepon</h4>
                  <p className="text-gray-700 dark:text-gray-300">(0812)24764338</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-green-600 dark:text-green-400 text-xl mr-4 mt-1">
                  <Mail />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Email</h4>
                  <p className="text-gray-700 dark:text-gray-300">sekretariat.albaab@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-green-600 dark:text-green-400 text-xl mr-4 mt-1">
                  <Clock />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Jam Operasional</h4>
                  <p className="text-gray-700 dark:text-gray-300">Setiap hari 07.00 - 21.00 WIB</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold mb-3 text-gray-900 dark:text-gray-100">Media Sosial</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/ululalbaab_unpas/"
                  className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-800 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://wa.me/6281224764338?text=Assalamu'alaikum, saya ingin bertanya tentang Masjid Ulul Albaab"
                  className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                </a>
                <a
                  href="https://www.youtube.com/@UlulAlbaabChannel"
                  className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTubeIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">
              Kirim Pesan
            </h3>

            {/* Success/Error Message */}
            {contactMessage && (
              <div
                className={`mb-4 p-4 rounded-lg border flex items-start justify-between ${
                  contactMessage.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                }`}
              >
                <div className="flex items-start">
                  {contactMessage.type === "success" ? (
                    <CircleCheck className="mr-2 mt-0.5 text-green-500 dark:text-green-400" />
                  ) : (
                    <Ban className="mr-2 mt-0.5 text-red-500 dark:text-red-400" />
                  )}
                  <p className="text-sm">{contactMessage.text}</p>
                </div>
                <button
                  onClick={onClearMessage}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition ml-2"
                >
                  ✕
                </button>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  ref={namaRef}
                  type="text"
                  id="nama"
                  name="nama"
                  required
                  disabled={contactLoading}
                  autoComplete="name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-600 focus:border-green-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={contactLoading}
                  autoComplete="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-600 focus:border-green-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="nama@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subjek"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subjek <span className="text-red-500">*</span>
                </label>
                <input
                  ref={subjekRef}
                  type="text"
                  id="subjek"
                  name="subjek"
                  required
                  disabled={contactLoading}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-600 focus:border-green-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Topik pesan Anda"
                />
              </div>

              <div>
                <label
                  htmlFor="pesan"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Pesan <span className="text-red-500">*</span>
                </label>
                <textarea
                  ref={pesanRef}
                  id="pesan"
                  name="pesan"
                  rows={4}
                  required
                  disabled={contactLoading}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-600 focus:border-green-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={contactLoading}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium transition w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {contactLoading ? (
                  <>
                    <Loader className="animate-spin mr-2" />
                    Mengirim Pesan...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>

            {/* Form Info */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start">
                <Info className="text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong className="text-blue-800 dark:text-blue-200">Info:</strong> Pesan Anda akan langsung tersimpan di
                    sistem kami. Tim akan merespons dalam 1x24 jam via email
                    atau WhatsApp.
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Tanggal pengiriman akan otomatis tercatat: {clientDate} WIB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
