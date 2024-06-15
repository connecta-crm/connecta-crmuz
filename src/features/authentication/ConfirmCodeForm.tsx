import { LoadingOutlined } from '@ant-design/icons';
import { FormEvent, useState } from 'react';
import { useConfirmOtp } from './useConfirmOtp';

function ConfirmCodeForm() {
  const [code, setCode] = useState('');
  const { confirmOtp, isLoading } = useConfirmOtp();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const email = localStorage.getItem('email');
    console.log(email, code);
    if (!code?.trim() || !email) return;

    confirmOtp(
      { email, code },
      {
        onSettled: () => {
          // localStorage.removeItem('email')
          // setCode('');
        },
      },
    );
  }
  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <div className="login__form__body">
        <div className="login__form__group">
          <label>Confirm a code</label>
          <div className="login__form__message">
            <div className="login__form__forget">
              We have sent a confirmation code to your CRM user email.
            </div>
          </div>
          <div className="login__form__control ">
            <input
              type="text"
              placeholder="Enter a code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isLoading}
              required
            />
            <span className="login__form__time">04:59</span>
          </div>
        </div>
        <div className="login__form__btn">
          <button type="submit" disabled={isLoading}>
            {!isLoading ? 'Confirm' : <LoadingOutlined />}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ConfirmCodeForm;
