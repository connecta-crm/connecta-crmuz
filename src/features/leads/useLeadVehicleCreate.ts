import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Leads from '../../services/leads';

export type LeadCreateVehicleParams = {
  vehicleYear: number | string;
  vehicle: number | null;
  lead: number;
};

export function useLeadVehicleCreate() {
  const queryClient = useQueryClient();
  const {
    mutate: createLeadVehicle,
    isPending: isLoading,
    isError: error,
    data: createdLeadVehicleData,
  } = useMutation({
    mutationFn: ({ lead, vehicle, vehicleYear }: LeadCreateVehicleParams) =>
      Leads.addLeadVehicle({ lead, vehicle, vehicleYear }),
    onSuccess: (data) => {
      queryClient.setQueryData(['leadCreateVehicle'], data);
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead'] });

      message.success('Lead Vehicle successfully created');
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, createdLeadVehicleData, createLeadVehicle, error };
}
