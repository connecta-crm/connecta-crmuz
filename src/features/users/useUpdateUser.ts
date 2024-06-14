import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Users from '../../services/users';
import { UsersTableDataType } from './usersTableDataType';
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: UsersTableDataType) => Users.updateUser(item),
    onSuccess: () => {
      message.success('User updated');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
