import { Navigate } from 'react-router-dom';
import { AppRoute, AuthenticationStatus } from './consts';
import { useAppSelector } from '../store';

type PrivateProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateProps) {
  const authenticationCurrentStatus = useAppSelector(
    (state) => state.authStatus
  );
  return authenticationCurrentStatus === AuthenticationStatus.auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
