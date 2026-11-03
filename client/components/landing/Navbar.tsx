"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          PactPay <span className="text-black">AI</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            How it Works
          </a>

          <a
            href="#contact"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Contact
          </a>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-blue-600 px-5 py-2 text-blue-600 font-medium transition hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white font-medium transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
