import ConfirmCodeForm from '../../features/authentication/ConfirmCodeForm';
import LoginHeading from '../../ui/LoginHeading';

function ConfirmCode() {
  return (
    <>
      <LoginHeading title="Reset your password" />
      <ConfirmCodeForm />
    </>
  );
}

export default ConfirmCode;
