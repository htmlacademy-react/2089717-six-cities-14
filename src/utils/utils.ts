import { State } from '../store';
import { OfferModel } from '../types';

export const getOffersByActiveCity = ({
  offers,
  selectedCityName,
}: State): OfferModel[] =>
  offers.filter((offer) => offer.city.name === selectedCityName);

export const checkIsFavoriteOffer = (id: string | undefined) => (state: State) => state.favoriteOffers.some((offer) => offer.id === id);

export const renderDependingFetchStatus = (
  fetchStatus: string,
  spinner: JSX.Element,
  errorMessage: JSX.Element,
  content: JSX.Element
): JSX.Element | undefined => {
  if (fetchStatus === 'loading') {
    return spinner;
  } else if (fetchStatus === 'error') {
    return errorMessage;
  } else {
    return content;
  }
};
