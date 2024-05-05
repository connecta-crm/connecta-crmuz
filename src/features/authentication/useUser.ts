import { useQuery } from '@tanstack/react-query';
import Profile from '../../services/profile';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getToken, setCredentials } from './authSlice';

export function useUser() {
  const token = useAppSelector((state) => getToken(state));
  const dispatch = useAppDispatch();

  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['user', token],
    queryFn: () => Profile.getCurrentUser(),
    enabled: !!token,
  });

  console.log(data);

  const userData = data?.user;
  if (userData && !isLoading) {
    dispatch(setCredentials(userData));
  }

  return { isLoading, userData, error: isError };
}
