import { createReducer } from '@reduxjs/toolkit';
import { CITIES_MAP } from '../components/consts';
import { OfferModel } from '../types';
import {
  activeCityAction,
  updateOffersAction,
  sortOffersAction,
  loadOffers,
  loadDetailedOffers,
} from './action';
import { fetchOffersAction } from './api-actions';
export const initialState: {
  selectedCityName: string;
  offers: OfferModel[];
  sortedOffers: OfferModel[];
  offer: OfferModel | null;
  fetchStatus: string;
} = {
  selectedCityName: CITIES_MAP.Paris,
  offers: [],
  sortedOffers: [],
  offer: null,
  fetchStatus: 'idle',
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
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadDetailedOffers, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.fetchStatus = 'loading';
    })
    .addCase(fetchOffersAction.fulfilled, (state) => {
      state.fetchStatus = 'success';
    });
});


