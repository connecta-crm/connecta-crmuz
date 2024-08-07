import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Company from '../../services/company';
export function useUpdateCompany() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: { id: number, data: FormData }) => Company.updateCompany(item),
    onSuccess: () => {
      message.success('Company updated');
      queryClient.invalidateQueries({ queryKey: ['companys'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
