// Frontend/src/components/Hero.jsx
import React from 'react';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Perfume hero"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transform-gpu"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          filter: 'contrast(0.95) saturate(1.02)'
        }}
      />

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(2,6,23,0.35)] via-[rgba(2,6,23,0.15)] to-[rgba(255,255,255,0.12)] pointer-events-none" />

      <div className="relative container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-3xl text-white">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight font-bold drop-shadow-md">
            Discover Your Signature Scent
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/90 max-w-xl">
            Handcrafted fragrances inspired by nature and crafted for elegance — explore limited collections and exclusive offers.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#collections"
              className="inline-flex items-center gap-3 bg-pink-600 hover:bg-pink-700 transition text-white font-medium px-5 py-3 rounded-md shadow-lg"
            >
              Shop Collections
            </a>

            <a
              href="/product/693175808f3441431f78b869"
              className="inline-flex items-center gap-2 border border-white/30 text-white/95 px-4 py-2 rounded-md hover:bg-white/5 transition"
            >
              Featured: Aqua Essence
            </a>
          </div>
        </div>

        {/* Decorative right-side bottle (only on md+) */}
        <div className="hidden md:block absolute right-6 top-10 w-[320px] h-[420px] rounded-xl overflow-hidden drop-shadow-2xl">
          <img
            src="/images/hero-bottle.png"
            alt="Perfume bottle"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
