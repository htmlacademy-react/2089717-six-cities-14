import CitiesCard from '../components/cities-card';
import { useAppSelector } from '../store';
import { OfferModel } from '../types';

const randomInteger = (min: number, max: number) => {
  const rand: number = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

function CardListNearby() {
  const offersNearbyAll = useAppSelector((state) => state.offersNearby);

  const offersNearbyS = new Set<OfferModel>();

  while (offersNearbyS.size < 3 && offersNearbyAll.length > 3) {
    offersNearbyS.add(
      offersNearbyAll[randomInteger(0, offersNearbyAll.length)]
    );
  }

  const offersNearby = Array.from(offersNearbyS);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersNearby.map((data) => (
        <CitiesCard cardData={data} key={data.id} />
      ))}
    </div>
  );
}

export default CardListNearby;
