import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Leads from '../../services/leads';
import { DEFAULT_LIMIT } from '../../utils/constants';

export type LogsParamsType = {
  limit: number;
  offset: number;
  id: number;
};

export function useLeadLogs(id: number) {
  const [searchParams] = useSearchParams();

  const limit = !searchParams.get('limit')
    ? DEFAULT_LIMIT
    : Number(searchParams.get('limit'));

  const offset = !searchParams.get('offset')
    ? 1
    : Number(searchParams.get('offset'));

  const {
    data: { results: leadLogs } = {},
    isPending: isLoadingLeadLogs,
    error,
  } = useQuery({
    queryKey: ['leadLogs', limit, offset, id],
    queryFn: () => Leads.getLeadLogs({ limit, offset, id }),
    enabled: !!id,
  });
  return { leadLogs, isLoadingLeadLogs, error };
}
