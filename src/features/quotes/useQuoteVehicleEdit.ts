import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Quotes from '../../services/quotes';

export type QuoteEditVehicleParams = {
  id: number;
  vehicleYear: number | string;
  vehicle: number;
  quote: number;
};

export function useQuoteVehicleEdit() {
  const queryClient = useQueryClient();
  const {
    mutate: editQuoteVehicle,
    isPending: isLoading,
    isError: error,
    data: updatedQuoteVehicleData,
  } = useMutation({
    mutationFn: ({ id, quote, vehicle, vehicleYear }: QuoteEditVehicleParams) =>
      Quotes.editQuoteVehicle({ id, quote, vehicle, vehicleYear }),
    onSuccess: (data) => {
      queryClient.setQueryData(['quoteEditVehicle'], data);
      message.success('Quote Vehicle successfully edited');
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, updatedQuoteVehicleData, editQuoteVehicle, error };
}
