import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export type OrderCreateVehicleParams = {
  vehicleYear: number | string;
  vehicle: number | null;
  order: number;
  lot: string;
  vin: string;
  color: string;
  plate: string;
};

export function useOrderVehicleCreate() {
  const queryClient = useQueryClient();
  const {
    mutate: createOrderVehicle,
    isPending: isLoading,
    isError: error,
    data: createdOrderVehicleData,
  } = useMutation({
    mutationFn: ({
      order,
      vehicle,
      vehicleYear,
      lot,
      vin,
      color,
      plate,
    }: OrderCreateVehicleParams) =>
      Orders.addOrderVehicle({
        order,
        vehicle,
        vehicleYear,
        lot,
        vin,
        color,
        plate,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(['orderCreateVehicle'], data);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
      message.success('Order Vehicle successfully created');
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, createdOrderVehicleData, createOrderVehicle, error };
}
