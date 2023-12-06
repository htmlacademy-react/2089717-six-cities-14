/* eslint-disable react/no-array-index-key */
import FavouriteCard from '../components/favourite-card';
import { OfferModel } from '../types';

type CityFavouriteItemProps = {
  offers: OfferModel[];
  cityToDisplay: string;
  isFavourite: boolean;
};

function CityFavouriteItem(props: CityFavouriteItemProps) {
  const { offers, cityToDisplay, isFavourite } = props;
  const filteredCards = offers.filter(
    (data) => data.city.name === cityToDisplay
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
