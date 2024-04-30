import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Leads from '../../services/leads';
import { PAGE_SIZE } from '../../utils/constants';

export type LeadsParamsType = {
  page: number;
  pageSize: number;
};

export function useLeads() {
  const [searchParams] = useSearchParams();

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  const pageSize = !searchParams.get('pageSize')
    ? PAGE_SIZE
    : Number(searchParams.get('pageSize'));

  // QUERY
  const {
    data: { results: leads, currentPage, totalPages, totalData } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['leads', page, pageSize],
    queryFn: () => Leads.getLeads({ page, pageSize }),
  });
  return { leads, currentPage, totalPages, totalData, isLoading, error };
}
