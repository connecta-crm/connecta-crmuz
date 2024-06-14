import { useQuery } from '@tanstack/react-query';
import Roles from '../../services/rols';

export function useRoleDetails(id: number | null) {
  const {
    data: role,
    isLoading: isLoadingRole,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['role-deatils', id],
    queryFn: () => Roles.getRoleDetails(id),
    enabled: !!id,
  });
  return { role, isLoadingRole, error, isFetchingTeam };
}
