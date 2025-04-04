import { useState, useEffect } from 'react';
import { Download, Eye } from 'lucide-react';
import axios from 'axios'


const Gallery = () => {
  const [activeYear, setActiveYear] = useState('2024');
  const [years, setYears] = useState(['2024', '2023', '2022', '2021']);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Backend'den fotoğrafları çekmek için API isteği
    fetchPhotos(activeYear);
  }, [activeYear]);

  const fetchPhotos = async () => {
    try {
      // Environment'a göre URL belirleme
      const baseUrl = import.meta.env.PROD 
        ? `/api/photos?year=${activeYear}` 
        : `http://localhost:8561/api/photos?year=${activeYear}`;
      
      const response = await axios.get(baseUrl, {
        headers: { 'Accept': 'application/json' }
      });
      
      console.log('API yanıtı:', response.data);
      setPhotos(response.data.photos || []);
      setLoading(false);
    } catch (error) {
      console.error('Fotoğraflar yüklenirken hata:', error);
      // Yanıtı kontrol edin
      if (error.response) {
        console.error('Yanıt veri:', error.response.data);
        console.error('Yanıt durumu:', error.response.status);
      }
      setError('Fotoğraflar yüklenemedi');
      setLoading(false);
    }
  };

  // Örnek fotoğraf verisi (API çalışmadığında gösterilecek)
  const examplePhotos = [
    { id: 1, year: '2024', url: '/api/placeholder/400/320', title: 'Voleybol Takımı', downloadCount: 45 },
    { id: 2, year: '2024', url: '/api/placeholder/400/320', title: 'Tenis Müsabakası', downloadCount: 32 },
    { id: 3, year: '2024', url: '/api/placeholder/400/320', title: 'Taekwondo Gösterisi', downloadCount: 67 },
    { id: 4, year: '2024', url: '/api/placeholder/400/320', title: 'Okçuluk Finali', downloadCount: 23 },
    { id: 5, year: '2024', url: '/api/placeholder/400/320', title: 'Dart Turnuvası', downloadCount: 18 },
    { id: 6, year: '2024', url: '/api/placeholder/400/320', title: 'Basketbol Maçı', downloadCount: 52 },
  ];

  return (
    <div className="w-full py-16 px-4 md:px-8 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Fotoğraf Galerisi</h1>

          <div className="max-w-3xl mx-auto mb-8">
            <a
              href="https://drive.google.com/drive/folders/13u3KOYN7elfUP0Dpqd04aMCwxJ10J5Rc"
              className="block w-full bg-red-500 hover:bg-red-600 text-white text-center py-4 px-6 rounded-lg text-lg transition-colors"
            >
              15. İmam Hatip Spor Oyunları Fotoğraf Arşivi için tıklayınız
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`py-2 px-8 rounded-full text-lg transition-colors ${activeYear === year
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-red-500 border border-red-500 hover:bg-red-50'
                  }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : photos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-lg overflow-hidden shadow-md group relative"
              >
                <div className="relative">
                  <img
                    src={`http://localhost:3000${photo.url}`}
                    alt={photo.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => console.error("Fotoğraf yüklenemedi:", photo.url)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 text-white">
                    <button
                      onClick={() => handleDownload(photo.id, photo.url)}
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md flex items-center"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      <span>İndir</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {examplePhotos
              .filter(photo => photo.year === activeYear)
              .map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md group relative"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 text-white">
                      <button
                        onClick={() => handleDownload(photo.id, photo.url)}
                        className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md flex items-center"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        <span>İndir</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;