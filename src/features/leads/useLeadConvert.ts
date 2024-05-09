import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Leads from '../../services/leads';

export type LeadConvertParams = {
  guid: string;
  price: number | null;
  reservationPrice: number | null;
};

export function useLeadConvert() {
  const queryClient = useQueryClient();
  const {
    mutate: leadConvert,
    isPending: isLoading,
    isError: error,
  } = useMutation({
    mutationFn: ({ guid, price, reservationPrice }: LeadConvertParams) =>
      Leads.leadConvert({ guid, price, reservationPrice }),
    onSuccess: (data) => {
      queryClient.setQueryData(['leadConvert'], data);
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead'] });
      toast.success('Lead Convert successfully changed');
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, leadConvert, error };
}
