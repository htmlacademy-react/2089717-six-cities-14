/* eslint-disable react/no-array-index-key */
import { Helmet } from 'react-helmet-async';
import CardList from '../components/card-list';
import MainHeader from '../components/main-header';
import Map from '../components/map';
import CitiesList from '../components/cities-list';
import { useAppDispatch, useAppSelector } from '../store';
import { getOffersByActiveCity } from '../utils/utils';
import SortOptions from '../components/sort-options';
import { useEffect } from 'react';
import { fetchOffersAction } from '../store/api-actions';
import Spinner from '../components/spinner';

type MainPageProps = {
  setSelectedCardId: React.Dispatch<React.SetStateAction<string>>;
  selectedCardId: string;
};

function MainPage({ setSelectedCardId, selectedCardId }: MainPageProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, []);

  const currentCity = useAppSelector((state) => state.selectedCityName);
  const offersCurrentCity = useAppSelector(getOffersByActiveCity);
  const fetchStatus = useAppSelector((state) => state.fetchStatus);
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
            <CitiesList />
          </section>
        </div>
        {fetchStatus === 'loading' ? (
          <Spinner />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${offersCurrentCity.length} places to stay in ${currentCity}`}</b>
                <SortOptions />
                <CardList setSelectedCardId={setSelectedCardId} />
              </section>
              <div className="cities__right-section">
                <Map selectedCardId={selectedCardId} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainPage;
