import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import { useAppSelector } from '../store/hooks';
import Spinner from './Spinner';

type ProtectedRouteProps = {
  roles: string[];
};

function ProtectedRoute({ children }: PropsWithChildren<ProtectedRouteProps>) {
  const { isLoading, userData } = useUser();
  // const { error: refreshError } = useAutoRefreshToken();
  // const { isLoading: isLoadingProviders } = useProviders(true);

  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     return navigate('/auth/login');
  //   }
  // }, [isAuthenticated, navigate]);

  useEffect(() => {
    // if ((!userData && !isLoading) || (error && roles && !roles.some(role => user?.roles.includes(role)))) {
    if (!isAuthenticated && !userData && !isLoading) {
      return navigate('/auth/login');
    }
  }, [isAuthenticated, userData, navigate, isLoading]);

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
