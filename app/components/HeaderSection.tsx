'use client';

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
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
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
            <Link href="/" className="text-gray-900 hover:text-green-600 dark:text-white dark:hover:text-green-400 transition">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
                Masjid <span className="text-green-600 dark:text-green-400">Ulul Albaab</span>
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

          {/* Desktop Navigation - Static version during SSR */}
          <div className="hidden md:flex items-center gap-4">
            <nav>
              <NavigationMenu>
                <NavigationMenuList className="flex gap-x-6">
                  <NavigationMenuItem>
                    <Link href="/#about" className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Tentang</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="#organization" className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Struktur</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="#finance" className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Keuangan</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/kegiatan" className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Kegiatan</Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/artikel" className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Artikel</Link>
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
                            <div className="text-sm font-medium leading-none">Gallery</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Dokumentasi foto kegiatan dan momen bersejarah masjid
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/mading"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Mading</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Majalah dinding digital dengan informasi dan konten edukatif
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/#announcements"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Pengumuman</div>
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
                            <div className="text-sm font-medium leading-none">Volunteer</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Program relawan dan kesempatan berkontribusi untuk masjid
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Theme Toggle - Static during SSR */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full opacity-50 cursor-not-allowed"
              disabled
              aria-label="Theme toggle loading"
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile NavigationMenu - Hidden during SSR */}
        <div className="hidden">
          <div className="flex flex-col items-center space-y-4">
            <NavigationMenu orientation="vertical">
              <NavigationMenuList className="flex flex-col space-y-3 text-center">
                <NavigationMenuItem>
                  <Link href="#about" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Tentang</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#organization" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Struktur</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#finance" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Keuangan</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/kegiatan" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Kegiatan</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/artikel" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Artikel</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/gallery" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Gallery</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/mading" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Mading</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/#announcements" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Pengumuman</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/volunteer" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Volunteer</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 opacity-50 cursor-not-allowed"
              disabled
              aria-label="Theme toggle loading"
            >
              <Monitor className="h-4 w-4" />
              <span className="text-sm">System</span>
            </Button>
          </div>
        </div>
      </header>
    );
  }

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
          <Link href="/" className="text-gray-900 hover:text-green-600 dark:text-white dark:hover:text-green-400 transition">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
              Masjid <span className="text-green-600 dark:text-green-400">Ulul Albaab</span>
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
                  <Link href="/#about" className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Tentang</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#organization" className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Struktur</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#finance" className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Keuangan</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/kegiatan" className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Kegiatan</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/artikel" className="text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Artikel</Link>
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
                          <div className="text-sm font-medium leading-none">Gallery</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Dokumentasi foto kegiatan dan momen bersejarah masjid
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/mading"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Mading</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Majalah dinding digital dengan informasi dan konten edukatif
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/#announcements"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Pengumuman</div>
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
                          <div className="text-sm font-medium leading-none">Volunteer</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Program relawan dan kesempatan berkontribusi untuk masjid
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
            onClick={cycleTheme}
            className="h-9 w-9 rounded-full"
            title={`Current theme: ${theme}. Click to cycle through themes.`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
          >
            {getThemeIcon()}
          </Button>
        </div>

      </div>

      {/* Mobile NavigationMenu */}
      <div
        className={`md:hidden bg-gray-100 dark:bg-gray-800 py-3 px-4 shadow-lg transition-colors ${isMobileMenuOpen ? '' : 'hidden'}`}
      >
        <div className="flex flex-col items-center space-y-4">
          <NavigationMenu orientation="vertical">
            <NavigationMenuList className="flex flex-col space-y-3 text-center">

              <NavigationMenuItem>
                <Link href="#about" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Tentang</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#organization" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Struktur</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#finance" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Keuangan</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/kegiatan" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Kegiatan</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/artikel" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Artikel</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/gallery" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Gallery</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/mading" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Mading</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/#announcements" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Pengumuman</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/volunteer" className="block text-gray-900 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium">Volunteer</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleTheme}
            className="flex items-center gap-2"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
          >
            {getThemeIcon()}
            <span className="text-sm">
              {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
