import ConfirmPasswordForm from '../features/authentication/ConfirmPasswordForm';
import AuthLayout from '../ui/AuthLayout';

function ConfirmPassword() {
  return (
    <AuthLayout title="Reset your password">
      <ConfirmPasswordForm />
    </AuthLayout>
  );
}

export default ConfirmPassword;
