import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export function useOrderVehicleDelete() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteOrderVehicle,
    isPending: isLoadingDeleteOrderVehicle,
    isError: error,
    isSuccess: isSuccessDeleteVehicle,
  } = useMutation({
    mutationFn: (id: number | undefined) => Orders.deleteOrderVehicle(id),
    onSuccess: (data) => {
      queryClient.setQueryData(['orderDelete'], data);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
      message.success('Order Vehicle successfully deleted');
    },
    onError: (err) => message.error(err.message),
  });

  return {
    isLoadingDeleteOrderVehicle,
    deleteOrderVehicle,
    isSuccessDeleteVehicle,
    error,
  };
}
