import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
export default function CheckButton({ title,data }: { title: string }) {
  const [active, setActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  
  const onChange = () => {
     setSearchParams(data)
    setActive(!active);
  };

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
