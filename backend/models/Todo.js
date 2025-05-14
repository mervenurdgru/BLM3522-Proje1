const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {  //görev başlığı 
    type: String,
    required: true
  },
  completed: { //tamamlandı mı
    type: Boolean,
    default: false
  }
}, { timestamps: true });   //Otomatik olarak createdAt ve updatedAt alanları ekler

module.exports = mongoose.model('Todo', TodoSchema);
