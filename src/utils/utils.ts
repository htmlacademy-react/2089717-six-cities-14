import { State } from '../store';

export const getOffersByActiveCity = ({ offers, selectedCityName }: State) =>
  offers.filter((offer) => offer.city.name === selectedCityName);
