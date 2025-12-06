import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../api";
import Hero from "../components/Hero";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/products");
        if (mounted) setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
        if (mounted) setError("Unable to load products. Try again later.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* Use the shared Hero component */}
      <Hero />

      {/* PRODUCTS SECTION */}
      <h2 id="collections" className="text-2xl font-serif font-semibold mt-8 mb-6">
        Featured Products
      </h2>

      {loading && (
        <div className="py-20 text-center text-gray-500">Loading products...</div>
      )}

      {error && (
        <div className="py-6 text-center text-red-600">{error}</div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
