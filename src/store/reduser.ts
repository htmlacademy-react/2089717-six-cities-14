import { createReducer } from '@reduxjs/toolkit';
import { CITIES_MAP } from '../components/consts';
import { OfferModel } from '../types';
import { activeCityAction, updateOffersAction } from '../store/action';
import { generatedOffers } from '../mocks/offers';
const initialState: {
  selectedCityName: string;
  offers: OfferModel[];
} = {
  selectedCityName: CITIES_MAP.Paris,
  offers: generatedOffers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(activeCityAction, (state, action) => {
      state.selectedCityName = action.payload;
    })
    .addCase(updateOffersAction, (state, action) => {
      state.offers = action.payload;
    });
});
