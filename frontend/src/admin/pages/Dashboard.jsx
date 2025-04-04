import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload } from 'lucide-react'; // İkon ekledim

const Dashboard = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <main className="mx-auto py-6">
        <div className="bg-gradient-to-br from-red-500 to-red-700 shadow-xl rounded-2xl p-6 sm:p-8 mb-10 w-full">
          <div className="flex flex-col items-center py-12 sm:py-16 space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">Yönetim Paneline Hoş Geldiniz</h2>            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 w-full max-w-3xl">
              <Link 
                to="/admin/photos"
                className="bg-white text-red-600 hover:bg-red-50 p-6 sm:p-8 rounded-xl text-center transition-all transform hover:scale-105 shadow-md flex flex-col items-center"
              >
                <Camera className="w-10 sm:w-12 h-10 sm:h-12 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Fotoğraf Galerisi</h3>
                <p className="text-gray-600 text-sm sm:text-base text-center">Mevcut fotoğrafları görüntüleyin, düzenleyin veya silin.</p>
              </Link>
              
              <Link 
                to="/admin/upload"
                className="bg-white text-red-600 hover:bg-red-50 p-6 sm:p-8 rounded-xl text-center transition-all transform hover:scale-105 shadow-md flex flex-col items-center"
              >
                <Upload className="w-10 sm:w-12 h-10 sm:h-12 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Fotoğraf Yükle</h3>
                <p className="text-gray-600 text-sm sm:text-base text-center">Galeriye yeni fotoğraflar ekleyin.</p>
              </Link>

              <Link 
                to="/admin/tournaments"
                className="bg-white text-red-600 hover:bg-red-50 p-6 sm:p-8 rounded-xl text-center transition-all transform hover:scale-105 shadow-md flex flex-col items-center"
              >
                <Upload className="w-10 sm:w-12 h-10 sm:h-12 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Turnuva Paneli</h3>
                <p className="text-gray-600 text-sm sm:text-base text-center">Mevcut turnuvaları yönet ve düzenlemeler yap.</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
