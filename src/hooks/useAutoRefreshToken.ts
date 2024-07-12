import { useEffect } from 'react';
import { getRefreshToken } from '../features/authentication/authSlice';
import { useAppSelector } from '../store/hooks';
import { useRefreshToken } from './useRefreshToken';

export function useAutoRefreshToken() {
  const { refreshToken, error } = useRefreshToken();
  const refreshTokenValue = useAppSelector(getRefreshToken);
  useEffect(() => {
    if (!refreshTokenValue) return;

    const interval = setInterval(() => {
      refreshToken(refreshTokenValue);
    }, 290000); // refresh every 4 90 seconds
    // 15 * 60 * 1000); // Refresh token every 15 minutes
    return () => clearInterval(interval);
  }, [refreshTokenValue, refreshToken]);

  return { error };
}
