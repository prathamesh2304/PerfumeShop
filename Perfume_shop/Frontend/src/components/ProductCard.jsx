import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link
      to={'/product/' + product._id}
      className='block rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-200 bg-white'
    >
      {/* Image */}
      <div className='w-full h-56 bg-gray-100 overflow-hidden'>
        <img
          src={product.images?.[0] || 'https://picsum.photos/400/400'}
          alt={product.name}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Info */}
      <div className='p-4'>
        <h3 className='font-serif text-xl font-semibold mb-1'>
          {product.name}
        </h3>

        <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
          {product.description}
        </p>

        <div className='flex items-center justify-between'>
          <span className='font-semibold text-lg text-brand'>
            ₹{product.price}
          </span>

          <button className='px-3 py-1 border rounded-md text-sm hover:bg-gray-100'>
            View
          </button>
        </div>
      </div>
    </Link>
  );
}
