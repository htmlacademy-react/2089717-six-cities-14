import { createReducer } from '@reduxjs/toolkit';
import { CITIES_MAP } from '../components/consts';
import { OfferModel } from '../types';
import {
  activeCityAction,
  updateOffersAction,
  sortOffersAction,
} from '../store/action';
import { generatedOffers } from '../mocks/offers';
export const initialState: {
  selectedCityName: string;
  offers: OfferModel[];
  sortedOffers: OfferModel[] ;
} = {
  selectedCityName: CITIES_MAP.Paris,
  offers: generatedOffers,
  sortedOffers: generatedOffers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(activeCityAction, (state, action) => {
      state.selectedCityName = action.payload;
    })
    .addCase(updateOffersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(sortOffersAction, (state, action) => {
      state.sortedOffers = action.payload;
    });
});
