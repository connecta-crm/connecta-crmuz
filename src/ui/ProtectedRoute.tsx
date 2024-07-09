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
  const { isLoading, error } = useUser();
  const { error: refreshError } = useAutoRefreshToken();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // if ((!userData && !isLoading) || (error && roles && !roles.some(role => user?.roles.includes(role)))) {

  useEffect(() => {
    if ((!isLoading && error) || refreshError || !isAuthenticated) {
      return navigate('/auth/login');
    }
  }, [isAuthenticated, navigate, isLoading, refreshError]);

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
