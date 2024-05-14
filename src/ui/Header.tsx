import HeaderActions from './HeaderActions';
import HeaderMenu from './HeaderMenu';

function Header() {
  return (
    <div className="header">
      <HeaderMenu />
      <HeaderActions />
    </div>
  );
}

export default Header;
