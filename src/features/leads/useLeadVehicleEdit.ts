import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Leads from '../../services/leads';

export type LeadEditVehicleParamsType = {
  id: number;
  vehicleYear: number | string;
  vehicle: number;
  lead: number;
};

export function useLeadVehicleEdit() {
  const queryClient = useQueryClient();
  const {
    mutate: editLeadVehicle,
    isPending: isLoading,
    isError: error,
    data: updatedLeadVehicleData,
  } = useMutation({
    mutationFn: ({
      id,
      lead,
      vehicle,
      vehicleYear,
    }: LeadEditVehicleParamsType) =>
      Leads.editLeadVehicle({ id, lead, vehicle, vehicleYear }),
    onSuccess: (data) => {
      queryClient.setQueryData(['leadEditVehicle'], data);
      toast.success('Lead Vehicle successfully edited');
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, updatedLeadVehicleData, editLeadVehicle, error };
}
