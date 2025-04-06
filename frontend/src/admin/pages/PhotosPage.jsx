import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { photoService } from '../../services/api'; // api.js'ten photoService'i import ediyoruz
import PhotoTable from '../components/PhotoTable';

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      // axios yerine photoService kullanıyoruz
      const data = await photoService.getAllPhotos();
      
      // API yanıtının format kontrolü
      if (Array.isArray(data.photos)) {
        setPhotos(data.photos);
      } else if (Array.isArray(data)) {
        setPhotos(data);
      } else {
        setPhotos([]);
        console.error('API yanıtı beklenen formatta değil:', data);
        setError('Veri formatı uygun değil');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setPhotos([]);
      setError('Fotoğraflar yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      // axios yerine photoService kullanıyoruz
      await photoService.deletePhoto(photoId);
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