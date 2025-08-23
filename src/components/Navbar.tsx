import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-5">
      <div className="flex items-center justify-between">
        <div>
          <Image
            src="/images/Netflix_Logo_PMS.png"
            alt="Netflix Logo"
            width={188}
            height={30}
            className="ml-28 -mt-4 object-contain color-red-600"
          />
        </div>
        <div className="flex items-center gap-4 mr-38 -mt-4">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <select
                className="appearance-none bg-transparent rounded border border-gray-500 px-9 h-8 text-white cursor-pointer text-[1rem] font-semibold"
                defaultValue="es"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
              <Languages className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white w-4 h-4 pointer-events-none" />
              <IoMdArrowDropdown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white w-4 h-4 pointer-events-none" />
            </div>

            <Link href="/login">
              <Button className="bg-red-600 hover:bg-red-700 rounded text-white px-4 h-8 text-sm font-semibold flex items-center justify-center">
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
