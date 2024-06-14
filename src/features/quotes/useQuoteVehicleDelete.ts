import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Quotes from '../../services/quotes';

export function useQuoteVehicleDelete() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteQuoteVehicle,
    isPending: isLoadingDeleteQuoteVehicle,
    isError: error,
    isSuccess: isSuccessDeleteVehicle,
  } = useMutation({
    mutationFn: (id: number | undefined) => Quotes.deleteQuoteVehicle(id),
    onSuccess: (data) => {
      queryClient.setQueryData(['quoteDelete'], data);
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      queryClient.invalidateQueries({ queryKey: ['quote'] });
      message.success('Quote Vehicle successfully deleted');
    },
    onError: (err) => message.error(err.message),
  });

  return {
    isLoadingDeleteQuoteVehicle,
    deleteQuoteVehicle,
    isSuccessDeleteVehicle,
    error,
  };
}
