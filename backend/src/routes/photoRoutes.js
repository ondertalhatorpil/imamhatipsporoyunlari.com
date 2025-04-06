// src/routes/photoRoutes.js
const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Auth Middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  res.status(401).json({ error: 'Yetkisiz erişim' });
};

// Multer ayarları - dosya yükleme
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const year = req.body.year || new Date().getFullYear().toString();
    const dir = path.join(__dirname, '../../public/uploads/gallery', year);
    
    // Klasör yoksa oluştur
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Dosya ismini temizle ve türkçe karakterleri değiştir
    const fileName = file.originalname
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9.]/g, '-');
    
    cb(null, Date.now() + '-' + fileName);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Sadece görsel dosyalarını kabul et
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Sadece resim dosyaları yüklenebilir!'), false);
    }
    cb(null, true);
  }
});

// Genel fotoğraf API'leri
router.get('/photos', photoController.getPhotosByYear);
router.get('/photos/all', photoController.getAllPhotos);
router.get('/photos/:id', photoController.getPhotoById);

// Admin fotoğraf API'leri
router.post('/photos/upload', isAuthenticated, (req, res, next) => {
  upload.array('photos', 10)(req, res, (err) => {
    if (err) {
      console.error('Multer hatası:', err);
      return res.status(500).json({ error: err.message });
    }
    // Hata yoksa controller'a devam et
    photoController.uploadPhotos(req, res, next);
  });
});

router.delete('/photos/:id', isAuthenticated, photoController.deletePhoto);

module.exports = router;