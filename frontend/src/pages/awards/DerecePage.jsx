import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

// Spor dalları tanımı
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

// Excel dosyası mevcut
const excelFileName = '/assets/derece.xlsx';

// Derece Sayfası
const DerecePage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Excel verilerini yükle
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log("Excel yükleniyor...");
        
        const response = await fetch(excelFileName);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        
        console.log("Excel yüklendi. Sayfalar:", workbook.SheetNames);
        
        // Tüm sayfaları işle
        let allResults = [];
        
        workbook.SheetNames.forEach(sheetName => {
          console.log(`İşleniyor: ${sheetName}`);
          const sheet = workbook.Sheets[sheetName];
          const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
          
          // Her sayfa için spor türünü tespit et
          const sportType = detectSportType(sheetName);
          if (!sportType) {
            console.log(`Sayfa için spor türü bulunamadı: ${sheetName}`);
            return;
          }
          
          console.log(`Spor türü: ${sportType} için ${rawData.length} satır veri`);
          
          // Veriyi işle
          const processedData = processSportData(sportType, rawData);
          if (processedData && processedData.length > 0) {
            console.log(`${processedData.length} satır veri işlendi`);
            allResults = [...allResults, ...processedData];
          } else {
            console.log(`Veri işlenemedi: ${sheetName}`);
          }
        });
        
        console.log(`Toplam ${allResults.length} satır veri yüklendi`);
        setResults(allResults);
      } catch (error) {
        console.error("Excel verisi yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Spor türünü tespit et
  const detectSportType = (sheetName) => {
    const normalizedName = sheetName.toUpperCase().trim();
    
    if (normalizedName.includes("BADM")) return "badminton";
    if (normalizedName.includes("ATLET")) return "atletizm";
    if (normalizedName.includes("TAEKWONDO")) return "taekwondo";
    if (normalizedName.includes("MASA")) return "tableTennis";
    if (normalizedName.includes("DART")) return "dart";
    if (normalizedName.includes("BİLEK") || normalizedName.includes("BILEK")) return "wrestling";
    if (normalizedName.includes("GÜREŞ") || normalizedName.includes("GURES")) return "gures";
    if (normalizedName.includes("OKÇU") || normalizedName.includes("OKCU")) return "archery";
    
    return null;
  };

  // Spor verilerini işle
  const processSportData = (sportType, data) => {
    const results = [];
    
    // "DERECE" kelimesini içeren başlık satırını bul
    let headerRowIndex = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i] && data[i].some(cell => String(cell).includes("DERECE"))) {
        headerRowIndex = i;
        break;
      }
    }
    
    if (headerRowIndex === -1) {
      console.log("Başlık satırı bulunamadı");
      return [];
    }
    
    // Başlık satırını analiz et
    const headerRow = data[headerRowIndex].map(h => String(h).trim());
    console.log("Başlık satırı:", headerRow);
    
    // Sütun indekslerini bul
    const rankIndex = headerRow.findIndex(h => h === "DERECE");
    const nameIndex = headerRow.findIndex(h => h === "AD-SOYAD" || h === "AD/SOYAD");
    const schoolIndex = headerRow.findIndex(h => h === "OKUL" || h === "OKUL ADI");
    const categoryIndex = headerRow.findIndex(h => h === "KATEGORİ");
    const weightIndex = headerRow.findIndex(h => h === "KİLO");
    
    console.log(`Sütun indeksleri: Derece=${rankIndex}, Ad=${nameIndex}, Okul=${schoolIndex}, Kategori=${categoryIndex}, Kilo=${weightIndex}`);
    
    // Başlık satırından sonraki satırlardan verileri işle
    for (let i = headerRowIndex + 1; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length === 0) continue;
      
      // Derece değeri geçerli mi kontrol et
      const rank = row[rankIndex];
      if (!rank || rank === "" || isNaN(Number(rank))) {
        // Başlık olabilecek satırları kontrol et
        const rowStr = row.join(" ");
        if (rowStr.includes("TAKIM TASNİFİ")) {
          // Burada takım tasnifi işlemleri yapılabilir
          continue;
        }
        continue;
      }
      
      // Kategori bilgisini al
      let category = categoryIndex >= 0 ? String(row[categoryIndex]).trim() : "";
      
      // Dart için özel durum (AD-SOYAD sütunu yok)
      if (sportType === "dart") {
        results.push({
          sport: sportType,
          rank: String(rank),
          name: "",
          school: schoolIndex >= 0 ? String(row[schoolIndex]).trim() : "",
          category: category,
          isTeam: true
        });
      } 
      // Normal durum (Bireysel sporlar)
      else if ((nameIndex >= 0 || schoolIndex >= 0) && categoryIndex >= 0) {
        results.push({
          sport: sportType,
          rank: String(rank),
          name: nameIndex >= 0 ? String(row[nameIndex]).trim() : "",
          school: schoolIndex >= 0 ? String(row[schoolIndex]).trim() : "",
          category: category,
          weight: weightIndex >= 0 ? String(row[weightIndex]).trim() : "",
          isTeam: nameIndex < 0
        });
      }
    }
    
    // Takım tasnifi bölümlerini kontrol et
    for (let i = 0; i < data.length; i++) {
      if (!data[i]) continue;
      
      const rowStr = data[i].join(" ");
      if (rowStr.includes("TAKIM TASNİFİ")) {
        console.log(`Takım tasnifi bulundu: ${rowStr}`);
        
        // Takım kategorisini belirle
        let teamCategory = "";
        if (rowStr.includes("GENÇ")) teamCategory = "GENÇ";
        else if (rowStr.includes("YILDIZ")) teamCategory = "YILDIZ";
        
        if (rowStr.includes("KIZ")) teamCategory += " KIZ";
        else if (rowStr.includes("ERKEK")) teamCategory += " ERKEK";
        else teamCategory += " ERKEK"; // Varsayılan
        
        // Başlık satırını atla ve takım verilerini işle
        let j = i + 2;
        while (j < data.length && data[j] && data[j].length >= 2) {
          const teamRank = data[j][0];
          if (teamRank && !isNaN(Number(teamRank))) {
            results.push({
              sport: sportType,
              rank: String(teamRank),
              name: "",
              school: String(data[j][1] || "").trim(),
              category: `TAKIM ${teamCategory}`,
              isTeam: true
            });
          }
          j++;
        }
      }
    }
    
    return results;
  };

  // Kategorilere göre filtreleme ve gruplama
  useEffect(() => {
    // Toplam sayfa sayısını hesapla
    const filteredResults = selectedSport === 'all' 
      ? results 
      : results.filter(item => item.sport === selectedSport);
    
    const categories = [...new Set(filteredResults.map(item => item.category))].filter(Boolean);
    setTotalPages(Math.max(1, Math.ceil(categories.length / ITEMS_PER_PAGE)));
    
    // Filtre değiştiğinde ilk sayfaya dön
    setCurrentPage(1);
  }, [selectedSport, results]);

  // Filtrelenmiş ve gruplandırılmış verileri hesapla
  const getFilteredAndGroupedData = () => {
    // Spor dalına göre filtrele
    const filteredResults = selectedSport === 'all' 
      ? results 
      : results.filter(item => item.sport === selectedSport);
    
    // Kategorilere göre grupla
    const categories = [...new Set(filteredResults.map(item => item.category))].filter(Boolean);
    
    // Her kategori için bireysel grupları oluştur
    const grouped = categories.map(category => ({
      category,
      winners: filteredResults.filter(item => item.category === category)
    }));
    
    // Takım ve bireysel kategorileri sırala
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
  
  // Filtrelenmiş ve sayfalandırılmış veriler
  const paginatedData = getFilteredAndGroupedData();

  // Sayfa değiştirme
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
          {paginatedData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">Bu kategoride sonuç bulunmamaktadır.</p>
              <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg inline-block">
                <p className="font-medium">Debug Bilgisi:</p>
                <p>Seçili spor: {selectedSport}</p>
                <p>Toplam veri sayısı: {results.length}</p>
                <p>Bu spor için veri sayısı: {results.filter(r => r.sport === selectedSport || selectedSport === 'all').length}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Kategori Bölümleri */}
              {paginatedData.map((group, index) => (
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
                              winner.rank === '3' || winner.rank === '3.' ? "bg-orange-600" : 
                              winner.rank === '4' || winner.rank === '4.' ? "bg-gray-600" : "bg-gray-500"
                            }`}
                          >
                            {winner.rank.replace('.', '')}
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