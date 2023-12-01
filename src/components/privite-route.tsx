import { Navigate } from 'react-router-dom';
import { AppRoute } from './consts';
import { AuthenticationStatusType } from '../types';

type PrivateProps = {
  children: JSX.Element;
  authenticationCurrentStatus: AuthenticationStatusType;
};

function PrivateRoute({ children, authenticationCurrentStatus }: PrivateProps) {
  return authenticationCurrentStatus === 'AUTH' ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
