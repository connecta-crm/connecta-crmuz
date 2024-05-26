import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { RolsTableDataType } from './rolsTableDataType';
import Rols from '../../services/rols';
export function useCreateRole() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: RolsTableDataType) => Rols.createRols(item),
    onSuccess: () => {
      message.success('Role created');
      queryClient.invalidateQueries({ queryKey: ['rols'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
