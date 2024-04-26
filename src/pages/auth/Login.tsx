
import { Link } from "react-router-dom";
import eye from "../../../public/img/login/eye.svg"
import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom'
function Login() {
  const [type, setType] = useState(false)
  const navigate = useNavigate()
  const sendData = (e:FormEvent) => {
    e.preventDefault();
    navigate("/leads")
  }

  return (
    <div className="login">
      <div className="login__content">
        <form className="login__form" onSubmit={sendData}>
          <div className="login__form__header">Welcome mate!</div>
          <div className="login__form__body">

            <div className="login__form__group">
              <label>User name</label>
              <div className="login__form__control">
                <input type="text" placeholder="Enter username" required />
              </div>
            </div>

            <div className="login__form__group">
              <label>Pasword</label>
              <div className="login__form__control ">
                <input type={type ? "text" : "password"} placeholder="Enter password" required />
                <span className="password-icon" onClick={() => setType(!type)}>
                  <img src={eye} alt="" />
                  {
                    !type && <span className="close-icon"></span>
                  }

                </span>
              </div>
            </div>

            <div className="login__form__message">
              {/* <div className="login__form__error">
                <img src="/public/img/login/wrong.svg" alt="" />
                <span>Wrong password</span>
              </div> */}
              <Link className="login__form__forget" to="/auth/confirm/email">Forgot your password?</Link>
            </div>

            <div className="login__form__btn">
              <button type="submit">Sign in</button>
            </div>

          </div>
        </form>
      </div>

    </div>
  );
}

export default Login;
