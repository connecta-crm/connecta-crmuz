import { Outlet, useLocation } from 'react-router-dom';
import { classNames } from '../utils/helpers';
import Header from './Header';
import Sidebar from './Sidebar';
import Filter from './filter/Filter';

function AppLayout() {
  const { pathname } = useLocation();
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div
        className={classNames(
          pathname === '/dashboard' ? 'dashboard-page' : '',
          'main',
        )}
      >
        <div className="container">
          <Outlet />
          <Filter />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
