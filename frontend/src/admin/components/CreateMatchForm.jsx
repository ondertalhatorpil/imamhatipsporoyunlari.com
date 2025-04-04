import React, { useState } from 'react';
import { tournamentService } from '../../services/api';

const CreateMatchForm = ({ stageId, onMatchCreated }) => {
    const [team1Name, setTeam1Name] = useState('');
    const [team2Name, setTeam2Name] = useState('');
    const [matchTime, setMatchTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!team1Name || !team2Name || !matchTime) {
            setError('Lütfen tüm alanları doldurun');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const result = await tournamentService.createMatch(stageId, {
                team1_name: team1Name,
                team2_name: team2Name,
                match_time: matchTime
            });

            setTeam1Name('');
            setTeam2Name('');
            setMatchTime('');
            setLoading(false);

            if (onMatchCreated) {
                onMatchCreated(result);
            }
        } catch (err) {
            console.error('Maç oluşturma hatası:', err);
            setError('Maç oluşturulurken bir hata oluştu');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Takım 1
                </label>
                <input
                    type="text"
                    // src/admin/components/CreateMatchForm.jsx (devamı)
                    className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                    value={team1Name}
                    onChange={(e) => setTeam1Name(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Takım 2
                </label>
                <input
                    type="text"
                    className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                    value={team2Name}
                    onChange={(e) => setTeam2Name(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maç Zamanı
                </label>
                <input
                    type="datetime-local"
                    className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                    value={matchTime}
                    onChange={(e) => setMatchTime(e.target.value)}
                />
            </div>

            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}

            <button
                type="submit"
                className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md 
                ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                disabled={loading}
            >
                {loading ? 'Oluşturuluyor...' : 'Maç Oluştur'}
            </button>
        </form>
    );
};

export default CreateMatchForm;