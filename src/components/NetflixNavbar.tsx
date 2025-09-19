import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Bell, ChevronDown, SearchIcon } from "lucide-react";

const NetflixNavbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black bg-opacity-90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center space-x-8">
          <Link href="/home">
            <Image
              src="/images/Netflix_Logo_PMS.png"
              alt="Netflix Logo"
              width={120}
              height={30}
              className="ml-2 mt-1 object-contain color-red-600"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/home"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/series"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Series
            </Link>
            <Link
              href="/peliculas"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Peliculas
            </Link>
            <Link
              href="/Juegos"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Juegos
            </Link>
            <Link
              href="/novedades-populares"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Novedades Populares
            </Link>
            <Link
              href="/my-list"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Mi lista
            </Link>
            <Link
              href="/explorar"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Explorar por idiomas
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="link" className="text-white hover:text-gray-300">
            <SearchIcon className="h-5 w-6" />
          </Button>

          <Link
            href="/Kids"
            className="text-white hover:text-gray-300 transition-colors"
          >
            Niños
          </Link>

          <Button
            variant="link"
            className="text-white hover:text-gray-300 relative"
          >
            <Bell className="h-5 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white tetx-xs rounded-full h-5 w-5 flex items-center justify-center">
              1
            </span>
          </Button>

          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-6 bg-blue-600 roubnded flex items-center justify-center">
              <span className="text-white text-sm font-semibold">C</span>
            </div>
            <ChevronDown className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NetflixNavbar;
