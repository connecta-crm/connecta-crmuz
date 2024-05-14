import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { setToken } from '../features/authentication/authSlice';
import Profile from '../services/profile';
import { useAppDispatch } from '../store/hooks';

export function useRefreshToken() {
  const dispatch = useAppDispatch();
  const { mutate: refreshToken, isError } = useMutation({
    mutationFn: (refreshTokenValue: string) =>
      Profile.refreshToken(refreshTokenValue),
    onSuccess: (data) => {
      dispatch(setToken({ access_token: data.access }));
    },
    onError: (err) => {
      console.log('ERROR', err);
      message.error('Error occured getting refresh token');
    },
  });

  return { refreshToken, error: isError };
}
