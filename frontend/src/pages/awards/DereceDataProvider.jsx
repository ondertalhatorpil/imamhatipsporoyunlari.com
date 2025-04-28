// DereceDataProvider.js - Veri yönetimi için
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

export const sports = [
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

// İşleyiciler
const processors = {
  // Atletizm verilerini işleme
  atletizm: (rows) => {
    return rows
      .filter(row => Array.isArray(row) && row.length >= 4)
      .filter(row => row[0] && !isNaN(row[0]) && row[0] !== 'DERECE')
      .map(row => ({
        sport: 'atletizm',
        rank: row[0],
        name: row[1] || '',
        school: row[2] || '',
        category: row[3] || '',
      }));
  },
  
  // Badminton verilerini işleme
  badminton: (rows) => {
    return rows
      .filter(row => Array.isArray(row) && row.length >= 4)
      .filter(row => row[0] && !isNaN(row[0]) && row[0] !== 'DERECE')
      .map(row => ({
        sport: 'badminton',
        rank: row[0],
        name: row[1] || '',
        school: row[2] || '',
        category: row[3] || '',
      }));
  },
  
  // Bilek Güreşi verilerini işleme
  wrestling: (rows) => {
    const results = [];
    
    // Normal bireysel sonuçları işle
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (!Array.isArray(row) || row.length < 5) continue;
      if (row[0] && !isNaN(row[0]) && row[0] !== 'DERECE' && row[1] !== 'AD/SOYAD') {
        results.push({
          sport: 'wrestling',
          rank: row[0],
          name: row[1] || '',
          school: row[2] || '',
          weight: row[3] || '',
          category: row[4] || '',
        });
      }
    }
    
    // Takım tasnifi için
    let i = 0;
    while (i < rows.length) {
      if (Array.isArray(rows[i]) && rows[i].some(cell => cell && cell.toString().includes('TAKIM TASNİFİ'))) {
        // Kategoriyi bul
        let category = '';
        if (rows[i].join(' ').includes('GENÇ')) {
          category = 'GENÇ ERKEK';
        } else if (rows[i].join(' ').includes('YILDIZ')) {
          category = 'YILDIZ ERKEK';
        }
        
        // Takım verilerini ekle
        i += 2; // Başlıkları atla
        while (i < rows.length && rows[i] && rows[i].length > 1) {
          if (rows[i][0] && !isNaN(rows[i][0])) {
            results.push({
              sport: 'taekwondo', // Bilek güreşi sayfasında taekwondo takım tasnifi
              rank: rows[i][0],
              name: '',
              school: rows[i][1] || '',
              category: `TAKIM ${category}`,
              isTeam: true
            });
          }
          i++;
          if (i < rows.length && (!rows[i] || rows[i].length < 2)) break;
        }
      }
      i++;
    }
    
    return results;
  },
  
  // Güreş verilerini işleme
  gures: (rows) => {
    const results = [];
    
    // Normal bireysel sonuçları işle
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (!Array.isArray(row) || row.length < 5) continue;
      if (row[0] && !isNaN(row[0]) && row[0] !== 'DERECE' && row[1] !== 'OKUL ADI') {
        results.push({
          sport: 'gures',
          rank: row[0],
          name: row[1] || '',
          school: row[2] || '',
          weight: row[3] || '',
          category: row[4] || '',
        });
      }
    }
    
    // Takım tasnifi için
    let i = 0;
    while (i < rows.length) {
      if (Array.isArray(rows[i]) && rows[i].some(cell => cell && cell.toString().includes('TAKIM TASNİFİ'))) {
        // Kategoriyi bul
        let category = '';
        if (rows[i].join(' ').includes('GENÇ')) {
          category = 'GENÇ ERKEK';
        } else if (rows[i].join(' ').includes('YILDIZ')) {
          category = 'YILDIZ ERKEK';
        }
        
        // Takım verilerini ekle
        i += 2; // Başlıkları atla
        while (i < rows.length && rows[i] && rows[i].length > 1) {
          if (rows[i][0] && !isNaN(rows[i][0])) {
            results.push({
              sport: 'gures',
              rank: rows[i][0],
              name: '',
              school: rows[i][1] || '',
              category: `TAKIM ${category}`,
              isTeam: true,
              puan: rows[i][2] || ''
            });
          }
          i++;
          if (i < rows.length && (!rows[i] || rows[i].length < 2)) break;
        }
      }
      i++;
    }
    
    return results;
  },
  
  // Diğer sporlar için genel işleyici
  default: (rows, sport) => {
    return rows
      .filter(row => Array.isArray(row) && row.length >= 4)
      .filter(row => row[0] && !isNaN(row[0]) && row[0] !== 'DERECE')
      .map(row => ({
        sport,
        rank: row[0],
        name: row[1] || '',
        school: row[2] || '',
        category: row[3] || '',
      }));
  }
};

export const useWinnersData = () => {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/assets/derece.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);

        const allWinners = [];
        const sportMapping = {
          'ATLETİZM': 'atletizm',
          'BADMİNTON': 'badminton',
          'BİLEK GÜREŞİ': 'wrestling',
          'DART': 'dart',
          'GELENEKSEL TÜRK OKÇULUĞU': 'archery',
          'GÜREŞ': 'gures',
          'MASA TENİSİ': 'tableTennis',
          'TAEKWONDO': 'taekwondo'
        };

        // Her sayfayı işle
        workbook.SheetNames.forEach(sheetName => {
          // Spor türünü belirle
          let sportType = '';
          for (const key in sportMapping) {
            if (sheetName.toUpperCase().includes(key)) {
              sportType = sportMapping[key];
              break;
            }
          }
          
          if (sportType) {
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            
            // İlk veri satırını bul
            let startIndex = 0;
            for (let i = 0; i < data.length; i++) {
              if (Array.isArray(data[i]) && data[i].includes('DERECE')) {
                startIndex = i + 1;
                break;
              }
            }
            
            // Veriyi işle
            let processedData;
            if (processors[sportType]) {
              processedData = processors[sportType](data.slice(startIndex));
            } else {
              processedData = processors.default(data.slice(startIndex), sportType);
            }
            
            if (processedData && processedData.length > 0) {
              allWinners.push(...processedData);
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

  // Spor türüne göre filtreleme yap
  const filteredWinners = selectedSport === 'all' 
    ? winners 
    : winners.filter(w => w.sport === selectedSport);

  // Kategorilere göre grupla
  const categories = [...new Set(filteredWinners.map(w => w.category))].filter(Boolean);
  
  const groupedByCategory = categories.map(category => ({
    category,
    winners: filteredWinners.filter(winner => winner.category === category)
  }));

  // Sayfalama işlemi
  const categoriesPerPage = 5;
  const totalPages = Math.ceil(groupedByCategory.length / categoriesPerPage);
  
  const paginatedCategories = groupedByCategory
    .slice((currentPage - 1) * categoriesPerPage, currentPage * categoriesPerPage);

  return {
    groupedByCategory: paginatedCategories,
    selectedSport,
    setSelectedSport,
    loading,
    currentPage,
    setCurrentPage,
    totalPages
  };
};