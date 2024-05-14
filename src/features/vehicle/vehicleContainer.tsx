import { message } from 'antd';
import { useEffect, useState } from 'react';
import Vehicle from './Vehicle';
export type CarType = {
  id: number;
  vehicle: string;
  vehicleYear: string;
};
export default function VehicleContainer({
  setCarData,
}: {
  setCarData: (a: CarType[]) => void;
}) {
  const [cars, setCar] = useState<CarType[]>([
    { id: 1, vehicle: '', vehicleYear: '' },
  ]);
  const vehicleAdd = (a: CarType) => {
    for (let i = 0; i < cars.length; i++) {
      if (!cars[i].vehicle && !cars[i].vehicleYear) {
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
