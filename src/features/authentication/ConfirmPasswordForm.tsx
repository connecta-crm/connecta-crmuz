import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { FormEvent, useState } from 'react';
import eyeIcon from '../../../public/img/login/eye.svg';
import { useConfirmPassword } from './useConfirmPassword';

function ConfirmPasswordForm() {
  const [inputType, setInputType] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { confirmPassword: confirmPasswordFn, isLoading } =
    useConfirmPassword();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    if (password !== confirmPassword) {
      message.error('The confirm password is wrong!');
      return;
    }

    confirmPasswordFn(
      { password },
      {
        onSettled: () => {
          localStorage.removeItem('email');
        },
      },
    );
  }

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <div className="login__form__body">
        <div className="login__form__group">
          <label>New password</label>
          <div className="login__form__control">
            <input
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>

        <div className="login__form__group">
          <label>Retype a new password</label>
          <div className="login__form__control ">
            <input
              type={inputType ? 'text' : 'password'}
              placeholder="Retype password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <span
              className="password-icon"
              onClick={() => setInputType(!inputType)}
            >
              <img src={eyeIcon} alt="" />
              {!inputType && <span className="close-icon"></span>}
            </span>
          </div>
        </div>

        <div className="login__form__message">
          {/* <div className="login__form__error">
            <img src="/public/img/login/wrong.svg" alt="" />
            <span>Wrong password</span>
          </div> */}
        </div>
        <ul className="login__form__message__list">
          <li className="login__form__success-message">
            At least 8 characters
          </li>
          <li>Contains an uppercase letter</li>
          <li>Contains a lowercase letter</li>
          <li>Contains a digit</li>
          <li>Contains a symbol</li>
        </ul>
        <div className="login__form__btn">
          <button type="submit" disabled={isLoading}>
            {!isLoading ? 'Reset' : <LoadingOutlined />}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ConfirmPasswordForm;
