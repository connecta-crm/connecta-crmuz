import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Quotes from '../../services/quotes';

export type QuoteCreateVehicleParams = {
  vehicleYear: number | string;
  vehicle: number | null;
  quote: number;
};

export function useQuoteVehicleCreate() {
  const queryClient = useQueryClient();
  const {
    mutate: createQuoteVehicle,
    isPending: isLoading,
    isError: error,
    data: createdQuoteVehicleData,
  } = useMutation({
    mutationFn: ({ quote, vehicle, vehicleYear }: QuoteCreateVehicleParams) =>
      Quotes.addQuoteVehicle({ quote, vehicle, vehicleYear }),
    onSuccess: (data) => {
      queryClient.setQueryData(['quoteCreateVehicle'], data);
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      queryClient.invalidateQueries({ queryKey: ['quote'] });

      message.success('Quote Vehicle successfully created');
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, createdQuoteVehicleData, createQuoteVehicle, error };
}
