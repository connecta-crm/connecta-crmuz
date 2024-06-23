import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type StatusParamType = 'leads' | 'quote' | 'orders' | 'tasks';

export function useSetStatusParam(statusValue: StatusParamType) {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status');

  useEffect(() => {
    if (!status) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.append('status', statusValue);
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [status, searchParams]);
}
