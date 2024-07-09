import LoginForm from '../../features/authentication/LoginForm';
import LoginHeading from '../../ui/LoginHeading';
function Login() {
  return (
    <>
      <LoginHeading title="Welcome back!" />
      <LoginForm />
    </>
  );
}

export default Login;
