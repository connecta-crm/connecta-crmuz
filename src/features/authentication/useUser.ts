import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Profile from '../../services/profile';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getToken, setCredentials } from './authSlice';

export function useUser() {
  const token = useAppSelector((state) => getToken(state));
  const dispatch = useAppDispatch();
  const [initialLoad, setInitialLoad] = useState(true);

  const { data, isError } = useQuery({
    queryKey: ['user', token],
    queryFn: () => Profile.getCurrentUser(),
    enabled: !!token,
  });

  useEffect(() => {
    if (data?.user) {
      dispatch(setCredentials(data.user));
    }
    if (initialLoad) setInitialLoad(false);
  }, [data, dispatch, initialLoad]);

  return { isLoading: initialLoad, userData: data?.user, error: isError };
}
