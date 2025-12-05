import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className='container mx-auto px-4 py-8 min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
