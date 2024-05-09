import { useQuery } from '@tanstack/react-query';
import Vehicles from '../../services/vehicles';

export function useCarModels(
  enabled: boolean,
  q: string | null,
  vehicleMarkId: number | null,
) {
  const {
    isFetching: isLoading,
    data: { results: carModels } = {},
    isError,
  } = useQuery({
    queryKey: ['carModels', q, vehicleMarkId],
    queryFn: () => Vehicles.getCarModels({ q, vehicleMarkId }),
    enabled,
  });

  return { isLoading, carModels, error: isError };
}
