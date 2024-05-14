import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Profile from '../../services/profile';

export function useConfirmCode() {
  const navigate = useNavigate();

  const { mutate: sendConfirmEmail, isPending: isLoading } = useMutation({
    mutationFn: ({ email }: { email: string }) => Profile.getConfirmCode(email),
    onSuccess: (data) => {
      navigate('/auth/confirm/code', { replace: true });
      message.success(data.message);
      console.log('sendConfirmEmail', data);
    },
    onError: (err) => {
      console.log(err);
      message.error(err.message);
    },
  });

  return {
    sendConfirmEmail,
    isLoading,
  };
}
