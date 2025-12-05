import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

/* star icon used for display and input */
function Star({ filled, onClick, idx, interactive=false }) {
  const base = 'text-yellow-500 cursor-pointer select-none text-xl';
  return (
    <span
      role={interactive ? 'button' : 'img'}
      aria-label={interactive ? `Rate ${idx+1} star` : undefined}
      onClick={onClick}
      className={base + (interactive ? ' hover:scale-110 transition-transform' : '')}
      style={{ lineHeight: '1' }}
    >
      {filled ? '★' : '☆'}
    </span>
  );
}

/* show star rating */
function Stars({ value = 0 }) {
  const v = Math.max(0, Math.min(5, Math.round(value || 0)));
  return (
    <span className='text-yellow-500' aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => <span key={i} className={i < v ? 'opacity-100' : 'opacity-30'}>★</span>)}
    </span>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState('');
  const [loading, setLoading] = useState(true);

  // review inputs
  const [reviewText, setReviewText] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [ratingInput, setRatingInput] = useState(5);
  const [reviewNameInput, setReviewNameInput] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/products/' + id);
        setProduct(res.data);
        setActiveImg(res.data.images?.[0] || '');
        setSelectedSize(res.data.sizes?.[0] || null);
      } catch (err) {
        console.error('Error fetching product', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className='py-20 text-center'>Loading...</div>;
  if (!product) return <div className='py-20 text-center'>Product not found</div>;

  // helper to compute avatar initial (first alpha char)
  const avatarInitial = (name) => {
    if (!name) return 'G';
    const clean = String(name).trim();
    for (let ch of clean) {
      if (/[A-Za-z0-9]/.test(ch)) return ch.toUpperCase();
    }
    return clean.charAt(0).toUpperCase() || 'G';
  };

  const addReview = () => {
    if (!reviewText.trim()) return;
    const reviewerName = reviewNameInput.trim() || 'Guest';
    const newReview = {
      name: reviewerName,
      rating: Math.max(0, Math.min(5, Math.round(ratingInput || 0))),
      comment: reviewText.trim()
    };
    setProduct({
      ...product,
      reviews: [...(product.reviews || []), newReview]
    });
    // reset inputs
    setReviewText('');
    setRatingInput(5);
    setReviewNameInput('');
  };

  const shareProduct = () => {
    const url = window.location.href;
    const whatsappUrl = 'https://wa.me/?text=Check out this perfume: ' + encodeURIComponent(url);
    const twitterUrl = 'https://twitter.com/intent/tweet?text=Check out this perfume&url=' + encodeURIComponent(url);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).catch(()=>{});
    const win = window.open('', '_blank', 'width=420,height=420');
    if (win) {
      win.document.body.style.fontFamily = 'Arial, sans-serif';
      win.document.title = 'Share Product';
      win.document.body.innerHTML = ''
        + '<div style="padding:18px">'
        + '<h2 style="margin-top:0">Share Product</h2>'
        + '<p style="margin-bottom:10px">Choose a platform:</p>'
        + '<a href="' + whatsappUrl + '" target="_blank" rel="noreferrer" style="display:inline-block;margin-bottom:8px;color:#0f172a">WhatsApp</a><br/>'
        + '<a href="' + twitterUrl + '" target="_blank" rel="noreferrer" style="display:inline-block;color:#0f172a">Twitter / X</a><br/><br/>'
        + '<p style="color:#374151">Link copied to clipboard (if supported).</p>'
        + '</div>';
    } else {
      alert('Share link copied to clipboard (if supported).');
    }
  };

  return (
    <div className='grid md:grid-cols-2 gap-8'>
      {/* Left: gallery */}
      <div>
        <div className='card p-4'>
          <img
            src={activeImg}
            alt='main'
            className='product-main-image rounded-lg w-full object-cover shadow-sm'
          />

          <div className='flex gap-3 mt-4'>
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(img)}
                className={
                  'flex-none rounded overflow-hidden focus:outline-none transition ' +
                  (img === activeImg
                    ? 'ring-2 ring-brand border-0 shadow'
                    : 'border border-gray-200')
                }
                style={{ width: 80, height: 80 }}
                aria-label={'Select image ' + (i+1)}
              >
                <img src={img} alt={'thumb-'+i} className='w-full h-full object-cover' />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: info */}
      <div>
        <div className='card p-6'>
          <h1 className='text-3xl font-serif font-semibold mb-2'>{product.name}</h1>
          <p className='text-gray-600 mt-1 mb-6'>{product.description}</p>

          {/* Price block */}
          <div className='mt-2'>
            <div className='flex items-baseline gap-4'>
              <span className='text-3xl font-extrabold text-brand leading-none'>₹{product.price}</span>
            </div>
            <div className='mt-2 text-sm text-gray-500'>Inclusive of taxes</div>
          </div>

          {/* Sizes */}
          <div className='mt-6'>
            <h4 className='font-medium mb-3'>Select Size</h4>
            <div className='flex flex-wrap gap-3 items-center'>
              {product.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(s)}
                  className={
                    'px-4 py-2 rounded-full border transition text-sm font-medium ' +
                    (selectedSize === s
                      ? 'bg-brand text-white border-brand shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300')
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className='mt-6 flex flex-wrap items-center gap-4'>
            <button className='btn-primary' title='Add to cart (mock)'>Add to Cart</button>
            <button
              onClick={shareProduct}
              className='px-4 py-2 border rounded-md bg-white hover:bg-gray-50 transition'
            >
              Share
            </button>
            <div className='w-full md:w-auto text-sm text-gray-500 md:ml-4 mt-2 md:mt-0'>
              Free returns within 14 days
            </div>
          </div>

          {/* Reviews */}
          <div className='mt-10'>
            <h3 className='text-xl font-semibold mb-4'>Customer Reviews</h3>

            <div className='flex flex-col gap-3'>
              {(product.reviews || []).length === 0 && <p className='text-gray-500'>No reviews yet.</p>}

              {(product.reviews || []).map((r, idx) => {
                // ensure name is trimmed and not duplicated
                const name = String(r.name || 'Guest').trim();
                const initial = avatarInitial(name);
                const rating = Math.max(0, Math.min(5, Number(r.rating) || 0));
                return (
                  <div key={idx} className='bg-white border rounded-md p-4 shadow-sm'>
                    <div className='flex items-start gap-4'>
                      <div className='flex-shrink-0'>
                        <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-600'>
                          {initial}
                        </div>
                      </div>

                      <div className='flex-1'>
                        <div className='flex items-center justify-between'>
                          <div>
                            <strong className='text-gray-800 block'>{name}</strong>
                            <div className='text-xs text-gray-500'>Verified buyer</div>
                          </div>
                          <div className='text-right'>
                            <Stars value={rating} />
                            <div className='text-xs text-gray-400'>{rating}/5</div>
                          </div>
                        </div>
                        <p className='mt-3 text-gray-700'>{r.comment}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add review area with rating input */}
            <div className='mt-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Write a review</label>

              <div className='flex items-center gap-3 mb-3'>
                <input
                  value={reviewNameInput}
                  onChange={(e) => setReviewNameInput(e.target.value)}
                  placeholder='Your name (optional)'
                  className='border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand focus:border-brand'
                />
                <div className='flex items-center gap-1'>
                  <span className='text-sm text-gray-600 mr-2'>Your rating:</span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      idx={i}
                      interactive
                      filled={i < ratingInput}
                      onClick={() => setRatingInput(i + 1)}
                    />
                  ))}
                </div>
              </div>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder='Share your thoughts about this perfume...'
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-brand focus:border-brand resize-y'
                rows={4}
              />

              <div className='mt-3 flex items-center justify-between gap-3'>
                <div className='text-sm text-gray-500'>Your review will be visible immediately (demo).</div>
                <div>
                  <button
                    onClick={addReview}
                    className='px-5 py-2 bg-brand text-white rounded-md shadow hover:opacity-95'
                  >
                    Add Review
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
