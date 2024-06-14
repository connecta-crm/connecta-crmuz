import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import SettingProviders from '../../services/setting-providers';
export type UsersParamsType = {
  url?: string;
};

export function useSettingProviders() {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data:providers,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['providers', url],
    queryFn: () => SettingProviders.getProviders({ url }),
  });
  return { providers, isLoading, error };
}
