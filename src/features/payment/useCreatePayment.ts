import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Payment from '../../services/payment';
// import { PaymentTableDataType } from './PaymentTableDataType';
export function useCreatePayemnt() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: FormData) => Payment.createPayment(item),
    onSuccess: () => {
      message.success('Payment created');
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
