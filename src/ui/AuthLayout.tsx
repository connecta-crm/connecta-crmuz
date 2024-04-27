import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="login">
      <div className="login__content">
        {/* <div className="login__header">{title}</div> */}
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
