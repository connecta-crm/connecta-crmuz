import { useQuery } from '@tanstack/react-query';
import Leads from '../../services/leads';

export function useLeadsMake(text: string | undefined) {
  const { data, isSuccess } = useQuery({
    queryKey: ['lead-marks', text],
    queryFn: () => Leads.getMake(text),
  });
  if (isSuccess) return data.results;
  return [];
}

export function useLeadsModel(id: number | null,text:string|undefined) {
  const { data, isSuccess } = useQuery({
    queryKey: ['lead-model', id,text],
    queryFn: () => Leads.getModel(id,text),
  });
  
  if (isSuccess)return data.results;
  return [];
}

export function useLeadsCity(text: string | null) {
  const { data, isSuccess } = useQuery({
    queryKey: ['lead-city', text],
    queryFn: () => Leads.getCity(text),
  });
  if (isSuccess) return data.results;
  return [];
}

export function useLeadsSource() {
  const { data, isSuccess } = useQuery({
    queryKey: ['lead-source'],
    queryFn: () => Leads.getSource(),
  });
  if (isSuccess) return data;
  return [];
}

export function useLeadsPerson(text:string) {
  const { data, isSuccess } = useQuery({
    queryKey: ['lead-source',text],
    queryFn: () => Leads.getPerson(text),
  });
  if (isSuccess) return data;
  return [];
}