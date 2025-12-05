import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../api';

export default function Home(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await api.get('/products');
        if (mounted) setProducts(res.data || []);
      } catch (err) {
        console.error('Failed to fetch products', err);
        if (mounted) setError('Unable to load products. Try again later.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      {/* HERO / CTA */}
      <section className='card mb-10 overflow-hidden'>
        <div className='grid md:grid-cols-2 gap-6 items-center'>
          <div className='p-8 md:p-12'>
            <h1 className='text-4xl md:text-5xl font-serif font-bold leading-tight mb-4'>
              Discover your signature fragrance
            </h1>
            <p className='text-lg text-gray-600 mb-6'>
              Explore curated luxury perfumes crafted for every mood — limited-time offers available.
            </p>
            <a href='#collections' className='btn-primary inline-block'>
              Explore Collections
            </a>
          </div>

          <div className='hidden md:block'>
            <img
              src='https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200'
              alt='Perfume hero'
              className='hero-image'
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <h2 id='collections' className='text-2xl font-serif font-semibold mb-4'>Featured Products</h2>

      {loading && <div className='py-20 text-center text-gray-500'>Loading products...</div>}

      {error && <div className='py-6 text-center text-red-600'>{error}</div>}

      {!loading && !error && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map(p => (
            <div key={p._id} className='card p-4'>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
