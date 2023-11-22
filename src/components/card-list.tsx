/* eslint-disable react/no-array-index-key */
import CitiesCard from '../components/cities-card';
import { OfferType } from '../types';

type CardListProps = {
  mockData: OfferType[];
  setSelectedCardId: React.Dispatch<React.SetStateAction<number>>;
};

function CardList({ mockData, setSelectedCardId }: CardListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {mockData.map((data, index) => (
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
