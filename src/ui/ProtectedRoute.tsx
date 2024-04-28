import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import { useAutoRefreshToken } from '../hooks/useAutoRefreshToken';

type ProtectedRouteProps = {
  roles: string[];
};

function ProtectedRoute({ children }: PropsWithChildren<ProtectedRouteProps>) {
  const { error: refreshError } = useAutoRefreshToken();

  const { isLoading, userData, error } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    // if ((!userData && !isLoading) || (error && roles && !roles.some(role => user?.roles.includes(role)))) {
    if ((!userData && !isLoading && error) || refreshError) {
      return navigate('/auth/login');
    }
  }, [userData, navigate, isLoading, error, refreshError]);

  if (isLoading) {
    return (
      <div className="full-page">
        <div className="spinner"></div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
