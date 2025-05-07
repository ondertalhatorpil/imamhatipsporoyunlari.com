import React from 'react';
import { FaTrophy, FaCalendarAlt, FaClock, FaVolleyballBall, FaFutbol, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { MdSportsSoccer } from 'react-icons/md';

const TournamentFinal = () => {
  const volleyballMatches = [
    {
      date: '08.05.2025',
      category: 'GENÇ KIZ',
      venue: 'Cevizlibağ Atatürk Öğrenci Yurdu',
      matches: [
        {
          time: '10:00',
          team1: 'KARTAL MEHMET AKİF ERSOY AİHL',
          team2: 'SARIYER KIZ AİHL'
        },
        {
          time: '11:00',
          team1: 'SAMANDIRA KIZ AİHL',
          team2: 'SİLİVRİ KIZ AİHL'
        }
      ]
    },
    {
      date: '08.05.2025',
      category: 'YILDIZ KIZ',
      venue: 'Cevizlibağ Atatürk Öğrenci Yurdu',
      matches: [
        {
          time: '12:00',
          team1: 'TENZİLE ERDOĞAN İHO',
          team2: 'BAŞAKŞEHİR ŞEHİT HAKİ ARAS İHO'
        },
        {
            time: '13:00',
            team1: 'KARTAL BORSA İHO',
            team2: 'BAYRAMPAŞA MOBİL'
        }
      ]
    }
  ];

  // Past semifinal matches with results
  const pastFutsalMatches = [
    {
      date: '07.05.2025',
      category: 'GENÇ ERKEK',
      venue: 'Fatih UFSM Anadolu İmam Hatip Lisesi',
      isCompleted: true,
      matches: [
        {
          time: '10:00',
          team1: 'ÜSKÜDAR İTO MARMARA AİHL',
          team2: 'FATİH UFSM AİHL',
          score: '6 - 1'
        },
        {
          time: '11:00',
          team1: 'YAŞAR DEDEMAN AİHL',
          team2: 'YAVUZ BAHADIROĞLU AİHL',
          score: '9 - 1'
        }
      ]
    },
    {
      date: '07.05.2025',
      category: 'YILDIZ ERKEK',
      venue: 'Fatih UFSM Anadolu İmam Hatip Lisesi',
      isCompleted: true,
      matches: [
        {
          time: '12:00',
          team1: 'BAKIRKÖY ŞEHİT MUHAMMET AMBAR İHO',
          team2: 'ANAFARTALAR İHO',
          score: '5 - 1'
        },
        {
          time: '13:00',
          team1: 'BEYLİKDÜZÜ ŞEHİT ABDULLAH TAYYİP OLÇOK İHO',
          team2: 'ŞEHİT MUSTAFA KAYMAKÇI İHO',
          score: '6 - 3'
        }
      ]
    }
  ];

  // Final and 3rd place matches
  const finalFutsalMatches = [
    {
      date: '08.05.2025',
      category: 'YILDIZ ERKEK',
      venue: 'Bağcılar Çok Amaçlı Spor Salonu',
      matches: [
        {
          time: '10:00',
          title: '3.LÜK MAÇI',
          team1: 'ANAFARTALAR İHO',
          team2: 'ŞEHİT MUSTAFA KAYMAKÇI İHO'
        },
        {
          time: '11:00',
          title: 'FİNAL MAÇI',
          team1: 'BAKIRKÖY ŞEHİT MUHAMMET AMBAR İHO',
          team2: 'BEYLİKDÜZÜ ŞEHİT ABDULLAH TAYYİP OLÇOK İHO'
        }
      ]
    },
    {
      date: '08.05.2025',
      category: 'GENÇ ERKEK',
      venue: 'Bağcılar Çok Amaçlı Spor Salonu',
      matches: [
        {
          time: '12:00',
          title: '3.LÜK MAÇI',
          team1: 'FATİH UFSM AİHL',
          team2: 'YAVUZ BAHADIROĞLU AİHL'
        },
        {
          time: '13:00',
          title: 'FİNAL MAÇI',
          team1: 'ÜSKÜDAR İTO MARMARA AİHL',
          team2: 'YAŞAR DEDEMAN AİHL'
        }
      ]
    }
  ];

  const MatchCard = ({ match, sport, isCompleted = false }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-3 sm:px-6 py-3 sm:py-4 mb-3">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Time */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2">
          <div className="flex items-center gap-1.5 bg-[#E84049] text-white px-3 py-1 rounded-lg text-sm">
            <FaClock className="text-sm" />
            <span>{match.time}</span>
          </div>
          {match.title && (
            <div className="flex items-center gap-1.5 bg-[#333] text-white px-3 py-1 rounded-lg text-sm ml-2">
              {match.title}
            </div>
          )}
          {sport === 'volleyball' ? (
            <FaVolleyballBall className="text-[#E84049] text-lg sm:hidden" />
          ) : (
            <FaFutbol className="text-[#E84049] text-lg sm:hidden" />
          )}
          {sport === 'volleyball' ? (
            <FaVolleyballBall className="text-[#E84049] text-lg hidden sm:block" />
          ) : (
            <FaFutbol className="text-[#E84049] text-lg hidden sm:block" />
          )}
        </div>
        
        {/* Teams */}
        <div className="w-full sm:flex-1 flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:flex-1 text-center sm:text-left text-sm sm:text-base font-medium text-gray-900 break-words">
            {match.team1}
          </div>
          
          <div className="flex items-center justify-center">
            {isCompleted && match.score ? (
              <div className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                {match.score}
              </div>
            ) : (
              <div className="bg-[#E84049] text-white px-3 py-1 rounded-md text-sm font-medium">
                VS
              </div>
            )}
          </div>
          
          <div className={`w-full sm:flex-1 text-center sm:text-right text-sm sm:text-base font-medium break-words ${
            match.team2 === 'RAKİP BEKLENİYOR...' ? 'text-[#E84049] italic' : 'text-gray-900'
          }`}>
            {match.team2}
          </div>
        </div>
      </div>
    </div>
  );

  const SportSection = ({ title, icon, sport, completedMatches, upcomingMatches }) => (
    <div className="mb-10 sm:mb-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E84049] flex items-center justify-center">
            {React.cloneElement(icon, { className: 'text-white text-lg sm:text-xl' })}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#E84049]">{title}</h2>
        </div>
      </div>
      
      {/* Past matches section */}
      {completedMatches && completedMatches.length > 0 && (
        <div className="mb-8 sm:mb-12">
          <div className="relative inline-block mb-6">
            <h3 className="text-xl font-bold text-gray-800 relative z-10">
              YARI FİNAL SONUÇLARI
            </h3>
            <div className="absolute -bottom-1 left-0 w-full h-2 bg-[#E84049] opacity-10 rounded-md transform -skew-x-6 z-0"></div>
          </div>
          
          {completedMatches.map((matchDay, idx) => (
            <div key={idx} className="mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <div className="bg-[#E84049] bg-opacity-5 rounded-md px-3 py-1.5 flex items-center gap-1.5">
                  <FaCalendarAlt className="text-[#fff] text-sm" />
                  <span className="text-sm font-bold text-[#fff]">{matchDay.date}</span>
                </div>
                <div className="h-1 w-8 bg-[#E84049] bg-opacity-30 hidden sm:block"></div>
                <span className="bg-[#E84049] text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-bold shadow-md">
                  {matchDay.category}
                </span>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-[#E84049] border-opacity-20 px-3 py-2 mb-4 sm:mb-6">
                <div className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-[#E84049] text-sm flex-shrink-0" />
                  <span className="text-sm text-[#E84049] font-bold">{matchDay.venue}</span>
                </div>
              </div>
              
              <div>
                {matchDay.matches.map((match, mIdx) => (
                  <MatchCard key={mIdx} match={match} sport={sport} isCompleted={true} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Upcoming matches section */}
      {upcomingMatches && upcomingMatches.length > 0 && (
        <div>
          <div className="relative inline-block mb-6">
            <h3 className="text-xl font-bold text-gray-800 relative z-10">
              {title === "FUTSAL" ? "FİNAL MAÇLARI" : "YARI FİNALLER"}
            </h3>
            <div className="absolute -bottom-1 left-0 w-full h-2 bg-[#E84049] opacity-10 rounded-md transform -skew-x-6 z-0"></div>
          </div>
          
          {upcomingMatches.map((matchDay, idx) => (
            <div key={idx} className="mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <div className="bg-[#E84049] bg-opacity-5 rounded-md px-3 py-1.5 flex items-center gap-1.5">
                  <FaCalendarAlt className="text-[#fff] text-sm" />
                  <span className="text-sm font-bold text-[#fff]">{matchDay.date}</span>
                </div>
                <div className="h-1 w-8 bg-[#E84049] bg-opacity-30 hidden sm:block"></div>
                <span className="bg-[#E84049] text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-bold shadow-md">
                  {matchDay.category}
                </span>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-[#E84049] border-opacity-20 px-3 py-2 mb-4 sm:mb-6">
                <div className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-[#E84049] text-sm flex-shrink-0" />
                  <span className="text-sm text-[#E84049] font-bold">{matchDay.venue}</span>
                </div>
              </div>
              
              <div>
                {matchDay.matches.map((match, mIdx) => (
                  <MatchCard key={mIdx} match={match} sport={sport} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-6 lg:px-8 mt-12 sm:mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 sm:-translate-y-10">
            <FaTrophy className="text-yellow-400 text-3xl sm:text-5xl animate-bounce" />
          </div>
          
          <div className="relative inline-block mt-6 sm:mt-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-[#E84049] mb-3 sm:mb-6 relative z-10">
              İMAM HATİP SPOR OYUNLARI
            </h1>
            <div className="absolute -bottom-1 left-0 w-full h-3 sm:h-4 bg-[#E84049] opacity-10 rounded-md transform -skew-x-6 z-0"></div>
          </div>
        </div>

        {/* Futsal Section */}
        <SportSection 
          title="FUTSAL"
          icon={<MdSportsSoccer className="text-white text-lg sm:text-xl" />}
          sport="futsal"
          completedMatches={pastFutsalMatches}
          upcomingMatches={finalFutsalMatches}
        />

        {/* Voleybol Section */}
        <SportSection 
          title="VOLEYBOL" 
          icon={<FaVolleyballBall className="text-white text-lg sm:text-xl" />}
          sport="volleyball"
          upcomingMatches={volleyballMatches}
        />

      </div>
    </div>
  );
};

export default TournamentFinal;