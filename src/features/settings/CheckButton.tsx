import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
export default function CheckButton({
  title,
  type,
}: {
  title: string;
  type: string;
}) {
  const [active, setActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const newSearchParams = new URLSearchParams(searchParams);

  const onChange = () => {
    setActive(!active);
  };
  useEffect(() => {
    if (active) {
      newSearchParams.append(type, title.toLowerCase());
    } else {
      const filteredSources = newSearchParams
        .getAll(type)
        .filter((status) => status !== title.toLowerCase());
      newSearchParams.delete(type);
      filteredSources.forEach((status) => newSearchParams.append(type, status));
    }
    setSearchParams(newSearchParams);
  }, [active]);

  useEffect(() => {
    if (newSearchParams.has(type, title.toLowerCase())) {
      setActive(true);
    } else {
      setActive(false);
    }
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
