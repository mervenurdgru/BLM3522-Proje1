const express = require('express');
const router = express.Router();
const Todo = require('./models/Todo');

// GET /todos – Tüm görevleri getir
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /todos – Yeni görev ekle
router.post('/todos', async (req, res) => {
  const todo = new Todo({
    title: req.body.title
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /todos/:id – Görev sil
router.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Görev silindi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /todos/:id – Görev tamamlandı/iptal
router.put('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Görev bulunamadı' });

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
