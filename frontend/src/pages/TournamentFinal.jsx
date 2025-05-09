import React from 'react';
import { FaTrophy, FaCalendarAlt, FaClock, FaVolleyballBall, FaFutbol, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { MdSportsSoccer } from 'react-icons/md';

const TournamentFinal = () => {
  // Past volleyball semifinal matches with results
  const pastVolleyballMatches = [
    {
      date: '08.05.2025',
      category: 'GENÇ KIZ',
      venue: 'Cevizlibağ Atatürk Öğrenci Yurdu',
      isCompleted: true,
      matches: [
        {
          time: '10:00',
          team1: 'KARTAL MEHMET AKİF ERSOY AİHL',
          team2: 'SARIYER KIZ AİHL',
          score: '2 - 0'
        },
        {
          time: '11:00',
          team1: 'SAMANDIRA KIZ AİHL',
          team2: 'SİLİVRİ KIZ AİHL',
          score: '2 - 0'
        }
      ]
    },
    {
      date: '08.05.2025',
      category: 'YILDIZ KIZ',
      venue: 'Cevizlibağ Atatürk Öğrenci Yurdu',
      isCompleted: true,
      matches: [
        {
          time: '12:00',
          team1: 'BAŞAKŞEHİR ŞEHİT HAKİ ARAS İHO',
          team2: 'TENZİLE ERDOĞAN İHO',
          score: '2 - 0'
        },
        {
          time: '13:00',
          team1: 'BAYRAMPAŞA MOBİL İHO',
          team2: 'KARTAL BORSA İHO',
          score: '1 - 2'
        }
      ]
    }
  ];

  // Upcoming volleyball finals
  const upcomingVolleyballMatches = [
    {
      date: '12.05.2025',
      category: 'YILDIZ KIZ',
      venue: 'Cevizlibağ Atatürk Öğrenci Yurdu',
      matches: [
        {
          time: '10:00',
          title: '3.LÜK MAÇI',
          team1: 'TENZİLE ERDOĞAN İHO',
          team2: 'BAYRAMPAŞA İHO'
        },
        {
          time: '11:00',
          title: 'FİNAL MAÇI',
          team1: 'KARTAL BORSA İHO',
          team2: 'BAŞAKŞEHİR ŞEHİT HAKİ ARAS İHO'
        }
      ]
    },
    {
      date: '12.05.2025',
      category: 'GENÇ KIZ',
      venue: 'Cevizlibağ Atatürk Öğrenci Yurdu',
      matches: [
        {
          time: '12:00',
          title: '3.LÜK MAÇI',
          team1: 'SİLİVRİ KIZ AİHL',
          team2: 'SARIYER KIZ AİHL'
        },
        {
          time: '13:00',
          title: 'FİNAL MAÇI',
          team1: 'SAMANDIRA KIZ AİHL',
          team2: 'KARTAL MEHMET AKİF ERSOY AİHL'
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

  // Final and 3rd place matches with results
  const finalFutsalMatches = [
    {
      date: '08.05.2025',
      category: 'YILDIZ ERKEK',
      venue: 'Bağcılar Çok Amaçlı Spor Salonu',
      isCompleted: true,
      matches: [
        {
          time: '10:00',
          title: '3.LÜK MAÇI',
          team1: 'ANAFARTALAR İHO',
          team2: 'ŞEHİT MUSTAFA KAYMAKÇI İHO',
          score: '3 - 0'
        },
        {
          time: '11:00',
          title: 'FİNAL MAÇI',
          team1: 'BAKIRKÖY ŞEHİT MUHAMMET AMBAR İHO',
          team2: 'BEYLİKDÜZÜ ŞEHİT ABDULLAH TAYYİP OLÇOK İHO',
          score: '3 - 4'
        }
      ]
    },
    {
      date: '08.05.2025',
      category: 'GENÇ ERKEK',
      venue: 'Bağcılar Çok Amaçlı Spor Salonu',
      isCompleted: true,
      matches: [
        {
          time: '12:00',
          title: '3.LÜK MAÇI',
          team1: 'FATİH UFSM AİHL',
          team2: 'YAVUZ BAHADIROĞLU AİHL',
          score: 'BEKLENİYOR'
        },
        {
          time: '13:00',
          title: 'FİNAL MAÇI',
          team1: 'ÜSKÜDAR İTO MARMARA AİHL',
          team2: 'YAŞAR DEDEMAN AİHL',
          score: '8 - 2'
        }
      ]
    }
  ];

  const MatchCard = ({ match, sport, isCompleted = false }) => (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 px-3 sm:px-6 py-4 sm:py-5 mb-4 transform transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Time */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 mb-2 sm:mb-0">
          <div className="flex items-center gap-1.5 bg-[#E84049] text-white px-3 py-1.5 rounded-lg text-sm shadow-sm">
            <FaClock className="text-sm" />
            <span className="font-medium">{match.time}</span>
          </div>
          {match.title && (
            <div className="flex items-center gap-1.5 bg-[#333] text-white px-3 py-1.5 rounded-lg text-sm ml-2 shadow-sm">
              {match.title}
            </div>
          )}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 shadow-inner">
            {sport === 'volleyball' ? (
              <FaVolleyballBall className="text-[#E84049] text-lg" />
            ) : (
              <FaFutbol className="text-[#E84049] text-lg" />
            )}
          </div>
        </div>
        
        {/* Teams */}
        <div className="w-full sm:flex-1 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:flex-1 text-center sm:text-left text-sm sm:text-base font-semibold text-gray-800 break-words px-2 py-1 rounded-md bg-gray-50 border border-gray-100">
            {match.team1}
          </div>
          
          <div className="flex items-center justify-center mx-2">
            {isCompleted && match.score ? (
              <div className="bg-green-600 text-white px-4 py-1.5 rounded-md text-base font-bold shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-20 animate-pulse rounded-md"></div>
                <span className="relative z-10">{match.score}</span>
              </div>
            ) : (
              <div className="bg-[#E84049] text-white px-4 py-1.5 rounded-md text-base font-bold shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-10"></div>
                <span className="relative z-10">VS</span>
              </div>
            )}
          </div>
          
          <div className={`w-full sm:flex-1 text-center sm:text-right text-sm sm:text-base font-semibold break-words px-2 py-1 rounded-md bg-gray-50 border border-gray-100 ${
            match.team2 === 'RAKİP BEKLENİYOR...' ? 'text-[#E84049] italic' : 'text-gray-800'
          }`}>
            {match.team2}
          </div>
        </div>
      </div>
    </div>
  );

  const SportSection = ({ title, icon, sport, completedMatches, upcomingMatches }) => (
    <div className="mb-10 sm:mb-16">
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-3 sm:p-4 mb-6 sm:mb-8 transform transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E84049] flex items-center justify-center shadow-md relative">
            <div className="absolute inset-0 rounded-full bg-[#E84049] animate-ping opacity-30"></div>
            {React.cloneElement(icon, { className: 'text-white text-lg sm:text-xl relative z-10' })}
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#E84049] tracking-wider">{title}</h2>
        </div>
      </div>
      
      {/* Past matches section */}
      {completedMatches && completedMatches.length > 0 && (
        <div className="mb-8 sm:mb-12">
          <div className="relative inline-block mb-6">
            <h3 className="text-xl font-bold text-gray-800 relative z-10">
              {sport === 'futsal' && completedMatches === finalFutsalMatches ? 'FİNAL SONUÇLARI' : 'YARI FİNAL SONUÇLARI'}
            </h3>
            <div className="absolute -bottom-1 left-0 w-full h-2 bg-[#E84049] opacity-10 rounded-md transform -skew-x-6 z-0"></div>
          </div>
          
          {completedMatches.map((matchDay, idx) => (
            <div key={idx} className="mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <div className="bg-[#E84049] bg-opacity-5 rounded-md px-3 py-1.5 flex items-center gap-1.5">
                  <FaCalendarAlt className="text-gray-700 text-sm" />
                  <span className="text-sm font-bold text-gray-700">{matchDay.date}</span>
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
                  <MatchCard key={mIdx} match={match} sport={sport} isCompleted={matchDay.isCompleted} />
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
              {sport === 'volleyball' ? "FİNAL MAÇLARI" : "GELECEK MAÇLAR"}
            </h3>
            <div className="absolute -bottom-1 left-0 w-full h-2 bg-[#E84049] opacity-10 rounded-md transform -skew-x-6 z-0"></div>
          </div>
          
          {upcomingMatches.map((matchDay, idx) => (
            <div key={idx} className="mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <div className="bg-[#E84049] bg-opacity-5 rounded-md px-3 py-1.5 flex items-center gap-1.5">
                  <FaCalendarAlt className="text-gray-700 text-sm" />
                  <span className="text-sm font-bold text-gray-700">{matchDay.date}</span>
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

  // Display winners for completed tournaments with enhanced styling
  const WinnersSection = () => {
    // Get champion and runner-up for futsal
    const yildizErkekFinal = finalFutsalMatches[0].matches[1];
    const gencErkekFinal = finalFutsalMatches[1].matches[1];

    const yildizErkekWinner = yildizErkekFinal.score === '3 - 4' ? yildizErkekFinal.team2 : yildizErkekFinal.team1;
    const yildizErkekRunnerUp = yildizErkekFinal.score === '3 - 4' ? yildizErkekFinal.team1 : yildizErkekFinal.team2;
    
    const gencErkekWinner = gencErkekFinal.score === '8 - 2' ? gencErkekFinal.team1 : gencErkekFinal.team2;
    const gencErkekRunnerUp = gencErkekFinal.score === '8 - 2' ? gencErkekFinal.team2 : gencErkekFinal.team1;

    return (
      <div className="mb-12 sm:mb-20">
        <div className="relative text-center mb-8">
          <div className="inline-block bg-[#E84049] text-white py-2 px-6 rounded-lg shadow-lg transform -rotate-1">
            <h3 className="text-xl sm:text-2xl font-bold tracking-wide">
              ŞAMPİYONLAR 2025
            </h3>
          </div>
          <div className="absolute top-0 right-0 left-0 mx-auto w-full flex justify-center mt-12">
            <div className="w-24 h-1 bg-[#E84049]"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Yıldız Erkek */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="bg-[#E84049] text-white py-3 px-4 font-bold text-center relative overflow-hidden">
              <div className="absolute -right-6 -top-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -left-6 -bottom-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
              <h3 className="text-lg relative z-10">YILDIZ ERKEK</h3>
            </div>
            
            <div className="p-6">
              {/* Champion */}
              <div className="bg-yellow-50 rounded-lg p-4 mb-6 relative overflow-hidden shadow-sm border border-yellow-100">
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute transform rotate-45 bg-yellow-400 text-xs text-white font-bold py-1 right-[-35px] top-[32px] w-[140px] text-center">
                    ŞAMPİYON
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  <FaTrophy className="text-yellow-500 text-2xl mr-3" />
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-extrabold text-xl sm:text-2xl text-gray-800">{yildizErkekWinner}</h4>
                  </div>
                </div>
              </div>
              
              {/* Runner-up and Third Place */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full mb-2">
                    <span className="font-bold text-gray-700">2</span>
                  </div>
                  <h5 className="font-medium text-gray-500 text-sm mb-1">İKİNCİ</h5>
                  <p className="font-bold text-center text-gray-800">{yildizErkekRunnerUp}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#cd7f32] text-white rounded-full mb-2">
                    <span className="font-bold">3</span>
                  </div>
                  <h5 className="font-medium text-gray-500 text-sm mb-1">ÜÇÜNCÜ</h5>
                  <p className="font-bold text-center text-gray-800">ANAFARTALAR İHO</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Genç Erkek */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="bg-[#E84049] text-white py-3 px-4 font-bold text-center relative overflow-hidden">
              <div className="absolute -right-6 -top-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -left-6 -bottom-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
              <h3 className="text-lg relative z-10">GENÇ ERKEK</h3>
            </div>
            
            <div className="p-6">
              {/* Champion */}
              <div className="bg-yellow-50 rounded-lg p-4 mb-6 relative overflow-hidden shadow-sm border border-yellow-100">
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute transform rotate-45 bg-yellow-400 text-xs text-white font-bold py-1 right-[-35px] top-[32px] w-[140px] text-center">
                    ŞAMPİYON
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  <FaTrophy className="text-yellow-500 text-2xl mr-3" />
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-extrabold text-xl sm:text-2xl text-gray-800">{gencErkekWinner}</h4>
                  </div>
                </div>
              </div>
              
              {/* Runner-up and Third Place */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full mb-2">
                    <span className="font-bold text-gray-700">2</span>
                  </div>
                  <h5 className="font-medium text-gray-500 text-sm mb-1">İKİNCİ</h5>
                  <p className="font-bold text-center text-gray-800">{gencErkekRunnerUp}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#cd7f32] text-white rounded-full mb-2">
                    <span className="font-bold">3</span>
                  </div>
                  <h5 className="font-medium text-gray-500 text-sm mb-1">ÜÇÜNCÜ</h5>
                  <p className="font-bold text-center text-gray-800">FATİH UFSM AİHL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-6 lg:px-8 mt-12 sm:mt-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 sm:-translate-y-10">
            <FaTrophy className="text-yellow-400 text-3xl sm:text-5xl animate-bounce" />
          </div>
          
          <div className="relative inline-block mt-6 sm:mt-8">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#E84049] mb-3 sm:mb-6 relative z-10 tracking-wide">
              İMAM HATİP SPOR OYUNLARI
            </h1>
            <div className="absolute -bottom-1 left-0 w-full h-3 sm:h-4 bg-[#E84049] opacity-10 rounded-md transform -skew-x-6 z-0"></div>
          </div>
          
          <div className="w-full max-w-lg mx-auto mt-4">
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-1 bg-[#E84049] w-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Champions Section */}
        <WinnersSection />

        {/* Futsal Section */}
        <SportSection 
          title="FUTSAL"
          icon={<MdSportsSoccer className="text-white text-lg sm:text-xl" />}
          sport="futsal"
          completedMatches={finalFutsalMatches}
        />

        {/* Voleybol Past Matches Section */}
        <SportSection 
          title="VOLEYBOL - GEÇEN MAÇLAR" 
          icon={<FaVolleyballBall className="text-white text-lg sm:text-xl" />}
          sport="volleyball"
          completedMatches={pastVolleyballMatches}
        />
        
        {/* Voleybol Future Matches Section */}
        <SportSection 
          title="VOLEYBOL - FİNAL MAÇLARI" 
          icon={<FaVolleyballBall className="text-white text-lg sm:text-xl" />}
          sport="volleyball"
          upcomingMatches={upcomingVolleyballMatches}
        />

      </div>
    </div>
  );
};

export default TournamentFinal;