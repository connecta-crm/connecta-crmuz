import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { UsersTableDataType } from './usersTableDataType';
import Users from '../../services/users';

export function useCreateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: UsersTableDataType) => Users.createUser(item),
    onSuccess: () => {
      message.success('User created');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
