'use client';

import Image from "next/image";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu as MenuIcon } from "lucide-react";

export default function HeaderSection() {
    return (
        <header className="fixed w-full bg-white shadow-md z-50">
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
                    <h1 className="text-xl font-bold text-gray-800">
                        Masjid <span className="text-green-600">Ulul Albaab</span>
                    </h1>
                </div>

                {/* Mobile menu button */}
                <button
                    id="mobile-menu-button"
                    className="md:hidden text-gray-700"
                    onClick={() => {
                        const menu = document.getElementById("mobile-menu");
                        if (menu) menu.classList.toggle("hidden");
                    }}
                    aria-label="Open navigation menu"
                >
                    <MenuIcon className="text-2xl" />
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#home" className="text-gray-800 hover:text-green-600 transition active-nav">Home</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#about" className="text-gray-800 hover:text-green-600 transition">Tentang</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#organization" className="text-gray-800 hover:text-green-600 transition">Struktur</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#finance" className="text-gray-800 hover:text-green-600 transition">Keuangan</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#activities" className="text-gray-800 hover:text-green-600 transition">Kegiatan</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#articles" className="text-gray-800 hover:text-green-600 transition">Artikel</NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>
            </div>

            {/* Mobile NavigationMenu */}
            <div
                id="mobile-menu"
                className="hidden md:hidden bg-white py-3 px-4 shadow-lg flex justify-center"
            >
                <NavigationMenu orientation="vertical">
                    <NavigationMenuList className="flex flex-col space-y-3 text-center">
                        <NavigationMenuItem>
                            <NavigationMenuLink href="#home" className="block text-gray-800 hover:text-green-600 transition">Home</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="#about" className="block text-gray-800 hover:text-green-600 transition">Tentang</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="#organization" className="block text-gray-800 hover:text-green-600 transition">Struktur</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="#finance" className="block text-gray-800 hover:text-green-600 transition">Keuangan</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="#activities" className="block text-gray-800 hover:text-green-600 transition">Kegiatan</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="#articles" className="block text-gray-800 hover:text-green-600 transition">Artikel</NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
}
