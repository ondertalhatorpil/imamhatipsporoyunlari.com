import React from 'react';
import Logo from './footer_logo.png';

const Footer = () => {
  return (
    <footer 
      className="w-full flex flex-col md:flex-row items-center justify-evenly py-12 mt-24"
      style={{ backgroundColor: '#E84049' }}
    >
      <p className="text-white text-base md:text-lg font-medium">ÖNCE SPOR</p>
      
      <img 
        src={Logo} 
        alt="Öncü Spor Logo" 
        className="w-1/5 md:w-[9%] my-8 md:my-0"
      />
      
      <p className="text-white text-sm md:text-base">
        © All Copyright 2024 by ÖNCÜ SPOR KULÜBÜ
      </p>
    </footer>
  );
};

export default Footer;