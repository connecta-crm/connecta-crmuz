import { LoadingOutlined } from '@ant-design/icons';
import { FormEvent, useState } from 'react';
import { useConfirmCode } from './useConfirmCode';

function ConfirmEmailForm() {
  const [email, setEmail] = useState('user@example.com');
  const { sendConfirmEmail, isLoading } = useConfirmCode();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email?.trim()) return;

    sendConfirmEmail(
      { email },
      {
        onSettled: () => {
          localStorage.setItem('email', email);
          // setEmail('');
        },
      },
    );
  }

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <div className="login__form__body">
        <div className="login__form__group">
          <label>Email</label>
          <div className="login__form__control">
            <input
              type="email"
              placeholder="Enter your work email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className="login__form__btn">
          <button type="submit" disabled={isLoading}>
            {!isLoading ? 'Send' : <LoadingOutlined />}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ConfirmEmailForm;
