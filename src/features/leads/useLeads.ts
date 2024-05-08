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

  const {
    data: { results: leads, count, sumPrice } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['leads', limit, offset, sources, q, status],
    queryFn: () =>
      Leads.getLeads({ limit, offset, source: sources, q, status }),
  });
  return { leads, count, sumPrice, isLoading, error };
}
