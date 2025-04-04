// src/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Environment variables
dotenv.config({ path: './src/config/.env' });

// Import routes
const photoRoutes = require('./routes/photoRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const tournamentRoutes = require('./routes/tournamentRoutes'); 


// Initialize app
const app = express();

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));


// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Localhost'un herhangi bir port numarasına ve üretim domainlerine izin ver
    const allowedOrigins = [/^http:\/\/localhost:\d+$/, 'https://imamhatipsporoyunlari.com'];
    
    // Regex ile kontrol et veya doğrudan eşleme yap
    const originIsAllowed = 
      !origin || // Tarayıcı dışı isteklere izin ver (Postman, vb.)
      allowedOrigins.some(allowed => 
        typeof allowed === 'string' 
          ? allowed === origin 
          : allowed.test(origin)
      );
    
    if (originIsAllowed) {
      callback(null, origin);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET || 'oncü1958*',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', photoRoutes);
app.use('/admin', adminRoutes); 
app.use('/api', tournamentRoutes);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;