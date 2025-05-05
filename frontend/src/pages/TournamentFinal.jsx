import React from 'react';
import { FaTrophy, FaCalendarAlt, FaClock, FaVolleyballBall, FaFutbol, FaMapMarkerAlt } from 'react-icons/fa';
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
          team2: 'RAKİP BEKLENİYOR...'
        },
        {
          time: '11:00',
          team1: 'SAMANDIRA KIZ AİHL',
          team2: 'RAKİP BEKLENİYOR...'
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
          team1: 'KARTAL BORSA İHO',
          team2: 'RAKİP BEKLENİYOR...'
        },
        {
          time: '13:00',
          team1: 'TENZİLE ERDOĞAN İHO',
          team2: 'RAKİP BEKLENİYOR...'
        }
      ]
    }
  ];

  const futsalMatches = [
    {
      date: '07.05.2025',
      category: 'GENÇ ERKEK',
      venue: 'Fatih UFSM Anadolu İmam Hatip Lisesi',
      matches: [
        {
          time: '10:00',
          team1: 'İTO MARMARA AİHL',
          team2: 'FATİH UFSM AİHL'
        },
        {
          time: '11:00',
          team1: 'YAVUZ BAHADIROĞLU AİHL',
          team2: 'YAŞAR DEDEMAN AİHL'
        }
      ]
    },
    {
      date: '07.05.2025',
      category: 'YILDIZ ERKEK',
      venue: 'Fatih UFSM Anadolu İmam Hatip Lisesi',
      matches: [
        {
          time: '12:00',
          team1: 'ANAFARTALAR İHO',
          team2: 'ŞEHİT MUHAMMET AMBAR İHO'
        },
        {
          time: '13:00',
          team1: 'MUSTAFA KAYMAKÇI İHO',
          team2: 'RAKİP BEKLENİYOR...'
        }
      ]
    }
  ];

  const MatchCard = ({ match, sport }) => (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-[#E84049] text-base sm:text-lg font-bold">
          <FaClock className="mr-1 sm:mr-2" />
          {match.time}
        </div>
        {sport === 'volleyball' ? (
          <FaVolleyballBall className="text-[#E84049] text-xl sm:text-2xl" />
        ) : (
          <FaFutbol className="text-[#E84049] text-xl sm:text-2xl" />
        )}
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
        <div className="w-full sm:flex-1 text-center">
          <div className="text-sm sm:text-lg font-semibold text-gray-800 break-words">{match.team1}</div>
        </div>
        
        <div className="mx-4 text-center">
          <div className="bg-[#E84049] text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full font-bold text-sm sm:text-base">
            VS
          </div>
        </div>
        
        <div className="w-full sm:flex-1 text-center">
          <div className={`text-sm sm:text-lg font-semibold break-words ${match.team2 === 'RAKİP BEKLENİYOR...' ? 'text-[#E84049] italic animate-pulse' : 'text-gray-800'}`}>
            {match.team2}
          </div>
        </div>
      </div>
    </div>
  );

  const SportSection = ({ title, icon, sport, matches }) => (
    <div className="mb-12 sm:mb-16">
      <div className="flex items-center mb-6 sm:mb-8">
        <div className="rounded-full bg-[#E84049] bg-opacity-10 p-3">
          {icon}
        </div>
        <h2 className="text-lg sm:text-2xl font-bold text-[#E84049] ml-2 sm:ml-3">{title}</h2>
      </div>
      
      {matches.map((matchDay, idx) => (
        <div key={idx} className="mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center mb-4 sm:mb-6 gap-2">
            <FaCalendarAlt className="text-[#E84049] mr-1 sm:mr-2 text-base sm:text-xl" />
            <span className="text-base sm:text-lg font-semibold text-[#E84049]">{matchDay.date}</span>
            <div className="hidden sm:block mx-4 h-1 w-12 bg-[#E84049] bg-opacity-30"></div>
            <span className="border-2 border-[#E84049] text-[#E84049] px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mt-2 sm:mt-0">
              {matchDay.category}
            </span>
          </div>
          
          {/* Venue Information */}
          <div className="flex items-center mb-4 pl-0 sm:pl-8">
            <FaMapMarkerAlt className="text-[#E84049] mr-2 text-base sm:text-lg flex-shrink-0" />
            <span className="text-sm sm:text-base text-gray-700 font-medium">{matchDay.venue}</span>
          </div>
          
          <div className="pl-0 sm:pl-8">
            {matchDay.matches.map((match, mIdx) => (
              <MatchCard key={mIdx} match={match} sport={sport} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 sm:-translate-y-10">
            <FaTrophy className="text-yellow-400 text-4xl sm:text-6xl animate-bounce" />
          </div>
          
          <div className="relative inline-block mt-8 sm:mt-10">
            <h1 className="text-2xl sm:text-4xl font-bold text-[#E84049] mb-4 sm:mb-6 relative z-10">
              YARI FİNALLER BAŞLIYOR
            </h1>
            <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-4 sm:h-6 bg-[#E84049] opacity-20 rounded-lg transform -skew-x-12 z-0"></div>
          </div>
        </div>

        {/* Futsal Section - Shows first since it's on May 7 */}
        <SportSection 
          title="FUTSAL YARI FİNALLER"
          icon={<MdSportsSoccer className="text-[#E84049] text-2xl sm:text-3xl" />}
          sport="futsal"
          matches={futsalMatches}
        />

        {/* Voleybol Section - Shows second since it's on May 8 */}
        <SportSection 
          title="VOLEYBOL YARI FİNALLER"
          icon={<FaVolleyballBall className="text-[#E84049] text-2xl sm:text-3xl" />}
          sport="volleyball"
          matches={volleyballMatches}
        />

      </div>
    </div>
  );
};

export default TournamentFinal;