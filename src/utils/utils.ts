import { State } from '../store';
import { OfferModel } from '../types';

export const getOffersByActiveCity = ({ offers, selectedCityName }: State): OfferModel[] =>
  offers.filter((offer) => offer.city.name === selectedCityName);
