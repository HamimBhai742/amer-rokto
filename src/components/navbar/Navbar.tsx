"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "হোম", href: "/" },
  { label: "রক্ত খুঁজুন", href: "/find-blood" },
  { label: "ডোনার হন", href: "/become-donor" },
  { label: "ব্লাড ব্যাংক", href: "/blood-bank" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "যোগাযোগ", href: "/contact" },
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#mobile-menu") && !target.closest("#hamburger")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#8B0000] text-white text-xs sm:text-sm text-center py-1.5 px-4 font-medium tracking-wide">
        🩸 জরুরি রক্তের প্রয়োজন? এখনই অনুরোধ করুন —&nbsp;
        <a href="/emergency" className="underline underline-offset-2 hover:text-red-200 transition-colors">
          ইমার্জেন্সি রিকোয়েস্ট
        </a>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(139,0,0,0.15)]"
            : "bg-white shadow-sm"
        }`}
      >
        {/* Blood drop drip decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8B0000] via-[#CC0000] to-[#8B0000]" />

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              {/* Animated blood drop SVG */}
              <div className="relative w-9 h-9 flex-shrink-0">
                <svg
                  viewBox="0 0 40 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                >
                  {/* Outer drop */}
                  <path
                    d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z"
                    fill="url(#bloodGrad)"
                  />
                  {/* Inner shine */}
                  <ellipse cx="14" cy="26" rx="4" ry="6" fill="rgba(255,255,255,0.25)" />
                  {/* Pulse ring */}
                  <path
                    d="M20 2 C20 2 4 20 4 32 C4 41.5 11.2 48 20 48 C28.8 48 36 41.5 36 32 C36 20 20 2 20 2Z"
                    stroke="#FF4444"
                    strokeWidth="1"
                    fill="none"
                    className="animate-ping opacity-30"
                  />
                  <defs>
                    <linearGradient id="bloodGrad" x1="20" y1="2" x2="20" y2="48" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF2222" />
                      <stop offset="60%" stopColor="#CC0000" />
                      <stop offset="100%" stopColor="#8B0000" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-xl sm:text-2xl font-extrabold text-[#CC0000] tracking-tight group-hover:text-[#8B0000] transition-colors duration-200">
                  আমার রক্ত
                </span>
                <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase hidden sm:block">
                  Blood Donation Network
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-[#CC0000] transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#CC0000] rounded-full group-hover:w-4/5 transition-all duration-300" />
                </Link>
              ))}

              {/* Blood Group Quick Finder Dropdown */}
              <div className="relative ml-2">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-[#CC0000] transition-colors duration-200"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span>রক্তের গ্রুপ</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-red-100 overflow-hidden z-50"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="p-2 grid grid-cols-4 gap-1">
                      {bloodGroups.map((group) => (
                        <Link
                          key={group}
                          href={`/find-blood?group=${group}`}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center justify-center h-10 rounded-lg text-sm font-bold text-white bg-gradient-to-br from-[#CC0000] to-[#8B0000] hover:from-[#FF2222] hover:to-[#CC0000] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                          {group}
                        </Link>
                      ))}
                    </div>
                    <div className="px-3 pb-3">
                      <Link
                        href="/find-blood"
                        onClick={() => setDropdownOpen(false)}
                        className="block w-full text-center text-xs text-[#CC0000] font-medium hover:underline"
                      >
                        সব গ্রুপ দেখুন →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Desktop CTA Buttons ── */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-[#CC0000] border-2 border-[#CC0000] rounded-full hover:bg-[#CC0000] hover:text-white transition-all duration-200"
              >
                লগইন
              </Link>
              <Link
                href="/donate"
                className="relative px-5 py-2 text-sm font-bold text-white rounded-full overflow-hidden group"
                style={{ background: "linear-gradient(135deg, #CC0000 0%, #8B0000 100%)" }}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  🩸 রক্ত দিন
                </span>
                {/* Ripple hover effect */}
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-full" />
              </Link>
            </div>

            {/* ── Mobile: CTA + Hamburger ── */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/donate"
                className="px-3 py-1.5 text-xs font-bold text-white rounded-full shadow-md"
                style={{ background: "linear-gradient(135deg, #CC0000 0%, #8B0000 100%)" }}
              >
                🩸 দিন
              </Link>

              <button
                id="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="p-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-[#CC0000] transition-colors duration-200"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                      menuOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                      menuOpen ? "opacity-0 scale-x-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                      menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* ── Mobile Menu ── */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-red-100 px-4 pt-3 pb-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#CC0000] transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#CC0000] flex-shrink-0" />
                {link.label}
              </Link>
            ))}

            {/* Blood group grid in mobile */}
            <div className="pt-3 pb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                রক্তের গ্রুপ অনুযায়ী খুঁজুন
              </p>
              <div className="grid grid-cols-4 gap-2 px-2">
                {bloodGroups.map((group) => (
                  <Link
                    key={group}
                    href={`/find-blood?group=${group}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center h-11 rounded-xl text-sm font-bold text-white shadow-sm active:scale-95 transition-transform"
                    style={{ background: "linear-gradient(135deg, #CC0000 0%, #8B0000 100%)" }}
                  >
                    {group}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile auth buttons */}
            <div className="flex gap-3 pt-3 px-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-semibold text-[#CC0000] border-2 border-[#CC0000] rounded-full hover:bg-[#CC0000] hover:text-white transition-all duration-200"
              >
                লগইন
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-bold text-white rounded-full"
                style={{ background: "linear-gradient(135deg, #CC0000 0%, #8B0000 100%)" }}
              >
                রেজিস্ট্রেশন
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
