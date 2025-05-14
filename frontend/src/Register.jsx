import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('https://proje1-backend.uc.r.appspot.com/api/auth/register', {
        username,
        password
      });
      setMessage('Kayıt başarılı! Giriş yapabilirsiniz.');
    } catch (err) {
      setMessage('Kayıt başarısız: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Kayıt Ol</h2>
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
      <button onClick={handleRegister}>Kayıt Ol</button>
      <p>{message}</p>

      <p>
        Zaten hesabın var mı?{' '}
        <a href="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
          Giriş yap
        </a>
      </p>
    </div>
  );
}

export default Register;
