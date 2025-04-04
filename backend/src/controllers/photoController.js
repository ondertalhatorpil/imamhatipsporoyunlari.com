// src/controllers/photoController.js
const { pool } = require('../config/db');
const fs = require('fs');
const path = require('path');

// Belirli bir yıla ait fotoğrafları getir
exports.getPhotosByYear = async (req, res) => {
  try {
    const year = req.query.year || '2024';
    
    // Veritabanından fotoğrafları çekmek için sorgu
    const [rows] = await pool.query(
      'SELECT id, year, url, title FROM photos WHERE year = ?', 
      [year]
    );
    
    // Mevcut yılları da getir
    const [yearRows] = await pool.query(
      'SELECT DISTINCT year FROM photos ORDER BY year DESC'
    );
    
    const availableYears = yearRows.map(row => row.year);
    
    res.json({
      photos: rows,
      availableYears
    });
  } catch (error) {
    console.error('Fotoğraflar alınırken hata oluştu:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Tüm fotoğrafları getir
exports.getAllPhotos = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, year, url, title FROM photos ORDER BY year DESC, id DESC'
    );
    
    res.json({ photos: rows });
  } catch (error) {
    console.error('Fotoğraflar alınırken hata oluştu:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Belirli bir fotoğrafın detaylarını getir
exports.getPhotoById = async (req, res) => {
  try {
    const photoId = req.params.id;
    
    const [rows] = await pool.query(
      'SELECT id, year, url, title, upload_date as uploadDate FROM photos WHERE id = ?',
      [photoId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Fotoğraf bulunamadı' });
    }
    
    res.json({ photo: rows[0] });
  } catch (error) {
    console.error('Fotoğraf detayları alınırken hata oluştu:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Fotoğraf yükleme
exports.uploadPhotos = async (req, res) => {
  // Authenticate
  if (!req.session.isAuthenticated) {
    return res.status(401).json({ error: 'Yetkilendirme hatası' });
  }

  try {
    const files = req.files;
    const { year, eventName } = req.body;
    
    const results = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Dosya URL'i
      const url = `/uploads/gallery/${year}/${file.filename}`;
      
      // Başlık belirleme
      let title = req.body[`titles[${i}]`] || '';
      if (!title) {
        title = path.basename(file.originalname, path.extname(file.originalname))
          .replace(/-/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());
      }
      
      // Dosya türünü (mime type) al
      const fileType = file.mimetype;
      
      // Fotoğrafı veritabanına ekle
      const [result] = await pool.query(
        `INSERT INTO photos 
         (title, url, year, file_size, file_type) 
         VALUES (?, ?, ?, ?, ?)`,
        [title, url, year, file.size, fileType]
      );
      
      results.push({
        id: result.insertId,
        title,
        url,
        year,
        eventName
      });
    }
    
    res.json({ 
      success: true,
      message: `${files.length} fotoğraf başarıyla yüklendi.`,
      photos: results
    });
  } catch (error) {
    console.error('Fotoğraf yükleme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Fotoğraf silme
exports.deletePhoto = async (req, res) => {
  // Authenticate
  if (!req.session.isAuthenticated) {
    return res.status(401).json({ error: 'Yetkilendirme hatası' });
  }
  
  try {
    const photoId = req.params.id;
    
    // Önce fotoğraf bilgilerini al
    const [rows] = await pool.query('SELECT url FROM photos WHERE id = ?', [photoId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Fotoğraf bulunamadı' });
    }
    
    const photoUrl = rows[0].url;
    const filePath = path.join(__dirname, '../../public', photoUrl);
    
    // Dosyayı disk'ten sil
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Veritabanından sil
    await pool.query('DELETE FROM photos WHERE id = ?', [photoId]);
    
    res.json({ 
      success: true,
      message: 'Fotoğraf başarıyla silindi.'
    });
  } catch (error) {
    console.error('Fotoğraf silme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}; 
