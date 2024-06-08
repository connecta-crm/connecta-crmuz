import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Templates from '../../services/templates';
export type GroundParamsType = {
  url?: string;
};

export function useTemplates(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data:templates,
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['templates', url],
    queryFn: () => Templates.getTemplates({ url }),
    enabled,
  });

  return { templates, isLoading, error, isFetchingTeam };
}
