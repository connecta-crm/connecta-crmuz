import LoginForm from '../features/authentication/LoginForm';
import AuthLayout from '../ui/AuthLayout';
function Login() {
  return (
    <AuthLayout title="Welcome meta!">
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
