import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import Leads from '../../services/leads';

export function useLead(guid: string | null) {
  const {
    data: lead,
    isPending: isLoading,
    isFetching: isFetchingLead,
    error,
  } = useQuery({
    queryKey: ['lead', guid],
    queryFn: () => Leads.getLead(guid),
    enabled: !!guid,
    retry: 1,
  });

  if (error) message.error(error.message);

  return { lead, isLoading, isFetchingLead, error };
}
