import { useQuery } from '@tanstack/react-query';
import Users from '../../services/users';

export type UserTeamsParams = 'leads' | 'quote' | 'orders' | undefined;

export function useUserTeams(type: UserTeamsParams, open: boolean) {
  const {
    data: userTeams,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: [`${type}Teams`],
    queryFn: () => Users.getUserTeams(type),
    enabled: !!type && open,
  });
  return { userTeams, isLoading, error };
}
