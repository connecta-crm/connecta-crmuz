import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmCodeForm() {
  const navigate = useNavigate();
  const sendCode = (e: FormEvent) => {
    e.preventDefault();
    alert('send code ');
    navigate('/auth/confirm/password');
  };
  return (
    <form className="login__form" onSubmit={sendCode}>
      <div className="login__form__body">
        <div className="login__form__group">
          <label>Confirm a code</label>
          <div className="login__form__message">
            <div className="login__form__forget">
              We have sent a confirmation code to your CRM user email.
            </div>
          </div>
          <div className="login__form__control ">
            <input type="text" placeholder="Enter a code" required />
            <span className="login__form__time">04:59</span>
          </div>
        </div>
        <div className="login__form__btn">
          <button type="submit">Confirm</button>
        </div>
      </div>
    </form>
  );
}

export default ConfirmCodeForm;
