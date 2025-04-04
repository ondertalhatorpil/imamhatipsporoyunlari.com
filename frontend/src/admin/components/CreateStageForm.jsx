import React, { useState } from 'react';
import { tournamentService } from '../../services/api';

const CreateStageForm = ({ tournamentId, onStageCreated }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name) {
      setError('Lütfen aşama adını girin');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await tournamentService.createStage(tournamentId, { name });
      
      setName('');
      setLoading(false);
      
      if (onStageCreated) {
        onStageCreated(result);
      }
    } catch (err) {
      console.error('Aşama oluşturma hatası:', err);
      setError('Aşama oluşturulurken bir hata oluştu');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Aşama Adı
        </label>
        <input
          type="text"
          className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="İlk Tur, Çeyrek Final, Yarı Final..."
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
        {loading ? 'Oluşturuluyor...' : 'Aşama Oluştur'}
      </button>
    </form>
  );
};

export default CreateStageForm;