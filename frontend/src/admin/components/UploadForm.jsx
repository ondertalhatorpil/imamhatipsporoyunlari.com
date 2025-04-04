// src/admin/components/UploadForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { photoService } from '../../services/api';

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [eventName, setEventName] = useState(`${Number(new Date().getFullYear()) - 2009}. İmam Hatip Spor Oyunları`);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previews, setPreviews] = useState([]);
  
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    
    // Dosya önizlemeleri oluştur
    const newPreviews = selectedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace(/-/g, " ")
    }));
    
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setError('Lütfen en az bir fotoğraf seçin.');
      return;
    }
    
    setError('');
    setSuccess('');
    setUploading(true);
    
    const formData = new FormData();
    formData.append('year', year);
    formData.append('eventName', eventName);
    
    // Fotoğrafları ekle
    files.forEach((file, index) => {
      formData.append('photos', file);
      
      // Başlıkları ekle (eğer değiştirilmişse)
      if (previews[index]?.title !== file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace(/-/g, " ")) {
        formData.append(`titles[${index}]`, previews[index].title);
      }
    });
    
    try {
      const response = await photoService.uploadPhotos(formData);
      setSuccess(`${response.photos.length} fotoğraf başarıyla yüklendi.`);
      
      // Form temizle
      setFiles([]);
      setPreviews([]);
      document.getElementById('photo-upload').value = '';
      
      // 2 saniye sonra dashboard'a yönlendir
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Fotoğraflar yüklenirken bir hata oluştu.');
    } finally {
      setUploading(false);
    }
  };

  const handleTitleChange = (index, newTitle) => {
    const updatedPreviews = [...previews];
    updatedPreviews[index].title = newTitle;
    setPreviews(updatedPreviews);
  };

  const removePreview = (index) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
      {/* Hata & Başarı Mesajları */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* Yıl Seçimi */}
      <div>
        <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">
          Yıl *
        </label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        >
          {[2025, 2024, 2023, 2022, 2021].map((yr) => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>
      </div>

      {/* Fotoğraf Yükleme */}
      <div>
        <label htmlFor="photo-upload" className="block text-gray-700 text-sm font-bold mb-2">
          Fotoğraflar *
        </label>
        <input
          type="file"
          id="photo-upload"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <p className="text-sm text-gray-500 mt-1">Birden fazla fotoğraf seçebilirsiniz.</p>
      </div>

      {/* Fotoğraf Önizlemeleri */}
      {previews.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Fotoğraf Önizlemeleri</h3>
          <p className="text-sm text-gray-500 mb-4">Fotoğraf başlıklarını düzenleyebilirsiniz.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="border rounded-lg p-3 relative shadow-md">
                <img src={preview.url} alt={preview.title} className="w-full h-40 object-cover rounded mb-2" />
                <button
                  type="button"
                  onClick={() => removePreview(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  &times;
                </button>
                <input
                  type="text"
                  value={preview.title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                  className="w-full border rounded-lg py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Fotoğraf başlığı"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gönder Butonu */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
          disabled={uploading || files.length === 0}
        >
          {uploading ? (
            <>
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent mr-2"></span>
              Yükleniyor...
            </>
          ) : (
            'Fotoğrafları Yükle'
          )}
        </button>
      </div>
    </form>
  );
};

export default UploadForm;