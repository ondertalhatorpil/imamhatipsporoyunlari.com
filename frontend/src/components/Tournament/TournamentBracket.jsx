// src/components/Tournament/TournamentBracket.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TournamentBracket = ({ tournamentId }) => {
  const [matches, setMatches] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upcomingMatch, setUpcomingMatch] = useState(null);

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        setLoading(true);
        // Turnuva maçlarını getir
        const matchesResponse = await axios.get(`/api/tournaments/${tournamentId}/matches`);
        setMatches(matchesResponse.data);
        
        // Yaklaşan maçı getir
        const upcomingResponse = await axios.get(`/api/tournaments/${tournamentId}/upcoming`);
        setUpcomingMatch(upcomingResponse.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Turnuva verileri alınırken hata oluştu:', err);
        setError('Turnuva verileri yüklenemedi. Lütfen daha sonra tekrar deneyin.');
        setLoading(false);
      }
    };

    if (tournamentId) {
      fetchTournamentData();
    }
  }, [tournamentId]);

  if (loading) return <div className="flex justify-center items-center h-40 text-gray-500">Yükleniyor...</div>;
  if (error) return <div className="flex justify-center items-center h-40 text-red-500">{error}</div>;
  if (!matches || Object.keys(matches).length === 0) return <div className="text-center p-10">Bu turnuvada henüz maç bulunmuyor.</div>;

  // Maç bilgilerini render et
  const renderMatch = (match) => {
    const team1Name = match.team1_name || 'Henüz Belirlenmedi';
    const team2Name = match.team2_name || 'Henüz Belirlenmedi';
    
    const isMatchFinished = match.is_finished;
    const team1Score = match.team1_score;
    const team2Score = match.team2_score;

    const winner = isMatchFinished && team1Score !== null && team2Score !== null
      ? team1Score > team2Score ? 1 : team1Score < team2Score ? 2 : 0
      : null;

    const matchTime = new Date(match.match_time);
    const formattedDate = matchTime.toLocaleDateString('tr-TR');
    const formattedTime = matchTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    
    return (
      <div 
        key={match.id} 
        className={`bg-white rounded shadow p-4 border transition-all hover:shadow-lg ${isMatchFinished ? 'border-gray-300' : 'border-gray-200'}`}
      >
        <div className="text-sm text-gray-600 mb-2">
          <div className="font-semibold">{formattedDate} / Saat {formattedTime}</div>
        </div>
        <div className={`flex justify-between items-center p-2 rounded mb-1 ${winner === 1 ? 'bg-red-50 border-l-4 border-red-500 text-red-700' : 'bg-gray-50'}`}>
          <span className="font-semibold">{team1Name}</span>
          {isMatchFinished && <span className="font-bold min-w-8 text-center">{team1Score}</span>}
        </div>
        <div className={`flex justify-between items-center p-2 rounded ${winner === 2 ? 'bg-red-50 border-l-4 border-red-500 text-red-700' : 'bg-gray-100'}`}>
          <span className="font-semibold">{team2Name}</span>
          {isMatchFinished && <span className="font-bold min-w-8 text-center">{team2Score}</span>}
        </div>
      </div>
    );
  };

  // Aşamalara göre maçları grupla ve render et
  return (
    <div className="p-4 md:p-6 bg-gray-100 rounded-lg">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-red-600 mb-6">Turnuva Fikstürü</h2>
      
      {/* Yaklaşan maç */}
      {upcomingMatch && (
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-8">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Yaklaşan Maç</h3>
          <div className="font-semibold text-yellow-700 mb-4">
            {new Date(upcomingMatch.match_time).toLocaleDateString('tr-TR')} - 
            {new Date(upcomingMatch.match_time).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          {renderMatch(upcomingMatch)}
        </div>
      )}
      
      {/* Maç aşamalarını göster */}
      <div className="space-y-8">
        {Object.entries(matches).map(([stage, stageMatches]) => (
          <div key={stage} className="mb-6">
            <h3 className="bg-red-600 text-white p-3 rounded-md mb-4 text-center font-bold">{stage}</h3>
            <div className="space-y-4">
              {stageMatches.map(match => renderMatch(match))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;