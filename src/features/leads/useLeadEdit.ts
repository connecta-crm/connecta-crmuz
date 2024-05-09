import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Leads from '../../services/leads';

export type LeadEditParamsType = {
  guid: string;
  updateLeadModel: object;
};

export function useLeadEdit() {
  const queryClient = useQueryClient();
  const {
    mutate: editLead,
    isPending: isLoading,
    isError: error,
    data: updatedLeadData,
  } = useMutation({
    mutationFn: ({ guid, updateLeadModel }: LeadEditParamsType) =>
      Leads.editLead({ guid, updateLeadModel }),
    onSuccess: (data) => {
      queryClient.setQueryData(['leadEdit'], data);
      toast.success('Lead successfully edited');
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, updatedLeadData, editLead, error };
}
