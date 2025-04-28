// DerecePage.js - Ana sayfa bileşeni
import React from "react";
import { useWinnersData, sports } from "./DereceDataProvider";

// Spor filtresi bileşeni
const SportFilter = ({ title, icon, isActive, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-xl flex items-center gap-2 border-2 transition-all shadow-sm text-md font-semibold
      ${isActive ? "bg-red-500 text-white border-red-500" : "bg-white text-red-500 border-transparent hover:border-red-500"}`}
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
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 flex items-center justify-center text-lg font-bold text-white rounded-full ${rankColors[rank] || "bg-gray-500"}`}>
          {rank}
        </div>
        <div className="flex-1">
          {isTeam ? (
            <h3 className="text-md font-semibold text-gray-800 flex items-center">
              <span className="mr-2">🏆</span> {school}
            </h3>
          ) : (
            <h3 className="text-md font-semibold text-gray-800">{name}</h3>
          )}
          {weight && !isTeam && (
            <p className="text-gray-600 text-xs">{weight}</p>
          )}
          {puan && (
            <p className="text-gray-600 text-xs font-bold">Puan: {puan}</p>
          )}
        </div>
      </div>
      {!isTeam && (
        <p className="mt-2 text-gray-700 font-medium border-t pt-2 text-xs">{school}</p>
      )}
    </div>
  );
};

// Kategori bölümü bileşeni
const CategorySection = ({ title, winners }) => {
  const isTeamRanking = title && title.includes('TAKIM');
  
  return (
    <div className="my-6">
      <h2 className={`text-xl font-bold text-gray-800 py-2 px-4 bg-white rounded-lg shadow-sm border-l-4 ${isTeamRanking ? 'border-blue-500' : 'border-red-500'} mb-4`}>
        {isTeamRanking ? (
          <span className="flex items-center">
            <span className="mr-2">🏆</span> {title}
          </span>
        ) : (
          title
        )}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {winners.map((winner, idx) => (
          <WinnerCard key={idx} {...winner} />
        ))}
      </div>
    </div>
  );
};

// Sayfalama bileşeni
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
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
        onClick={() => onPageChange(currentPage + 1)}
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
  );
};

// Ana sayfa bileşeni
const DerecePage = () => {
  const { 
    groupedByCategory, 
    selectedSport, 
    setSelectedSport,
    loading,
    currentPage,
    setCurrentPage,
    totalPages
  } = useWinnersData();

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
      
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sports.map((sport) => (
          <SportFilter
            key={sport.id}
            title={sport.title}
            icon={sport.icon}
            isActive={selectedSport === sport.id}
            onClick={() => {
              setSelectedSport(sport.id);
              setCurrentPage(1); // Sayfa değiştiğinde ilk sayfaya dön
            }}
          />
        ))}
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
        </div>
      ) : (
        <>
          {groupedByCategory.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">Bu kategoride sonuç bulunmamaktadır.</p>
            </div>
          ) : (
            <>
              {/* Bireysel kategoriler, sonra takım kategorileri şeklinde sırala */}
              {[...groupedByCategory]
                .sort((a, b) => {
                  const aIsTeam = a.category.includes('TAKIM');
                  const bIsTeam = b.category.includes('TAKIM');
                  return aIsTeam - bIsTeam;
                })
                .map((group) => (
                  <CategorySection 
                    key={group.category} 
                    title={group.category} 
                    winners={group.winners} 
                  />
                ))
              }
              
              {/* Sayfalama */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DerecePage;