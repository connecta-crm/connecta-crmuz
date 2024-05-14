import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Profile from '../../services/profile';
import { useAppDispatch } from '../../store/hooks';
import { setRefreshToken, setToken } from './authSlice';

export function useConfirmOtp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: confirmOtp, isPending: isLoading } = useMutation({
    mutationFn: ({ email, code }: { email: string | null; code: string }) =>
      Profile.confirmOtp({ email, code }),
    onSuccess: ({ access, refresh, message }) => {
      message.success(message);
      console.log('access, refresh', access, refresh);
      dispatch(setToken({ access_token: access }));
      dispatch(setRefreshToken({ refresh_token: refresh }));
      navigate('/auth/confirm/password', { replace: true });
    },
    onError: (err) => {
      console.log(err);
      message.error(err.message);
    },
  });

  return {
    confirmOtp,
    isLoading,
  };
}
