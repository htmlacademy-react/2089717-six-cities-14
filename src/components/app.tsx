import MainPage from '../pages/main';
import Login from '../pages/login';
import Offer from '../pages/offer';
import Favorites from '../pages/favorites';
import ErrorPage from './error-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from './consts';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../components/privite-route';

type AppProps = {
  countRentOffers: number;
};

function App({ countRentOffers }: AppProps) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage countRentOffers={countRentOffers} />}
          />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authenticationCurrentStatus={'AUTH'}
              >
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
