import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Leads from '../../services/leads';

export type LeadConvertParams = {
  guid: string;
  price: number | null;
  reservationPrice: number | null;
  quote: boolean;
};

export function useLeadConvert() {
  const queryClient = useQueryClient();
  const {
    mutate: leadConvert,
    isPending: isLoading,
    isError: error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ guid, price, reservationPrice, quote }: LeadConvertParams) =>
      Leads.leadConvert({ guid, price, reservationPrice, quote }),
    onSuccess: (data) => {
      queryClient.setQueryData(['leadConvert'], data);
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      // queryClient.invalidateQueries({ queryKey: ['lead'] });
      message.success('Lead Convert successfully changed');
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, leadConvert, isSuccess, error };
}
