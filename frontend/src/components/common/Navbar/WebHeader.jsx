import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

import Logo from './altli_logo.png'

const WebHeader = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  const navLinks = [
    { name: 'Anasayfa', path: '/' },
    { name: 'Derece', path: '/dereceye-girenler' },
    { name: 'Talimatname', path: '/instructions' },
    { name: 'Galeri', path: '/gallery' },
    { name: 'Turnuva', path: '/turnuva' },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeNavLink = navLinks.find(link => link.path === currentPath);
    if (activeNavLink) {
      setActiveLink(activeNavLink.name);
    } else {
      if (currentPath === '/') {
        setActiveLink('Anasayfa');
      }
    }
  }, [location, navLinks]);

  return (
    <header className="relative pt-5 pb-6 pl-4 pr-5 w-full md:w-11/12 lg:w-10/12 mx-auto rounded-b-3xl shadow-md z-40"
      style={{ backgroundColor: '#E84049' }}>

      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-50 w-28 md:w-32 lg:w-36">
        <Link to="/">
          <img
            src={Logo}
            alt="Öncü Spor Logo"
            className="w-full h-auto"
          />
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">

          {/* Left Side - Page Links */}
          <div className="w-1/3 flex justify-start">
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`text-white font-medium py-2 px-1 border-b-2 transition-all duration-200 ${activeLink === link.name
                          ? 'border-white'
                          : 'border-transparent hover:border-white/50'
                        }`}
                      onClick={() => setActiveLink(link.name)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>


          {/* Right Side - Social Media Links */}
          <div className="w-1/3 flex justify-end">
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/oncugenclikspor/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Instagram size={24} strokeWidth={1.5} />
              </a>
              <a
                href="https://x.com/oncugenclikspor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Twitter size={24} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.facebook.com/OncuGenclikveSpor/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Facebook size={24} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.youtube.com/@ÖncüSporKulübü"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Youtube size={24} strokeWidth={1.5} />
              </a>
              <Link
                to="/iletişim"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 ml-2 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                İletişim
              </Link>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WebHeader;