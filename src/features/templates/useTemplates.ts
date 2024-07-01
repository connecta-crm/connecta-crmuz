import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Templates from '../../services/templates';
export type GroundParamsType = {
  url?: string;
};

export type TemplatesParamsType = {
  template_status: string;
};

export function useTemplates(enabled: boolean) {
  const [searchParams] = useSearchParams();

  const template_status = searchParams.get('template_status') || 'active';

  const {
    data: templates,
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['templates', template_status],
    queryFn: () => Templates.getTemplates({ template_status }),
    enabled,
  });

  return { templates, isLoading, error, isFetchingTeam };
}
