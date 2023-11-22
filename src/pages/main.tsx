/* eslint-disable react/no-array-index-key */

import { generatedOffers } from '../components/mocks/offers';
import { Helmet } from 'react-helmet-async';
import CardList from '../components/card-list';
import MainHeader from '../components/main-header';
import { Fragment } from 'react';
import Map from '../components/map';
type MainPageProps = {
  setSelectedCardId: React.Dispatch<React.SetStateAction<number>>;
  selectedCardId: number;
};

function MainPage({ setSelectedCardId, selectedCardId }: MainPageProps) {
  const CITIES = [
    'Paris',
    'Cologne',
    'Brussels',
    'Amsterdam',
    'Hamburg',
    'Dusseldorf',
  ];

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{'6 cities'}</title>
      </Helmet>
      <MainHeader />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((city) => (
                <Fragment key={city}>
                  <li className="locations__item">
                    <a
                      className={`locations__item-link tabs__item${
                        city === 'Amsterdam' && '--active'
                      }`}
                      href="#"
                    >
                      <span>{city}</span>
                    </a>
                  </li>
                </Fragment>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${generatedOffers.length} places to stay in Amsterdam`}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <CardList
                setSelectedCardId={setSelectedCardId}
                mockData={generatedOffers}
              />
            </section>
            <div className="cities__right-section">
              <Map offers={generatedOffers} selectedCardId={selectedCardId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
