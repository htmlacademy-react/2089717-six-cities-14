import { Link } from 'react-router-dom';
import { AppRoute } from '../components/consts';
function LoginLink() {
  return (
    <Link className="header__nav-link" to={AppRoute.Login}>
      <span className="header__signout">Sign out</span>
    </Link>
  );
}
export default LoginLink;
