import ConfirmCodeForm from '../features/authentication/ConfirmCodeForm';
import AuthLayout from '../ui/AuthLayout';

function ConfirmCode() {
  return (
    <AuthLayout title="Reset your password">
      <ConfirmCodeForm />
    </AuthLayout>
  );
}

export default ConfirmCode;
