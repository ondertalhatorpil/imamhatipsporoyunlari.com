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
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Time and Sport Icon */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <div className="bg-[#E84049] text-white px-3 py-1.5 rounded-lg font-medium flex items-center gap-2">
            <FaClock className="text-sm" />
            <span>{match.time}</span>
          </div>
          {sport === 'volleyball' ? (
            <FaVolleyballBall className="text-[#E84049] text-xl hidden sm:block" />
          ) : (
            <FaFutbol className="text-[#E84049] text-xl hidden sm:block" />
          )}
        </div>
        
        {/* Teams Section */}
        <div className="flex-grow flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center sm:text-left">
            <div className="text-sm sm:text-lg font-medium text-gray-900 px-2">
              {match.team1}
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <div className="bg-[#E84049] text-white px-4 py-1.5 rounded-lg font-bold text-sm sm:text-base">
              VS
            </div>
          </div>
          
          <div className="flex-1 text-center sm:text-right">
            <div className={`text-sm sm:text-lg font-medium px-2 ${match.team2 === 'RAKİP BEKLENİYOR...' ? 'text-[#E84049] italic animate-pulse' : 'text-gray-900'}`}>
              {match.team2}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SportSection = ({ title, icon, sport, matches }) => (
    <div className="mb-12 sm:mb-16">
      <div className="flex items-center mb-6 sm:mb-8 bg-[#E84049] rounded-xl p-4">
        <div className="rounded-xl bg-white bg-opacity-20 p-2.5">
          {icon}
        </div>
        <h2 className="text-lg sm:text-2xl font-bold text-white ml-3 sm:ml-4">{title}</h2>
      </div>
      
      {matches.map((matchDay, idx) => (
        <div key={idx} className="mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center mb-6 gap-3">
            <div className="flex items-center gap-2 bg-[#E84049] px-4 py-2 rounded-lg">
              <FaCalendarAlt className="text-white text-base sm:text-lg" />
              <span className="text-base sm:text-lg font-medium text-white">{matchDay.date}</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-[#E84049] bg-opacity-20"></div>
            <span className="bg-[#E84049] text-white px-4 py-2 rounded-lg text-sm sm:text-base font-medium">
              {matchDay.category}
            </span>
          </div>
          
          {/* Venue Information */}
          <div className="bg-[#E84049] rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-white text-base sm:text-lg flex-shrink-0" />
              <span className="text-sm sm:text-base text-white font-medium">{matchDay.venue}</span>
            </div>
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