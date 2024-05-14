import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Leads from '../../services/leads';
import { VehicleFormData } from './vehicleSlice';

export function useEditVehicle() {
  // const queryClient = useQueryClient();
  const { mutate: editVehicle, isPending: isLoading } = useMutation({
    mutationFn: (formData: VehicleFormData) =>
      Leads['vehicleEditFake'](formData),
    onSuccess: () => {
      message.success('Vehicle successfully edited');
      // const success = () => {
      // };
      // queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, editVehicle };
}
