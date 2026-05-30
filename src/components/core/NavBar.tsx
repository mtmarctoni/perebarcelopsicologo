"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { navbarLinks } from "@/utils/data";
import { BarsIcon, CrossIcon } from "../composables/Icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#070b14]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link
              href="/"
              className="text-white font-bold text-lg tracking-tight whitespace-nowrap hover:text-secondary transition-colors duration-300"
            >
              Pere Barcelo
              <span className="font-normal text-white/50 ml-1.5 text-base">Psicologo</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navbarLinks.map((item) => (
                <div className="relative group" key={item.url}>
                  <Link
                    href={item.url}
                    className="text-white/70 px-4 py-2 text-sm font-medium tracking-wide
                             hover:text-white hover:bg-white/[0.06] rounded-lg
                             transition-all duration-300"
                  >
                    {item.label}
                  </Link>

                  {item.subLinks && (
                    <div
                      className="absolute invisible group-hover:visible opacity-0
                                  group-hover:opacity-100 left-0 pt-2 w-60
                                  transition-all duration-300"
                    >
                      <div className="bg-[#0f172a]/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] border border-white/[0.08] overflow-hidden p-2">
                        {item.subLinks.map((subLink) => (
                          <Link
                            key={subLink.url}
                            href={subLink.url}
                            className="block px-4 py-3 rounded-xl text-sm font-medium text-white/70 whitespace-nowrap
                                     hover:text-white hover:bg-white/[0.08]
                                     transition-all duration-200"
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/contact"
                className="ml-4 inline-flex items-center justify-center bg-secondary text-[#0f172a] text-sm font-bold px-5 py-2.5 rounded-full hover:bg-secondary-light hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Sesion gratuita
              </Link>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-secondary text-[#0f172a] text-xs font-bold px-4 py-2 rounded-full hover:bg-secondary-light transition-all duration-300"
              >
                Sesiongratis
              </Link>

              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-secondary p-2 rounded-xl hover:bg-white/[0.06] transition-all duration-300"
                aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
              >
                {isMenuOpen ? <CrossIcon className="w-6 h-6" /> : <BarsIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-[#070b14]/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
          <div className="absolute top-6 right-6">
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-secondary p-2 rounded-xl hover:bg-white/[0.06] transition-all duration-300"
              aria-label="Cerrar menu"
            >
              <CrossIcon className="w-7 h-7" />
            </button>
          </div>

          {navbarLinks.map((item, index) => (
            <div key={item.url}>
              <Link
                href={item.url}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold text-white/80 hover:text-white transition-all duration-300"
                style={{ transitionDelay: `${(index + 1) * 50}ms` }}
              >
                {item.label}
              </Link>

              {item.subLinks && (
                <div className="mt-3 space-y-2 text-center">
                  {item.subLinks.map((subLink) => (
                    <Link
                      key={subLink.url}
                      href={subLink.url}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-white/50 hover:text-secondary text-base transition-colors duration-200"
                    >
                      {subLink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-center bg-secondary text-[#0f172a] text-base font-bold px-8 py-4 rounded-full hover:bg-secondary-light hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300"
          >
            Sesion gratuita
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
