"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu as MenuIcon, Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  DollarSign,
  Calendar,
  FileText,
  Image as ImageIcon,
  Newspaper,
  Megaphone,
  HandHeart,
  ClipboardList,
  ChevronDown,
} from "lucide-react";

export default function HeaderSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="h-4 w-4" />;

    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };



  return (
    <header className="sticky top-0 w-full bg-gray-100/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md z-50 transition-colors">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/img/icon-512.png"
            alt="Logo Masjid Ulul Albaab"
            width={40}
            height={40}
            className="mr-3"
            priority={true}
            style={{ width: "auto", height: "30px" }}
          />
          <Link
            href="/"
            className="text-gray-900 hover:text-green-600 dark:text-white dark:hover:text-green-400 transition"
          >
            <h1 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
              Masjid{" "}
              <span className="text-green-600 dark:text-green-400">
                Ulul Albaab
              </span>
            </h1>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
          onClick={toggleMobileMenu}
          aria-label="Open navigation menu"
        >
          <MenuIcon className="text-2xl" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <nav>
            <NavigationMenu>
              <NavigationMenuList className="flex gap-x-6">
                <NavigationMenuItem>
                  <Link
                    href="/#about"
                    className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium"
                  >
                    Tentang
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/#organization"
                    className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium"
                  >
                    Struktur
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/#finance"
                    className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium"
                  >
                    Keuangan
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/kegiatan"
                    className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium"
                  >
                    Kegiatan
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/artikel"
                    className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium"
                  >
                    Artikel
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">
                    Lainnya
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/gallery"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Gallery
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Dokumentasi foto kegiatan dan momen bersejarah
                            masjid
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/mading"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Mading
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Majalah dinding digital dengan informasi dan konten
                            edukatif
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/#announcements"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Pengumuman
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Pengumuman terbaru dan informasi penting dari masjid
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/volunteer"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Volunteer
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Program relawan dan kesempatan berkontribusi untuk
                            masjid
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/dkm/daftar"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Daftar DKM
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Pendaftaran anggota Dewan Kemakmuran Masjid
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={mounted ? cycleTheme : undefined}
            disabled={!mounted}
            className="h-9 w-9 rounded-full"
            title={mounted ? `Current theme: ${theme}. Click to cycle through themes.` : "Theme toggle loading"}
            aria-label={mounted ? `Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} theme` : "Theme toggle loading"}
          >
            {getThemeIcon()}
          </Button>
        </div>
      </div>

      {/* Mobile NavigationMenu */}
      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-100 dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menu
          </h2>
          <button
            onClick={toggleMobileMenu}
            className="text-gray-800 dark:text-gray-200 hover:text-red-500"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="p-2 divide-y divide-gray-300 dark:divide-gray-700">
          {/* Bagian Utama */}
          <div className="space-y-1 py-2">
            <Link
              href="/#about"
              onClick={toggleMobileMenu}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <Home className="h-5 w-5 text-gray-500" />
              <span>Tentang</span>
            </Link>
            <Link
              href="/#organization"
              onClick={toggleMobileMenu}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <Users className="h-5 w-5 text-gray-500" />
              <span>Struktur</span>
            </Link>
            <Link
              href="/#finance"
              onClick={toggleMobileMenu}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <DollarSign className="h-5 w-5 text-gray-500" />
              <span>Keuangan</span>
            </Link>
            <Link
              href="/kegiatan"
              onClick={toggleMobileMenu}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>Kegiatan</span>
            </Link>
            <Link
              href="/artikel"
              onClick={toggleMobileMenu}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <FileText className="h-5 w-5 text-gray-500" />
              <span>Artikel</span>
            </Link>
          </div>

          {/* Bagian Dropdown */}
          <div className="py-2">
            <details className="group">
              <summary className="flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition list-none">
                <ChevronDown className="h-4 w-4 text-gray-500 group-open:rotate-180 transition-transform" />
                <span>Lainnya</span>
              </summary>
              <div className="pl-8 mt-2 space-y-1">
                <Link
                  href="/gallery"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <ImageIcon className="h-5 w-5 text-gray-500" />
                  <span>Gallery</span>
                </Link>
                <Link
                  href="/mading"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <Newspaper className="h-5 w-5 text-gray-500" />
                  <span>Mading</span>
                </Link>
                <Link
                  href="/#announcements"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <Megaphone className="h-5 w-5 text-gray-500" />
                  <span>Pengumuman</span>
                </Link>
                <Link
                  href="/volunteer"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <HandHeart className="h-5 w-5 text-gray-500" />
                  <span>Volunteer</span>
                </Link>
                <Link
                  href="/dkm/daftar"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <ClipboardList className="h-5 w-5 text-gray-500" />
                  <span>Daftar DKM</span>
                </Link>
              </div>
            </details>
          </div>
        </nav>

        {/* Theme Toggle */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={mounted ? cycleTheme : undefined}
            disabled={!mounted}
            className="flex items-center gap-2 w-full justify-start"
          >
            {getThemeIcon()}
            <span className="text-sm">
              {!mounted
                ? "System"
                : theme === "light"
                  ? "Light"
                  : theme === "dark"
                    ? "Dark"
                    : "System"}
            </span>
          </Button>
        </div>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
}
