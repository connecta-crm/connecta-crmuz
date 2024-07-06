import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Customers from '../../services/customers';

export type CustomerEditParamsType = {
  id: number;
  updateCustomerModel: object;
};

export function useCustomerEdit() {
  const queryClient = useQueryClient();

  const {
    mutate: editCustomer,
    isPending: isLoading,
    isError: error,
    data: updatedCustomerData,
  } = useMutation({
    mutationFn: ({ id, updateCustomerModel }: CustomerEditParamsType) =>
      Customers.editCustomer({ id, updateCustomerModel }),
    onSuccess: (data) => {
      queryClient.setQueryData(['customerEdit'], data);
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      message.success('Customer successfully edited');
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, updatedCustomerData, editCustomer, error };
}
