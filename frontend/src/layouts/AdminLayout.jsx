// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AdminNavbar from '../admin/components/Navbar';

const AdminLayout = () => {
  const isAuthenticated = sessionStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();
  
  // Login sayfası için ayrı kontrol
  if (!isAuthenticated && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <AdminNavbar />}
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <footer className="py-4 bg-white text-center border-t text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} İmam Hatip Spor Oyunları - Admin Paneli</p>
      </footer>
    </div>
  );
};

export default AdminLayout;