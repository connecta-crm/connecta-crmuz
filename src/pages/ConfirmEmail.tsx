import ConfirmEmailForm from '../features/authentication/ConfirmEmailForm';
import AuthLayout from '../ui/AuthLayout';

function ConfirmEmail() {
  return (
    <AuthLayout title="Reset your password">
      <ConfirmEmailForm />
    </AuthLayout>
  );
}
export default ConfirmEmail;
