import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Leads from '../../services/leads';

export type EditLeadProps = {
  guid: string;
  updatedLeadData: object;
};

export function useEditLead() {
  const queryClient = useQueryClient();
  const {
    mutate: editLead,
    isPending: isLoading,
    isError: error,
  } = useMutation({
    mutationFn: ({ guid, updatedLeadData }: EditLeadProps) =>
      Leads.editLead({ guid, updatedLeadData }),
    onSuccess: (data) => {
      queryClient.setQueryData(['lead'], data);
      toast.success('Lead successfully edited');
      console.log('DATA', data);
      // queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, editLead, error };
}
