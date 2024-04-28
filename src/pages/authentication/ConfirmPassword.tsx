import ConfirmPasswordForm from '../../features/authentication/ConfirmPasswordForm';
import LoginHeading from '../../ui/LoginHeading';

function ConfirmPassword() {
  return (
    <>
      <LoginHeading title="Reset your password" />
      <ConfirmPasswordForm />
    </>
  );
}

export default ConfirmPassword;
