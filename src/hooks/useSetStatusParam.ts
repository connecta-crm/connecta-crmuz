import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUser } from '../features/authentication/authSlice';
import { useAppSelector } from '../store/hooks';

type StatusParamType = 'leads' | 'quote' | 'orders' | 'tasks' | '';

export function useSetStatusParam(statusValue: StatusParamType) {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status');
  const user = useAppSelector(getUser);

  console.log('USER', user);

  useEffect(() => {
    if (user?.id && !status) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('status', statusValue);
      newSearchParams.set('user', user.id.toString());
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [user, status, statusValue, searchParams, setSearchParams]);
}
