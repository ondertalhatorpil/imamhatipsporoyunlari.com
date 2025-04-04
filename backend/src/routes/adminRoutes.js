// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


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

// Admin fotoğraf API'leri
router.get('/photos', isAuthenticated, photoController.getAllPhotos);
router.get('/photos/:id', isAuthenticated, photoController.getPhotoById);
router.post('/upload', isAuthenticated, upload.array('photos', 10), photoController.uploadPhotos);
router.delete('/photos/:id', isAuthenticated, photoController.deletePhoto);

// Login endpoint - server.js'den buraya taşınabilir
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'oncü1958*') {
    req.session.isAuthenticated = true;
    req.session.user = { username: 'admin' };
    return res.json({ success: true });
  }
  
  res.status(401).json({ success: false, error: 'Geçersiz kullanıcı adı veya şifre' });
});

// Kimlik doğrulama kontrol endpoint'i
router.get('/check-auth', (req, res) => {
  if (req.session.isAuthenticated) {
    return res.json({ isAuthenticated: true, user: req.session.user });
  }
  res.status(401).json({ isAuthenticated: false });
});

// Çıkış endpoint'i
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

module.exports = router;