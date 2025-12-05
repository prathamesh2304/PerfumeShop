import React from 'react';

export default function Footer(){
  return (
    <footer className='w-full bg-white border-t mt-12'>
      <div className='container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600'>
        <div> {new Date().getFullYear()} Perfume Shop. All rights reserved.</div>
        <div className='flex gap-4 mt-3 md:mt-0'>
          <a href='#' className='hover:text-pink-600'>Privacy</a>
          <a href='#' className='hover:text-pink-600'>Terms</a>
          <a href='#' className='hover:text-pink-600'>Contact</a>
        </div>
      </div>
    </footer>
  );
}
