"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, HandHeart, Mail, Phone, MapPin, Briefcase, CheckCircle, AlertCircle } from "lucide-react";
import { googleSheetsService } from "@/app/services/GoogleSheetsService";
import Link from "next/link";

export default function VolunteerRegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [selectedProgram, setSelectedProgram] = useState("");

  // Form refs
  const namaRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);
  const alamatRef = useRef<HTMLTextAreaElement>(null);
  const pekerjaanRef = useRef<HTMLInputElement>(null);
  const keahlianRef = useRef<HTMLTextAreaElement>(null);
  const motivasiRef = useRef<HTMLTextAreaElement>(null);
  const waktuTersediaRef = useRef<HTMLTextAreaElement>(null);

  const volunteerPrograms = [
    "Pengajar TPA",
    "Tim Kebersihan Masjid",
    "Koordinator Acara",
    "Tim Media & Dokumentasi",
    "Pelayanan Jamaah",
    "Tim Keamanan",
    "Administrasi & Sekretariat",
    "Tim Konsumsi",
    "Lainnya"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formData = {
        nama: namaRef.current?.value || "",
        email: emailRef.current?.value || "",
        whatsapp: whatsappRef.current?.value || "",
        alamat: alamatRef.current?.value || "",
        pekerjaan: pekerjaanRef.current?.value || "",
        keahlian: keahlianRef.current?.value || "",
        programDipilih: selectedProgram,
        motivasi: motivasiRef.current?.value || "",
        waktuTersedia: waktuTersediaRef.current?.value || "",
      };

      const response = await googleSheetsService.submitVolunteerRegistration(formData);

      if (response.success) {
        setMessage({
          type: "success",
          text: response.message
        });

        // Clear form
        if (namaRef.current) namaRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (whatsappRef.current) whatsappRef.current.value = "";
        if (alamatRef.current) alamatRef.current.value = "";
        if (pekerjaanRef.current) pekerjaanRef.current.value = "";
        if (keahlianRef.current) keahlianRef.current.value = "";
        if (motivasiRef.current) motivasiRef.current.value = "";
        if (waktuTersediaRef.current) waktuTersediaRef.current.value = "";
        setSelectedProgram("");
      } else {
        setMessage({
          type: "error",
          text: response.message
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Terjadi kesalahan sistem. Silakan coba lagi."
      });
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearMessage = () => {
    setMessage(null);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/volunteer">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Volunteer
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-300">Pendaftaran Volunteer</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Bergabunglah dengan tim volunteer Masjid Ulul Albaab dan berkontribusi untuk kemajuan umat
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Info Card */}
          <Card className="mb-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <HandHeart className="h-8 w-8" />
                <div>
                  <h2 className="text-xl font-bold">Program Volunteer Masjid Ulul Albaab</h2>
                  <p className="text-green-100">Terbuka untuk Umum - Semua Kalangan</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <HandHeart className="h-4 w-4" />
                  <span>Fleksibel sesuai waktu Anda</span>
                </div>
                <div className="flex items-center gap-2">
                  <HandHeart className="h-4 w-4" />
                  <span>Berbagai program sesuai minat</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success/Error Message */}
          {message && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div
                  className={`p-4 rounded-lg border flex items-start justify-between ${
                    message.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                  }`}
                >
                  <div className="flex items-start">
                    {message.type === "success" ? (
                      <CheckCircle className="mr-2 mt-0.5 text-green-500 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="mr-2 mt-0.5 text-red-500 dark:text-red-400" />
                    )}
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <button
                    onClick={handleClearMessage}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition ml-2"
                  >
                    ✕
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700 dark:text-green-400">Form Pendaftaran Volunteer</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Lengkapi data diri Anda dengan benar. Semua field yang bertanda (*) wajib diisi.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Data Pribadi</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <Input
                        ref={namaRef}
                        type="text"
                        id="nama"
                        name="nama"
                        required
                        disabled={loading}
                        placeholder="Masukkan nama lengkap"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="pekerjaan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Pekerjaan/Status
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          ref={pekerjaanRef}
                          type="text"
                          id="pekerjaan"
                          name="pekerjaan"
                          disabled={loading}
                          placeholder="Mahasiswa/Karyawan/Wiraswasta/dll"
                          className="w-full pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Kontak</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          ref={emailRef}
                          type="email"
                          id="email"
                          name="email"
                          required
                          disabled={loading}
                          placeholder="nama@email.com"
                          className="w-full pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          ref={whatsappRef}
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          required
                          disabled={loading}
                          placeholder="08xxxxxxxxxx"
                          className="w-full pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Alamat Lengkap
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                      <textarea
                        ref={alamatRef}
                        id="alamat"
                        name="alamat"
                        rows={3}
                        disabled={loading}
                        placeholder="Alamat lengkap tempat tinggal"
                        className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-600 focus:border-green-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Program Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Program Volunteer</h3>
                  <div>
                    <label htmlFor="program" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Pilih Program <span className="text-red-500">*</span>
                    </label>
                    <Select value={selectedProgram} onValueChange={setSelectedProgram} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih program volunteer yang diminati" />
                      </SelectTrigger>
                      <SelectContent>
                        {volunteerPrograms.map((program) => (
                          <SelectItem key={program} value={program}>
                            {program}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Skills & Experience */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Keahlian & Pengalaman</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="keahlian" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Keahlian/Skill yang Dimiliki
                      </label>
                      <textarea
                        ref={keahlianRef}
                        id="keahlian"
                        name="keahlian"
                        rows={3}
                        disabled={loading}
                        placeholder="Contoh: Fotografi, desain grafis, public speaking, mengajar, dll..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-600 focus:border-green-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="waktuTersedia" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Waktu yang Tersedia
                      </label>
                      <textarea
                        ref={waktuTersediaRef}
                        id="waktuTersedia"
                        name="waktuTersedia"
                        rows={3}
                        disabled={loading}
                        placeholder="Contoh: Sabtu-Minggu pagi, weekday sore, fleksibel, dll..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-600 focus:border-green-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Motivation */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Motivasi</h3>
                  <div>
                    <label htmlFor="motivasi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Motivasi Menjadi Volunteer <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      ref={motivasiRef}
                      id="motivasi"
                      name="motivasi"
                      rows={4}
                      required
                      disabled={loading}
                      placeholder="Ceritakan motivasi Anda menjadi volunteer di Masjid Ulul Albaab..."
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-600 focus:border-green-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white py-3 text-lg font-medium"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Mengirim Pendaftaran...
                      </>
                    ) : (
                      <>
                        <HandHeart className="mr-2 h-5 w-5" />
                        Daftar Sebagai Volunteer
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Informasi Penting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">1</Badge>
                  <p>Program volunteer terbuka untuk semua kalangan (mahasiswa, karyawan, masyarakat umum)</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">2</Badge>
                  <p>Setelah mendaftar, koordinator volunteer akan menghubungi Anda untuk briefing</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">3</Badge>
                  <p>Waktu volunteer fleksibel sesuai kesepakatan dan ketersediaan Anda</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">4</Badge>
                  <p>Untuk informasi lebih lanjut, hubungi: 0812-2476-4338</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}