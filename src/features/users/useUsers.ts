import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Users from '../../services/users';
export type UsersParamsType = {
  url?: string;
};

export function useUsers(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: users,
    isPending: isLoading,
    isFetching: isFetchingUsers,
    error,
  } = useQuery({
    queryKey: ['users', url],
    queryFn: () => Users.getUsers({ url }),
    enabled,
  });
  return { users, isLoading, isFetchingUsers, error };
}
