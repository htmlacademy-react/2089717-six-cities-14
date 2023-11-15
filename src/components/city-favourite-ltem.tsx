/* eslint-disable react/no-array-index-key */
import FavouriteCard from '../components/favourite-card';
import { OfferType } from '../types';

type CityFavouriteItemProps = {
  mockData: OfferType[];
  cityToDisplay: string;
  isFavourite: boolean;
};

function CityFavouriteItem(props: CityFavouriteItemProps) {
  const { mockData, cityToDisplay, isFavourite } = props;
  const filteredCards = mockData.filter(
    (data) =>
      data.city.name === cityToDisplay
  );
  return (
    isFavourite && (
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>{cityToDisplay}</span>
            </a>
          </div>
        </div>
        <div className="favorites__places">
          {filteredCards.map((data, index) => (
            <FavouriteCard card={data} key={index} />
          ))}
        </div>
      </li>
    )
  );
}

export default CityFavouriteItem;
