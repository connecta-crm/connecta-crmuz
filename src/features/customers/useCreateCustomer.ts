import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Customers from '../../services/customers';

export type CreateCustomerParams = {
  name: string;
  phone: string;
  email: string;
  lastName: string;
};
export function useCreateCustomer() {
  const queryClient = useQueryClient();

  const {
    mutate: create,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: ({ name, phone, email, lastName }: CreateCustomerParams) =>
      Customers.createCustomer({ name, phone, email, lastName }),
    onSuccess: () => {
      message.success('Customer created');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, isSuccess };
}
