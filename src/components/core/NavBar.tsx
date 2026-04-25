"use client";
import Link from "next/link";
import { useState } from "react";

import { navbarLinks } from "@/utils/data";
import { ThemeToggle } from "@/components/features/DarkToggle";

import { CrossIcon, BarsIcon } from "../composables/Icons";
import { IconFooterContainer } from "../containers/IconContainer";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background-navbar backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex justify-center space-x-4">
            {/* Logo/Brand */}
            <Link
              href="/"
              className="content-center text-white font-bold text-lg tracking-tight whitespace-nowrap hover:text-secondary transition-colors duration-300"
            >
              Pere Barceló
              <span className="font-normal text-white/70 ml-1">Psicólogo</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navbarLinks.map((item) => (
              <div className="relative group" key={item.url}>
                <Link
                  href={item.url}
                  className="text-white/80 whitespace-nowrap px-4 py-2 text-sm font-medium
                           hover:text-white transition-all duration-300
                           rounded-full hover:bg-white/10"
                >
                  {item.label}
                </Link>

                {/* Dropdown Menu */}
                {item.subLinks && (
                  <div
                    className="absolute invisible group-hover:visible opacity-0 
                                group-hover:opacity-100 left-0 pt-2 w-56 
                                transition-all duration-300 ease-smooth"
                  >
                    <div className="bg-background-alt/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                      {item.subLinks.map((subLink) => (
                        <Link
                          key={subLink.url}
                          href={subLink.url}
                          className="block px-5 py-3 text-sm text-text-dark whitespace-nowrap
                                   hover:bg-secondary/10 hover:text-primary-dark
                                   transition-colors duration-200"
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-row items-center gap-3">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-secondary p-2 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <CrossIcon className="w-6 h-6" />
                ) : (
                  <BarsIcon className="w-6 h-6" />
                )}
              </button>
            </div>
            <IconFooterContainer>
              <ThemeToggle />
            </IconFooterContainer>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pb-4 space-y-1">
            {navbarLinks.map((item) => (
              <div key={item.url}>
                <Link
                  href={item.url}
                  className="text-white/80 block px-4 py-3 text-base font-medium rounded-xl
                           hover:text-white hover:bg-white/10 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>

                {/* Mobile Dropdown Items */}
                {item.subLinks && (
                  <div className="pl-4 space-y-1">
                    {item.subLinks.map((subLink) => (
                      <Link
                        key={subLink.url}
                        href={subLink.url}
                        className="text-white/60 block px-4 py-2 text-sm font-medium rounded-xl
                                 hover:text-secondary hover:bg-white/5 transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
