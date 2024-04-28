import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Profile from '../../services/profile';
import { useAppDispatch } from '../../store/hooks';
import { logout } from './authSlice';

export function useConfirmPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mutate: confirmPassword, isPending: isLoading } = useMutation({
    mutationFn: ({ password }: { password: string }) =>
      Profile.confirmPassword(password),
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(logout());
      navigate('/auth/login/', { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return {
    confirmPassword,
    isLoading,
  };
}
