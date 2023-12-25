import MainLogoLink from './main-logo-link';
import LoginLink from './login-link';
import { Link } from 'react-router-dom';
import { AppRoute, AuthenticationStatus } from './consts';
import { useAppSelector } from '../store';
import { getEmail } from '../local-storage.ts/userData';

function MainHeader() {
  const authenticationCurrentStatus = useAppSelector(
    (state) => state.authStatus
  );
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <MainLogoLink />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {authenticationCurrentStatus === AuthenticationStatus.auth ? (
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {getEmail()}
                    </span>
                    <span className="header__favorite-count">
                      {favoriteOffers.length}
                    </span>
                  </Link>
                ) : (
                  false
                )}
              </li>
              <li className="header__nav-item">
                <LoginLink />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
