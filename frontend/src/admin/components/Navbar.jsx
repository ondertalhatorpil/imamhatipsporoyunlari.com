import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/admin/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="text-xl font-bold text-red-500">
              İMAM HATİP SPOR OYUNLARI
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 px-3 py-2"
            >
              Çıkış Yap
            </button>
          </div>
          {/* Mobil Menü Aç/Kapat */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobil Menü */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-2 p-4 bg-gray-100 rounded-lg shadow-md">
            <button 
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 px-3 py-2"
            >
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
