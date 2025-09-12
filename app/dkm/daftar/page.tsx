"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Users,
  School,
  Mail,
  Phone,
  MapPin,
  Heart,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { googleSheetsService } from "@/app/services/GoogleSheetsService";
import Link from "next/link";

export default function DkmRegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [selectedDkm, setSelectedDkm] = useState("");

  // Mapping link group
  const groupLinks: Record<string, string> = {
    ulul_albaab:
      "https://chat.whatsapp.com/FBpY8yJzG9xGP4L6P0etHI?mode=ems_copy_t",
    ulul_ilmi:
      "https://chat.whatsapp.com/HBHbgOkIh84ASX9BRZ3YYK?mode=ems_copy_t",
    ulul_abshor:
      "https://chat.whatsapp.com/IiOoL5uy5MSFJx60PRF2qn?mode=ems_copy_t",
  };

  // Form refs
  const namaRef = useRef<HTMLInputElement>(null);
  const nimRef = useRef<HTMLInputElement>(null);
  const fakultasRef = useRef<HTMLInputElement>(null);
  const prodiRef = useRef<HTMLInputElement>(null);
  const angkatanRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);
  const alamatRef = useRef<HTMLTextAreaElement>(null);
  const motivasiRef = useRef<HTMLTextAreaElement>(null);
  const pengalamanRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formData = {
        nama: namaRef.current?.value || "",
        nim: nimRef.current?.value || "",
        fakultas: fakultasRef.current?.value || "",
        prodi: prodiRef.current?.value || "",
        angkatan: angkatanRef.current?.value || "",
        email: emailRef.current?.value || "",
        whatsapp: whatsappRef.current?.value || "",
        alamat: alamatRef.current?.value || "",
        motivasi: motivasiRef.current?.value || "",
        pengalaman: pengalamanRef.current?.value || "",
        dkm: selectedDkm,
      };

      const response =
        await googleSheetsService.submitDkmRegistration(formData);

      if (response.success) {
        setMessage({
          type: "success",
          text: response.message,
        });

        // redirect ke grup sesuai pilihan
        if (selectedDkm && groupLinks[selectedDkm]) {
          window.location.href = groupLinks[selectedDkm];
        }

        // Clear form
        if (namaRef.current) namaRef.current.value = "";
        if (nimRef.current) nimRef.current.value = "";
        if (fakultasRef.current) fakultasRef.current.value = "";
        if (prodiRef.current) prodiRef.current.value = "";
        if (angkatanRef.current) angkatanRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (whatsappRef.current) whatsappRef.current.value = "";
        if (alamatRef.current) alamatRef.current.value = "";
        if (motivasiRef.current) motivasiRef.current.value = "";
        if (pengalamanRef.current) pengalamanRef.current.value = "";
      setSelectedDkm("");
      } else {
        setMessage({
          type: "error",
          text:
            response.message || "Terjadi kesalahan saat mengirim pendaftaran.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage({
        type: "error",
        text: "Terjadi kesalahan sistem. Silakan coba lagi atau hubungi admin.",
      });
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
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-300">
            Pendaftaran Anggota DKM
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Bergabunglah dengan Dewan Kemakmuran Masjid dan
            berkontribusi dalam dakwah kampus
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Info Card */}
          <Card className="mb-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <Users className="h-8 w-8" />
                <div>
                  <h2 className="text-xl font-bold">
                    Dewan Kemakmuran Masjid
                  </h2>
                  <p className="text-green-100">Lembaga Dakwah Kampus UNPAS</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  <span>Khusus Mahasiswa UNPAS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>Komitmen Dakwah & Kemakmuran Masjid</span>
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
              <CardTitle className="text-2xl text-green-700 dark:text-green-400">
                Form Pendaftaran
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Lengkapi data diri Anda dengan benar. Semua field yang bertanda
                (*) wajib diisi.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tambah Select DKM */}
                <div>
                  <label
                    htmlFor="dkm"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Pilih DKM <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="dkm"
                    value={selectedDkm}
                    onChange={(e) => setSelectedDkm(e.target.value)}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">-- Pilih DKM --</option>
                    <option value="ulul_albaab">DKM Ulul Albaab</option>
                    <option value="ulul_ilmi">DKM Ulul Ilmi</option>
                    <option value="ulul_abshor">DKM Ulul Abshor</option>
                  </select>
                </div>

                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Data Pribadi
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="nama"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
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
                      <label
                        htmlFor="nim"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        NIM <span className="text-red-500">*</span>
                      </label>
                      <Input
                        ref={nimRef}
                        type="text"
                        id="nim"
                        name="nim"
                        required
                        disabled={loading}
                        placeholder="Nomor Induk Mahasiswa"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Data Akademik
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="fakultas"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Fakultas <span className="text-red-500">*</span>
                      </label>
                      <Input
                        ref={fakultasRef}
                        type="text"
                        id="fakultas"
                        name="fakultas"
                        required
                        disabled={loading}
                        placeholder="Nama fakultas"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="prodi"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Program Studi <span className="text-red-500">*</span>
                      </label>
                      <Input
                        ref={prodiRef}
                        type="text"
                        id="prodi"
                        name="prodi"
                        required
                        disabled={loading}
                        placeholder="Program studi"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="angkatan"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Angkatan <span className="text-red-500">*</span>
                      </label>
                      <Input
                        ref={angkatanRef}
                        type="text"
                        id="angkatan"
                        name="angkatan"
                        required
                        disabled={loading}
                        placeholder="Tahun angkatan"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Kontak
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
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
                      <label
                        htmlFor="whatsapp"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
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
                    <label
                      htmlFor="alamat"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
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

                {/* Motivation & Experience */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Motivasi & Pengalaman
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="motivasi"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Motivasi Bergabung{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        ref={motivasiRef}
                        id="motivasi"
                        name="motivasi"
                        rows={4}
                        required
                        disabled={loading}
                        placeholder="Ceritakan motivasi Anda bergabung dengan DKM..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-600 focus:border-green-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      ></textarea>
                    </div>
                    <div>
                      <label
                        htmlFor="pengalaman"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Pengalaman Organisasi
                      </label>
                      <textarea
                        ref={pengalamanRef}
                        id="pengalaman"
                        name="pengalaman"
                        rows={4}
                        disabled={loading}
                        placeholder="Ceritakan pengalaman organisasi atau kegiatan dakwah yang pernah Anda ikuti..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-600 focus:border-green-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      ></textarea>
                    </div>
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
                        <Users className="mr-2 h-5 w-5" />
                        Daftar & Gabung ke Grup
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
                  <Badge variant="secondary" className="mt-0.5">
                    1
                  </Badge>
                  <p>
                    Pendaftaran ini khusus untuk mahasiswa aktif Universitas
                    Pasundan
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    2
                  </Badge>
                  <p>
                    Setelah mendaftar, Anda akan dihubungi untuk proses seleksi
                    dan wawancara
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    3
                  </Badge>
                  <p>Komitmen waktu minimal 1 tahun untuk kegiatan DKM</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    4
                  </Badge>
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
