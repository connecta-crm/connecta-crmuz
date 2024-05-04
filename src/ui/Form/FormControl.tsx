import React from 'react';

export default function FormControl({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="form__controller ">
      <div className="form__controller__item input__col">
        <div className="down__collapse__header-item">
          {title !== 'add' ? (
            <>
              <img
                src="./img/sports-car.svg"
                alt=""
                width="20px"
                height="20px"
              />
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
