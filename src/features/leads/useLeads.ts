import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Leads from '../../services/leads';
import { DEFAULT_LIMIT } from '../../utils/constants';

export type LeadsParamsType = {
  limit: number;
  offset: number;
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

  const {
    data: { results: leads, count, sumPrice } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['leads', limit, offset],
    queryFn: () => Leads.getLeads({ limit, offset }),
  });
  return { leads, count, sumPrice, isLoading, error };
}
