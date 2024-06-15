import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function TableHeaderSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get('q') || '');
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 600);

    return () => clearTimeout(timerId);
  }, [searchText]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (debouncedSearchText?.trim() !== '') {
      newSearchParams.set('q', debouncedSearchText);
    } else {
      newSearchParams.delete('q');
    }

    setSearchParams(newSearchParams);
  }, [debouncedSearchText, setSearchParams]);

  return (
    <div className="dt-header__search">
      <input
        type="text"
        className="input-search-small"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

export default TableHeaderSearch;
