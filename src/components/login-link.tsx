import { Link } from 'react-router-dom';
import { AppRoute, AuthenticationStatus } from '../components/consts';
import { useAppDispatch, useAppSelector } from '../store';
import { logoutAction } from '../store/api-actions';
import { initialState } from '../store/reducer';
import { getUserData } from '../store/action';

function LoginLink() {
  const dispatch = useAppDispatch();
  const authenticationCurrentStatus = useAppSelector(
    (state) => state.authStatus
  );
  return (
    <Link
      className="header__nav-link"
      to={AppRoute.Login}
      onClick={() => {
        dispatch(logoutAction());
        dispatch(getUserData(initialState.userData));
      }}
    >
      <span className="header__signout">
        {`Sign ${
          authenticationCurrentStatus === AuthenticationStatus.auth
            ? 'out'
            : 'in'
        }`}
      </span>
    </Link>
  );
}
export default LoginLink;
