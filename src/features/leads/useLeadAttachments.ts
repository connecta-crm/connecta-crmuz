import { useQuery } from '@tanstack/react-query';
import Leads from '../../services/leads';
import { useAppSelector } from '../../store/hooks';
import { getLeadData } from './leadSlice';

export function useLeadAttachments() {
  const { id } = useAppSelector(getLeadData);
  const {
    data: { results: leadAttachments, count } = {},
    isFetching: isLoadingLeadAttachments,
    error,
  } = useQuery({
    queryKey: ['leadAttachments'],
    queryFn: () => Leads.getLeadAttachments(id),
  });
  return { leadAttachments, count, isLoadingLeadAttachments, error };
}
