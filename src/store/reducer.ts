import { createReducer } from '@reduxjs/toolkit';
import { CITIES_MAP, AuthenticationStatus } from '../components/consts';
import { OfferModel, UserData } from '../types';
import {
  activeCityAction,
  updateOffersAction,
  sortOffersAction,
  loadOffers,
  loadDetailedOffers,
  checkAuth,
  requireAuth,
  requireLogout,
  getUserData,
} from './action';
import { fetchOffersAction } from './api-actions';
export const initialState: {
  selectedCityName: string;
  offers: OfferModel[];
  sortedOffers: OfferModel[];
  offer: OfferModel | null;
  fetchStatus: string;
  authStatus: AuthenticationStatus;
  userData: UserData | null;
} = {
  selectedCityName: CITIES_MAP.Paris,
  offers: [],
  sortedOffers: [],
  offer: null,
  fetchStatus: 'idle',
  authStatus: AuthenticationStatus.unknown,
  userData: null,
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
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.fetchStatus = 'error';
    })
    .addCase(checkAuth, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(requireAuth, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(requireLogout, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(getUserData, (state, action) => {
      state.userData = action.payload;
    });
});
