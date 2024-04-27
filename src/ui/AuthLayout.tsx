import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="login">
      <div className="login__content">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
