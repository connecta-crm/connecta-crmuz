import { useQuery } from '@tanstack/react-query';
import Vehicles from '../../services/vehicles';

export function useCarMarks(enabled: boolean, q: string | null) {
  const {
    isFetching: isLoading,
    data: { results: carMarks } = {},
    isError,
  } = useQuery({
    queryKey: ['carMarks', q],
    queryFn: () => Vehicles.getCarMarks(q),
    enabled,
  });

  return { isLoading, carMarks, error: isError };
}
