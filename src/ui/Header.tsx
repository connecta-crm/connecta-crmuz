import { useState } from 'react';
import HeaderActions from './HeaderActions';
import HeaderMenu from './HeaderMenu';

function Header() {
  const [search, setSearch] = useState<string | undefined>();
  const searchHandler = (text: string | undefined) => {
    setSearch(text);
  };
  return (
    <div className="header">
      <HeaderMenu search={search} />
      <HeaderActions searchHandler={searchHandler} />
    </div>
  );
}

export default Header;
