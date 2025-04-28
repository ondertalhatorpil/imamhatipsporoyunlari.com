// DerecePage.js
import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

// Spor dalları tanımı
const sports = [
  { id: 'all', title: 'Tüm Branşlar', icon: '🏆' },
  { id: 'archery', title: 'Okçuluk', icon: '🏹' },
  { id: 'taekwondo', title: 'Taekwondo', icon: '🥋' },
  { id: 'tableTennis', title: 'Masa Tenisi', icon: '🏓' },
  { id: 'dart', title: 'Dart', icon: '🎯' },
  { id: 'badminton', title: 'Badminton', icon: '🏸' },
  { id: 'atletizm', title: 'Atletizm', icon: '🏃' },
  { id: 'wrestling', title: 'Bilek Güreşi', icon: '💪' },
  { id: 'gures', title: 'Güreş', icon: '🤼' },
];

// Excel sayfalarını spor ID'leri ile eşleştirme haritası
const sportSheetMap = {
  'ATLETİZM': 'atletizm',
  'BADMİNTON': 'badminton',
  'BİLEK GÜREŞİ': 'wrestling',
  'DART': 'dart',
  'GELENEKSEL TÜRK OKÇULUĞU': 'archery',
  'GÜREŞ': 'gures',
  'MASA TENİSİ': 'tableTennis',
  'TAEKWONDO': 'taekwondo'
};

// Ana Sayfa Bileşeni
const DerecePage = () => {
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        setLoading(true);
        
        // Excel dosyasını yükle
        const response = await fetch('/assets/derece.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        
        let allData = [];
        
        // Her sekme için işleme yap
        workbook.SheetNames.forEach(sheetName => {
          console.log(`İşleniyor: ${sheetName}`);
          
          // Spor türünü belirle
          let sportId = null;
          for (const key in sportSheetMap) {
            if (sheetName.toUpperCase().includes(key) || key.includes(sheetName.toUpperCase())) {
              sportId = sportSheetMap[key];
              break;
            }
          }
          
          if (!sportId) return; // Eşleşme bulunamadıysa bu sekmeyi atla
          
          // Sekmedeki verileri al
          const sheet = workbook.Sheets[sheetName];
          const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          
          // Veriyi işle
          const processedData = processSheetData(sportId, sheetName, rawData);
          if (processedData.length > 0) {
            allData = [...allData, ...processedData];
          }
        });
        
        setAllResults(allData);
      } catch (error) {
        console.error('Excel verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadExcelData();
  }, []);

  // Her branş için özel işleme fonksiyonu
  const processSheetData = (sportId, sheetName, data) => {
    const results = [];
    
    // Veri başlangıç indeksini bul
    let startRow = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] && data[i].includes('DERECE')) {
        startRow = i + 1;
        break;
      }
    }
    
    // Başlık satırını bul
    let headerRow = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i] && data[i].includes('DERECE')) {
        headerRow = data[i];
        break;
      }
    }
    
    // İsim, okul ve kategori indekslerini bul
    const nameIndex = headerRow.indexOf('AD-SOYAD') > -1 ? headerRow.indexOf('AD-SOYAD') : headerRow.indexOf('AD/SOYAD');
    const schoolIndex = headerRow.indexOf('OKUL') > -1 ? headerRow.indexOf('OKUL') : headerRow.indexOf('OKUL ADI');
    const categoryIndex = headerRow.indexOf('KATEGORİ');
    const weightIndex = sportId === 'gures' || sportId === 'wrestling' ? headerRow.indexOf('KİLO') : -1;
    
    // Ana verileri işle
    for (let i = startRow; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length === 0) continue;
      
      // Satır bir derece içeriyor mu kontrol et
      const rank = row[0];
      if (!rank || isNaN(rank) || rank === '') continue;
      
      // Satır kategori veya takım tasnifi başlığı mı kontrol et
      const rowText = row.join(' ').toUpperCase();
      if (rowText.includes('TAKIM TASNİFİ') || rowText.includes('DERECE')) continue;
      
      // Bireysel derece verisi
      if (nameIndex > -1 && schoolIndex > -1) {
        results.push({
          sport: sportId,
          rank: rank.toString(),
          name: row[nameIndex] || '',
          school: row[schoolIndex] || '',
          category: categoryIndex > -1 ? row[categoryIndex] || '' : '',
          weight: weightIndex > -1 ? row[weightIndex] || '' : '',
          isTeam: false
        });
      }
      // Takım verisi (Dart gibi)
      else if (schoolIndex > -1) {
        results.push({
          sport: sportId,
          rank: rank.toString(),
          name: '',
          school: row[schoolIndex] || '',
          category: categoryIndex > -1 ? row[categoryIndex] || '' : '',
          isTeam: true
        });
      }
    }
    
    // Takım tasnifi bölümlerini bul ve işle
    if (sportId === 'gures' || sportId === 'taekwondo' || sportId === 'wrestling') {
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length === 0) continue;
        
        const rowText = row.join(' ').toUpperCase();
        if (rowText.includes('TAKIM TASNİFİ')) {
          let category = '';
          
          // Kategori bilgisini belirle
          if (rowText.includes('GENÇ')) {
            category = 'GENÇ';
          } else if (rowText.includes('YILDIZ')) {
            category = 'YILDIZ';
          }
          
          if (rowText.includes('KIZ')) {
            category += ' KIZ';
          } else if (rowText.includes('ERKEK')) {
            category += ' ERKEK';
          } else {
            category += ' ERKEK'; // Varsayılan
          }
          
          // Takım verilerini işle
          let j = i + 2; // Başlıkları atla
          while (j < data.length && data[j] && data[j].length > 1) {
            const teamRank = data[j][0];
            if (!teamRank || isNaN(teamRank)) {
              j++;
              continue;
            }
            
            results.push({
              sport: sportId,
              rank: teamRank.toString(),
              name: '',
              school: data[j][1] || '',
              category: `TAKIM ${category}`,
              isTeam: true,
              puan: data[j][2] || ''
            });
            
            j++;
          }
        }
      }
    }
    
    return results;
  };

  // Verileri filtrele ve sayfalandır
  const filteredResults = selectedSport === 'all' 
    ? allResults 
    : allResults.filter(result => result.sport === selectedSport);
  
  // Kategorilere göre grupla
  const categories = [...new Set(filteredResults.map(item => item.category))].filter(Boolean);
  const groupedByCategory = categories.map(category => ({
    category,
    winners: filteredResults.filter(winner => winner.category === category)
  }));
  
  // Kategorileri takım ve bireysel olarak ayır ve sırala
  const sortedCategories = [...groupedByCategory].sort((a, b) => {
    const aIsTeam = a.category.includes('TAKIM');
    const bIsTeam = b.category.includes('TAKIM');
    return (aIsTeam ? 1 : 0) - (bIsTeam ? 1 : 0);
  });
  
  // Sayfalama
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(sortedCategories.length / itemsPerPage)));
    setCurrentPage(1); // Filtre değiştiğinde ilk sayfaya dön
  }, [selectedSport, allResults]);
  
  const paginatedCategories = sortedCategories.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Sayfa değiştirme fonksiyonu
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          <span className="relative z-10 inline-block">
            Şampiyonlar 🏆
            <span className="absolute -bottom-2 left-0 right-0 h-2 bg-red-200 opacity-50 z-0"></span>
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          15. İmam Hatip Spor Oyunları'nda dereceye giren sporcular
        </p>
      </div>
      
      {/* Spor Filtreleri */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sports.map((sport) => (
          <button
            key={sport.id}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 border-2 transition-all shadow-sm text-md font-semibold
            ${selectedSport === sport.id ? "bg-red-500 text-white border-red-500" : "bg-white text-red-500 border-transparent hover:border-red-500"}`}
            onClick={() => setSelectedSport(sport.id)}
          >
            <span>{sport.icon}</span>
            <span>{sport.title}</span>
          </button>
        ))}
      </div>
      
      {/* İçerik Alanı */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
        </div>
      ) : (
        <>
          {paginatedCategories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">Bu kategoride sonuç bulunmamaktadır.</p>
            </div>
          ) : (
            <>
              {/* Kategori Bölümleri */}
              {paginatedCategories.map((group) => (
                <div key={group.category} className="my-6">
                  <h2 className={`text-xl font-bold text-gray-800 py-2 px-4 bg-white rounded-lg shadow-sm border-l-4 
                    ${group.category.includes('TAKIM') ? 'border-blue-500' : 'border-red-500'} mb-4`}
                  >
                    {group.category.includes('TAKIM') ? (
                      <span className="flex items-center">
                        <span className="mr-2">🏆</span> {group.category}
                      </span>
                    ) : (
                      group.category
                    )}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.winners.map((winner, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 flex items-center justify-center text-lg font-bold text-white rounded-full 
                            ${winner.rank === '1' ? "bg-yellow-400" : 
                              winner.rank === '2' ? "bg-gray-400" : 
                              winner.rank === '3' ? "bg-orange-600" : 
                              winner.rank === '4' ? "bg-gray-600" : "bg-gray-500"}`}
                          >
                            {winner.rank}
                          </div>
                          <div className="flex-1">
                            {winner.isTeam ? (
                              <h3 className="text-md font-semibold text-gray-800 flex items-center">
                                <span className="mr-2">🏆</span> {winner.school}
                              </h3>
                            ) : (
                              <h3 className="text-md font-semibold text-gray-800">{winner.name}</h3>
                            )}
                            {winner.weight && (
                              <p className="text-gray-600 text-xs">{winner.weight}</p>
                            )}
                            {winner.puan && (
                              <p className="text-gray-600 text-xs font-bold">Puan: {winner.puan}</p>
                            )}
                          </div>
                        </div>
                        {!winner.isTeam && (
                          <p className="mt-2 text-gray-700 font-medium border-t pt-2 text-xs">{winner.school}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Sayfalama */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === 1 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    Önceki
                  </button>
                  
                  <span className="px-4 py-2 bg-white rounded-md shadow-sm">
                    {currentPage} / {totalPages}
                  </span>
                  
                  <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === totalPages 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    Sonraki
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DerecePage;