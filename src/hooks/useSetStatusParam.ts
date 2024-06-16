import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useSetStatusParam(statusValue: 'leads' | 'quote' | 'orders') {
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
