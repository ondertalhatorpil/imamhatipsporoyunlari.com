// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const isAuthenticated = (req, res, next) => {
  console.log('isAuthenticated kontrolü yapılıyor:', {
    sessionExists: !!req.session,
    isAuthenticated: req.session?.isAuthenticated,
    sessionID: req.sessionID
  });
  
  if (req.session && req.session.isAuthenticated) {
    console.log('Kimlik doğrulama başarılı, istek devam ediyor');
    return next();
  }
  
  console.log('Yetkisiz erişim: Oturum bilgisi bulunamadı veya geçersiz');
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

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("Login isteği alındı:", { username });

  if (username === 'admin' && password === 'oncü1958*') {
    console.log("Kimlik doğrulama başarılı");
    
    // Burada regenerate kullanmadan direkt atama yapalım
    req.session.isAuthenticated = true;
    req.session.user = { username: 'admin' };
    
    // Session'ı açıkça kaydet
    req.session.save(err => {
      if (err) {
        console.error("Session kaydetme hatası:", err);
        return res.status(500).json({ error: 'Oturum başlatılamadı' });
      }
      
      console.log("Oturum başarıyla kaydedildi, ID:", req.sessionID);
      res.json({ success: true });
    });
  } else {
    console.log("Kimlik doğrulama başarısız");
    res.status(401).json({ success: false, error: 'Geçersiz kullanıcı adı veya şifre' });
  }
});

// Kimlik doğrulama kontrol endpoint'i de güncelleyelim
router.get('/check-auth', (req, res) => {
  console.log("Oturum kontrolü yapılıyor:", {
    sessionExists: !!req.session,
    isAuthenticated: req.session?.isAuthenticated,
    sessionID: req.sessionID
  });
  
  if (req.session && req.session.isAuthenticated) {
    return res.json({ 
      isAuthenticated: true, 
      user: req.session.user 
    });
  }
  
  res.status(401).json({ isAuthenticated: false });
});

// Çıkış endpoint'i
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

module.exports = router;