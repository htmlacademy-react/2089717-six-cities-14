import CitiesCard from '../components/cities-card';
import { useAppSelector } from '../store';
import { getOffersByActiveCity } from '../utils/utils';
import { initialState } from '../store/reducer';


function CardList() {
  const offersCurrentCity = useAppSelector(getOffersByActiveCity);
  const sortedOffers = useAppSelector((state) => state.sortedOffers);

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers === initialState.sortedOffers
        ? offersCurrentCity.map((data) => (
          <CitiesCard
            cardData={data}
            key={data.id}
          />
        ))
        : sortedOffers.map((data) => (
          <CitiesCard
            cardData={data}
            key={data.id}
          />
        ))}
    </div>
  );
}

export default CardList;
