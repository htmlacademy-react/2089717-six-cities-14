/* eslint-disable react/no-array-index-key */
import FavouriteCard from '../components/favourite-card';
import { OfferModel } from '../types';

type CityFavouriteItemProps = {
  cityToDisplay: string;
  offers: Array<OfferModel>;
};

function CityFavouriteItem(props: CityFavouriteItemProps) {
  const { cityToDisplay, offers } = props;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityToDisplay}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((data) => (
          <FavouriteCard card={data} key={data.id} />
        ))}
      </div>
    </li>
  );
}

export default CityFavouriteItem;
