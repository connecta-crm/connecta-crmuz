import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export type OrderEditVehicleParamsType = {
  id: number;
  vehicleYear: number | string;
  vehicle: number;
  order: number;
  lot: string;
  vin: string;
  color: string;
  plate: string;
};

export function useOrderVehicleEdit() {
  const queryClient = useQueryClient();
  const {
    mutate: editOrderVehicle,
    isPending: isLoading,
    isError: error,
    data: updatedOrderVehicleData,
  } = useMutation({
    mutationFn: ({
      id,
      order,
      vehicle,
      vehicleYear,
      color,
      vin,
      plate,
      lot,
    }: OrderEditVehicleParamsType) =>
      Orders.editOrderVehicle({
        id,
        order,
        vehicle,
        vehicleYear,
        color,
        vin,
        plate,
        lot,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(['orderEditVehicle'], data);
      message.success('Order Vehicle successfully edited');
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, updatedOrderVehicleData, editOrderVehicle, error };
}
