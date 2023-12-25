import { useAppDispatch, useAppSelector } from '../store';
import { activeCityAction, sortOffersAction } from '../store/action';
import { initialState } from '../store/reducer';
import { CITIES } from './consts';


const changeTabsItemsClass = (city: string, currentCity: string) =>
  city === currentCity ? 'tabs__item--active' : 'tabs__item';

function CitiesList() {
  const currentCity = useAppSelector((state) => state.selectedCityName);
  const dispatch = useAppDispatch();
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city}>
          <button
            className={`locations__item-link ${changeTabsItemsClass(
              city,
              currentCity
            )}`}
            onClick={() => {
              dispatch(activeCityAction(city));
              if (city !== currentCity) {
                dispatch(sortOffersAction(initialState.sortedOffers));
              }
            }}
          >
            <span>{city}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
