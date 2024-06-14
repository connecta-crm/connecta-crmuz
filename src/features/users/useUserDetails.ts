import { useQuery } from '@tanstack/react-query';
import Users from '../../services/users';

export function useUserDetails(id: number | null) {
  const {
    data: user,
    isLoading: isLoadingUser,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['user-deatils', id],
    queryFn: () => Users.getUserDetails(id),
    enabled: !!id,
  });
  return { user, isLoadingUser, error, isFetchingTeam };
}
