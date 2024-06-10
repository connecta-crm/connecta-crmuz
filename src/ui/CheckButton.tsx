import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
export default function CheckButton({
  title,
  type,
  drop=false,
}: {
  title: string;
  type: string;
  drop?:boolean
}) {
  let localTitle = title;
  const [active, setActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

   if(window.location.pathname.includes("users")&&type==="status"&&localTitle==="active"){
    type="isActive";
    localTitle = "true"
   }
   if(window.location.pathname.includes("users")&&type==="status"&&localTitle==="inactive"){
    type="isActive";
    localTitle = "false"
   }

   if(window.location.pathname.includes("roles")&&type==="status"&&localTitle==="active"){
    type="accessStatus";
   }
   if(window.location.pathname.includes("roles")&&type==="status"&&localTitle==="inactive"){
    type="accessStatus";
   }


  const onChange = () => {
    if (newSearchParams.has(type, localTitle)) {
      newSearchParams.delete(type, localTitle);
      setActive(false);
    } else {
      // newSearchParams.append(type, localTitle);
      newSearchParams.set(type, localTitle);
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
    <div
      onClick={onChange}
      className="dt-header__add-btn btn--info"
      style={{
        background: active ? '#ddf2fd' :drop?"": '#f5f5f5',
        borderColor: active ? '#086ED6' : '',
        color: active ? '#086ED6' : '',
        margin:drop?"0px":"",
        height:drop?"20px":""
      }}
    >
      {title}
    </div>
  );
}
