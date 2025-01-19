"use client"
import Link from "next/link";
import { useState } from "react";

import { navbarLinks } from "../utils/data";
import CrossIcon from "@/icons/circle-xmark-solid.svg";
import BarsIcon from "@/icons/bars-solid.svg";
  
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-dark shadow-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -my-2">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="text-white font-semibold text-xl whitespace-nowrap hover:text-gray-light transition-colors"
          >
            Pere Barceló Psicólogo
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {navbarLinks.map((item) => (
              <div className="relative group" key={item.url}>
                <Link 
                  href={item.url}
                  className="text-gray-light whitespace-nowrap px-3 py-2 text-sm font-medium
                           hover:text-white transition-colors duration-200
                           border-b-2 border-transparent hover:border-secondary"
                >
                  {item.label}
                </Link>

                {/* Dropdown Menu */}
                {item.subLinks && (
                  <div className="absolute invisible group-hover:visible opacity-0 
                                group-hover:opacity-100 left-0 pt-2 w-56 
                                transition-all duration-200 ease-in-out">
                    <div className="bg-white rounded-md shadow-xl ring-1 ring-black ring-opacity-5">
                      {item.subLinks.map((subLink) => (
                        <Link 
                          key={subLink.url}
                          href={subLink.url}
                          className="block px-4 py-3 text-sm text-gray-dark whitespace-nowrap
                                   hover:bg-secondary hover:text-primary-dark
                                   transition-colors duration-150 first:rounded-t-md last:rounded-b-md"
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
            
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-light p-2"
            >
              {isMenuOpen ? <CrossIcon className="w-6 h-6"/> : <BarsIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pb-3 space-y-1">
            {navbarLinks.map((item) => (
              <div key={item.url}>
                <Link 
                  href={item.url}
                  className="text-gray-light block px-3 py-2 text-base font-medium
                           hover:text-secondary transition-colors duration-200"
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
                        className="text-gray-light block px-3 py-2 text-sm font-medium
                                 hover:text-secondary transition-colors duration-200"
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
  