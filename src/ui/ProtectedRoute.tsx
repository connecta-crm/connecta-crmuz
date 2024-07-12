import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import { useAutoRefreshToken } from '../hooks/useAutoRefreshToken';
import { useAppSelector } from '../store/hooks';
import Spinner from './Spinner';

type ProtectedRouteProps = {
  roles: string[];
};

function ProtectedRoute({ children }: PropsWithChildren<ProtectedRouteProps>) {
  const { isLoading, error: userError } = useUser();
  useAutoRefreshToken();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (userError || !isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate, userError]);

  if (isLoading) {
    return (
      <div className="full-page">
        <Spinner />
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;

// if ((!userData && !isLoading) || (error && roles && !roles.some(role => user?.roles.includes(role)))) {
// if ((!isLoading && error) || refreshError || !isAuthenticated) {

// const { error: refreshError } = useAutoRefreshToken();
