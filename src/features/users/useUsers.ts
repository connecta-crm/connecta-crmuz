import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Users from '../../services/users';
export type UsersParamsType = {
  url?: string;
};

export function useUsers() {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: users,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['users', url],
    queryFn: () => Users.getUsers({ url }),
  });
  return { users, isLoading, error };
}
