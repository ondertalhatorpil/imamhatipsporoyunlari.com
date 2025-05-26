import React, { useState, useEffect } from "react";

// Spor dalları tanımı
const sports = [
  { id: 'archery', title: 'Okçuluk', icon: '🏹' },
  { id: 'badminton', title: 'Badminton', icon: '🏸' },
  { id: 'atletizm', title: 'Atletizm', icon: '🏃' },
  { id: 'taekwondo', title: 'Taekwondo', icon: '🥋' },
  { id: 'tableTennis', title: 'Masa Tenisi', icon: '🏓' },
  { id: 'dart', title: 'Dart', icon: '🎯' },
  { id: 'wrestling', title: 'Bilek Güreşi', icon: '💪' },
  { id: 'gures', title: 'Güreş', icon: '🤼' },
  { id: 'basketbol', title: '3x3 Basketbol', icon: '🏀' },
  { id: 'futsal', title: 'Futsal', icon: '⚽' },
  { id: 'voleybol', title: 'Voleybol', icon: '🏐' },

];

const DerecePage = () => {
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('archery');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    // Tüm verileri direkt olarak yüklüyoruz
    const loadStaticData = () => {
      setLoading(true);

      // CSV verilerini doğrudan burada tanımlayalım
      const combinedData = [
        ...getAtletizmData(),
        ...getBadmintonData(),
        ...getBilekGuresiData(),
        ...getDartData(),
        ...getGuresData(),
        ...getMasaTenisiData(),
        ...getOkculukData(),
        ...getTaekwondoData(),
        ...getBasketbolData(),
        ...getFutsalData(),
        ...getVoleyballData()
      ];

      setAllResults(combinedData);
      setLoading(false);
    };

    loadStaticData();
  }, []);

  // Toplam sayfa sayısını hesapla
  useEffect(() => {
    const filteredData = selectedSport === 'all'
      ? allResults
      : allResults.filter(item => item.sport === selectedSport);

    const categories = [...new Set(filteredData.map(item => item.category))].filter(Boolean);
    setTotalPages(Math.max(1, Math.ceil(categories.length / ITEMS_PER_PAGE)));
    setCurrentPage(1); // Filtre değiştiğinde ilk sayfaya dön
  }, [selectedSport, allResults]);

  // Filtrelenmiş ve sayfalandırılmış verileri hesapla
  const getFilteredAndPaginatedData = () => {
    // Spor türüne göre filtrele
    const filteredData = selectedSport === 'all'
      ? allResults
      : allResults.filter(item => item.sport === selectedSport);

    // Kategorilere göre grupla
    const categories = [...new Set(filteredData.map(item => item.category))].filter(Boolean);
    const grouped = categories.map(category => ({
      category,
      winners: filteredData.filter(item => item.category === category)
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

  // Sayfa değiştirme fonksiyonu
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  // CSV verilerini doğrudan tanımlayan fonksiyonlar

  // Atletizm verileri
  const getAtletizmData = () => [
    { rank: "1", name: "SEFA KARAKAYA", school: "HACI OSMAN TORUN AİHL", category: "GENÇ ERKEKLER", sport: "atletizm" },
    { rank: "2", name: "BATUHAN KARAHAN", school: "TOKİ ALİYA İZZET BEGOVİÇ AİHL", category: "GENÇ ERKEKLER", sport: "atletizm" },
    { rank: "3", name: "BEDRETTİN ALALI", school: "İZZET ÜNVER AİHL", category: "GENÇ ERKEKLER", sport: "atletizm" },
    { rank: "4", name: "SAMET MEMEDOĞLU", school: "İHSAN NAKİPOĞLU AİHL", category: "GENÇ ERKEKLER", sport: "atletizm" },
    { rank: "1", name: "EYMEN ARSLANTÜRK", school: "BAHÇELİEVLER ŞEHİT MAHİR AYABAK İHO", category: "YILDIZ ERKEKLER", sport: "atletizm" },
    { rank: "2", name: "MUHAMMED ALPEREN ÖZLÜ", school: "SULTANBEYLİ ANAFARTALAR İHO", category: "YILDIZ ERKEKLER", sport: "atletizm" },
    { rank: "3", name: "ALAZAL ASALI", school: "MEHMETÇİK İHO", category: "YILDIZ ERKEKLER", sport: "atletizm" },
    { rank: "4", name: "MHD GHAITH AUAAFARI", school: "SULTANBEYLİ ANAFARTALAR İHO", category: "YILDIZ ERKEKLER", sport: "atletizm" },
    { rank: "1", name: "MUHAMMED YUSUF BİÇER", school: "SULTANBEYLİ ANAFARTALAR İHO", category: "KÜÇÜK ERKEKLER", sport: "atletizm" },
    { rank: "2", name: "EMİRHAN ŞENOL", school: "SULTANBEYLİ ANAFARTALAR İHO", category: "KÜÇÜK ERKEKLER", sport: "atletizm" },
    { rank: "3", name: "MUHAMMED ARDA TATLI", school: "SULTANBEYLİ ANAFARTALAR İHO", category: "KÜÇÜK ERKEKLER", sport: "atletizm" },
    { rank: "4", name: "VERD MASRI", school: "SULTANBEYLİ ANAFARTALAR İHO", category: "KÜÇÜK ERKEKLER", sport: "atletizm" }
  ];

  const getFutsalData = () => [
    // Genç Erkek Takım Tasnifi
    { rank: "1", name: "", school: "ÜSKÜDAR İTO MARMARA AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, sport: "futsal" },
    { rank: "2", name: "", school: "SARIYER YAŞAR DEDEMAN AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, sport: "futsal" },
    { rank: "3", name: "", school: "FATİH UFSM AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, sport: "futsal" },

    // Yıldız Erkek Takım Tasnifi
    { rank: "1", name: "", school: "BEYLİKDÜZÜ ŞEHİT ABDULLAH TAYYİP OLÇOK İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "futsal" },
    { rank: "2", name: "", school: "BAKIRKÖY ŞEHİT MUHAMMET AMBAR İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "futsal" },
    { rank: "3", name: "", school: "SULTANBEYLİ ANAFARTALAR İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "futsal" },
  ];

  const getVoleyballData = () => [
    // Genç Kız Takım Tasnifi
    { rank: "1", name: "", school: "SANCAKTEPE SAMANDIRA KIZ AİHL", category: "TAKIM GENÇ KIZ", isTeam: true, sport: "voleybol" },
    { rank: "2", name: "", school: "KARTAL MEHMET AKİF ERSOY AİHL", category: "TAKIM GENÇ KIZ", isTeam: true, sport: "voleybol" },
    { rank: "3", name: "", school: "SİLİVRİ KIZ AİHL", category: "TAKIM GENÇ KIZ", isTeam: true, sport: "voleybol" },

    // Yıldız Kız Takım Tasnifi
    { rank: "1", name: "", school: "BAŞAKŞEHİR ŞEHİT HAKİ ARAS İHL", category: "TAKIM YILDIZ KIZ", isTeam: true, sport: "voleybol" },
    { rank: "2", name: "", school: "KARTAL BORSA İSTANBUL İHO", category: "TAKIM YILDIZ KIZ", isTeam: true, sport: "voleybol" },
    { rank: "3", name: "", school: "BAYRAMPAŞA MOBİL İHO", category: "TAKIM YILDIZ KIZ", isTeam: true, sport: "voleybol" },
  ];

  // Badminton verileri
  const getBadmintonData = () => [
    { rank: "1", name: "RANA ATİK", school: "TOKİ GÜNEŞPARKEVLERİ KIZ AİHL", category: "GENÇ KIZLAR", sport: "badminton" },
    { rank: "2", name: "AYİŞAH AYAZ", school: "Üsküdar Mihribah Sultan KAİHL", category: "GENÇ KIZLAR", sport: "badminton" },
    { rank: "3", name: "ESMANUR TOPKAYA", school: "Üsküdar Mihribah Sultan KAİHL", category: "GENÇ KIZLAR", sport: "badminton" },
    { rank: "4", name: "İCLAL KÜLÜNOĞLU", school: "ŞEHİT EROL İNCE KIZ AİHL", category: "GENÇ KIZLAR", sport: "badminton" },
    { rank: "1", name: "ZEYNEP SERRA ARSLAN", school: "TOKİ GÜNEŞPARKEVLERİ KIZ AİHL", category: "YILDIZ KIZLAR", sport: "badminton" },
    { rank: "2", name: "MELİS ECRİN DAĞDELEN", school: "TOKİ GÜNEŞPARKEVLERİ KIZ AİHL", category: "YILDIZ KIZLAR", sport: "badminton" },
    { rank: "3", name: "ZEYNEP SILA KALYONCU", school: "TOKİ GÜNEŞPARKEVLERİ KIZ AİHL", category: "YILDIZ KIZLAR", sport: "badminton" },
    { rank: "4", name: "ZÜMRA BİRİCİK", school: "ŞEHİT EROL İNCE KIZ AİHL", category: "YILDIZ KIZLAR", sport: "badminton" },
    { rank: "1", name: "MEVLÜT BERAT BAŞ", school: "GAZİOSMANPAŞA AİHL", category: "GENÇ ERKEKLER", sport: "badminton" },
    { rank: "2", name: "MAHMUT ESAT TUFAN", school: "GAZİOSMANPAŞA AİHL", category: "GENÇ ERKEKLER", sport: "badminton" },
    { rank: "3", name: "FATİH YILDIZ", school: "TOKİ ALİYA İZZET BEGOVİÇ AİHL", category: "GENÇ ERKEKLER", sport: "badminton" },
    { rank: "4", name: "ALİ BİLAL", school: "UFSM AİHL", category: "GENÇ ERKEKLER", sport: "badminton" },
    { rank: "1", name: "ABDÜLKERİM TÜRK", school: "MALTEPE SEZAİ KARAKOÇ AİHL", category: "YILDIZ ERKEKLER", sport: "badminton" },
    { rank: "2", name: "MUHAMMET EMİN AKAN", school: "MALTEPE SEZAİ KARAKOÇ AİHL", category: "YILDIZ ERKEKLER", sport: "badminton" },
    { rank: "3", name: "AMMAR KHAN", school: "MALTEPE SEZAİ KARAKOÇ AİHL", category: "YILDIZ ERKEKLER", sport: "badminton" },
    { rank: "4", name: "MİRAÇ TAHA KAÇMAZ", school: "MALTEPE SEZAİ KARAKOÇ AİHL", category: "YILDIZ ERKEKLER", sport: "badminton" }
  ];

  // Bilek Güreşi verileri
  const getBilekGuresiData = () => [
    // Yıldız Erkek Bilek Güreşi - 40 KG
    { rank: "1", name: "MİRAÇ KÜPELİOĞLU", school: "ÇAMÇEŞME İHO", category: "YILDIZ ERKEK", weight: "40 Erkek", sport: "wrestling" },
    { rank: "2", name: "AMNO FONNON", school: "ÇAMÇEŞME İHO", category: "YILDIZ ERKEK", weight: "40 Erkek", sport: "wrestling" },
    { rank: "3", name: "HÜSEYİN BURAK ÇETİNKOL", school: "İSTANBUL RTE AİHL", category: "YILDIZ ERKEK", weight: "40 Erkek", sport: "wrestling" },
    { rank: "4", name: "AHMET SELİM USTAOSMANOĞLU", school: "İSTANBUL RTE AİHL", category: "YILDIZ ERKEK", weight: "40 Erkek", sport: "wrestling" },

    // Yıldız Erkek Bilek Güreşi - 45 KG
    { rank: "1", name: "MUHAMMED BEYTER", school: "SULTANBEYLİ CAHİT ZARİFOĞLU İHO", category: "YILDIZ ERKEK", weight: "45 Erkek", sport: "wrestling" },
    { rank: "2", name: "ENSAR BAŞARAN", school: "PENDİK ÖMER NASUHİ BİLMEN İHO", category: "YILDIZ ERKEK", weight: "45 Erkek", sport: "wrestling" },
    { rank: "3", name: "BATUHAN ATALAY", school: "SULTANBEYLİ CAHİT ZARİFOĞLU İHO", category: "YILDIZ ERKEK", weight: "45 Erkek", sport: "wrestling" },
    { rank: "4", name: "SEMİH MUSTAFA AĞACA", school: "ÇAMÇEŞME İHO", category: "YILDIZ ERKEK", weight: "45 Erkek", sport: "wrestling" },

    // Yıldız Erkek Bilek Güreşi - 50 KG
    { rank: "1", name: "MUHAMMED EFE ÇİÇEK", school: "SULTANBEYLİ CAHİT ZARİFOĞLU İHO", category: "YILDIZ ERKEK", weight: "50 Erkek", sport: "wrestling" },
    { rank: "2", name: "ALAADDİN FATİH ÇAMARASI", school: "SULTANBEYLİ CAHİT ZARİFOĞLU İHO", category: "YILDIZ ERKEK", weight: "50 Erkek", sport: "wrestling" },
    { rank: "3", name: "MUHAMMED HAMZA KILIÇ", school: "ÇAMÇEŞME İHO", category: "YILDIZ ERKEK", weight: "50 Erkek", sport: "wrestling" },

    // Yıldız Erkek Bilek Güreşi - 55 KG
    { rank: "1", name: "MAHMUD SAİD AŞKBOĞA", school: "İSTANBUL RTE AİHL", category: "YILDIZ ERKEK", weight: "55 Erkek", sport: "wrestling" },
    { rank: "2", name: "MUHAMMED ALİ KAYA", school: "SULTANBEYLİ CAHİT ZARİFOĞLU İHO", category: "YILDIZ ERKEK", weight: "55 Erkek", sport: "wrestling" },
    { rank: "3", name: "FURKAN MELİH KINALI", school: "ŞEHİT MEHMET GÜDER AİHL", category: "YILDIZ ERKEK", weight: "55 Erkek", sport: "wrestling" },
    { rank: "4", name: "MAHMUD ÖZER", school: "İSTANBUL RTE AİHL", category: "YILDIZ ERKEK", weight: "55 Erkek", sport: "wrestling" },

    // Yıldız Erkek Bilek Güreşi - 60 KG
    { rank: "1", name: "BURAK ALTINER", school: "İSTANBUL RTE AİHL", category: "YILDIZ ERKEK", weight: "60 Erkek", sport: "wrestling" },
    { rank: "2", name: "METEHAN TANDOĞAN", school: "GÜNGÖREN ÖMER DİNÇER İHO", category: "YILDIZ ERKEK", weight: "60 Erkek", sport: "wrestling" },
    { rank: "3", name: "MELİK ARSLAN", school: "GÜNGÖREN ÖMER DİNÇER İHO", category: "YILDIZ ERKEK", weight: "60 Erkek", sport: "wrestling" },

    // Yıldız Erkek Bilek Güreşi - 65 KG
    { rank: "1", name: "TAHA YASİN SOYDAŞ", school: "PROFİLO BARIŞ İHO", category: "YILDIZ ERKEK", weight: "65 Erkek", sport: "wrestling" },
    { rank: "2", name: "RAİF ENSAR EKMEKÇİ", school: "PENDİK ÖMER NASUHİ BİLMEN İHO", category: "YILDIZ ERKEK", weight: "65 Erkek", sport: "wrestling" },
    { rank: "3", name: "MAHMUT KONAK", school: "CEMAL ARTÜZ İHO", category: "YILDIZ ERKEK", weight: "65 Erkek", sport: "wrestling" },
    { rank: "4", name: "HAMZA YUŞA YAŞAR", school: "ŞEHİT MEHMET GÜDER AİHL", category: "YILDIZ ERKEK", weight: "65 Erkek", sport: "wrestling" },

    // Yıldız Erkek Bilek Güreşi - 70+ KG
    { rank: "1", name: "MİRAÇ ÖZKAN", school: "ŞEHİT MEHMET GÜDER AİHL", category: "YILDIZ ERKEK", weight: "70+ Erkek", sport: "wrestling" },
    { rank: "2", name: "ÖMER SAİD GÜNDEŞ", school: "BEYOĞLU AİHL", category: "YILDIZ ERKEK", weight: "70+ Erkek", sport: "wrestling" },
    { rank: "3", name: "RECEP AYDEMİR", school: "PENDİK ÖMER NASUHİ BİLMEN İHO", category: "YILDIZ ERKEK", weight: "70+ Erkek", sport: "wrestling" },
    { rank: "4", name: "BARIŞ TÜRKDÖNMEZ", school: "BAKIRKÖY ŞEHİT MUHAMMET AMBAR İHO", category: "YILDIZ ERKEK", weight: "70+ Erkek", sport: "wrestling" },

    // Genç Erkek Bilek Güreşi - 50 KG
    { rank: "1", name: "HAMZA AKBULUT", school: "ÜSKÜDAR AİHL", category: "GENÇ ERKEK", weight: "50 Erkek", sport: "wrestling" },
    { rank: "2", name: "FURKAN BAŞIMOĞLU", school: "İSTANBUL RTE AİHL", category: "GENÇ ERKEK", weight: "50 Erkek", sport: "wrestling" },
    { rank: "3", name: "SELMAN MUSTAFA GÜÇLÜ", school: "UFSM AİHL", category: "GENÇ ERKEK", weight: "50 Erkek", sport: "wrestling" },
    { rank: "4", name: "ABDÜLKADİR MASOOB", school: "UFSM AİHL", category: "GENÇ ERKEK", weight: "50 Erkek", sport: "wrestling" },

    // Genç Erkek Bilek Güreşi - 55 KG
    { rank: "1", name: "BEDİRHAN BOZKURT", school: "İSTANBUL RTE AİHL", category: "GENÇ ERKEK", weight: "55 Erkek", sport: "wrestling" },
    { rank: "2", name: "DEVRAN KARASU", school: "KÜÇÜKKÖY AİHL", category: "GENÇ ERKEK", weight: "55 Erkek", sport: "wrestling" },
    { rank: "3", name: "UMEIR ALAM", school: "UFSM AİHL", category: "GENÇ ERKEK", weight: "55 Erkek", sport: "wrestling" },
    { rank: "4", name: "ABDULLAH TAMİNCİ", school: "ÖMER ÇAM AİHL", category: "GENÇ ERKEK", weight: "55 Erkek", sport: "wrestling" },

    // Genç Erkek Bilek Güreşi - 60 KG
    { rank: "1", name: "EYÜP ENES KAYA", school: "BEYOĞLU AİHL", category: "GENÇ ERKEK", weight: "60 Erkek", sport: "wrestling" },
    { rank: "2", name: "ABDÜLKERİM ARSLAN", school: "BEYOĞLU AİHL", category: "GENÇ ERKEK", weight: "60 Erkek", sport: "wrestling" },
    { rank: "3", name: "YUSUF ZİYA TOPALOĞLU", school: "ÖMER ÇAM AİHL", category: "GENÇ ERKEK", weight: "60 Erkek", sport: "wrestling" },
    { rank: "4", name: "ALİ İMRAN OĞUZ", school: "İSTANBUL RTE AİHL", category: "GENÇ ERKEK", weight: "60 Erkek", sport: "wrestling" },

    // Genç Erkek Bilek Güreşi - 65 KG
    { rank: "1", name: "UĞUR OFLAZ", school: "ŞEHİT MEHMET GÜDER AİHL", category: "GENÇ ERKEK", weight: "65 Erkek", sport: "wrestling" },
    { rank: "2", name: "MEVLÜT MUSTAFA AKDOĞAN", school: "ORHANGAZİ AİHL", category: "GENÇ ERKEK", weight: "65 Erkek", sport: "wrestling" },
    { rank: "3", name: "ABDULLAH İMRAN SAVAŞ", school: "ŞEHİT MEHMET GÜDER AİHL", category: "GENÇ ERKEK", weight: "65 Erkek", sport: "wrestling" },
    { rank: "4", name: "ÖZKAN TOPKAN", school: "İHSAN NAKİPOĞLU AİHL", category: "GENÇ ERKEK", weight: "65 Erkek", sport: "wrestling" },

    // Genç Erkek Bilek Güreşi - 70 KG
    { rank: "1", name: "BİLAL ÇİFTÇİ", school: "ÜSKÜDAR AİHL", category: "GENÇ ERKEK", weight: "70 Erkek", sport: "wrestling" },
    { rank: "2", name: "ZEKERİYYA SELİM AKSOY", school: "İSTANBUL RTE AİHL", category: "GENÇ ERKEK", weight: "70 Erkek", sport: "wrestling" },
    { rank: "3", name: "MUHAMMED EROL SOYLU", school: "İTO MARMARA AİHL", category: "GENÇ ERKEK", weight: "70 Erkek", sport: "wrestling" },
    { rank: "4", name: "EYÜP ENSAR GÖKSAL", school: "ŞEHİT MURAT KOCATÜRK AİHL", category: "GENÇ ERKEK", weight: "70 Erkek", sport: "wrestling" },

    // Genç Erkek Bilek Güreşi - 75 KG
    { rank: "1", name: "SEZGİN AKÇA", school: "İHSAN NAKİPOĞLU AİHL", category: "GENÇ ERKEK", weight: "75 Erkek", sport: "wrestling" },
    { rank: "2", name: "HARUN EFE ÇEÇEN", school: "İTO İBRAHİM ÇAĞLAR AİHL", category: "GENÇ ERKEK", weight: "75 Erkek", sport: "wrestling" },
    { rank: "3", name: "HÜSEYİN MURAT ÖZKUL", school: "BEYOĞLU AİHL", category: "GENÇ ERKEK", weight: "75 Erkek", sport: "wrestling" },
    { rank: "4", name: "UMUT ABDURRAHMAN", school: "UFSM AİHL", category: "GENÇ ERKEK", weight: "75 Erkek", sport: "wrestling" },

    // Genç Erkek Bilek Güreşi - 80+ KG
    { rank: "1", name: "KEMAL EYMEN TOMKUŞ", school: "İSTANBUL RTE AİHL", category: "GENÇ ERKEK", weight: "80+ Erkek", sport: "wrestling" },
    { rank: "2", name: "OĞUZHAN ULU", school: "İTO MARMARA AİHL", category: "GENÇ ERKEK", weight: "80+ Erkek", sport: "wrestling" },
    { rank: "3", name: "YUSUF BERA AKÇA", school: "ÖMER ÇAM AİHL", category: "GENÇ ERKEK", weight: "80+ Erkek", sport: "wrestling" },
    { rank: "4", name: "MUHAMMED YAHYA AKIN", school: "KADIKÖY AİHL", category: "GENÇ ERKEK", weight: "80+ Erkek", sport: "wrestling" },

    // Bilek Güreşi Takım Tasnifleri
    // Genç Erkek Takım Tasnifi
    { rank: "1", name: "", school: "İSTANBUL RTE AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, sport: "wrestling" },
    { rank: "2", name: "", school: "BEYOĞLU AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, sport: "wrestling" },
    { rank: "3", name: "", school: "ÜSKÜDAR AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, sport: "wrestling" },
    { rank: "4", name: "", school: "UFSM AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, sport: "wrestling" },

    // Yıldız Erkek Takım Tasnifi
    { rank: "1", name: "", school: "SULTANBEYLİ CAHİT ZARİFOĞLU İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "wrestling" },
    { rank: "2", name: "", school: "İSTANBUL RTE AİHL", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "wrestling" },
    { rank: "3", name: "", school: "ÇAMÇEŞME İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "wrestling" },
    { rank: "4", name: "", school: "ŞEHİT MEHMET GÜDER AİHL", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "wrestling" }
  ];
  // Dart verileri
  const getDartData = () => [
    { rank: "1", name: "", school: "PENDİK ÇAMÇEŞME İHO", category: "YILDIZ KIZ", isTeam: true, sport: "dart" },
    { rank: "2", name: "", school: "NECİP FAZIL İHO", category: "YILDIZ KIZ", isTeam: true, sport: "dart" },
    { rank: "3", name: "", school: "ŞEHİT ONBAŞI MURAT ŞENGÖZ AİHL", category: "YILDIZ KIZ", isTeam: true, sport: "dart" },
    { rank: "3", name: "", school: "BAYRAMPAŞA MOBİL İHO", category: "YILDIZ KIZ", isTeam: true, sport: "dart" },
    { rank: "1", name: "", school: "SARIYER KIZ AİHL", category: "GENÇ KIZ", isTeam: true, sport: "dart" },
    { rank: "2", name: "", school: "ŞEHİT ONBAŞI MURAT ŞENGÖZ AİHL", category: "GENÇ KIZ", isTeam: true, sport: "dart" },
    { rank: "3", name: "", school: "SULTANBEYLİ KIZ AİHL", category: "GENÇ KIZ", isTeam: true, sport: "dart" },
    { rank: "3", name: "", school: "YAŞAR ŞADİYE CİMİLLİ AİHL", category: "GENÇ KIZ", isTeam: true, sport: "dart" },
    { rank: "1", name: "", school: "ESATPAŞA AİHL", category: "YILDIZ ERKEK", isTeam: true, sport: "dart" },
    { rank: "2", name: "", school: "GÜLTEPE İHO", category: "YILDIZ ERKEK", isTeam: true, sport: "dart" },
    { rank: "3", name: "", school: "TOKİ SEYİTNİZAM Ş. SEMİH BALABAN İHO", category: "YILDIZ ERKEK", isTeam: true, sport: "dart" },
    { rank: "3", name: "", school: "İSTANBUL RECEP TAYYİP ERDOĞAN AİHL", category: "YILDIZ ERKEK", isTeam: true, sport: "dart" },
    { rank: "1", name: "", school: "UFSM AİHL", category: "GENÇ ERKEK", isTeam: true, sport: "dart" },
    { rank: "2", name: "", school: "ZEYTİNBURNU VELİEFENDİ AİHL", category: "GENÇ ERKEK", isTeam: true, sport: "dart" },
    { rank: "3", name: "", school: "KARTAL AİHL", category: "GENÇ ERKEK", isTeam: true, sport: "dart" },
    { rank: "3", name: "", school: "İTO MARMARA AİHL", category: "GENÇ ERKEK", isTeam: true, sport: "dart" }
  ];

  // Güreş verileri
  const getGuresData = () => [
    // Genç Erkek Güreş - 45 KG
    { rank: "1", name: "AİDİN KURMANALİEV", school: "FATİH UFSM AİHL", category: "GENÇ ERKEK", weight: "45 KG", sport: "gures" },
    { rank: "2", name: "İBRAHİM RIDVAN İLERİ", school: "MALTEPE ORHANGAZİ AİHL", category: "GENÇ ERKEK", weight: "45 KG", sport: "gures" },
    { rank: "3", name: "MUHAMMET ALİ ZENGİN", school: "ÖMER ÇAM AİHL", category: "GENÇ ERKEK", weight: "45 KG", sport: "gures" },
    { rank: "3", name: "MİRAÇ UZUN", school: "ÖMER ÇAM AİHL", category: "GENÇ ERKEK", weight: "45 KG", sport: "gures" },

    // Genç Erkek Güreş - 48 KG
    { rank: "1", name: "SULTAN ALMAHYO", school: "ÖMER DÖNGELOĞLU AİHL", category: "GENÇ ERKEK", weight: "48 KG", sport: "gures" },
    { rank: "2", name: "MUHAMMET FURKAN ERKAN", school: "FATİH UFSM AİHL", category: "GENÇ ERKEK", weight: "48 KG", sport: "gures" },
    { rank: "3", name: "EGEMEN KILIÇ", school: "MALTEPE ORHANGAZİ AİHL", category: "GENÇ ERKEK", weight: "48 KG", sport: "gures" },
    { rank: "3", name: "ÖMER FARUK YURT", school: "ULUSLARARASI KAPTAN AHMET ERDOĞAN AİHL", category: "GENÇ ERKEK", weight: "48 KG", sport: "gures" },

    // Genç Erkek Güreş - 51 KG
    { rank: "1", name: "MERAL SÜTÇÜ", school: "GÜNER AKIN AİHL", category: "GENÇ ERKEK", weight: "51 KG", sport: "gures" },
    { rank: "2", name: "ALİ SADİ ÇİĞDEM", school: "TOKİ ALİYA İZZETBEGOVİÇ AİHL", category: "GENÇ ERKEK", weight: "51 KG", sport: "gures" },
    { rank: "3", name: "FATİH ALNESER", school: "ÖMER DÖNGELOĞLU AİHL", category: "GENÇ ERKEK", weight: "51 KG", sport: "gures" },
    { rank: "3", name: "MUHAMMED EREN AKGÜN", school: "ULUSLARARASI KAPTAN AHMET ERDOĞAN AİHL", category: "GENÇ ERKEK", weight: "51 KG", sport: "gures" },

    // Genç Erkek Güreş - 55 KG
    { rank: "1", name: "YUSUF TOSUNCUK", school: "ÇATALCA ŞEHİT HALİL İBRAHİM GÜREL AİHL", category: "GENÇ ERKEK", weight: "55 KG", sport: "gures" },
    { rank: "2", name: "ALPEREN DAVULCU", school: "ÖMER ÇAM AİHL", category: "GENÇ ERKEK", weight: "55 KG", sport: "gures" },
    { rank: "3", name: "ZEYD SATLA", school: "ÖMER DÖNGELOĞLU AİHL", category: "GENÇ ERKEK", weight: "55 KG", sport: "gures" },
    { rank: "3", name: "MOHAMMED ADNAN", school: "ULUSLARARASI KAPTAN AHMET ERDOĞAN AİHL", category: "GENÇ ERKEK", weight: "55 KG", sport: "gures" },

    // Genç Erkek Güreş - 60 KG
    { rank: "1", name: "KHASAN GORDANOV", school: "TOKİ ALİYA İZZETBEGOVİÇ AİHL", category: "GENÇ ERKEK", weight: "60 KG", sport: "gures" },
    { rank: "2", name: "ABDUSSAMET KOÇAK", school: "ULUSLARARASI KAPTAN AHMET ERDOĞAN AİHL", category: "GENÇ ERKEK", weight: "60 KG", sport: "gures" },
    { rank: "3", name: "AHMET FARUK ÇELİK", school: "ULUSLARARASI KAPTAN AHMET ERDOĞAN AİHL", category: "GENÇ ERKEK", weight: "60 KG", sport: "gures" },
    { rank: "3", name: "YİĞİT SABAHADDİN YAVUZ", school: "TOKİ ALİYA İZZETBEGOVİÇ AİHL", category: "GENÇ ERKEK", weight: "60 KG", sport: "gures" },

    // Genç Erkek Güreş - 65 KG
    { rank: "1", name: "HAMZA ŞAHİN", school: "TOKİ ALİYA İZZETBEGOVİÇ AİHL", category: "GENÇ ERKEK", weight: "65 KG", sport: "gures" },
    { rank: "2", name: "KHALİD ACHMİZ", school: "ÖMER DÖNGELOĞLU AİHL", category: "GENÇ ERKEK", weight: "65 KG", sport: "gures" },
    { rank: "3", name: "KHUSEYN GORDANOV", school: "AKİF İNAN AİHL", category: "GENÇ ERKEK", weight: "65 KG", sport: "gures" },
    { rank: "3", name: "ALİ EYMEN KAYGISIZ", school: "TOKİ ALİYA İZZETBEGOVİÇ AİHL", category: "GENÇ ERKEK", weight: "65 KG", sport: "gures" },

    // Genç Erkek Güreş - 71 KG
    { rank: "1", name: "ÖMER FARUK GÜMÜŞ", school: "TUZLA MAHİR İZ AİHL", category: "GENÇ ERKEK", weight: "71 KG", sport: "gures" },
    { rank: "2", name: "RASİM EMRE DABAN", school: "GÜNER AKIN AİHL", category: "GENÇ ERKEK", weight: "71 KG", sport: "gures" },
    { rank: "3", name: "ÇAĞRI TİCE", school: "GÜNER AKIN AİHL", category: "GENÇ ERKEK", weight: "71 KG", sport: "gures" },
    { rank: "3", name: "ABDULLAH ESSER", school: "TOKİ ALİYA İZZETBEGOVİÇ AİHL", category: "GENÇ ERKEK", weight: "71 KG", sport: "gures" },

    // Genç Erkek Güreş - 80 KG
    { rank: "1", name: "ARDA ÇETİN", school: "GÜNER AKIN AİHL", category: "GENÇ ERKEK", weight: "80 KG", sport: "gures" },
    { rank: "2", name: "ÖMER YİĞİT ÖZ", school: "ULUSLARARASI KAPTAN AHMET ERDOĞAN AİHL", category: "GENÇ ERKEK", weight: "80 KG", sport: "gures" },
    { rank: "3", name: "AHMET MİRAÇ TOKLU", school: "FATİH UFSM AİHL", category: "GENÇ ERKEK", weight: "80 KG", sport: "gures" },
    { rank: "3", name: "YAVUZ SELİM KAYA", school: "GÜNER AKIN AİHL", category: "GENÇ ERKEK", weight: "80 KG", sport: "gures" },

    // Genç Erkek Güreş - 92 KG
    { rank: "1", name: "TUNAHAN ÇETİN", school: "GÜNER AKIN AİHL", category: "GENÇ ERKEK", weight: "92 KG", sport: "gures" },
    { rank: "2", name: "HAMZA AMİROĞLU", school: "TOKİ ALİYA İZZETBEGOVİÇ AİHL", category: "GENÇ ERKEK", weight: "92 KG", sport: "gures" },
    { rank: "3", name: "ALİM KARA", school: "MALTEPE ORHANGAZİ AİHL", category: "GENÇ ERKEK", weight: "92 KG", sport: "gures" },
    { rank: "3", name: "MUSTAFA HÜSREV KOÇOĞLU", school: "ULUSLARARASI KAPTAN AHMET ERDOĞAN AİHL", category: "GENÇ ERKEK", weight: "92 KG", sport: "gures" },

    // Genç Erkek Güreş - 110 KG
    { rank: "1", name: "MUHAMMET ALİ DEMİRCAN", school: "ULUSLARARASI KAPTAN AHMET ERDOĞAN AİHL", category: "GENÇ ERKEK", weight: "110 KG", sport: "gures" },
    { rank: "2", name: "HASAN EMRE ARDA", school: "MALTEPE ORHANGAZİ AİHL", category: "GENÇ ERKEK", weight: "110 KG", sport: "gures" },
    { rank: "3", name: "EMİRHAN ARAS", school: "AKİF İNAN AİHL", category: "GENÇ ERKEK", weight: "110 KG", sport: "gures" },
    { rank: "3", name: "MUHAMMED ŞERİF", school: "ÖMER DÖNGELOĞLU AİHL", category: "GENÇ ERKEK", weight: "110 KG", sport: "gures" },

    // Yıldız Erkek Güreş - 38 KG
    { rank: "1", name: "MUSTAFA EREN BALİ", school: "HAMİDİYE İHO", category: "YILDIZ ERKEK", weight: "38 KG", sport: "gures" },
    { rank: "2", name: "İSMAİL HAKKI PARLAR", school: "MİMAR SİNAN İHO", category: "YILDIZ ERKEK", weight: "38 KG", sport: "gures" },
    { rank: "3", name: "ZİKRULLAH PARLAR", school: "MİMAR SİNAN İHO", category: "YILDIZ ERKEK", weight: "38 KG", sport: "gures" },
    { rank: "3", name: "ALİ YAHYA ÇAĞIRTEKİN", school: "HAKKI DEMİR İHO", category: "YILDIZ ERKEK", weight: "38 KG", sport: "gures" },

    // Yıldız Erkek Güreş - 41 KG
    { rank: "1", name: "ALPARSLAN DUMAN", school: "ŞEHİT AKIN SERTÇELİK İHO", category: "YILDIZ ERKEK", weight: "41 KG", sport: "gures" },
    { rank: "2", name: "AHMET EMİN YAVUZ", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "41 KG", sport: "gures" },
    { rank: "3", name: "ÖMER FARUK YÜCEL", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "41 KG", sport: "gures" },
    { rank: "3", name: "AHMET ALİ ERSOY", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "41 KG", sport: "gures" },

    // Yıldız Erkek Güreş - 44 KG
    { rank: "1", name: "MUHAMMED BEKİR ÖZDEMİR", school: "ABDULLAH TAYYİP OLÇOK İHO", category: "YILDIZ ERKEK", weight: "44 KG", sport: "gures" },
    { rank: "2", name: "SALİH KADİR ACAR", school: "ÖMER ÇAM İHO", category: "YILDIZ ERKEK", weight: "44 KG", sport: "gures" },
    { rank: "3", name: "TARIK TANRIVERDİ", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "44 KG", sport: "gures" },
    { rank: "3", name: "ABDURRAHMAN MÜSLÜMANOĞLU", school: "HAKKI DEMİR İHO", category: "YILDIZ ERKEK", weight: "44 KG", sport: "gures" },

    // Yıldız Erkek Güreş - 48 KG
    { rank: "1", name: "YAHYA KUZEY SATIR", school: "ÖMER ÇAM İHO", category: "YILDIZ ERKEK", weight: "48 KG", sport: "gures" },
    { rank: "2", name: "ÖMER FARUK YÜKSEL", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "48 KG", sport: "gures" },
    { rank: "3", name: "MUHAMMED EREN ZEREN", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "48 KG", sport: "gures" },
    { rank: "3", name: "MUHAMMED SALİH AKBAYRAK", school: "HAKKI DEMİR İHO", category: "YILDIZ ERKEK", weight: "48 KG", sport: "gures" },

    // Yıldız Erkek Güreş - 52 KG
    { rank: "1", name: "İHSAN SELİM AYAN", school: "ABDULLAH TAYYİP OLÇOK İHO", category: "YILDIZ ERKEK", weight: "52 KG", sport: "gures" },
    { rank: "2", name: "YAĞIZ BERAT SOYLU", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "52 KG", sport: "gures" },

    // Yıldız Erkek Güreş - 57 KG
    { rank: "1", name: "YUSUF ATA MUHAMMED İSKENDER", school: "HAMİDİYE İHO", category: "YILDIZ ERKEK", weight: "57 KG", sport: "gures" },
    { rank: "2", name: "ABDULLAH ÜVEYS AKÇİÇEK", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "57 KG", sport: "gures" },
    { rank: "3", name: "FERHAT ŞAHİN", school: "ABDULLAH TAYYİP OLÇOK İHO", category: "YILDIZ ERKEK", weight: "57 KG", sport: "gures" },
    { rank: "3", name: "ÖMER TAYYİP CANOĞLU", school: "HAKKI DEMİR İHO", category: "YILDIZ ERKEK", weight: "57 KG", sport: "gures" },

    // Yıldız Erkek Güreş - 62 KG
    { rank: "1", name: "MUHAMMET ALİ ARSLAN", school: "HAMİDİYE İHO", category: "YILDIZ ERKEK", weight: "62 KG", sport: "gures" },
    { rank: "2", name: "MUHAMMED HAMZA KOYUNCU", school: "HAKKI DEMİR İHO", category: "YILDIZ ERKEK", weight: "62 KG", sport: "gures" },
    { rank: "3", name: "OWAİS HAMZA ELMAROUK", school: "HAKKI DEMİR İHO", category: "YILDIZ ERKEK", weight: "62 KG", sport: "gures" },
    { rank: "3", name: "MUHAMMED YİĞİT KÖROĞLU", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "62 KG", sport: "gures" },

    // Yıldız Erkek Güreş - 68 KG
    { rank: "1", name: "YUSUF ERİŞMİŞ", school: "MİMAR SİNAN İHO", category: "YILDIZ ERKEK", weight: "68 KG", sport: "gures" },
    { rank: "2", name: "HAMZA ALİ ÇİFTÇİ", school: "ABDULLAH TAYYİP OLÇOK İHO", category: "YILDIZ ERKEK", weight: "68 KG", sport: "gures" },
    { rank: "3", name: "MİRAÇ CAN ÇİÇEK", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "68 KG", sport: "gures" },
    { rank: "3", name: "YUSUF DEVECİOĞLU", school: "HAMİDİYE İHO", category: "YILDIZ ERKEK", weight: "68 KG", sport: "gures" },

    // Yıldız Erkek Güreş - 75 KG
    { rank: "1", name: "MUSTAFA EMİR TOYLAN", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "75 KG", sport: "gures" },
    { rank: "2", name: "EFE ZÜLFÜ ORMAN", school: "ÖMER ÇAM İHO", category: "YILDIZ ERKEK", weight: "75 KG", sport: "gures" },

    // Yıldız Erkek Güreş - 85 KG
    { rank: "1", name: "MUSTAFA SAİD GENÇTÜRK", school: "BAHÇELİEVLER YUNUS EMRE İHO", category: "YILDIZ ERKEK", weight: "85 KG", sport: "gures" },
    { rank: "2", name: "ALİ HAMZA SUAKIDAN", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "85 KG", sport: "gures" },

    // Yıldız Erkek Güreş - 100 KG
    { rank: "1", name: "ALİ FUAT KARAOSMANOĞLU", school: "U. KAPTAN AHMET ERDOĞAN İHO", category: "YILDIZ ERKEK", weight: "100 KG", sport: "gures" },
    { rank: "2", name: "TALHA OSMAN DEMİR", school: "HAKKI DEMİR İHO", category: "YILDIZ ERKEK", weight: "100 KG", sport: "gures" },

    // Takım tasnifleri
    { rank: "1", name: "", school: "ULUSLARARASI KAPTAN AHMET ERDOĞAN AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, puan: "129", sport: "gures" },
    { rank: "2", name: "", school: "TOKİ ALİYA İZZET BEGOVİÇ AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, puan: "115", sport: "gures" },
    { rank: "3", name: "", school: "ÖMER DÖNGELOĞLU AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, puan: "103", sport: "gures" },
    { rank: "1", name: "", school: "ULUSLARARASI KAPTAN AHMET ERDOĞAN İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, puan: "202", sport: "gures" },
    { rank: "2", name: "", school: "BEYLİKDÜZÜ ABDULLAH TAYYİP OLÇOK İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, puan: "95", sport: "gures" },
    { rank: "3", name: "", school: "HAKKI DEMİR İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, puan: "88", sport: "gures" }
  ];

  // Masa Tenisi verileri
  const getMasaTenisiData = () => [
    { rank: "1", name: "AYŞE NAZ ÖZGÖZ", school: "SULTANGAZİ MİMAR SİNAN KAİHL", category: "GENÇ KIZLAR", sport: "tableTennis" },
    { rank: "2", name: "ŞEVVAL SAĞIR", school: "M. EMİN SARAÇ AİHL", category: "GENÇ KIZLAR", sport: "tableTennis" },
    { rank: "3", name: "RAVİA ÖZTÜRK", school: "İBB YAVUZ SULTAN SELİM KAİHL", category: "GENÇ KIZLAR", sport: "tableTennis" },
    { rank: "4", name: "BERRA NUR ÇAFOĞLU", school: "ALİYE İZZET BEGOVİÇ KAİHL", category: "GENÇ KIZLAR", sport: "tableTennis" },
    { rank: "1", name: "ZEYNEP İREM GEZER", school: "İNTAŞ KAİHL", category: "YILDIZ KIZLAR", sport: "tableTennis" },
    { rank: "2", name: "SAVSEN AKIN", school: "KEMAL HASOĞLU İHO", category: "YILDIZ KIZLAR", sport: "tableTennis" },
    { rank: "3", name: "ESRA GÜMÜŞ", school: "SULTANGAZİ RTE KAİHL", category: "YILDIZ KIZLAR", sport: "tableTennis" },
    { rank: "4", name: "FEYZA HACITAHİROĞLU", school: "ŞEHİT ŞİRİN DİRİL KAHİL", category: "YILDIZ KIZLAR", sport: "tableTennis" },
    { rank: "1", name: "ALİ KEMAL BUCAK", school: "KADIKÖY AİHL", category: "GENÇ ERKEKLER", sport: "tableTennis" },
    { rank: "2", name: "FURKAN YILDIZLI", school: "SANCAKTEPE TEKNOLOJİ AİHL", category: "GENÇ ERKEKLER", sport: "tableTennis" },
    { rank: "3", name: "HAZEM ALİ", school: "İHSAN NAKİPOĞLU AİHL", category: "GENÇ ERKEKLER", sport: "tableTennis" },
    { rank: "4", name: "MUHAMMED BUĞRA SEZGİN", school: "ÜSKÜDAR İTO MARMARA AİHL", category: "GENÇ ERKEKLER", sport: "tableTennis" },
    { rank: "1", name: "AKİF EMRE BUCAK", school: "ÜSKÜDAR İTO MARMARA AİHL", category: "YILDIZ ERKEKLER", sport: "tableTennis" },
    { rank: "2", name: "MUHAMMED ALİ ÜNSAL", school: "SİYAVUŞPAŞA İHO", category: "YILDIZ ERKEKLER", sport: "tableTennis" },
    { rank: "3", name: "MUHAMMED TALHA VANLI", school: "KÜÇÜKÇEKMECE ŞEHİT MEHMET GÜDER AİHL", category: "YILDIZ ERKEKLER", sport: "tableTennis" },
    { rank: "4", name: "EMİR ASAF BAHTİYAR", school: "BAŞAKŞEHİR M. EMİN SARAÇ İHO", category: "YILDIZ ERKEKLER", sport: "tableTennis" }
  ];

  // Okçuluk verileri devamı
  const getOkculukData = () => [
    { rank: "1", name: "ZEYNEP MERYEM İRDAM", school: "BAŞAKŞEHİR İTO KAİHL", category: "GENÇ KIZLAR", sport: "archery" },
    { rank: "2", name: "MERYEM NUR NAZLI OKŞİT", school: "PENDİK ADİL BÜYÜKCENGİZ AİHL", category: "GENÇ KIZLAR", sport: "archery" },
    { rank: "3", name: "BEYZA AYDOĞDU", school: "BEYKOZ BOĞAZİÇİ KAİHL", category: "GENÇ KIZLAR", sport: "archery" },
    { rank: "4", name: "İCLAL HÜNA OTUR", school: "PENDİK ADİL BÜYÜKCENGİZ AİHL", category: "GENÇ KIZLAR", sport: "archery" },
    { rank: "4", name: "ZAHİDE ZEREN ŞAHİN", school: "KARTAL AİHL", category: "GENÇ KIZLAR", sport: "archery" },
    { rank: "1", name: "SARE KABA", school: "KAĞITHANE HASBAHÇE KAİHL", category: "YILDIZ KIZLAR", sport: "archery" },
    { rank: "2", name: "BETÜL MERYEM KORKMAZ", school: "GÜNGÖREN İTO KAİHL", category: "YILDIZ KIZLAR", sport: "archery" },
    { rank: "3", name: "BÜŞRA BETÜL BAFRALI", school: "ZEYTİNBURNU İSTANBUL KAİHL", category: "YILDIZ KIZLAR", sport: "archery" },
    { rank: "4", name: "ZEHRA ÇANKAYA", school: "KAĞITHANE ŞEYH ŞAMİL İHO", category: "YILDIZ KIZLAR", sport: "archery" },
    { rank: "1", name: "İSMAİL EFE", school: "MALTEPE ŞEHİT MUSTAFA KAYMAKÇI AİHL", category: "GENÇ ERKEKLER", sport: "archery" },
    { rank: "2", name: "ENES KABAOĞLU", school: "KADIKÖY ANADOLU İMAM HATİP LİSESİ", category: "GENÇ ERKEKLER", sport: "archery" },
    { rank: "3", name: "MUHAMMED DENİZ YUKA", school: "ATAŞEHİR ŞEHİT AKIN SERTÇELİK AİHL", category: "GENÇ ERKEKLER", sport: "archery" },
    { rank: "4", name: "ENES EFE", school: "ATAŞEHİR ŞEHİT AKIN SERTÇELİK AİHL", category: "GENÇ ERKEKLER", sport: "archery" },
    { rank: "1", name: "ÖMER SAİT USLU", school: "SULTANGAZİ SABRİ ÜLKER İHO", category: "YILDIZ ERKEKLER", sport: "archery" },
    { rank: "2", name: "MİRAÇ ERİŞİR", school: "SULTANBEYLİ FUAT SEZGİN ANADOLU İMAM HATİP LİSESİ", category: "YILDIZ ERKEKLER", sport: "archery" },
    { rank: "3", name: "OSMAN AHLAS SÜMER", school: "ÜMRANİYE YÜCEL ÇELİKBİLEK İHO", category: "YILDIZ ERKEKLER", sport: "archery" },
    { rank: "4", name: "ALİ ŞİMŞEK", school: "SULTANGAZİ SABRİ ÜLKER İHO", category: "YILDIZ ERKEKLER", sport: "archery" }
  ];

  // Taekwondo verileri
  const getTaekwondoData = () => [
    // Genç Kız - 42 Bayan
    { rank: "1", name: "AMİNE BERİA KARAASLAN", school: "BEYKOZ BOĞAZİÇİ KAİHL", category: "GENÇ KIZ", weight: "42 Bayan", sport: "taekwondo" },
    { rank: "2", name: "RANIM TABANNJ", school: "BEYKOZ BOĞAZİÇİ KAİHL", category: "GENÇ KIZ", weight: "42 Bayan", sport: "taekwondo" },
    { rank: "3", name: "BÜŞRA NUR GÜVENÇ", school: "KADIKÖY AHMET SANİ GEZİCİ KAİHL", category: "GENÇ KIZ", weight: "42 Bayan", sport: "taekwondo" },
    { rank: "4", name: "MELİKE ZÜMRA ÜZER", school: "ÜSKÜDAR TENZİLE ERDOĞAN KAİHL", category: "GENÇ KIZ", weight: "42 Bayan", sport: "taekwondo" },

    // Genç Kız - 46 Bayan
    { rank: "1", name: "BETÜL RANA TADIK", school: "KARTAL AİHL", category: "GENÇ KIZ", weight: "46 Bayan", sport: "taekwondo" },
    { rank: "2", name: "YÜSRA ELHUT", school: "KADIKÖY AHMET SANİ GEZİCİ KAİHL", category: "GENÇ KIZ", weight: "46 Bayan", sport: "taekwondo" },
    { rank: "3", name: "ELİF YILMAZ", school: "SANCAKTEPE RABİA KIZ AİHL", category: "GENÇ KIZ", weight: "46 Bayan", sport: "taekwondo" },

    // Genç Kız - 49 Bayan
    { rank: "1", name: "RANA GÜNOĞLU", school: "EYÜPSULTAN KAİHL", category: "GENÇ KIZ", weight: "49 Bayan", sport: "taekwondo" },
    { rank: "2", name: "AZİZE KESKİN", school: "İSTANBUL KIZ AİHL", category: "GENÇ KIZ", weight: "49 Bayan", sport: "taekwondo" },
    { rank: "3", name: "SALİHA ÇANKALOĞLU", school: "ŞEHİT MEHMET KARAASLAN AİHL", category: "GENÇ KIZ", weight: "49 Bayan", sport: "taekwondo" },
    { rank: "4", name: "SALİHA HACIOĞLU", school: "TENZİLE ERDOĞAN AİHL", category: "GENÇ KIZ", weight: "49 Bayan", sport: "taekwondo" },

    // Genç Kız - 52 Bayan
    { rank: "1", name: "NİDA NUR KÜTÜK", school: "ALİF FUAT CEBESOY KAİHL", category: "GENÇ KIZ", weight: "52 Bayan", sport: "taekwondo" },
    { rank: "2", name: "İLAYDA KILIÇASLAN", school: "İZZET ÜNVER AİHL", category: "GENÇ KIZ", weight: "52 Bayan", sport: "taekwondo" },
    { rank: "3", name: "HATİCE MİRAÇ ÖZDEN", school: "KADIKÖY AHMET SANİ GEZİCİ KAİHL", category: "GENÇ KIZ", weight: "52 Bayan", sport: "taekwondo" },
    { rank: "4", name: "ZÜMRA YILDIR", school: "ÜSKÜDAR TENZİLE ERDOĞAN KAİHL", category: "GENÇ KIZ", weight: "52 Bayan", sport: "taekwondo" },

    // Genç Kız - 55 Bayan
    { rank: "1", name: "BELİNAY SARI", school: "ÇEKMEKÖY FATMA TALİP KAHRAMAN KAİHL", category: "GENÇ KIZ", weight: "55 Bayan", sport: "taekwondo" },
    { rank: "2", name: "ELİF AYDIN", school: "HÜRRİYET KIZ AİHL", category: "GENÇ KIZ", weight: "55 Bayan", sport: "taekwondo" },
    { rank: "3", name: "BURÇAK SOYDAŞ", school: "SİLİVRİ KAİHL", category: "GENÇ KIZ", weight: "55 Bayan", sport: "taekwondo" },
    { rank: "4", name: "BÜŞRA ATAY", school: "ATAŞEHİR KAİHL", category: "GENÇ KIZ", weight: "55 Bayan", sport: "taekwondo" },

    // Genç Kız - 59 Bayan
    { rank: "1", name: "SUDENAZ TOSUN", school: "SİLİVRİ ŞEHİT EMRE SARITAŞ AİHL", category: "GENÇ KIZ", weight: "59 Bayan", sport: "taekwondo" },
    { rank: "2", name: "ELİF CEYLİN YÜKSEL", school: "BAŞAKŞEHİR Ş. HAKİ ARAS KAİHL", category: "GENÇ KIZ", weight: "59 Bayan", sport: "taekwondo" },
    { rank: "3", name: "SENANUR ÇOLAK", school: "Mimar Sinan KAİHL", category: "GENÇ KIZ", weight: "59 Bayan", sport: "taekwondo" },
    { rank: "4", name: "ÖZLEM KARATAŞ", school: "ALİBEYKÖY KIZ AİHL", category: "GENÇ KIZ", weight: "59 Bayan", sport: "taekwondo" },

    // Genç Kız - 63 Bayan
    { rank: "1", name: "ZEYNEP ÜSKÜDARLI", school: "ÇEKMEKÖY FATMA TALİP KAHRAMAN KAİHL", category: "GENÇ KIZ", weight: "63 Bayan", sport: "taekwondo" },
    { rank: "2", name: "EMİNE ABDURRAHMAN", school: "BAŞAKŞEHİR CELALETTİN ÖKTEN KAİHL", category: "GENÇ KIZ", weight: "63 Bayan", sport: "taekwondo" },
    { rank: "3", name: "ELİFNAZ ÇILGIN", school: "BEYKOZ BOĞAZİÇİ KAİHL", category: "GENÇ KIZ", weight: "63 Bayan", sport: "taekwondo" },
    { rank: "4", name: "SUDENUR KAYA", school: "ÜSKÜDAR TENZİLE ERDOĞAN KAİHL", category: "GENÇ KIZ", weight: "63 Bayan", sport: "taekwondo" },

    // Genç Kız - 68 Bayan
    { rank: "1", name: "TUBA KABA", school: "KAĞITHANE HASBAHÇE KIZ AİHL", category: "GENÇ KIZ", weight: "68 Bayan", sport: "taekwondo" },
    { rank: "2", name: "ZEYNEP ERVA AYÇE", school: "BAYRAMPAŞA ALİYA İZZET BEGOVİC KAİHL", category: "GENÇ KIZ", weight: "68 Bayan", sport: "taekwondo" },
    { rank: "3", name: "ZEYNEP SENA KARSLI", school: "KADIKÖY AHMET SANİ GEZİCİ KAİHL", category: "GENÇ KIZ", weight: "68 Bayan", sport: "taekwondo" },
    { rank: "4", name: "MARİA RASLAN", school: "FATİH KIZ AİHL", category: "GENÇ KIZ", weight: "68 Bayan", sport: "taekwondo" },

    // Genç Kız - 68+ Bayan
    { rank: "1", name: "SUKEYNA KOGAN ASLAN", school: "SULTANBEYLİ NİLÜFER HATUN KAİHL", category: "GENÇ KIZ", weight: "68+ Bayan", sport: "taekwondo" },
    { rank: "2", name: "ELİF HAMERAT", school: "Kadıköy Ahmet Sani Gezici KAİHL", category: "GENÇ KIZ", weight: "68+ Bayan", sport: "taekwondo" },
    { rank: "3", name: "ŞEVVAL KAHYA", school: "İstanbul Pendik Mehmed Zahid Kotku KAİHL", category: "GENÇ KIZ", weight: "68+ Bayan", sport: "taekwondo" },
    { rank: "4", name: "HAYRUNİSA KAPLAN", school: "SANCAKTEPE RABİA KIZ AİHL", category: "GENÇ KIZ", weight: "68+ Bayan", sport: "taekwondo" },

    // Genç Erkek - 45 Erkek
    { rank: "1", name: "ERAY KARAGÖZ", school: "TOKİ ALİYE İZZET BEGOVİÇ AİHL", category: "GENÇ ERKEK", weight: "45 Erkek", sport: "taekwondo" },

    // Genç Erkek - 51 Erkek
    { rank: "1", name: "FATİH ÖNEL", school: "PENDİK Prof.Dr.Muhammet Tayyip Okiç AİHL", category: "GENÇ ERKEK", weight: "51 Erkek", sport: "taekwondo" },
    { rank: "2", name: "MUHAMMED FATİH TEMEL", school: "TUZLA AİHL", category: "GENÇ ERKEK", weight: "51 Erkek", sport: "taekwondo" },

    // Genç Erkek - 55 Erkek
    { rank: "1", name: "İBRAHİM GENCER", school: "U. KAPTAN AHMETERDOĞAN AİHL", category: "GENÇ ERKEK", weight: "55 Erkek", sport: "taekwondo" },

    // Genç Erkek - 59 Erkek
    { rank: "1", name: "ÖMER KORKUTMUŞ", school: "KÜÇÜKKÖY AİHL", category: "GENÇ ERKEK", weight: "59 Erkek", sport: "taekwondo" },

    // Genç Erkek - 68 Erkek
    { rank: "1", name: "FURKAN KERİM ARIKAN", school: "SANCAKTEPE TEKNOLOJİ AİHL", category: "GENÇ ERKEK", weight: "68 Erkek", sport: "taekwondo" },
    { rank: "2", name: "İBRAHİM HALİL ARSLAN", school: "İZZET ÜNVER AİHL", category: "GENÇ ERKEK", weight: "68 Erkek", sport: "taekwondo" },
    { rank: "3", name: "MUHAMMED YUŞA YİĞİT", school: "ŞEHİT MUSTAFA KAYMAKÇI AİHL", category: "GENÇ ERKEK", weight: "68 Erkek", sport: "taekwondo" },

    // Genç Erkek - 73 Erkek
    { rank: "1", name: "BURAK HAMZA BAŞAR", school: "YAŞAR DEDEMAN AİHL", category: "GENÇ ERKEK", weight: "73 Erkek", sport: "taekwondo" },

    // Genç Erkek - 78+ Erkek
    { rank: "1", name: "MUHAMMED YUSUF KEMAH", school: "SELÇUK ERAYDIN AİHL", category: "GENÇ ERKEK", weight: "78+ Erkek", sport: "taekwondo" },

    // Yıldız Kız - 33 Bayan
    { rank: "1", name: "SÜMEYYE MAŞİTA YILDIRIM", school: "BAŞAKŞEHİR SELAHADDİN EYYUBİ İHO", category: "YILDIZ KIZ", weight: "33 Bayan", sport: "taekwondo" },
    { rank: "2", name: "FATMANAZ SAĞIROĞLU", school: "GÜNGÖREN İHO", category: "YILDIZ KIZ", weight: "33 Bayan", sport: "taekwondo" },
    { rank: "3", name: "SAMA SHENDY", school: "NESLİŞAH KAİHL", category: "YILDIZ KIZ", weight: "33 Bayan", sport: "taekwondo" },
    { rank: "4", name: "ZÜLAL ORHAN", school: "ZEYTİNBURNU KAİHL", category: "YILDIZ KIZ", weight: "33 Bayan", sport: "taekwondo" },

    // Yıldız Kız - 37 Bayan
    { rank: "1", name: "KEVSER BAYVARİS", school: "KAZLIÇEŞME ABAY KAİHL", category: "YILDIZ KIZ", weight: "37 Bayan", sport: "taekwondo" },
    { rank: "2", name: "CEMRE DİKMEN", school: "HÜRRİYET KIZ AİHL", category: "YILDIZ KIZ", weight: "37 Bayan", sport: "taekwondo" },
    { rank: "3", name: "SÜMEYYE YILMAZ", school: "OSMANGAZİ İHO", category: "YILDIZ KIZ", weight: "37 Bayan", sport: "taekwondo" },
    { rank: "4", name: "ZEYNEB RANA OKTAY", school: "İTO BAŞAKŞEHİR AİHL", category: "YILDIZ KIZ", weight: "37 Bayan", sport: "taekwondo" },

    // Yıldız Kız - 41 Bayan
    { rank: "1", name: "ZEYNEP YARICI", school: "TAHİR KAYA İHO", category: "YILDIZ KIZ", weight: "41 Bayan", sport: "taekwondo" },
    { rank: "2", name: "HATİCE KÜBRA İSLAM", school: "BEYKOZ BOĞAZİÇİ AİHL", category: "YILDIZ KIZ", weight: "41 Bayan", sport: "taekwondo" },
    { rank: "3", name: "EBRARGÜL YILMAZ", school: "OSMANGAZİ İHO", category: "YILDIZ KIZ", weight: "41 Bayan", sport: "taekwondo" },
    { rank: "4", name: "MEVA NAZ KARAKOÇ", school: "TOKİ TURGUT ÖZAL İHO", category: "YILDIZ KIZ", weight: "41 Bayan", sport: "taekwondo" },

    // Yıldız Kız - 44 Bayan
    { rank: "1", name: "BERRA AZMAN", school: "BAYRAMPAŞA ALİYA İZZET BEGOVİC KAİHL", category: "YILDIZ KIZ", weight: "44 Bayan", sport: "taekwondo" },
    { rank: "2", name: "FATMA ŞULE AZİZOĞLU", school: "ÜSKÜDAR TENZİLE ERDOĞAN KAİHL", category: "YILDIZ KIZ", weight: "44 Bayan", sport: "taekwondo" },
    { rank: "3", name: "HİRANUR ÇOLAK", school: "HÜRRİYET KIZ AİHL", category: "YILDIZ KIZ", weight: "44 Bayan", sport: "taekwondo" },
    { rank: "4", name: "HAMİYET ZEHRA MAMAÇ", school: "ŞEYH ŞAMİL İHO", category: "YILDIZ KIZ", weight: "44 Bayan", sport: "taekwondo" },

    // Yıldız Kız - 47 Bayan
    { rank: "1", name: "SARE SEVDE TÜLEK", school: "MUSTAFA YEŞİL İHO", category: "YILDIZ KIZ", weight: "47 Bayan", sport: "taekwondo" },
    { rank: "2", name: "YAREN CAN", school: "YENİBOSNA AİHL", category: "YILDIZ KIZ", weight: "47 Bayan", sport: "taekwondo" },
    { rank: "3", name: "FATİME UÇAR", school: "HÜRRİYET KIZ AİHL", category: "YILDIZ KIZ", weight: "47 Bayan", sport: "taekwondo" },
    { rank: "4", name: "ELİF ŞENTÜRK", school: "ERTUĞRUL GAZİ İHO", category: "YILDIZ KIZ", weight: "47 Bayan", sport: "taekwondo" },

    // Yıldız Kız - 51 Bayan
    { rank: "1", name: "VUSLAT BAHAR ERGÖKŞEN", school: "SİLİVRİ GAZİ İHO", category: "YILDIZ KIZ", weight: "51 Bayan", sport: "taekwondo" },
    { rank: "2", name: "ŞURA NAZ PESTİL", school: "HÜRRİYET KIZ AİHL", category: "YILDIZ KIZ", weight: "51 Bayan", sport: "taekwondo" },
    { rank: "3", name: "ESLEM KAYA", school: "HASBAHÇE KAİHL", category: "YILDIZ KIZ", weight: "51 Bayan", sport: "taekwondo" },
    { rank: "4", name: "ASİA BAKKAR", school: "MUSA EFENDİ KIZ AİHL", category: "YILDIZ KIZ", weight: "51 Bayan", sport: "taekwondo" },

    // Yıldız Kız - 55 Bayan
    { rank: "1", name: "MERVENUR ÇOLAK", school: "MİMAM SİNAN AİHL", category: "YILDIZ KIZ", weight: "55 Bayan", sport: "taekwondo" },
    { rank: "2", name: "ŞEVVAL ELA DEMİR", school: "ŞEHİT ŞİRİN DİRİL AİHL", category: "YILDIZ KIZ", weight: "55 Bayan", sport: "taekwondo" },
    { rank: "3", name: "RÜMEYSA ÇAKMAK", school: "ŞEHİT İHSAN YILDIZ İHO", category: "YILDIZ KIZ", weight: "55 Bayan", sport: "taekwondo" },
    { rank: "4", name: "DİDAR DEMİREL", school: "23 NİSAN ZEHRA HANIM İHO", category: "YILDIZ KIZ", weight: "55 Bayan", sport: "taekwondo" },

    // Yıldız Kız - 59 Bayan
    { rank: "1", name: "HİLAL YILDIZ BAYRAM", school: "İTO BAŞAKŞEHİR AİHL", category: "YILDIZ KIZ", weight: "59 Bayan", sport: "taekwondo" },
    { rank: "2", name: "BEYZA BALKAN", school: "FATİH GAZİ İHO", category: "YILDIZ KIZ", weight: "59 Bayan", sport: "taekwondo" },
    { rank: "3", name: "HÜMEYRA TURCAN", school: "ESENYURT HALİL FAHRİ ORMAN İHO", category: "YILDIZ KIZ", weight: "59 Bayan", sport: "taekwondo" },
    { rank: "4", name: "FATMA ZEHRA ERTÜRK", school: "SEZAİ KARAKOÇ İHO", category: "YILDIZ KIZ", weight: "59 Bayan", sport: "taekwondo" },

    // Yıldız Kız - 59+ Bayan
    { rank: "1", name: "SARE SILA YELEKOĞLU", school: "KAZIM KARABEKİR AİHL", category: "YILDIZ KIZ", weight: "59+ Bayan", sport: "taekwondo" },
    { rank: "2", name: "ECRİN ASUDE YUNAL", school: "BEYKOZ BOĞAZİÇİ KAİHL", category: "YILDIZ KIZ", weight: "59+ Bayan", sport: "taekwondo" },
    { rank: "3", name: "AYŞE HÜMEYRA AKKOYUN", school: "KAĞITHANE HAMİDİYE İHO", category: "YILDIZ KIZ", weight: "59+ Bayan", sport: "taekwondo" },
    { rank: "4", name: "HATİCE GÜL KILINÇ", school: "BAŞAKŞEHİR M. EMİN SARAÇ AİHL", category: "YILDIZ KIZ", weight: "59+ Bayan", sport: "taekwondo" },

    // Yıldız Erkek - 33 Erkek
    { rank: "1", name: "YUSUF EREN GÜLTEKİN", school: "SABRİ ÜLKER İHO", category: "YILDIZ ERKEK", weight: "33 Erkek", sport: "taekwondo" },
    { rank: "2", name: "MUSTAFA TALHA CEYLAN", school: "KAYAŞEHİR ŞEYH ŞAMİL İHO", category: "YILDIZ ERKEK", weight: "33 Erkek", sport: "taekwondo" },
    { rank: "3", name: "SALİM EFE KAYA", school: "BAŞAKŞEHİR SELAHADDİN EYYUBİ İHO", category: "YILDIZ ERKEK", weight: "33 Erkek", sport: "taekwondo" },

    // Yıldız Erkek - 37 Erkek
    { rank: "1", name: "YUŞA YUNUS SEZER", school: "BAŞAKŞEHİR SELAHADDİN EYYUBİ İHO", category: "YILDIZ ERKEK", weight: "37 Erkek", sport: "taekwondo" },
    { rank: "2", name: "EMİR ASAF BAHTİYAR", school: "BAŞAKŞEHİR M.EMİN SARAÇ AİHL", category: "YILDIZ ERKEK", weight: "37 Erkek", sport: "taekwondo" },
    { rank: "3", name: "İSHAK MİRAÇ TAŞAN", school: "ANAFARTALAR İHO", category: "YILDIZ ERKEK", weight: "37 Erkek", sport: "taekwondo" },
    { rank: "4", name: "MİRZAH KELEŞOĞLU", school: "23 NİSAN ZEHRA HANIM İHO", category: "YILDIZ ERKEK", weight: "37 Erkek", sport: "taekwondo" },

    // Yıldız Erkek - 41 Erkek
    { rank: "1", name: "Muhammed Furkan Emeç", school: "SULTANGAZİ YUNUS EMRE İHO", category: "YILDIZ ERKEK", weight: "41 Erkek", sport: "taekwondo" },
    { rank: "2", name: "Muhamad Zaarour", school: "ŞEHİT ÖĞRETMEN MUSTAFA GÜMÜŞ İHO", category: "YILDIZ ERKEK", weight: "41 Erkek", sport: "taekwondo" },
    { rank: "3", name: "Yusuf Erdem Yalçıntaş", school: "Kemal Hasoğlu İHO", category: "YILDIZ ERKEK", weight: "41 Erkek", sport: "taekwondo" },
    { rank: "4", name: "Ahmet Talha Yavuz", school: "Bahçelievler 15 Temmuz şehitleri AİHL", category: "YILDIZ ERKEK", weight: "41 Erkek", sport: "taekwondo" },

    // Yıldız Erkek - 45 Erkek
    { rank: "1", name: "OSMAN NURİ ESAD ERSAN", school: "AÇIK ÖĞRETİM İMAM HATİP", category: "YILDIZ ERKEK", weight: "45 Erkek", sport: "taekwondo" },
    { rank: "2", name: "ÖMER HAMZA ERDOĞMUŞ", school: "KAĞITHANE PEOFİLO BARIŞ İHO", category: "YILDIZ ERKEK", weight: "45 Erkek", sport: "taekwondo" },
    { rank: "3", name: "AHMET FARUK YILDIRIM", school: "ŞEYH ŞAMİL İHO", category: "YILDIZ ERKEK", weight: "45 Erkek", sport: "taekwondo" },
    { rank: "4", name: "MOHAMAD AMİN ALHASAN", school: "ŞEHİT ÖĞRETMEN MUSTAFA GÜMÜŞ İHO", category: "YILDIZ ERKEK", weight: "45 Erkek", sport: "taekwondo" },

    // Yıldız Erkek - 49 Erkek
    { rank: "1", name: "SÜLEYMAN ALİ ÇAKMAK", school: "FUAT SEZGİN İHO", category: "YILDIZ ERKEK", weight: "49 Erkek", sport: "taekwondo" },
    { rank: "2", name: "MUHAMMED FATİH GÜLTEKİN", school: "TAHİR KAYA İHO", category: "YILDIZ ERKEK", weight: "49 Erkek", sport: "taekwondo" },
    { rank: "3", name: "ÖMER EFE YÜCE", school: "ŞEHİT MUHAMMET AMBAR İHO", category: "YILDIZ ERKEK", weight: "49 Erkek", sport: "taekwondo" },
    { rank: "4", name: "MERT BİLALOĞLU", school: "ESENLER 15 TEMMUZ İTO İHO", category: "YILDIZ ERKEK", weight: "49 Erkek", sport: "taekwondo" },

    // Yıldız Erkek - 53 Erkek
    { rank: "1", name: "HARUN YAHYA BORAN", school: "KÜÇÜKKÖY AİHL", category: "YILDIZ ERKEK", weight: "53 Erkek", sport: "taekwondo" },
    { rank: "2", name: "NAWWR ALSALEH ALKLEFA", school: "ŞİŞLİ YUNUS EMRE İHO", category: "YILDIZ ERKEK", weight: "53 Erkek", sport: "taekwondo" },
    { rank: "3", name: "MUSTAFA KERİM YAZICI", school: "KARTAL ŞEHİT KORAY KARACA AİHL", category: "YILDIZ ERKEK", weight: "53 Erkek", sport: "taekwondo" },
    { rank: "4", name: "MİRSAD GATTAL HAYEL", school: "Ümraniye Dudullu Amanetoğlu İHO", category: "YILDIZ ERKEK", weight: "53 Erkek", sport: "taekwondo" },

    // Yıldız Erkek - 57 Erkek
    { rank: "1", name: "MUHAMMED HALİT İNAN", school: "BAŞAKŞEHİR SELAHADDİN EYYUBİ İHO", category: "YILDIZ ERKEK", weight: "57 Erkek", sport: "taekwondo" },
    { rank: "2", name: "EYMEN ORHAN KARAGÖL", school: "ATAŞEHİR Ş. AKIN SERTÇELİK AİHL", category: "YILDIZ ERKEK", weight: "57 Erkek", sport: "taekwondo" },
    { rank: "3", name: "BERAT ATAY", school: "ÜMRANİYE FATİH İHO", category: "YILDIZ ERKEK", weight: "57 Erkek", sport: "taekwondo" },
    { rank: "4", name: "HALİL İBRAHİM DALKA", school: "SARAY AİHL", category: "YILDIZ ERKEK", weight: "57 Erkek", sport: "taekwondo" },

    // Yıldız Erkek - 61 Erkek
    { rank: "1", name: "MUHAMMED SALİH ÇOLAK", school: "SULTANGAZİ YUNUS EMRE İHO", category: "YILDIZ ERKEK", weight: "61 Erkek", sport: "taekwondo" },
    { rank: "2", name: "EBUBEKİR YILMAZ", school: "Şehit Abdullah Tayyip olçok AİHL", category: "YILDIZ ERKEK", weight: "61 Erkek", sport: "taekwondo" },
    { rank: "3", name: "ÖMER NASUH ALTIPARMAK", school: "ŞEYH ŞAMİL İHO", category: "YILDIZ ERKEK", weight: "61 Erkek", sport: "taekwondo" },
    { rank: "4", name: "MEHMED ESAD ASLAN", school: "Şehit Fatih Satır AİHL", category: "YILDIZ ERKEK", weight: "61 Erkek", sport: "taekwondo" },

    // Yıldız Erkek - 65 Erkek
    { rank: "1", name: "BERK ACAR", school: "ERTUĞRUL GAZİ İHO", category: "YILDIZ ERKEK", weight: "65 Erkek", sport: "taekwondo" },

    // Yıldız Erkek - 65+ Erkek
    { rank: "1", name: "AHMET MUSAB ÇEVRE", school: "ÜSKÜDAR İHO", category: "YILDIZ ERKEK", weight: "65+ Erkek", sport: "taekwondo" },
    { rank: "2", name: "HÜSEYİN EMİR ÇİÇEK", school: "ŞEHİT VAHİT KAŞÇIOĞLU İHO", category: "YILDIZ ERKEK", weight: "65+ Erkek", sport: "taekwondo" },

    // Takım Tasnifleri
    { rank: "1", name: "", school: "KADIKÖY AHMET SANİ GEZİCİ KAİHL", category: "TAKIM GENÇ KIZ", isTeam: true, sport: "taekwondo" },
    { rank: "2", name: "", school: "ÇEKMEKÖY FATMA TALİP KAHRAMAN KAİHL", category: "TAKIM GENÇ KIZ", isTeam: true, sport: "taekwondo" },
    { rank: "3", name: "", school: "BEYKOZ BOĞAZİÇİ KAİHL", category: "TAKIM GENÇ KIZ", isTeam: true, sport: "taekwondo" },
    { rank: "3", name: "", school: "TENZİLE ERDOĞAN KAİHL", category: "TAKIM GENÇ KIZ", isTeam: true, sport: "taekwondo" },

    { rank: "1", name: "", school: "HÜRRİYET KAİHL", category: "TAKIM YILDIZ KIZ", isTeam: true, sport: "taekwondo" },
    { rank: "2", name: "", school: "BEYKOZ BOĞAZİÇİ KAİHL", category: "TAKIM YILDIZ KIZ", isTeam: true, sport: "taekwondo" },
    { rank: "3", name: "", school: "İTO BAŞAKŞEHİR AİHL", category: "TAKIM YILDIZ KIZ", isTeam: true, sport: "taekwondo" },
    { rank: "3", name: "", school: "KAZIM KARABEKİR İHO", category: "TAKIM YILDIZ KIZ", isTeam: true, sport: "taekwondo" },

    { rank: "1", name: "", school: "SELAHADDİN EYYUBİ İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "taekwondo" },
    { rank: "2", name: "", school: "SULTANGAZİ YUNUS EMRE İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "taekwondo" },
    { rank: "3", name: "", school: "Şehit Öğretmen Mustafa Gümüş İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "taekwondo" }
  ];

  const getBasketbolData = () => [
    { rank: "1", name: "", school: "⁠Üsküdar İTO Marmara Aihl", category: "Genç Erkek", isTeam: true, sport: "basketbol" },
    { rank: "2", name: "", school: "Başakşehir Akif İnan Aihl", category: "Genç Erkek", isTeam: true, sport: "basketbol" },
    { rank: "3", name: "", school: "⁠⁠Pendik Kocayusuf Aihl", category: "Genç Erkek", isTeam: true, sport: "basketbol" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 mt-16 px-4 min-h-screen">
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
          {getFilteredAndPaginatedData().length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">Bu kategoride sonuç bulunmamaktadır.</p>
            </div>
          ) : (
            <>
              {/* Kategori Bölümleri */}
              {getFilteredAndPaginatedData().map((group, index) => (
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
                            ${winner.rank === '1' ? "bg-yellow-400" :
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
                    className={`px-4 py-2 rounded-md ${currentPage === 1
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
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages
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