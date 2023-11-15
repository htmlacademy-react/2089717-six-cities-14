/* eslint-disable react/no-array-index-key */
import MainPage from '../pages/main';
import Login from '../pages/login';
import Offer from '../pages/offer';
import Favorites from '../pages/favorites';
import ErrorPage from './error-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from './consts';
import { HelmetProvider } from 'react-helmet-async';
import { OfferType } from '../types';
import PrivateRoute from '../components/privite-route';

type AppProps = {
  mockData: OfferType[];
};

function App({ mockData }: AppProps) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route
            path={`${AppRoute.Offer}:id`}
            element={<Offer offer={mockData} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authenticationCurrentStatus={'AUTH'}>
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
