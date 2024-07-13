import { useQuery } from '@tanstack/react-query';
import Status from '../../services/status';
export type GroundParamsType = {
  url?: string;
};

export function useSmsTemplate(enabled: boolean) {
  const {
    data: smsTemplates,
    isFetching: isLoadingSmsTemplate,
    // isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['sms-template'],
    queryFn: () => Status.getSmsTemplate(),
    enabled,
  });

  return { smsTemplates, isLoadingSmsTemplate, error,  };
}
