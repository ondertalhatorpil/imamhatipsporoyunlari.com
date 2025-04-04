import React, { useState, useEffect } from 'react';
import { tournamentService } from '../services/api';
import MatchCard from '../components/Tournament/MatchCard';

const Tournament = () => {
    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [tournamentMatches, setTournamentMatches] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const mainColor = '#E84049';

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                setLoading(true);
                const data = await tournamentService.getAllTournaments();

                const tournamentsArray = Array.isArray(data) ? data : [];
                setTournaments(tournamentsArray);

                if (tournamentsArray.length > 0) {
                    setSelectedTournament(tournamentsArray[0].id);
                }

                setLoading(false);
            } catch (err) {
                console.error('Turnuvalar yüklenirken hata:', err);
                setError('Turnuva bilgileri yüklenemedi');
                setLoading(false);
            }
        };

        fetchTournaments();
    }, []);

    useEffect(() => {
        if (!selectedTournament) return;

        const fetchTournamentMatches = async () => {
            try {
                setLoading(true);
                const data = await tournamentService.getTournamentMatches(selectedTournament);
                setTournamentMatches(data);
                setLoading(false);
            } catch (err) {
                console.error('Turnuva maçları yüklenirken hata:', err);
                setError('Turnuva maçları yüklenemedi');
                setLoading(false);
            }
        };

        fetchTournamentMatches();
    }, [selectedTournament]);

    const handleTournamentChange = (e) => {
        setSelectedTournament(Number(e.target.value));
    };

    const currentTournament = tournaments.find(t => t.id === selectedTournament);

    if (loading && tournaments.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: mainColor }}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64 text-red-500 bg-red-50 p-4 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
            </div>
        );
    }

    if (tournaments.length === 0) {
        return (
            <div className="text-center p-10 bg-white rounded-lg shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-lg text-gray-600">Henüz turnuva bulunmuyor.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                <span className="inline-block text-white py-1 px-4 rounded-full text-lg mr-2" style={{ backgroundColor: mainColor }}>
                    Turnuva Programı
                </span>
            </h1>

            <div className="flex justify-center mb-8">
                <div className="flex items-center rounded-lg shadow-md border border-gray-200 bg-white overflow-hidden">
                    <div className="px-4 py-2 text-white font-medium" style={{ backgroundColor: mainColor }}>
                        Turnuva
                    </div>
                    <select
                        id="tournament-select"
                        value={selectedTournament || ''}
                        onChange={handleTournamentChange}
                        className="flex-1 border-l border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                        style={{
                            minWidth: '240px',
                            '--tw-ring-color': mainColor
                        }}
                    >
                        {tournaments.map((tournament) => (
                            <option key={tournament.id} value={tournament.id}>
                                {tournament.name} ({tournament.sport_type})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

           

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                        style={{ borderColor: mainColor }}></div>
                </div>
            ) : (
                <div className="max-w-5xl mx-auto">
                    {Object.keys(tournamentMatches).length === 0 ? (
                        <div className="text-center p-10 bg-white rounded-lg shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <p className="text-lg text-gray-600">Bu turnuvada henüz maç bulunmuyor.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {Object.entries(tournamentMatches)
                                .sort((a, b) => a[1].order_num - b[1].order_num)
                                .map(([stageName, stageData]) => (
                                    <div key={stageName} className="mb-8">
                                        <h3 className="text-white p-3 rounded-lg mb-4 text-center font-bold shadow-md flex items-center justify-center"
                                            style={{ backgroundColor: mainColor }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            {stageName}
                                        </h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {stageData.matches.map(match => (
                                                <MatchCard key={match.id} match={match} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Tournament;