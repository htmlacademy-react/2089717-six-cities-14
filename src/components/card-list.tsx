/* eslint-disable react/no-array-index-key */
import CitiesCard from '../components/cities-card';
import { useAppSelector } from '../store';
import { getOffersByActiveCity } from '../utils/utils';

type CardListProps = {
  setSelectedCardId: React.Dispatch<React.SetStateAction<number>>;
};

function CardList({ setSelectedCardId }: CardListProps) {
  const offersCurrentCity = useAppSelector(getOffersByActiveCity);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersCurrentCity.map((data, index) => (
        <CitiesCard
          onSelectCard={(id: number) => {
            setSelectedCardId(id);
          }}
          cardData={data}
          key={index}
        />
      ))}
    </div>
  );
}

export default CardList;
