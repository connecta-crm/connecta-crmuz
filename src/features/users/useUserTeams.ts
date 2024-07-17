import { useQuery } from '@tanstack/react-query';
import { useGetSearchParams } from '../../hooks/useGetSearchParams';
import Users from '../../services/users';

export type UserTeamsParams = 'leads' | 'quote' | 'orders' | undefined;

export function useUserTeams(type: UserTeamsParams, open: boolean) {
  const { status } = useGetSearchParams();
  const {
    data: userTeams,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: [`${type}Teams`, status],
    queryFn: () => Users.getUserTeams(type, status),
    enabled: !!type && open,
  });
  return { userTeams, isLoading, error };
}
