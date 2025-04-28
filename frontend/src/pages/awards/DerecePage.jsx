import React from "react";
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
  
  // Gerçek veri başlangıcını bul
  for (let i = 0; i < rows.length; i++) {
    if (Array.isArray(rows[i]) && rows[i].includes('DERECE')) {
      startIndex = i + 1;
      break;
    }
  }

  // Taekwondo için özel işleme
  if (sheetName === 'TAEKWONDO') {
    return rows.slice(startIndex)
      .filter(row => row.length >= 5 && row[0] && row[0] !== '')
      .filter(row => row[1] && row[1] !== 'AD/SOYAD')
      .map(row => ({
        sport: 'taekwondo',
        rank: row[0],
        name: row[1] || '',
        school: row[2] || '',
        weight: row[3] || '',
        category: row[4] || ''
      }));
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
        category: row[2] || ''
      }));
  }

  // Bilek Güreşi için özel işleme
  if (sheetName === 'BİLEK GÜREŞİ') {
    return rows.slice(startIndex)
      .filter(row => row.length >= 5 && row[0] && row[0] !== '')
      .map(row => ({
        sport: 'wrestling',
        rank: row[0],
        name: row[1] || '',
        school: row[2] || '',
        weight: row[3] || '',
        category: row[4] || ''
      }));
  }

  // Güreş için özel işleme
  if (sheetName === 'GÜREŞ') {
    return rows.slice(startIndex)
      .filter(row => row.length >= 5 && row[0] && row[0] !== '')
      .map(row => ({
        sport: 'gures',
        rank: row[0],
        name: row[1] || '',
        school: row[2] || '',
        weight: row[3] || '',
        category: row[4] || ''
      }));
  }

  // Diğer sporlar için standart işleme
  return rows.slice(startIndex)
    .filter(row => row.length >= 4 && row[0] && row[0] !== '')
    .map(row => ({
      sport: sportSheetMap[sheetName] || 'other',
      rank: row[0],
      name: row[1] || '',
      school: row[2] || '',
      category: row[3] || ''
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
          if (Object.keys(sportSheetMap).some(key => key.includes(upperSheetName) || upperSheetName.includes(key))) {
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            
            // Spor ID'sini belirle
            const sportId = Object.keys(sportSheetMap).find(key => 
              key.includes(upperSheetName) || upperSheetName.includes(key)
            );
            
            const processedData = processSheetData(sportId || upperSheetName, data);

            if (processedData && processedData.length > 0) {
              allWinners.push({
                sport: sportSheetMap[sportId] || 'other',
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
const WinnerCard = ({ rank, name, school, category, weight }) => {
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
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600 text-sm">{weight ? `${category} - ${weight}` : category}</p>
        </div>
      </div>
      <p className="mt-2 text-gray-700 font-medium border-t pt-3 text-sm">{school}</p>
    </div>
  );
};

// Kategori bölümü bileşeni
const CategorySection = ({ title, winners }) => {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-gray-800 py-3 px-5 bg-white rounded-lg shadow-md border-l-8 border-red-500 w-full text-center">{title}</h2>
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
              groupedByCategory.map(
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