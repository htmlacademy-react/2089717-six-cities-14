import CitiesCard from '../components/cities-card';
import { useAppSelector } from '../store';
import { getOffersByActiveCity } from '../utils/utils';
import { initialState } from '../store/reducer';

type CardListProps = {
  setSelectedCardId: React.Dispatch<React.SetStateAction<string>>;
};

function CardList({ setSelectedCardId }: CardListProps) {
  const offersCurrentCity = useAppSelector(getOffersByActiveCity);
  const sortedOffers = useAppSelector((state) => state.sortedOffers);
  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers === initialState.sortedOffers
        ? offersCurrentCity.map((data) => (
            <CitiesCard
              onSelectCard={(id: string) => {
                setSelectedCardId(id);
              }}
              cardData={data}
              key={data.id}
            />
          ))
        : sortedOffers.map((data) => (
            <CitiesCard
              onSelectCard={(id: string) => {
                setSelectedCardId(id);
              }}
              cardData={data}
              key={data.id}
            />
          ))}
    </div>
  );
}

export default CardList;
