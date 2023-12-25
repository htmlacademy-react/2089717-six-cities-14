import MainPage from '../pages/main';
import Login from '../pages/login';
import Offer from '../pages/offer';
import Favorites from '../pages/favorites';
import ErrorPage from './error-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthenticationStatus } from './consts';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../components/privite-route';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { checkAuthAction, getFavoriteOffers } from '../store/api-actions';

function App() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authStatus);
  dispatch(checkAuthAction());

  useEffect(() => {
    if (authStatus === AuthenticationStatus.auth) {
      dispatch(getFavoriteOffers());
    }
  }, [authStatus]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={`${AppRoute.Main}`} element={<MainPage />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={`${AppRoute.Offer}:id`} element={<Offer />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
