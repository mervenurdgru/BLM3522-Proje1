import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  // 🧠 Token kontrolü (ilk girişte çalışır)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchTodos();
    }
  }, []);

  // Tüm görevleri getir
  const fetchTodos = async () => {
    try {
      const res = await axios.get('https://proje1-backend.uc.r.appspot.com/api/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Veri çekme hatası:', err);
    }
  };

  // Yeni görev ekle
  const handleAdd = async () => {
    if (!title.trim()) return;
    await axios.post('https://proje1-backend.uc.r.appspot.com/api/todos', { title });
    setTitle('');
    fetchTodos();
  };

  // Görevi sil
  const handleDelete = async (id) => {
    await axios.delete(`https://proje1-backend.uc.r.appspot.com/api/todos/${id}`);
    fetchTodos();
  };

  // Görevi tamamla
  const handleToggle = async (id) => {
    await axios.put(`https://proje1-backend.uc.r.appspot.com/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', textAlign: 'center' }}>
      <h1>📝 Yapılacaklar Listesi</h1>

      <input
        type="text"
        placeholder="Yeni görev ekle..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Ekle</button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo._id} style={{ marginTop: 10 }}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => handleToggle(todo._id)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo._id)} style={{ marginLeft: 10 }}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
