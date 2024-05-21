import React from 'react';

export default function FormControl({
  children,
  title,
  img,
}: {
  children: React.ReactNode;
  title: string;
  img?: string;
}) {
  return (
    <div className="form__controller m-0">
      <div className="form__controller__item input__col ">
        <div className="down__collapse__header-item">
          {title !== 'add' ? (
            <>
              {!img ? (
                <img
                  src="./img/sports-car.svg"
                  alt=""
                  width="20px"
                  height="20px"
                />
              ) : (
                <img src={img} 
                alt="" 
                width="20px" 
                height="20px" />
              )}
              <span>{title}</span>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="form__controller__item input__col">{children}</div>
    </div>
  );
}
