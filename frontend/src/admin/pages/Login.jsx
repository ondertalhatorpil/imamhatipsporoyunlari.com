import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const baseUrl = import.meta.env.PROD ? '/admin/login' : 'http://localhost:8561/admin/login';
      
      console.log('Giriş isteği gönderiliyor:', { username, password });
      const response = await axios.post(baseUrl, {
        username,
        password
      }, { withCredentials: true });
      
      console.log('Giriş yanıtı:', response.data);
      
      if (response.data.success) {
        sessionStorage.setItem('isLoggedIn', 'true');
        console.log('Giriş başarılı, dashboard sayfasına yönlendiriliyor');
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('Giriş başarısız. Sunucu başarılı bir yanıt dönmedi.');
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Girişi</h1>
          <p className="text-gray-600">Fotoğraf Galerisi Yönetim Paneli</p>
          <p className="text-sm text-gray-500 mt-2">
            Kullanıcı adı: admin | Şifre: oncü1958*
          </p>
        </div>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Kullanıcı Adı</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required 
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Şifre</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              required 
            />
          </div>
          
          <div className="flex items-center justify-center">
            <button 
              type="submit" 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;