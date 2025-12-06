import React from "react";
import { Link } from "react-router-dom";

/**
 * ProductCard
 * - Expects a `product` object with at least: _id, name, description, price, images (array)
 */
export default function ProductCard({ product = {} }) {
  const image = product.images?.[0] || "/images/placeholder.png";
  const name = product.name || "Unnamed Perfume";
  const desc = product.description || "";
  const price = Number(product.price || 0);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <article
      aria-labelledby={`p-${product._id}-title`}
      className="group bg-white card overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1"
    >
      <Link to={`/product/${product._id}`} className="block">
        <div className="h-56 sm:h-64 lg:h-56 overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <div className="p-4 sm:p-5">
          <h3 id={`p-${product._id}-title`} className="text-lg font-semibold text-gray-900 font-serif">
            {name}
          </h3>

          <p className="mt-2 text-sm text-gray-500" style={{ minHeight: "2.4rem" }}>
            {desc}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-xl font-bold text-gray-900">{formattedPrice}</div>
              <div className="text-xs text-gray-500">Inclusive of taxes</div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/product/${product._id}`}
                className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition"
                aria-label={`View details for ${name}`}
              >
                View
              </Link>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const url = window.location.origin + `/product/${product._id}`;
                  if (navigator.share) {
                    navigator.share({ title: name, url }).catch(() => {});
                  } else {
                    navigator.clipboard?.writeText(url);
                    alert("Product link copied to clipboard");
                  }
                }}
                className="inline-flex items-center px-3 py-1.5 text-sm rounded-md border border-gray-200 hover:bg-gray-50 transition"
                aria-label={`Share ${name}`}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
