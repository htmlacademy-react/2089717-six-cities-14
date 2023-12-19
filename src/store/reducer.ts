import { createReducer } from '@reduxjs/toolkit';
import { CITIES_MAP, AuthenticationStatus } from '../components/consts';
import { OfferModel, ReviewModel, UserData } from '../types';
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
  loadFavoriteOffers,
  getOffersNearby,
  setCardId,
  setReviews,
} from './action';
import { fetchOffersAction, fetchOfferDetailedAction } from './api-actions';
export const initialState: {
  selectedCityName: string;
  offers: OfferModel[];
  sortedOffers: OfferModel[];
  offer: OfferModel | null;
  fetchOffersStatus: string;
  fetchDetailedOfferStatus: string;
  authStatus: AuthenticationStatus;
  userData: UserData | null;
  favoriteOffers: OfferModel[];
  offersNearby: OfferModel[];
  selectedCardId: string;
  reviews: ReviewModel[];
} = {
  selectedCityName: CITIES_MAP.Paris,
  offers: [],
  sortedOffers: [],
  offer: null,
  fetchOffersStatus: 'idle',
  fetchDetailedOfferStatus: 'idle',
  authStatus: AuthenticationStatus.unknown,
  userData: null,
  favoriteOffers: [],
  offersNearby: [],
  selectedCardId: '',
  reviews: [],
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
      state.fetchOffersStatus = 'loading';
    })
    .addCase(fetchOffersAction.fulfilled, (state) => {
      state.fetchOffersStatus = 'success';
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.fetchOffersStatus = 'error';
    })
    .addCase(fetchOfferDetailedAction.pending, (state) => {
      state.fetchDetailedOfferStatus = 'loading';
    })
    .addCase(fetchOfferDetailedAction.fulfilled, (state) => {
      state.fetchDetailedOfferStatus = 'success';
    })
    .addCase(fetchOfferDetailedAction.rejected, (state) => {
      state.fetchDetailedOfferStatus = 'error';
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
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(getOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(setCardId, (state, action) => {
      state.selectedCardId = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    });
});

// .addCase(toggleOfferIsFavorite, (state, action) => {
//   const currentOffer = state.offers.find(
//     (offer) => offer.id === action.payload.offerId
//   );
//   if (currentOffer) {
//     currentOffer.isFavorite = action.payload.isFavorite;
//   }
// })
