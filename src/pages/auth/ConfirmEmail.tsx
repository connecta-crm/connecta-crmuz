import React, { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
export default function ConfirmEmail() {
const navigate = useNavigate()
  const sendEmail = (e:FormEvent) => {
    e.preventDefault()
    alert("send email ")
    navigate("/auth/confirm/code")
  }

  return (
    <div className='login'>
      <div className="login__content">
        <form className="login__form" onSubmit={sendEmail}>
          <div className="login__form__header">Reset your password</div>
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
      </div>
    </div>
  )
}
