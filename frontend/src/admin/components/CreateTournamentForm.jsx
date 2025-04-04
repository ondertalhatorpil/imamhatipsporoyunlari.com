// src/admin/components/CreateTournamentForm.jsx
import React, { useState } from 'react';
import { tournamentService } from '../../services/api';

const CreateTournamentForm = ({ onTournamentCreated }) => {
  const [name, setName] = useState('');
  const [sportType, setSportType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !sportType) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await tournamentService.createTournament({
        name,
        sport_type: sportType
      });
      
      setName('');
      setSportType('');
      setLoading(false);
      
      if (onTournamentCreated) {
        onTournamentCreated(result);
      }
    } catch (err) {
      console.error('Turnuva oluşturma hatası:', err);
      setError('Turnuva oluşturulurken bir hata oluştu');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Turnuva Adı
        </label>
        <input
          type="text"
          className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Spor Türü
        </label>
        <input
          type="text"
          className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
          value={sportType}
          onChange={(e) => setSportType(e.target.value)}
          placeholder="Voleybol, Futbol, Basketbol..."
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
        {loading ? 'Oluşturuluyor...' : 'Turnuva Oluştur'}
      </button>
    </form>
  );
};

export default CreateTournamentForm;