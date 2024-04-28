import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Profile from '../../services/profile';

export function useConfirmCode() {
  const navigate = useNavigate();

  const { mutate: sendConfirmEmail, isPending: isLoading } = useMutation({
    mutationFn: ({ email }: { email: string }) => Profile.getConfirmCode(email),
    onSuccess: (data) => {
      navigate('/auth/confirm/code', { replace: true });
      toast.success(data.message);
      console.log('sendConfirmEmail', data);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return {
    sendConfirmEmail,
    isLoading,
  };
}
