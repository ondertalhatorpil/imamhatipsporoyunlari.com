// src/config/db.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({ path: './src/config/.env' });

// MySQL bağlantı havuzu oluşturma
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'spor_galeri',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Veritabanı bağlantısını test et
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL bağlantısı başarılı.');
    connection.release();
    return true;
  } catch (error) {
    console.error('MySQL bağlantı hatası:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};