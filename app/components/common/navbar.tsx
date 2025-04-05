"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
  ];

  const isActive = (path:string) => pathname === path;

  return (
    <nav className="bg-white py-4">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-bold text-indigo-600">
            CM <span className="text-slate-800">Rijal</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                isActive(link.href)
                  ? "text-indigo-600 font-semibold"
                  : "text-slate-700 hover:text-indigo-600"
              } transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </div>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block ${
                isActive(link.href)
                  ? "text-indigo-600 font-semibold"
                  : "text-slate-700 hover:text-indigo-600"
              } transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
