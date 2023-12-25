import CitiesCard from '../components/cities-card';
import { useAppSelector } from '../store';
import { OfferModel } from '../types';

const randomInteger = (min: number, max: number) => {
  const rand: number = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

function CardListNearby() {
  const offersNearby = useAppSelector((state) => state.offersNearby);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersNearby.map((data) => {
        if (data) {
          return <CitiesCard cardData={data} key={data.id} />;
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default CardListNearby;
