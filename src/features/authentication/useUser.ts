import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
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

  const userData = data?.user;
  if (userData) {
    dispatch(setCredentials(userData));
    if (initialLoad) setInitialLoad(false);
  } else {
    if (initialLoad) setInitialLoad(false);
  }

  return { isLoading: initialLoad, userData, error: isError };
}
