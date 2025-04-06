// src/admin/pages/TournamentManagement.jsx
import React, { useState, useEffect } from 'react';
import { tournamentService } from '../../services/api';
import CreateTournamentForm from '../components/CreateTournamentForm';
import CreateStageForm from '../components/CreateStageForm';
import CreateMatchForm from '../components/CreateMatchForm';

const TournamentManagement = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Turnuvaları yükle
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const data = await tournamentService.getAllTournaments();
        setTournaments(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error('Turnuvalar yüklenirken hata:', err);
        setError('Turnuvalar yüklenemedi');
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  // Turnuva seçildiğinde aşamaları yükle
  useEffect(() => {
    if (!selectedTournament) return;

    const fetchStages = async () => {
      try {
        setLoading(true);
        const data = await tournamentService.getTournamentStages(selectedTournament.id);
        setStages(Array.isArray(data) ? data : []);
        setSelectedStage(null);
        setMatches([]);
        setLoading(false);
      } catch (err) {
        console.error('Aşamalar yüklenirken hata:', err);
        setError('Aşamalar yüklenemedi');
        setLoading(false);
      }
    };

    fetchStages();
  }, [selectedTournament]);

  // Aşama seçildiğinde maçları yükle
  useEffect(() => {
    if (!selectedStage) return;

    const fetchMatches = async () => {
      try {
        setLoading(true);
        const data = await tournamentService.getStageMatches(selectedStage.id);
        setMatches(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error('Maçlar yüklenirken hata:', err);
        setError('Maçlar yüklenemedi');
        setLoading(false);
      }
    };

    fetchMatches();
  }, [selectedStage]);

  // Yeni turnuva oluşturma
  const handleTournamentCreated = (newTournament) => {
    setTournaments([...tournaments, newTournament]);
    setSelectedTournament(newTournament);
  };

  // Yeni aşama oluşturma
  const handleStageCreated = (newStage) => {
    setStages([...stages, newStage]);
    setSelectedStage(newStage);
  };

  // Yeni maç oluşturma
  const handleMatchCreated = (newMatch) => {
    setMatches([...matches, newMatch]);
  };

  // Maç sonucunu güncelleme
  const handleMatchScoreUpdated = async (matchId, scores) => {
    try {
      await tournamentService.updateMatchScore(matchId, scores);

      // Maç listesini güncelle
      setMatches(matches.map(match =>
        match.id === matchId
          ? {
            ...match,
            team1_score: scores.team1_score,
            team2_score: scores.team2_score,
            is_finished: true
          }
          : match
      ));
    } catch (err) {
      console.error('Maç sonucu güncellenirken hata:', err);
      setError('Maç sonucu güncellenemedi');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Turnuva Yönetimi</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Sütun: Turnuva Yönetimi */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Turnuvalar</h2>

          <CreateTournamentForm onTournamentCreated={handleTournamentCreated} />

          <div className="mt-4">
            <h3 className="font-medium mb-2">Mevcut Turnuvalar</h3>
            {loading && tournaments.length === 0 ? (
              <p>Yükleniyor...</p>
            ) : tournaments.length > 0 ? (
              <div className="space-y-2">
                {tournaments.map(tournament => (
                  <div
                    key={tournament.id}
                    className={`p-3 rounded cursor-pointer border ${selectedTournament?.id === tournament.id ?
                        'bg-blue-50 border-blue-500' : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    onClick={() => setSelectedTournament(tournament)}
                  >
                    <p className="font-medium">{tournament.name}</p>
                    <p className="text-sm text-gray-600">{tournament.sport_type}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Henüz turnuva bulunmuyor.</p>
            )}
          </div>
        </div>

        {/* 2. Sütun: Aşama Yönetimi */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Aşamalar</h2>

          {selectedTournament ? (
            <>
              <p className="mb-4">
                <span className="font-medium">Seçili Turnuva:</span> {selectedTournament.name}
              </p>

              <CreateStageForm
                tournamentId={selectedTournament.id}
                onStageCreated={handleStageCreated}
              />

              <div className="mt-4">
                <h3 className="font-medium mb-2">Mevcut Aşamalar</h3>
                {loading && stages.length === 0 ? (
                  <p>Yükleniyor...</p>
                ) : stages.length > 0 ? (
                  <div className="space-y-2">
                    {stages.map(stage => (
                      <div
                        key={stage.id}
                        className={`p-3 rounded cursor-pointer border ${selectedStage?.id === stage.id ?
                            'bg-blue-50 border-blue-500' : 'hover:bg-gray-50 border-gray-200'
                          }`}
                        onClick={() => setSelectedStage(stage)}
                      >
                        <p className="font-medium">{stage.name}</p>
                        <p className="text-sm text-gray-600">Sıra: {stage.order_num}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Bu turnuvada henüz aşama bulunmuyor.</p>
                )}
              </div>
            </>
          ) : (
            <p>Lütfen sol taraftan bir turnuva seçin.</p>
          )}
        </div>

        {/* 3. Sütun: Maç Yönetimi */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Maçlar</h2>

          {selectedStage ? (
            <>
              <p className="mb-4">
                <span className="font-medium">Seçili Aşama:</span> {selectedStage.name}
              </p>

              <CreateMatchForm
                stageId={selectedStage.id}
                onMatchCreated={handleMatchCreated}
              />

              <div className="mt-4">
                <h3 className="font-medium mb-2">Mevcut Maçlar</h3>
                {loading && matches.length === 0 ? (
                  <p>Yükleniyor...</p>
                ) : matches.length > 0 ? (
                  <div className="space-y-4">
                    {matches.map(match => {
                      // Tarih formatlaması için yardımcı fonksiyon
                      const formatMatchTime = (isoDateString) => {
                        if (!isoDateString) return '';

                        // ISO formatındaki string'i Date nesnesine dönüştür
                        const matchDate = new Date(isoDateString);

                        // Tarih ve saat bilgisinin parçalarını al
                        const year = matchDate.getUTCFullYear();
                        const month = String(matchDate.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(matchDate.getUTCDate()).padStart(2, '0');
                        const hours = String(matchDate.getUTCHours()).padStart(2, '0');
                        const minutes = String(matchDate.getUTCMinutes()).padStart(2, '0');

                        // Türkçe formatında tarih ve saat string'i oluştur
                        return `${day}.${month}.${year} ${hours}:${minutes}`;
                      };

                      // Formatlanmış tarih ve saati al
                      const formattedDateTime = formatMatchTime(match.match_time);

                      return (
                        <div
                          key={match.id}
                          className="p-3 rounded border border-gray-200"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{match.team1_name} vs {match.team2_name}</span>
                            <span className="text-sm text-gray-600">
                              {formattedDateTime}
                            </span>
                          </div>

                          {match.is_finished ? (
                            <div className="text-center font-bold">
                              {match.team1_score} - {match.team2_score}
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2 mt-2">
                              <input
                                type="number"
                                className="w-16 border rounded p-1"
                                placeholder="Skor"
                                min="0"
                                id={`team1_score_${match.id}`}
                              />
                              <span className="font-bold">-</span>
                              <input
                                type="number"
                                className="w-16 border rounded p-1"
                                placeholder="Skor"
                                min="0"
                                id={`team2_score_${match.id}`}
                              />
                              <button
                                className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => {
                                  const team1ScoreInput = document.getElementById(`team1_score_${match.id}`);
                                  const team2ScoreInput = document.getElementById(`team2_score_${match.id}`);

                                  const team1Score = parseInt(team1ScoreInput.value);
                                  const team2Score = parseInt(team2ScoreInput.value);

                                  if (!isNaN(team1Score) && !isNaN(team2Score)) {
                                    handleMatchScoreUpdated(match.id, {
                                      team1_score: team1Score,
                                      team2_score: team2Score
                                    });
                                  }
                                }}
                              >
                                Kaydet
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>Bu aşamada henüz maç bulunmuyor.</p>
                )}
              </div>
            </>
          ) : (
            <p>Lütfen ortadaki sütundan bir aşama seçin.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentManagement;