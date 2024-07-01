import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Leads from '../../services/leads';

export function useLeadProviders(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || '';

  const {
    data: leadProviders,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['leadProviders', status],
    queryFn: () => Leads.getLeadProviders(status),
    enabled,
  });
  return { leadProviders, isLoading, error };
}
