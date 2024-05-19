import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { LeadDataType } from '../../models';
import Leads from '../../services/leads';

export function useMake(text: string | undefined) {
  const { data: { results: makes } = {}, isFetching } = useQuery({
    queryKey: ['mark', text],
    queryFn: () => Leads.getMake(text),
    enabled: !!text,
  });
  return { makes, isFetching };
}

export function useModel(
  text: DefaultOptionType | undefined | { mark: string; q: string },
  enabled: boolean,
) {
  const { data: { results: models } = {}, isFetching } = useQuery({
    queryKey: ['model', text],
    queryFn: () => Leads.getModel(text),
    enabled,
  });
  return { models, isFetching };
}

export function useCity(text: string | null) {
  const {
    data: { results: citys } = {},
    isPending: isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['city', text],
    queryFn: () => Leads.getCity(text),
    enabled: !!text,
  });
  return { citys, isLoading, isFetching, error };
}

export function useSource(enabled: boolean) {
  const { data: sources, isFetching } = useQuery({
    queryKey: ['source'],
    queryFn: () => Leads.getSource(),
    enabled,
  });
  return { sources, isFetching };
}

export function usePerson(text: string) {
  const { data: { results: personData } = {}, isFetching } = useQuery({
    queryKey: ['person', text],
    queryFn: () => Leads.getPerson(text),
    enabled: !!text,
  });
  return { personData, isFetching };
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
      message.success('Customer created');
    },
    onError: (err) => {
      message.error(err.message);
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
      message.success('Customer created');
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { createNumber, isPending, isCreatedSuccess, saveNumber };
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: LeadDataType) => Leads.createLead(item),
    onSuccess: () => {
      message.success('Lead created');
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
