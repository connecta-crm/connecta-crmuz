import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Leads from '../../services/leads';
import { DEFAULT_LIMIT } from '../../utils/constants';

export type LeadsParamsType = {
  limit: number;
  offset: number;
  q: string;
  status: string;
  source?: string[];
  user?: string[];
};

export function useLeads() {
  const [searchParams] = useSearchParams();

  const limit = !searchParams.get('limit')
    ? DEFAULT_LIMIT
    : Number(searchParams.get('limit'));

  const offset = !searchParams.get('offset')
    ? 1
    : Number(searchParams.get('offset'));
  // const calculatedOffset = offset - 1;

  const q = searchParams.get('q') || '';
  const status = searchParams.get('status') || '';
  const sources = searchParams.getAll('source');
  const user = searchParams.getAll('user');

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
