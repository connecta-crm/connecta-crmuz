import { useQuery } from '@tanstack/react-query';
import Status from '../../services/status';


export function useEmailTemplate(enabled: boolean) {
  const {
    data: emailTemplates,
    isFetching: isLoadingEmailTemplate,
    // isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['email-template'],
    queryFn: () => Status.getEmailTemplate(),
    enabled,
  });

  return { emailTemplates, isLoadingEmailTemplate, error,  };
}
