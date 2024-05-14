import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginParams } from '../../models';
import Profile from '../../services/profile';
import { useAppDispatch } from '../../store/hooks';
import { setRefreshToken, setToken } from './authSlice';

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginParams) =>
      Profile.login({ email, password }),
    onSuccess: ({ access, refresh }) => {
      // queryClient.invalidateQueries(['user']);
      dispatch(setToken({ access_token: access }));
      dispatch(setRefreshToken({ refresh_token: refresh }));
      navigate('/leads', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      message.error('Provided email or password are incorrect');
    },
  });

  return {
    login,
    isLoading,
  };
}
