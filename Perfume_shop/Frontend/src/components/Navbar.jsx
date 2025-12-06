import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left section (Brand Logo) */}
        <Link
          to="/"
          className="text-2xl font-serif tracking-wide font-bold text-gray-900"
        >
          PERFUME SHOP
        </Link>

        {/* Center menu */}
        <div className="hidden md:flex gap-10 text-gray-700 font-medium">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>
          <a href="#collections" className="hover:text-black transition">
            Collections
          </a>
          <Link to="/" className="hover:text-black transition">
            About
          </Link>
          <Link to="/" className="hover:text-black transition">
            Contact
          </Link>
        </div>
{/* ohehuffsduifuoiehff */}
        {/* Right section (placeholder for icons later) */}
        <div className="flex items-center gap-4 text-gray-700">
          <button className="hover:text-black transition">Login</button>
        </div>

      </div>
    </nav>
  );
}
