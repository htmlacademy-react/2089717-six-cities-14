import MainPage from '../pages/main';
import Login from '../pages/login';
import Offer from '../pages/offer';
import Favorites from '../pages/favorites';
import ErrorPage from './error-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from './consts';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../components/privite-route';
import { useState } from 'react';

function App() {
  const [selectedCardId, setSelectedCardId] = useState(0);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={`${AppRoute.Main}`}
            element={
              <MainPage
                setSelectedCardId={setSelectedCardId}
                selectedCardId={selectedCardId}
              />
            }
          />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route
            path={`${AppRoute.Offer}:id`}
            element={
              <Offer setSelectedCardId={setSelectedCardId} />
            }
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
