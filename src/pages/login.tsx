import { Helmet } from 'react-helmet-async';
import { FormEvent, useRef } from 'react';
import MainLogoLink from '../components/main-logo-link';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { loginAuthAction } from '../store/api-actions';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    if (
      loginRef.current?.value !== null &&
      passwordRef.current?.value !== null
    ) {
      dispatch(
        loginAuthAction({
          login: {
            email: loginRef.current?.value,
            password: passwordRef.current?.value,
          },
          navigate: navigate,
        })
      );
    }

  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>{'6 cities - Login'}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <MainLogoLink />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
