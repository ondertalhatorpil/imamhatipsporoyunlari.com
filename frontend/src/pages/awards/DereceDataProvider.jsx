import React from "react";
import Header from "../../components/common/Navbar/ResponsiveHeader";
import Footer from "../../components/common/Footer/Footer";
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// Spor dalı tanımlamaları
const sports = [
  { id: 'all', title: 'Tüm Branşlar', icon: '🏆' },
  { id: 'archery', title: 'Geleneksel Türk Okçuluğu', icon: '🏹' },
  { id: 'taekwondo', title: 'Taekwondo', icon: '🥋' },
  { id: 'tableTennis', title: 'Masa Tenisi', icon: '🏓' },
  { id: 'dart', title: 'Dart', icon: '🎯' },
  { id: 'badminton', title: 'Badminton', icon: '🏸' },
  { id: 'atletizm', title: 'Atletizm', icon: '🏃' },
  { id: 'wrestling', title: 'Bilek Güreşi', icon: '💪' },
  { id: 'gures', title: 'Güreş', icon: '🤼' },
];

// Excel dosyasındaki sayfa adlarını spor ID'leri ile eşleştirme
const sportSheetMap = {
  'GELENEKSEL TÜRK OKÇULUĞU': 'archery',
  'DART': 'dart',
  'TAEKWONDO': 'taekwondo',
  'MASA TENİSİ': 'tableTennis',
  'BADMİNTON': 'badminton',
  'ATLETİZM': 'atletizm',
  'BİLEK GÜREŞİ': 'wrestling',
  'GÜREŞ': 'gures'
};

// Excel sayfalarındaki verileri işleme
const processSheetData = (sheetName, data) => {
  // Boş satırları filtrele
  const rows = data.filter(row => row.length > 0);
  let startIndex = 0;
  let results = [];
  
  // Gerçek veri başlangıcını bul
  for (let i = 0; i < rows.length; i++) {
    if (Array.isArray(rows[i]) && rows[i].includes('DERECE')) {
      startIndex = i + 1;
      break;
    }
  }

  // Taekwondo için özel işleme
  if (sheetName === 'TAEKWONDO') {
    results = rows.slice(startIndex)
      .filter(row => row.length >= 5 && row[0] && row[0] !== '')
      .filter(row => row[1] && row[1] !== 'AD/SOYAD' && row[1] !== 'OKUL ADI')
      .map(row => ({
        sport: 'taekwondo',
        rank: row[0],
        name: row[1] || '',
        school: row[2] || '',
        weight: row[3] || '',
        category: row[4] || '',
        isTeam: false
      }));
      
    // Taekwondo takım tasnifi için
    const teamSections = [];
    for (let i = 0; i < rows.length; i++) {
      if (Array.isArray(rows[i]) && rows[i].some(cell => cell && cell.toString().includes('TAKIM TASNİFİ'))) {
        teamSections.push(i);
      }
    }
    
    // Her takım tasnifi bölümünü işle
    teamSections.forEach(sectionIndex => {
      let teamCategory = '';
      // Kategori bilgisini al
      for (let i = sectionIndex; i < sectionIndex + 5; i++) {
        if (i < rows.length && rows[i].includes('KATEGORİ')) {
          teamCategory = rows[i][2] || '';
          break;
        }
      }
      
      // Takım verilerini ekle
      for (let i = sectionIndex + 2; i < rows.length; i++) {
        if (!rows[i] || rows[i].length < 2 || !rows[i][0]) break;
        if (rows[i][0] === 'DERECE' || isNaN(rows[i][0])) continue;
        
        results.push({
          sport: 'taekwondo',
          rank: rows[i][0],
          name: '',
          school: rows[i][1] || '',
          category: teamCategory ? `TAKIM ${teamCategory}` : 'TAKIM GENEL',
          isTeam: true
        });
      }
    });
    
    return results;
  }
  
  // Dart için özel işleme
  if (sheetName === 'DART') {
    return rows.slice(startIndex)
      .filter(row => row.length >= 3 && row[0] && row[0] !== '')
      .map(row => ({
        sport: 'dart',
        rank: row[0],
        name: '', // Dart'ta okul takımı olarak yarışılıyor
        school: row[1] || '',
        category: row[2] || '',
        isTeam: true
      }));
  }

  // Bilek Güreşi için özel işleme
  if (sheetName === 'BİLEK GÜREŞİ') {
    results = rows.slice(startIndex)
      .filter(row => row.length >= 5 && row[0] && row[0] !== '')
      .filter(row => !row.includes('TAEKWONDO') && !row.includes('TAKIM TASNİFİ'))
      .map(row => ({
        sport: 'wrestling',
        rank: row[0],
        name: row[1] || '',
        school: row[2] || '',
        weight: row[3] || '',
        category: row[4] || '',
        isTeam: false
      }));
      
    // Taekwondo takım tasnifi bölümünü bul (Bilek Güreşi sayfasında olabilir)
    const taekwondoSections = [];
    for (let i = 0; i < rows.length; i++) {
      if (Array.isArray(rows[i]) && rows[i].some(cell => cell && cell.toString().includes('TAEKWONDO TAKIM TASNİFİ'))) {
        taekwondoSections.push(i);
      }
    }
    
    // Her takım tasnifi bölümünü işle
    taekwondoSections.forEach(sectionIndex => {
      let teamCategory = '';
      // Kategori bilgisini al
      for (let i = sectionIndex; i < sectionIndex + 5; i++) {
        if (i < rows.length && rows[i].includes('KATEGORİ')) {
          teamCategory = rows[i][2] || '';
          break;
        }
      }
      
      // Takım verilerini ekle
      for (let i = sectionIndex + 2; i < rows.length; i++) {
        if (!rows[i] || rows[i].length < 2 || !rows[i][0]) break;
        if (rows[i][0] === 'DERECE' || isNaN(rows[i][0])) continue;
        
        results.push({
          sport: 'taekwondo',
          rank: rows[i][0],
          name: '',
          school: rows[i][1] || '',
          category: teamCategory ? `TAKIM ${teamCategory}` : 'TAKIM GENEL',
          isTeam: true
        });
      }
    });
    
    return results;
  }

  // Güreş için özel işleme
  if (sheetName === 'GÜREŞ') {
    results = rows.slice(startIndex)
      .filter(row => row.length >= 5 && row[0] && row[0] !== '')
      .filter(row => row[0] !== 'OKUL ADI' && row[0] !== 'PUAN')
      .map(row => {
        // Takım tasnifi satırlarını kontrol et
        if (row.includes('GÜREŞ') && row.includes('TAKIM TASNİFİ')) {
          return null; // Bu satırları atla
        }
        
        return {
          sport: 'gures',
          rank: row[0],
          name: row[1] || '',
          school: row[2] || '',
          weight: row[3] || '',
          category: row[4] || '',
          isTeam: false
        };
      })
      .filter(Boolean); // null değerleri filtrele
      
    // Güreş takım tasnifi bölümlerini bul
    const teamSections = [];
    for (let i = 0; i < rows.length; i++) {
      if (Array.isArray(rows[i]) && rows[i].some(cell => cell && cell.toString().includes('TAKIM TASNİFİ'))) {
        teamSections.push(i);
      }
    }
    
    // Her takım tasnifi bölümünü işle
    teamSections.forEach(sectionIndex => {
      let teamCategory = '';
      
      // Kategori bilgisini al
      if (rows[sectionIndex] && rows[sectionIndex].length > 0) {
        const titleText = rows[sectionIndex].join(' ');
        if (titleText.includes('GENÇLER')) {
          teamCategory = 'GENÇ ERKEK';
        } else if (titleText.includes('YILDIZLAR')) {
          teamCategory = 'YILDIZ ERKEK';
        }
      }
      
      // Takım verilerini ekle
      for (let i = sectionIndex + 2; i < rows.length; i++) {
        if (!rows[i] || rows[i].length < 2) break;
        if (isNaN(rows[i][0])) continue;
        
        results.push({
          sport: 'gures',
          rank: rows[i][0],
          name: '',
          school: rows[i][1] || '',
          category: teamCategory ? `TAKIM ${teamCategory}` : 'TAKIM GENEL',
          isTeam: true,
          puan: rows[i][2] || ''
        });
        
        if (i >= sectionIndex + 4) break; // Genellikle 3 takım gösteriliyor
      }
    });
    
    return results;
  }

  // Diğer sporlar için standart işleme
  return rows.slice(startIndex)
    .filter(row => row.length >= 4 && row[0] && row[0] !== '')
    .map(row => ({
      sport: sportSheetMap[sheetName] || 'other',
      rank: row[0],
      name: row[1] || '',
      school: row[2] || '',
      category: row[3] || '',
      isTeam: false
    }));
};

// Derece verilerini yükleme ve işleme hook'u
const useWinnersData = () => {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('all');

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/assets/derece.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, {
          cellStyles: true,
          cellDates: true,
          cellNF: true,
        });

        const allWinners = [];

        workbook.SheetNames.forEach(sheetName => {
          const upperSheetName = sheetName.toUpperCase();
          let sportId = null;
          
          // Spor ID'sini belirle
          for (const key of Object.keys(sportSheetMap)) {
            if (key.includes(upperSheetName) || upperSheetName.includes(key)) {
              sportId = sportSheetMap[key];
              break;
            }
          }
          
          if (sportId) {
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            const processedData = processSheetData(upperSheetName, data);

            if (processedData && processedData.length > 0) {
              allWinners.push({
                sport: sportId,
                data: processedData
              });
            }
          }
        });

        setWinners(allWinners);
      } catch (error) {
        console.error('Excel dosyası yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExcelData();
  }, []);

  // Seçili spora göre filtrelenmiş verileri al
  const filteredWinners = winners
    .filter(sportGroup => selectedSport === 'all' || sportGroup.sport === selectedSport)
    .flatMap(sportGroup => sportGroup.data);

  // Kategorilere göre grupla
  const categories = [...new Set(filteredWinners.map(w => w.category))].filter(Boolean);
  
  const groupedByCategory = categories.map(category => ({
    category,
    winners: filteredWinners.filter(winner => winner.category === category)
  }));

  return {
    groupedByCategory,
    selectedSport,
    setSelectedSport,
    loading
  };
};

// Spor filtresi bileşeni
const SportFilter = ({ title, icon, isActive, onClick }) => {
  return (
    <button
      className={`px-6 py-3 rounded-xl flex items-center gap-3 border-2 transition-all shadow-md text-lg font-semibold
      ${isActive ? "bg-red-500 text-white border-red-500 shadow-lg" : "bg-white text-red-500 border-transparent hover:border-red-500 hover:scale-105"}`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </button>
  );
};

// Derece kartı bileşeni
const WinnerCard = ({ rank, name, school, category, weight, isTeam, puan }) => {
  const rankColors = {
    "1": "bg-yellow-400",
    "2": "bg-gray-400",
    "3": "bg-orange-600",
    "4": "bg-gray-600",
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
      <div className="flex items-center gap-6 mb-4">
        <div className={`w-14 h-14 flex items-center justify-center text-xl font-bold text-white rounded-full shadow-md ${rankColors[rank] || "bg-gray-500"}`}>
          {rank}
        </div>
        <div className="flex-1">
          {isTeam ? (
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <span className="mr-2">🏆</span> {school}
            </h3>
          ) : (
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          )}
          {weight && !isTeam && (
            <p className="text-gray-600 text-sm">{weight}</p>
          )}
          {puan && (
            <p className="text-gray-600 text-sm font-bold">Puan: {puan}</p>
          )}
        </div>
      </div>
      {!isTeam && (
        <p className="mt-2 text-gray-700 font-medium border-t pt-3 text-sm">{school}</p>
      )}
      {isTeam && category && category.includes('TAKIM') && (
        <div className="mt-2 text-sm flex justify-center">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">Takım Sıralaması</span>
        </div>
      )}
    </div>
  );
};

// Kategori bölümü bileşeni
const CategorySection = ({ title, winners }) => {
  // Kategori takım sıralaması mı kontrol et
  const isTeamRanking = title.includes('TAKIM');
  
  return (
    <div className="my-12">
      <h2 className={`text-2xl font-bold text-gray-800 py-3 px-5 bg-white rounded-lg shadow-md border-l-8 ${isTeamRanking ? 'border-blue-500' : 'border-red-500'} w-full text-center`}>
        {isTeamRanking ? (
          <span className="flex items-center justify-center">
            <span className="mr-2">🏆</span> {title}
          </span>
        ) : (
          title
        )}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {winners.map((winner, idx) => (
          <WinnerCard key={idx} {...winner} />
        ))}
      </div>
    </div>
  );
};

// Loading spinner bileşeni
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
  </div>
);

// Ana sayfa bileşeni
const DerecePage = () => {
  const { groupedByCategory, selectedSport, setSelectedSport, loading } = useWinnersData();

  return (
    <>
      <div className="max-w-5xl mx-auto py-10 mt-10 px-4 md:px-6 lg:px-8 min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 relative inline-block">
            <span className="relative z-10">Şampiyonlar 🏆</span>
            <span className="absolute -bottom-2 left-0 right-0 h-3 bg-red-200 opacity-50 z-0"></span>
          </h1>
          <p className="text-gray-600 text-lg font-medium mt-2">
            15. İmam Hatip Spor Oyunları'nda dereceye giren başarılı sporcularımız
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sports.map((sport) => (
            <SportFilter
              key={sport.id}
              title={sport.title}
              icon={sport.icon}
              isActive={selectedSport === sport.id}
              onClick={() => setSelectedSport(sport.id)}
            />
          ))}
        </div>
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {groupedByCategory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Bu kategoride henüz sonuç bulunmamaktadır.</p>
              </div>
            ) : (
              // Önce takım olmayan kategorileri, sonra takım kategorilerini göster
              [...groupedByCategory]
                .sort((a, b) => {
                  const aIsTeam = a.category.includes('TAKIM');
                  const bIsTeam = b.category.includes('TAKIM');
                  
                  if (aIsTeam && !bIsTeam) return 1;
                  if (!aIsTeam && bIsTeam) return -1;
                  return 0;
                })
                .map(
                  (group) =>
                    group.winners.length > 0 && (
                      <CategorySection key={group.category} title={group.category} winners={group.winners} />
                    )
                )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DerecePage;