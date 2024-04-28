import { LoadingOutlined } from '@ant-design/icons';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from './useLogin';

function LoginForm() {
  const [email, setEmail] = useState('admin@admin.admin');
  const [password, setPassword] = useState('1');
  const [inputType, setInputType] = useState(false);
  const { login, isLoading } = useLogin();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          // setEmail('');
          // setPassword('');
        },
      },
    );
  }

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <div className="login__form__body">
        <div className="login__form__group">
          <label>User name</label>
          <div className="login__form__control">
            <input
              type="email"
              id="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="Enter username"
              required
            />
          </div>
        </div>

        <div className="login__form__group">
          <label>Pasword</label>
          <div className="login__form__control ">
            <input
              type={inputType ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="Enter password"
              required
            />
            <span
              className="password-icon"
              onClick={() => setInputType(!inputType)}
            >
              <img src="/img/login/eye.svg" alt="" />
              {!inputType && <span className="close-icon"></span>}
            </span>
          </div>
        </div>

        <div className="login__form__message">
          <div className="login__form__error">
            {/* <img src="/public/img/login/wrong.svg" alt="" /> */}
            {/* <span>Wrong password</span> */}
          </div>
          <Link className="login__form__forget" to="/auth/confirm/email">
            Forgot your password?
          </Link>
        </div>

        <div className="login__form__btn">
          <button type="submit" disabled={isLoading}>
            {!isLoading ? 'Log in' : <LoadingOutlined />}
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
