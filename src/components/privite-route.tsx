import { Navigate } from 'react-router-dom';
import { AppRoute } from './consts';

type AuthenticationStatusType = 'AUTH'|'NOT_AUTH';

type PriviteProps = {
  children: JSX.Element;
  authenticationCurrentStatus: AuthenticationStatusType;
}
function PrivateRoute ({children, authenticationCurrentStatus}: PriviteProps) {
  return (
    authenticationCurrentStatus === 'AUTH'
      ? children
      : <Navigate to = {AppRoute.Login}/>
  );
}

export default PrivateRoute;
