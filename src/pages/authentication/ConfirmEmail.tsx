import ConfirmEmailForm from '../../features/authentication/ConfirmEmailForm';
import LoginHeading from '../../ui/LoginHeading';

function ConfirmEmail() {
  return (
    <>
      <LoginHeading title="Reset your password" />
      <ConfirmEmailForm />
    </>
  );
}
export default ConfirmEmail;
