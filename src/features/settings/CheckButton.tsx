import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
function CheckButton({ title, type }: { title: string; type: string }) {
  const localTitle = title.toLowerCase();
  const [active, setActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const onChange = () => {
    if (newSearchParams.has(type, localTitle)) {
      newSearchParams.delete(type, localTitle);
      setActive(false);
    } else {
      newSearchParams.append(type, localTitle);
      setActive(true);
    }
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (newSearchParams.has(type, localTitle)) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [searchParams]);

  return (
    <button
      onClick={onChange}
      className="dt-header__add-btn btn--info"
      style={{
        background: active ? '#DDF2FD' : '',
        borderColor: active ? '#086ED6' : '',
        color: active ? '#086ED6' : '',
      }}
    >
      {title}
    </button>
  );
}
export default CheckButton;
