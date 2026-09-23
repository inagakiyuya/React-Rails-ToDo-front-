import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: React.SubmitEvent) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await loginRequest({ email, password });

      login(response);
      navigate('/posts');
    } catch {
      setErrorMessage('Login failed. Please check your email address or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            disabled={isSubmitting}
            required
          />
        </div>

        {errorMessage && <p role="alert">{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>
    </main>
  );
};

export default LoginPage;