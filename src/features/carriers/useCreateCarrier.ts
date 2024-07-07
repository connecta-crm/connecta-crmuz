import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Carriers from '../../services/carriers';

export type CreateCarrierParams = {
  name: string;
  address: string;
  mcNumber: string;
  contactName: string;
  phone: string;
  phone2: string;
  email: string;
  fax: string;
  status: 'favorite' | 'active' | 'inactive' | 'blocked';
  location: number;
};
export function useCreateCarrier() {
  const queryClient = useQueryClient();

  const {
    mutate: createCarrier,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: ({
      name,
      address,
      mcNumber,
      contactName,
      phone,
      phone2,
      email,
      fax,
      status,
      location,
    }: CreateCarrierParams) =>
      Carriers.createCarrier({
        name,
        address,
        mcNumber,
        contactName,
        phone,
        phone2,
        email,
        fax,
        status,
        location,
      }),
    onSuccess: () => {
      message.success('Carrier created');
      queryClient.invalidateQueries({ queryKey: ['carriers'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { createCarrier, isLoading, isSuccess };
}
