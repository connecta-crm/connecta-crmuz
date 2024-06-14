import { useQuery } from '@tanstack/react-query';
import Templates from '../../services/templates';

export function useTemplateDetails(id: number | null) {
  const {
    data: template,
    isLoading: isLoadingTeam,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['template-deatils', id],
    queryFn: () => Templates.getTemplatesDetails(id),
    enabled: !!id,
  });
  return { template, isLoadingTeam, error, isFetchingTeam };
}
