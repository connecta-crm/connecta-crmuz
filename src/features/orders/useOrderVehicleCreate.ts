import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export type OrderCreateVehicleParams = {
  vehicleYear: number | string;
  vehicle: number | null;
  order: number;
};

export function useOrderVehicleCreate() {
  const queryClient = useQueryClient();
  const {
    mutate: createOrderVehicle,
    isPending: isLoading,
    isError: error,
    data: createdOrderVehicleData,
  } = useMutation({
    mutationFn: ({ order, vehicle, vehicleYear }: OrderCreateVehicleParams) =>
      Orders.addOrderVehicle({ order, vehicle, vehicleYear }),
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
