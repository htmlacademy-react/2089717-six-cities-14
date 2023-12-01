import { useState } from 'react';
import { getOffersByActiveCity } from '../utils/utils';
import { useAppDispatch, useAppSelector } from '../store';
import { sortOffersAction } from '../store/action';

const toggleMenu = (isMenuOpened: boolean) => (isMenuOpened ? '--opened' : '');

function SortOptions() {
  const dispatch = useAppDispatch();
  const offersCurrentCity = useAppSelector(getOffersByActiveCity);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const onMenuOpened = () => {
    setIsMenuOpened((state) => !state);
  };
  const sortLowToHigh = () => {
    const sortedByLowToHighOffers = offersCurrentCity.sort(
      (a, b) => a.costPerNight - b.costPerNight
    );
    dispatch(sortOffersAction(sortedByLowToHighOffers));
  };
  const sortHighToLow = () => {
    const sortedByLowToHighOffers = offersCurrentCity.sort(
      (a, b) => b.costPerNight - a.costPerNight
    );
    dispatch(sortOffersAction(sortedByLowToHighOffers));
  };
  const sortTopRatedFirst = () => {
    const sortedByLowToHighOffers = offersCurrentCity.sort(
      (a, b) => b.rating - a.rating
    );
    dispatch(sortOffersAction(sortedByLowToHighOffers));
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={onMenuOpened}
      >
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom places__options${toggleMenu(
          isMenuOpened
        )}`}
      >
        <li className="places__option places__option--active" tabIndex={0} onClick={()=> dispatch(sortOffersAction(offersCurrentCity))}>
          Popular
        </li>
        <li className="places__option" tabIndex={0} onClick={sortLowToHigh}>
          Price: low to high
        </li>
        <li className="places__option" tabIndex={0} onClick={sortHighToLow}>
          Price: high to low
        </li>
        <li className="places__option" tabIndex={0} onClick={sortTopRatedFirst}>
          Top rated first
        </li>
      </ul>
    </form>
  );
}

export default SortOptions;
