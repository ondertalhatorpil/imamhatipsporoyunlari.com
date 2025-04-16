import React, { useState, useEffect } from 'react';
import Logo from './footer_logo.png';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Footer görünür olduğunda animasyonu başlat
    setIsVisible(true);
  }, []);
  
  return (
    <footer 
      className="w-full py-8 mt-24 overflow-hidden"
      style={{ backgroundColor: '#E84049' }}
    >
      <div 
        className={`container mx-auto px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}
      >
        {/* Ana içerik - Masaüstünde üçe bölünmüş, mobilde tek sütun */}
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          
          {/* Sol taraf - Sadece masaüstünde görünür */}
          <div className="hidden md:flex md:w-1/4 flex-col items-center md:items-start">
            <h3 className="text-white font-bold mb-4">Sosyal Medya</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/oncugenclikspor/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-all duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="https://x.com/oncugenclikspor" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-all duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.facebook.com/OncuGenclikveSpor/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-all duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.youtube.com/@ÖncüSporKulübü" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-all duration-300">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
          
          {/* Orta - Her zaman görünür */}
          <div className="flex flex-col items-center md:w-2/4">
            {/* Logo */}
            <div className="relative mb-6 transform transition-transform duration-500 hover:scale-105">
              <div className="absolute -inset-1 rounded-full bg-white/20 blur-md opacity-70" />
              <img
                src={Logo}
                alt="Öncü Spor Logo"
                className="relative w-42 h-42 object-contain"
              />
            </div>
            
            {/* Navigasyon */}
            <div className="flex space-x-6 mb-6">
              <a href="/" className="text-white hover:text-white/80 transition-all duration-300 relative group">
                Anasayfa
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="/gallery" className="text-white hover:text-white/80 transition-all duration-300 relative group">
                Galeri
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="/iletişim" className="text-white hover:text-white/80 transition-all duration-300 relative group">
                İletişim
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
            
            {/* Telif hakkı */}
            <div className="text-white/90 text-sm text-center">
              <div className="inline-flex items-center">
                <span>©</span>
                <span className="mx-2 animate-pulse">{currentYear}</span>
                <span>ÖNCÜ SPOR KULÜBÜ</span>
              </div>
            </div>
          </div>
          
          {/* Sağ taraf - Sadece masaüstünde görünür */}
          <div className="hidden md:block md:w-1/4">
            <div className="text-white text-right">
              <h3 className="font-bold mb-2">İletişim</h3>
              <p className="text-sm mb-1">0530 915 92 93</p>
              <p className="text-sm mb-4">oncugeclikvespor@gmail.com</p>
              <p className="text-xs italic">Akşemsettin Mh. Şair Fuzuli Sk. No: 22 <br />Fatih - İstanbul</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;