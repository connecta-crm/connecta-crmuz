import { useQuery } from '@tanstack/react-query';
import { useGetSearchParams } from '../../hooks/useGetSearchParams';
import Leads from '../../services/leads';

export type LeadsParamsType = {
  limit: number;
  offset: number;
  q: string;
  status: string;
  source?: string[];
  user?: string[];
};

export function useLeads() {
  const { limit, offset, q, status, sources, user } = useGetSearchParams();

  const {
    data: { results: leads, count } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['leads', limit, offset, sources, q, status, user],
    queryFn: () =>
      Leads.getLeads({ limit, offset, source: sources, q, status, user }),
  });
  return { leads, count, isLoading, error };
}
