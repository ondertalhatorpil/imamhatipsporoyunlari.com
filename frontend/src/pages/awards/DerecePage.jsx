import React from "react";
import Header from "../../components/common/Navbar/ResponsiveHeader";
import Footer from "../../components/common//Footer/Footer";
import { useWinnersData, sports } from "./DereceDataProvider";

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

const WinnerCard = ({ rank, name, school, category, weight }) => {
  const rankColors = {
    1: "bg-yellow-400",
    2: "bg-gray-400",
    3: "bg-orange-600",
    4: "bg-gray-600",
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

const DerecePage = () => {
  const { groupedByCategory, selectedSport, setSelectedSport } = useWinnersData();

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

        {groupedByCategory.map(
          (group) =>
            group.winners.length > 0 && (
              <CategorySection key={group.category} title={group.category} winners={group.winners} />
            )
        )}
      </div>
    </>
  );
};

export default DerecePage;
