// src/components/Tournament/MatchCard.jsx
import React from 'react';

const MatchCard = ({ match }) => {
  // Tarih ve saat formatlaması için yardımcı fonksiyon
  // UTC olarak alınan tarihi, yerel saat dilimine dönüştürmeden işler
  const formatMatchTime = (isoDateString) => {
    if (!isoDateString) return { date: '', time: '' };
    
    // ISO formatındaki string'i Date nesnesine dönüştür
    const matchDate = new Date(isoDateString);
    
    // Tarih ve saat bilgisinin parçalarını al
    const year = matchDate.getUTCFullYear();
    const month = String(matchDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(matchDate.getUTCDate()).padStart(2, '0');
    const hours = String(matchDate.getUTCHours()).padStart(2, '0');
    const minutes = String(matchDate.getUTCMinutes()).padStart(2, '0');
    
    // Türkçe formatında tarih ve saat string'leri oluştur
    const formattedDate = `${day}.${month}.${year}`;
    const formattedTime = `${hours}:${minutes}`;
    
    return { date: formattedDate, time: formattedTime };
  };
  
  // Tarih ve saat bilgilerini al
  const { date: formattedDate, time: formattedTime } = formatMatchTime(match.match_time);
  
  // E84049 rengini kullan (sizin sitenizin rengi)
  const mainColor = '#E84049';
  
  // Maç durumunu belirle - UTC zamanı kullanarak
  const now = new Date();
  const matchTimeUTC = new Date(match.match_time);
  const isUpcoming = !match.is_finished && matchTimeUTC > now;
  const isLive = !match.is_finished && matchTimeUTC <= now;
  
  return (
    <div className="overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Üst Bilgi Çubuğu */}
      <div 
        className="p-3 text-white flex justify-between items-center"
        style={{ backgroundColor: mainColor }}
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{formattedTime}</span>
        </div>
      </div>
      
      {/* Takımlar ve Skor Alanı */}
      <div className="bg-white p-4">
        {/* Takım 1 */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center mr-3 transform hover:scale-110 transition-all duration-300"
               style={{ backgroundColor: mainColor }}>
            <span className="text-white text-xl font-bold">
              {match.team1_name.charAt(0)}
            </span>
          </div>
          <div className="font-medium text-gray-800 flex-grow text-sm md:text-base">
            {match.team1_name}
          </div>
          {match.is_finished && (
            <div className="font-bold text-2xl text-gray-800 ml-auto">
              {match.team1_score}
            </div>
          )}
        </div>
        
        {/* Orta Çizgi */}
        <div className="relative my-4">
          <div className="absolute w-full h-px bg-gray-200"></div>
          
          {/* VS her zaman göster */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 font-bold text-xl"
               style={{ color: mainColor }}>
            VS
          </div>
        </div>
        
        {/* Takım 2 */}
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-4 transform hover:scale-110 transition-all duration-300"
               style={{ backgroundColor: mainColor }}>
            <span className="text-white text-xl font-bold">
              {match.team2_name.charAt(0)}
            </span>
          </div>
          <div className="font-medium text-gray-800 flex-grow text-sm md:text-base">
            {match.team2_name}
          </div>
          {match.is_finished && (
            <div className="font-bold text-2xl text-gray-800 ml-auto">
              {match.team2_score}
            </div>
          )}
        </div>
      </div>
      
      {/* Alt Bilgi Çubuğu - Her zaman göster */}
      <div className="bg-gray-50 p-2 border-t border-gray-200 text-sm">
        {/* Maç Durumu - Her durumda bir mesaj göster */}
        <div className="font-medium text-center" style={{ color: mainColor }}>
          {match.is_finished ? "Maç Tamamlandı" : isLive ? "Maç Başladı" : "Maç Başlamadı"}
        </div>
        
        {/* Maç Yeri */}
        {match.location && (
          <div className="text-gray-600 text-center flex items-center justify-center mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {match.location}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;