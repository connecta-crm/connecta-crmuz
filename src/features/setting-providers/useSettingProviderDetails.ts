import { useQuery } from '@tanstack/react-query';
import SettingProviders from '../../services/setting-providers';

export function useSettingProviderDetails(id: number | null) {
  const {
    data: provider,
    isLoading: isLoadingUser,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['providers-deatils', id],
    queryFn: () => SettingProviders.getProviderDetails(id),
    enabled: !!id,
  });
  return { provider, isLoadingUser, error, isFetchingTeam };
}
