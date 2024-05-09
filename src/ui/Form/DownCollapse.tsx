import React, { useState } from 'react';
import add from '../../../public/img/add.svg';
import remove from '../../../public/img/remove.svg';
import { CarType } from '../../features/vehicle/vehicleContainer';
export default function DownCollapse({
  children,
  title,
  vehicleAdd,
  vehicleRemove,
}: {
  children: React.ReactNode;
  title: string;
  vehicleAdd: (car: CarType) => void;
  vehicleRemove: () => void;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="down__collapse">
      <div className="down__collapse__header">
        <div
          className="down__collapse__header-item"
          onClick={() => setShow(!show)}
        >
          <img src="./img/sports-car.svg" alt="" width="20px" height="20px" />
          <span>{title}</span>
        </div>
        <div className="down__collapse__header-item">
          {title.includes('Vehicle') ? (
            <>
              {title == 'Vehicle' ? (
                <a
                  onClick={() =>
                    vehicleAdd({ id: Date.now(), vehicle: '', vehicleYear: '' })
                  }
                >
                  <img alt="" src={add} />
                </a>
              ) : (
                <a onClick={vehicleRemove}>
                  <img alt="" src={remove} />
                </a>
              )}
            </>
          ) : (
            ''
          )}
          <img
            src="./img/down.svg"
            alt=""
            width="14px"
            height="14px"
            onClick={() => setShow(!show)}
          />
        </div>
      </div>
      <div
        className={
          !show
            ? 'down__collapse__body'
            : 'down__collapse__body down__collapse__hide'
        }
      >
        {children}
      </div>
    </div>
  );
}
