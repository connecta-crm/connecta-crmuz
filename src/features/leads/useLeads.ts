import { useQuery } from '@tanstack/react-query';
import Leads from '../../services/leads';

export function useLeads() {
  const {
    data: { results: leads, currentPage, totalPages, totalData } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['leads'],
    queryFn: () => Leads.getLeads(),
  });
  return { leads, currentPage, totalPages, totalData, isLoading, error };
}
