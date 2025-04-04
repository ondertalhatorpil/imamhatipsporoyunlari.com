// src/admin/pages/PhotosPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhotoTable from '../components/PhotoTable';

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);  // Boş dizi ile başlatın
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/admin/photos', {
        withCredentials: true
      });
      // API yanıtının format kontrolü yap ve güvenli bir şekilde verileri al
      if (response.data && Array.isArray(response.data.photos)) {
        setPhotos(response.data.photos);
      } else if (response.data && Array.isArray(response.data)) {
        // Belki API doğrudan dizi dönüyor olabilir
        setPhotos(response.data);
      } else {
        // Veri yapısı beklenen formatta değilse boş dizi kullan
        setPhotos([]);
        console.error('API yanıtı beklenen formatta değil:', response.data);
        setError('Veri formatı uygun değil');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setPhotos([]); // Hata durumunda da boş dizi kullan
      setError('Fotoğraflar yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/photos/${photoId}`, {
        withCredentials: true
      });
      setPhotos(photos.filter(photo => photo.id !== photoId));
      alert('Fotoğraf başarıyla silindi.');
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Fotoğraf silinirken bir hata oluştu.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Fotoğraf Galerisi</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-red-600"></div>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-lg mb-6 text-lg">
                  {error}
                </div>
              )}
              
              <PhotoTable
                photos={photos}
                onDelete={handleDeletePhoto}
                onRefresh={fetchPhotos}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PhotosPage;