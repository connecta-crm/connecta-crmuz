import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Payment from '../../services/payment';
import { PaymentType } from '../../ui/modal/PaymentModal';
// import { VoipTableDataType } from './PaymentTableDataType';
export function useUpdatePayment() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (data:PaymentType) => Payment.updatePayment(data),
    onSuccess: () => {
      message.success('Payment updated');
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
