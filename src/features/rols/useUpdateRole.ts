import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Roles from '../../services/rols';
import { RolsTableDataType } from './rolsTableDataType';
export function useUpdateRole() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: RolsTableDataType) => Roles.updateRole(item),
    onSuccess: () => {
      message.success('Access role updated');
      queryClient.invalidateQueries({ queryKey: ['rols'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
