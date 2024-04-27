import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eye from '../../../public/img/login/eye.svg';
export default function ConfirmPassword() {
  const [type, setType] = useState(false);
  const navigate = useNavigate();

  const sendData = (e: FormEvent) => {
    e.preventDefault();
    navigate('/leads');
  };

  return (
    <div className="login">
      <div className="login__content">
        <form className="login__form" onSubmit={sendData}>
          <div className="login__form__header">Reset your password</div>
          <div className="login__form__body">
            <div className="login__form__group">
              <label>New password</label>
              <div className="login__form__control">
                <input type="text" placeholder="Enter password" required />
              </div>
            </div>

            <div className="login__form__group">
              <label>Retype a new password</label>
              <div className="login__form__control ">
                <input
                  type={type ? 'text' : 'password'}
                  placeholder="Retype password"
                  required
                />
                <span className="password-icon" onClick={() => setType(!type)}>
                  <img src={eye} alt="" />
                  {!type && <span className="close-icon"></span>}
                </span>
              </div>
            </div>

            <div className="login__form__message">
              <div className="login__form__error">
                <img src="/public/img/login/wrong.svg" alt="" />
                <span>Wrong password</span>
              </div>
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
              <button type="submit">Reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
