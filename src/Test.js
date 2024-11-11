import { useContext, useState } from 'react';
import { authService } from './services/authService';
import { api } from './services/api';

export default function Authentication(){
  // использование контекста сервиса аутентификации
  const [isAuthenticated] = useContext(authService.AuthContext);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {
        isAuthenticated
          ? (
            <div>
              Вы вошли в систему
              <br />
              <br />
              <button
                style={{
                  marginRight: 16,
                }}
                type="button"
                onClick={logoutUser}
              >
                Выйти
              </button>

              <button
                type="button"
                onClick={setExpired}
              >
                Просрочить токен
              </button>
            </div>
          )
          : (
            <div>
              Логин
              <br />
              <input value={login} onChange={(e) => setLogin(e.target.value)} />
              <br />
              Пароль
              <br />
              <input value={password} onChange={(e) => setPassword(e.target.value)} />
              <br />
              <br />
              <button type="button" onClick={sendLoginData}>Войти</button>
            </div>
          )
      }
      <br />
      <br />
      <button
        type="button"
        onClick={getData}
      >
        Получить данные
      </button>
      <br />
      <br />
      {loading ? 'Загрузка...' : data}
    </div>
  );

  function sendLoginData() {
    authService.loginCall({
      login,
      password,
    })
      .then((response) => authService.setLoggedIn(response.data));
  }

  function logoutUser() {
    authService.logoutCall();
    authService.setLoggedOut();
  }

  function setExpired() {
    localStorage.setItem('accessToken', JSON.stringify({
      value: '12345',
      expiresInUtc: '2010-04-19T06:43:27.2953284Z',
    }));
  }

  async function getData() {
    setLoading(true);
    try {
      const response = await api.get('/example');
      setData(response.data.map(x => <p key={x}>{x}</p>));
    }
    catch {
      setData('Ошибка');
    }
    finally{
      setLoading(false);
    }
  }
};