const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB bağlantısı başarılı'))
.catch((err) => console.error('❌ MongoDB bağlantı hatası:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('API Çalışıyor 🚀');
});

const todoRoutes = require('./todoRoutes');
app.use('/api', todoRoutes);

const authRoutes = require('./authRoutes');
app.use('/api/auth', authRoutes);


// Sunucu Başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});
 
