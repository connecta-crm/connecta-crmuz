import { ReactNode, useState } from 'react';
import { CarType } from '../../features/vehicle/VehicleContainer';
import add from '/img/add.svg';
import remove from '/img/remove.svg';
export default function DownCollapse({
  children,
  title,
  vehicleAdd,
  vehicleRemove,
  img,
}: {
  children: ReactNode;
  title: string;
  vehicleAdd?: (car: CarType) => void;
  vehicleRemove?: () => void;
  img?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="down__collapse">
      <div className="down__collapse__header">
        <div
          className="down__collapse__header-item"
          onClick={() => setShow(!show)}
        >
          {img ? (
            <img alt="" src={img}></img>
          ) : (
            <img src="./img/sports-car.svg" alt="" width="20px" height="20px" />
          )}

          <span>{title}</span>
        </div>
        <div className="down__collapse__header-item">
          {title.includes('Vehicle') ? (
            <>
              {title == 'Vehicle' ? (
                <a
                  onClick={() =>
                    vehicleAdd &&
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
