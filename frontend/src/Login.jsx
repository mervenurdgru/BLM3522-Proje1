import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://proje1-backend.uc.r.appspot.com/api/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setError('');
      navigate('/todo');
    } catch (err) {
      setError('Giriş başarısız: ' + (err.response?.data?.message || err.message));
    }
  };
  

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Giriş Yap</h2>
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Giriş Yap</button>
      {token && <p>Giriş başarılı! Token: {token.slice(0, 10)}...</p>}
      {error && <p>{error}</p>}

      {/* Link kısmı return bloğunun içinde olmalı */}
      <p>
        Hesabın yok mu?{' '}
        <a href="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
          Kayıt ol
        </a>
      </p>
    </div>
  );
}

export default Login;
