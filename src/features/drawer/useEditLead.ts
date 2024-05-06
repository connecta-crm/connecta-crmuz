import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Leads from '../../services/leads';

export type EditLeadProps = {
  guid: string;
  updateLeadData: object;
};

export function useEditLead() {
  const queryClient = useQueryClient();
  const {
    mutate: editLead,
    isPending: isLoading,
    isError: error,
    data: updatedLeadData,
  } = useMutation({
    mutationFn: ({ guid, updateLeadData }: EditLeadProps) =>
      Leads.editLead({ guid, updateLeadData }),
    onSuccess: (data) => {
      queryClient.setQueryData(['lead'], data);
      toast.success('Lead successfully edited');
      console.log('DATA', data);
      // queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, updatedLeadData, editLead, error };
}
