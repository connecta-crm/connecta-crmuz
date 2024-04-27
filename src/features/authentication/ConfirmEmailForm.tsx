import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmEmailForm() {
  const navigate = useNavigate();
  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    alert('send email ');
    navigate('/auth/confirm/code');
  };

  return (
    <form className="login__form" onSubmit={sendEmail}>
      <div className="login__form__body">
        <div className="login__form__group">
          <label>Email</label>
          <div className="login__form__control">
            <input type="email" placeholder="Enter your work email" required />
          </div>
        </div>
        <div className="login__form__btn">
          <button type="submit">Send</button>
        </div>
      </div>
    </form>
  );
}

export default ConfirmEmailForm;
