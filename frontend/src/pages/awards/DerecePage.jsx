// DerecePage.js - Ana sayfa bileşeni
import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

// Sayfa başına gösterilecek kategori sayısı
const ITEMS_PER_PAGE = 5;

// Spor branşlarını tanımla
const sports = [
  { id: 'all', title: 'Tüm Branşlar', icon: '🏆' },
  { id: 'archery', title: 'Okçuluk', icon: '🏹' },
  { id: 'badminton', title: 'Badminton', icon: '🏸' },
  { id: 'atletizm', title: 'Atletizm', icon: '🏃' },  
  { id: 'taekwondo', title: 'Taekwondo', icon: '🥋' },
  { id: 'tableTennis', title: 'Masa Tenisi', icon: '🏓' },
  { id: 'dart', title: 'Dart', icon: '🎯' },
  { id: 'wrestling', title: 'Bilek Güreşi', icon: '💪' },
  { id: 'gures', title: 'Güreş', icon: '🤼' },
];

// Derece Sayfası
const DerecePage = () => {
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        setLoading(true);
        
        // Excel dosyasını yükle
        const response = await fetch('/assets/derece.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        
        console.log("Excel sayfaları:", workbook.SheetNames);
        
        let allData = [];
        
        // Her sayfa için veri işleme
        workbook.SheetNames.forEach(sheetName => {
          console.log(`İşleniyor: ${sheetName}`);
          
          // Sayfa verilerini al
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          
          // Her spor için özel fonksiyon çağır
          const sportData = processSheetData(sheetName, data);
          
          if (sportData.length > 0) {
            allData = [...allData, ...sportData];
          }
        });
        
        console.log("Toplam veri sayısı:", allData.length);
        setAllResults(allData);
      } catch (error) {
        console.error('Excel verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadExcelData();
  }, []);

  // Excel sayfalarını işle
  const processSheetData = (sheetName, data) => {
    // Spor branşını belirle
    let sportId = identifySport(sheetName);
    if (!sportId) return [];
    
    const results = [];
    const upperSheetName = sheetName.toUpperCase();
    
    // Başlık satırını bul
    let headerRowIndex = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i] && data[i].includes && data[i].includes('DERECE')) {
        headerRowIndex = i;
        break;
      }
    }
    
    if (headerRowIndex === -1) return [];
    
    const headerRow = data[headerRowIndex];
    const startRowIndex = headerRowIndex + 1;
    
    // Sütun indeksleri
    const rankIndex = headerRow.indexOf('DERECE');
    const nameIndex = headerRow.findIndex(h => h === 'AD-SOYAD' || h === 'AD/SOYAD');
    const schoolIndex = headerRow.findIndex(h => h === 'OKUL' || h === 'OKUL ADI');
    const categoryIndex = headerRow.indexOf('KATEGORİ');
    const weightIndex = headerRow.indexOf('KİLO');
    
    // Bireysel dereceleri işle
    for (let i = startRowIndex; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length === 0) continue;
      
      const rank = row[rankIndex];
      if (!rank || isNaN(rank) || rank === '') continue;
      
      // Takım tasnifi satırlarını atla
      const rowStr = String(row);
      if (rowStr.includes('TAKIM TASNİFİ')) continue;
      
      // Dart sayfası için özel işleme (AD-SOYAD sütunu yok)
      if (upperSheetName.includes('DART')) {
        results.push({
          sport: sportId,
          rank: String(rank),
          name: '',
          school: row[schoolIndex] || '',
          category: row[categoryIndex] || '',
          isTeam: true
        });
      } 
      // Normal veri işleme
      else if (nameIndex > -1 && schoolIndex > -1) {
        results.push({
          sport: sportId,
          rank: String(rank),
          name: row[nameIndex] || '',
          school: row[schoolIndex] || '',
          category: row[categoryIndex] || '',
          weight: weightIndex > -1 ? row[weightIndex] || '' : '',
          isTeam: false
        });
      }
    }
    
    // Takım tasnifi bölümlerini işle (Taekwondo ve Bilek Güreşi)
    if (upperSheetName.includes('TAEKWONDO') || upperSheetName.includes('BİLEK GÜREŞİ')) {
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (!row || !Array.isArray(row)) continue;
        
        const rowStr = row.join(' ');
        if (rowStr.includes('TAKIM TASNİFİ')) {
          // Kategoriyi belirle
          let category = '';
          if (rowStr.includes('GENÇ')) category = 'GENÇ';
          else if (rowStr.includes('YILDIZ')) category = 'YILDIZ';
          
          if (rowStr.includes('KIZ')) category += ' KIZ';
          else if (rowStr.includes('ERKEK')) category += ' ERKEK';
          
          // Takım tasnifi verilerini bul
          let j = i + 2; // Başlık satırını atla
          while (j < data.length && data[j] && data[j].length > 1) {
            const teamRank = data[j][0];
            if (!isNaN(teamRank) && teamRank !== '') {
              // Taekwondo için spor ID'sini belirle
              const teamSportId = rowStr.includes('TAEKWONDO') ? 'taekwondo' : sportId;
              
              results.push({
                sport: teamSportId,
                rank: String(teamRank),
                name: '',
                school: data[j][1] || '',
                category: `TAKIM ${category}`,
                isTeam: true
              });
            }
            j++;
          }
        }
      }
    }
    
    return results;
  };

  // Sayfa adından spor ID'sini belirle
  const identifySport = (sheetName) => {
    const upperName = sheetName.toUpperCase();
    
    if (upperName.includes('BADMİNTON')) return 'badminton';
    if (upperName.includes('ATLETİZM')) return 'atletizm';
    if (upperName.includes('TAEKWONDO')) return 'taekwondo';
    if (upperName.includes('MASA TENİSİ')) return 'tableTennis';
    if (upperName.includes('DART')) return 'dart';
    if (upperName.includes('BİLEK GÜREŞİ')) return 'wrestling';
    if (upperName.includes('GÜREŞ')) return 'gures';
    if (upperName.includes('GELENEKSEL TÜRK OKÇULUĞU') || upperName.includes('OKÇULUK')) return 'archery';
    
    return null;
  };

  // Verileri filtrele ve grupla
  useEffect(() => {
    // Spor dalına göre filtreleme
    const filtered = selectedSport === 'all' 
      ? allResults 
      : allResults.filter(result => result.sport === selectedSport);
    
    // Kategorilere göre grupla
    const categories = [...new Set(filtered.map(item => item.category))].filter(Boolean);
    const grouped = categories.map(category => ({
      category,
      winners: filtered.filter(winner => winner.category === category)
    }));
    
    // Takım ve bireysel kategorilerini sırala
    const sorted = [...grouped].sort((a, b) => {
      const aIsTeam = a.category.includes('TAKIM');
      const bIsTeam = b.category.includes('TAKIM');
      return (aIsTeam ? 1 : 0) - (bIsTeam ? 1 : 0);
    });
    
    // Toplam sayfa sayısını hesapla
    setTotalPages(Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE)));
    
    // Filtre değiştiğinde ilk sayfaya dön
    setCurrentPage(1);
  }, [selectedSport, allResults]);

  // Filtrelenmiş ve sayfalandırılmış verileri hesapla
  const getFilteredAndPaginatedData = () => {
    // Spor dalına göre filtreleme
    const filtered = selectedSport === 'all' 
      ? allResults 
      : allResults.filter(result => result.sport === selectedSport);
    
    // Kategorilere göre grupla
    const categories = [...new Set(filtered.map(item => item.category))].filter(Boolean);
    const grouped = categories.map(category => ({
      category,
      winners: filtered.filter(winner => winner.category === category)
    }));
    
    // Takım ve bireysel kategorilerini sırala
    const sorted = [...grouped].sort((a, b) => {
      const aIsTeam = a.category.includes('TAKIM');
      const bIsTeam = b.category.includes('TAKIM');
      return (aIsTeam ? 1 : 0) - (bIsTeam ? 1 : 0);
    });
    
    // Sayfalama
    return sorted.slice(
      (currentPage - 1) * ITEMS_PER_PAGE, 
      currentPage * ITEMS_PER_PAGE
    );
  };
  
  // Sayfa değiştirme
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };
  
  // Filtrelenmiş ve sayfalandırılmış veriler
  const paginatedCategories = getFilteredAndPaginatedData();

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
              {paginatedCategories.map((group, index) => (
                <div key={index} className="my-6">
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
                            ${
                              winner.rank === '1' ? "bg-yellow-400" : 
                              winner.rank === '2' ? "bg-gray-400" : 
                              winner.rank === '3' ? "bg-orange-600" : 
                              winner.rank === '4' ? "bg-gray-600" : "bg-gray-500"
                            }`}
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