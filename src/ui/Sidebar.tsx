import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../public/img/logo.svg';
import { getMenuData } from '../services/menu';
function Sidebar() {
  const { pathname } = useLocation();

  const user = {
    roles: ['admin', 'user'],
  };

  if (!user) {
    return null;
  }

  const filteredMenu = getMenuData.filter((item) => {
    return item.roles.some((role) => user?.roles?.includes(role));
  });

  const isSettingsRouteActive = (route: string) => {
    return pathname.startsWith(route);
  };

  return (
    <div className="sidebar">
      <nav className="nav">
        <ul className="nav__list">
          <li>
            <NavLink to="/leads" className="nav__link">
              <img src={logo} alt="Logo" />
            </NavLink>
          </li>
          {filteredMenu.map(({ key, path, icon, iconActive }) => {
            const $path = path !== '/settings' ? path : '/settings/users';
            return (
              <li key={key}>
                <NavLink
                  to={$path}
                  className={({ isActive }) =>
                    isActive || isSettingsRouteActive(path)
                      ? 'nav__link _active'
                      : 'nav__link '
                  }
                >
                  {({ isActive }) => (
                    <img
                      src={
                        isActive || isSettingsRouteActive(path)
                          ? iconActive
                          : icon
                      }
                      alt="Icon"
                    />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
