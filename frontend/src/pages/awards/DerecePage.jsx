import React, { useState, useEffect } from "react";

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

// Derece Sayfası - Herhangi bir Excel bağımlılığı olmadan, doğrudan verileri kullanarak
const DerecePage = () => {
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('all');
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
        ...getTaekwondoData()
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
    // Yıldızlar
    { rank: "1", name: "MİRAÇ KÜPELİOĞLU", school: "ÇAMÇEŞME İHO", category: "YILDIZ ERKEK", weight: "40 Erkek", sport: "wrestling" },
    { rank: "2", name: "AMNO FONNON", school: "ÇAMÇEŞME İHO", category: "YILDIZ ERKEK", weight: "40 Erkek", sport: "wrestling" },
    { rank: "3", name: "HÜSEYİN BURAK ÇETİNKOL", school: "İSTANBUL RTE AİHL", category: "YILDIZ ERKEK", weight: "40 Erkek", sport: "wrestling" },
    { rank: "4", name: "AHMET SELİM USTAOSMANOĞLU", school: "İSTANBUL RTE AİHL", category: "YILDIZ ERKEK", weight: "40 Erkek", sport: "wrestling" },
    { rank: "1", name: "MUHAMMED BEYTER", school: "SULTANBEYLİ CAHİT ZARİFOĞLU İHO", category: "YILDIZ ERKEK", weight: "45 Erkek", sport: "wrestling" },
    { rank: "2", name: "ENSAR BAŞARAN", school: "PENDİK ÖMER NASUHİ BİLMEN İHO", category: "YILDIZ ERKEK", weight: "45 Erkek", sport: "wrestling" },
    { rank: "3", name: "BATUHAN ATALAY", school: "SULTANBEYLİ CAHİT ZARİFOĞLU İHO", category: "YILDIZ ERKEK", weight: "45 Erkek", sport: "wrestling" },
    { rank: "4", name: "SEMİH MUSTAFA AĞACA", school: "ÇAMÇEŞME İHO", category: "YILDIZ ERKEK", weight: "45 Erkek", sport: "wrestling" },
    // Gençler
    { rank: "1", name: "HAMZA AKBULUT", school: "ÜSKÜDAR AİHL", category: "GENÇ ERKEK", weight: "50 Erkek", sport: "wrestling" },
    { rank: "2", name: "FURKAN BAŞIMOĞLU", school: "İSTANBUL RTE AİHL", category: "GENÇ ERKEK", weight: "50 Erkek", sport: "wrestling" },
    { rank: "3", name: "SELMAN MUSTAFA GÜÇLÜ", school: "UFSM AİHL", category: "GENÇ ERKEK", weight: "50 Erkek", sport: "wrestling" },
    { rank: "4", name: "ABDÜLKADİR MASOOB", school: "UFSM AİHL", category: "GENÇ ERKEK", weight: "50 Erkek", sport: "wrestling" },
    // Taekwondo takım tasnifleri (Bilek güreşi sayfasındaki)
    { rank: "1", name: "", school: "İSTANBUL RTE AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, sport: "taekwondo" },
    { rank: "2", name: "", school: "BEYOĞLU AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, sport: "taekwondo" },
    { rank: "3", name: "", school: "ÜSKÜDAR AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, sport: "taekwondo" },
    { rank: "4", name: "", school: "UFSM AİHL", category: "TAKIM GENÇ ERKEK", isTeam: true, sport: "taekwondo" },
    { rank: "1", name: "", school: "SULTANBEYLİ CAHİT ZARİFOĞLU İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "taekwondo" },
    { rank: "2", name: "", school: "İSTANBUL RTE AİHL", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "taekwondo" },
    { rank: "3", name: "", school: "ÇAMÇEŞME İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "taekwondo" },
    { rank: "4", name: "", school: "ŞEHİT MEHMET GÜDER AİHL", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "taekwondo" }
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
    // Bireysel
    { rank: "1", name: "AİDİN KURMANALİEV", school: "FATİH UFSM AİHL", category: "GENÇ ERKEK", weight: "45 KG", sport: "gures" },
    { rank: "2", name: "İBRAHİM RIDVAN İLERİ", school: "MALTEPE ORHANGAZİ AİHL", category: "GENÇ ERKEK", weight: "45 KG", sport: "gures" },
    { rank: "3", name: "MUHAMMET ALİ ZENGİN", school: "ÖMER ÇAM AİHL", category: "GENÇ ERKEK", weight: "45 KG", sport: "gures" },
    { rank: "3", name: "MİRAÇ UZUN", school: "ÖMER ÇAM AİHL", category: "GENÇ ERKEK", weight: "45 KG", sport: "gures" },
    { rank: "1", name: "MUSTAFA EREN BALİ", school: "HAMİDİYE İHO", category: "YILDIZ ERKEK", weight: "38 KG", sport: "gures" },
    { rank: "2", name: "İSMAİL HAKKI PARLAR", school: "MİMAR SİNAN İHO", category: "YILDIZ ERKEK", weight: "38 KG", sport: "gures" },
    { rank: "3", name: "ZİKRULLAH PARLAR", school: "MİMAR SİNAN İHO", category: "YILDIZ ERKEK", weight: "38 KG", sport: "gures" },
    { rank: "3", name: "ALİ YAHYA ÇAĞIRTEKİN", school: "HAKKI DEMİR İHO", category: "YILDIZ ERKEK", weight: "38 KG", sport: "gures" },
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
  // Genç kızlar
  { rank: "1", name: "AMİNE BERİA KARAASLAN", school: "BEYKOZ BOĞAZİÇİ KAİHL", category: "GENÇ KIZ", weight: "42 Bayan", sport: "taekwondo" },
  { rank: "2", name: "RANIM TABANNJ", school: "BEYKOZ BOĞAZİÇİ KAİHL", category: "GENÇ KIZ", weight: "42 Bayan", sport: "taekwondo" },
  { rank: "3", name: "BÜŞRA NUR GÜVENÇ", school: "KADIKÖY AHMET SANİ GEZİCİ KAİHL", category: "GENÇ KIZ", weight: "42 Bayan", sport: "taekwondo" },
  { rank: "4", name: "MELİKE ZÜMRA ÜZER", school: "ÜSKÜDAR TENZİLE ERDOĞAN KAİHL", category: "GENÇ KIZ", weight: "42 Bayan", sport: "taekwondo" },
  // Genç erkekler
  { rank: "1", name: "ERAY KARAGÖZ", school: "TOKİ ALİYE İZZET BEGOVİÇ AİHL", category: "GENÇ ERKEK", weight: "45 Erkek", sport: "taekwondo" },
  { rank: "1", name: "FATİH ÖNEL", school: "PENDİK Prof.Dr.Muhammet Tayyip Okiç AİHL", category: "GENÇ ERKEK", weight: "51 Erkek", sport: "taekwondo" },
  { rank: "2", name: "MUHAMMED FATİH TEMEL", school: "TUZLA AİHL", category: "GENÇ ERKEK", weight: "51 Erkek", sport: "taekwondo" },
  // Yıldız kızlar
  { rank: "1", name: "SÜMEYYE MAŞİTA YILDIRIM", school: "BAŞAKŞEHİR SELAHADDİN EYYUBİ İHO", category: "YILDIZ KIZ", weight: "33 Bayan", sport: "taekwondo" },
  { rank: "2", name: "FATMANAZ SAĞIROĞLU", school: "GÜNGÖREN İHO", category: "YILDIZ KIZ", weight: "33 Bayan", sport: "taekwondo" },
  // Yıldız erkekler
  { rank: "1", name: "YUSUF EREN GÜLTEKİN", school: "SABRİ ÜLKER İHO", category: "YILDIZ ERKEK", weight: "33 Erkek", sport: "taekwondo" },
  { rank: "2", name: "MUSTAFA TALHA CEYLAN", school: "KAYAŞEHİR ŞEYH ŞAMİL İHO", category: "YILDIZ ERKEK", weight: "33 Erkek", sport: "taekwondo" },
  // Takım tasnifleri
  { rank: "1", name: "", school: "KADIKÖY AHMET SANİ GEZİCİ KAİHL", category: "TAKIM GENÇ KIZ", isTeam: true, sport: "taekwondo" },
  { rank: "2", name: "", school: "ÇEKMEKÖY FATMA TALİP KAHRAMAN KAİHL", category: "TAKIM GENÇ KIZ", isTeam: true, sport: "taekwondo" },
  { rank: "3", name: "", school: "BEYKOZ BOĞAZİÇİ KAİHL", category: "TAKIM GENÇ KIZ", isTeam: true, sport: "taekwondo" },
  { rank: "4", name: "", school: "TENZİLE ERDOĞAN KAİHL", category: "TAKIM GENÇ KIZ", isTeam: true, sport: "taekwondo" },
  { rank: "1", name: "", school: "HÜRRİYET KAİHL", category: "TAKIM YILDIZ KIZ", isTeam: true, sport: "taekwondo" },
  { rank: "2", name: "", school: "BEYKOZ BOĞAZİÇİ KAİHL", category: "TAKIM YILDIZ KIZ", isTeam: true, sport: "taekwondo" },
  { rank: "3", name: "", school: "İTO BAŞAKŞEHİR AİHL", category: "TAKIM YILDIZ KIZ", isTeam: true, sport: "taekwondo" },
  { rank: "4", name: "", school: "KAZIM KARABEKİR İHO", category: "TAKIM YILDIZ KIZ", isTeam: true, sport: "taekwondo" },
  { rank: "1", name: "", school: "SELAHADDİN EYYUBİ İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "taekwondo" },
  { rank: "2", name: "", school: "SULTANGAZİ YUNUS EMRE İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "taekwondo" },
  { rank: "3", name: "", school: "Şehit Öğretmen Mustafa Gümüş İHO", category: "TAKIM YILDIZ ERKEK", isTeam: true, sport: "taekwondo" }
];

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