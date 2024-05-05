import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Leads from '../../services/leads';

export function useMake(text: string | undefined) {
  const { data, isSuccess } = useQuery({
    queryKey: ['mark', text],
    queryFn: () => Leads.getMake(text),
    enabled: !!text,
  });
  if (isSuccess) return data.results;
  return [];
}

export function useModel(text: undefined | { mark: string; q: string }) {
  const { data, isSuccess } = useQuery({
    queryKey: ['model', text],
    queryFn: () => Leads.getModel(text),
    enabled: !!(text?.mark || text?.q),
  });

  if (isSuccess) return data.results;
  return [];
}

export function useCity(text: string | null) {
  const { data, isSuccess } = useQuery({
    queryKey: ['city', text],
    queryFn: () => Leads.getCity(text),
    enabled: !!text,
  });
  if (isSuccess) return data.results;
  return [];
}

export function useSource() {
  const { data, isSuccess } = useQuery({
    queryKey: ['source'],
    queryFn: () => Leads.getSource(),
  });
  if (isSuccess) return data;
  return [];
}

export function usePerson(text: string) {
  const { data, isSuccess } = useQuery({
    queryKey: ['person', text],
    queryFn: () => Leads.getPerson(text),
    enabled: !!text,
  });
  if (isSuccess) return data.results;
  return [];
}

export function useCreatePerson() {
  const {
    mutate: createPerson,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (item: { name: string; email: string; phone: string }) =>
      Leads.createPerson(item),
    onSuccess: () => {
      toast.success('Customer created');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createPerson, isLoading, isSuccess };
}

export function useCreateNumber() {
  const {
    mutate: createNumber,
    data: saveNumber,
    isPending,
    isSuccess: isCreatedSuccess,
  } = useMutation({
    mutationFn: (item: { customer: string; phone: string }) =>
      Leads.createNumber(item),
    onSuccess: () => {
      toast.success('Customer created');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createNumber, isPending, isCreatedSuccess, saveNumber };
}

export function useCreateLead() {
  const queryClient = useQueryClient()
  const { mutate: create, isPending: isLoading,isSuccess } = useMutation({
    mutationFn: (item) => Leads.createLead(item),
    onSuccess: () => {
      toast.success('Lead created');
      queryClient.invalidateQueries({ queryKey: ['leads'] })
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { create,isLoading,isSuccess };
}
