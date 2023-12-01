/* eslint-disable react/no-array-index-key */
import { Helmet } from 'react-helmet-async';
import { generatedOffers } from '../mocks/offers';
import { Link } from 'react-router-dom';
import { AppRoute } from '../components/consts';
import CityFavouriteItem from '../components/city-favourite-ltem';
import MainHeader from '../components/main-header';

function Favorites() {
  return (
    <div className="page">
      <Helmet>
        <title>{'6 cities - Favorites'}</title>
      </Helmet>
      <MainHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {generatedOffers.map((_, index) => (
                <CityFavouriteItem
                  mockData={generatedOffers}
                  cityToDisplay={generatedOffers[index].city.name}
                  isFavourite={generatedOffers[index].isFavourite}
                  key={index}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
