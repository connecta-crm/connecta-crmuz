import { message } from 'antd';
import { useEffect, useState } from 'react';
import Vehicle from './Vehicle';
export type CarType = {
  id: number;
  vehicle: string;
  vehicleYear: string;
  lot?: string;
  vin?: string;
  color?: string;
  plate?: string;
};
export default function VehicleContainer({
  setCarData,
  type,
}: {
  setCarData: (a: CarType[]) => void;
  type?: boolean;
}) {
  const [cars, setCar] = useState<CarType[]>([
    {
      id: 1,
      vehicle: '',
      vehicleYear: '',
      lot: '',
      vin: '',
      color: '',
      plate: '',
    },
  ]);

  const vehicleAdd = (a: CarType) => {
    if (!type) {
      for (let i = 0; i < cars.length; i++) {
        if (!cars[i].vehicle && !cars[i].vehicleYear) {
          message.error('Vehicle  required !');
          return;
        }
      }
      setCar([...cars, a]);
      return;
    }

    for (let i = 0; i < cars.length; i++) {
      if (
        !cars[i].vehicle &&
        !cars[i].vehicleYear &&
        !cars[i].color &&
        !cars[i].lot &&
        !cars[i].plate &&
        !cars[i].vin
      ) {
        message.error('Vehicle  required !');
        return;
      }
    }
    setCar([...cars, a]);
  };

  const vehicleRemove = (id: number) => {
    setCar(() => cars.filter((item) => item.id !== id));
    message.success('Vehicle deleted!');
  };
  const getCarValue = (a: CarType) => {
    if (type) {
      if (a.vehicle && a.vehicleYear && a.color && a.lot && a.plate && a.vin) {
        const f = cars.map((item) => {
          if (item.id == a.id) {
            item.vehicle = a.vehicle;
            item.vehicleYear = a.vehicleYear;
            item.vin = a?.vin;
            item.lot = a?.lot;
            item.color = a?.color;
            item.plate = a?.plate;
          }
          return item;
        });
        setCar(f);
        // message.success('Vehicle selected');
      }
      return;
    }
    if (a.vehicle && a.vehicleYear) {
      const f = cars.map((item) => {
        if (item.id == a.id) {
          item.vehicle = a.vehicle;
          item.vehicleYear = a.vehicleYear;
        }
        return item;
      });
      setCar(f);
      message.success('Vehicle selected');
    }
  };

  useEffect(() => {
    setCarData(
      cars.filter((item: CarType) => item.vehicle && item.vehicleYear),
    );
  }, [cars]);

  return (
    <>
      {cars.map((item, index) => (
        <Vehicle
          type={type}
          getCarValue={getCarValue}
          carId={item.id}
          vehicleAdd={vehicleAdd}
          vehicleRemove={() => vehicleRemove(item.id)}
          key={item.id}
          title={'Vehicle' + (item.id == 1 ? '' : '#' + (index + 1))}
        />
      ))}
    </>
  );
}
