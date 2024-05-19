import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Leads from '../../services/leads';

export function useLeadVehicleDelete() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteLeadVehicle,
    isPending: isLoadingDeleteLeadVehicle,
    isError: error,
    isSuccess: isSuccessDeleteVehicle,
  } = useMutation({
    mutationFn: (id: number | undefined) => Leads.deleteLeadVehicle(id),
    onSuccess: (data) => {
      queryClient.setQueryData(['leadDelete'], data);
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead'] });
      message.success('Lead Vehicle successfully deleted');
    },
    onError: (err) => message.error(err.message),
  });

  return {
    isLoadingDeleteLeadVehicle,
    deleteLeadVehicle,
    isSuccessDeleteVehicle,
    error,
  };
}
