import { createAction } from '@reduxjs/toolkit';
import { OfferModel, UserData, ToggleOfferIsFavoritePayload, ReviewModel } from '../types';
import { AuthenticationStatus } from '../components/consts';

export const activeCityAction = createAction<string>('selectCity');

export const updateOffersAction = createAction<OfferModel[]>('updateOffers');

export const sortOffersAction = createAction<OfferModel[]>('sortOffers');

export const loadOffers = createAction<OfferModel[]>('data/loadOffers');

export const loadDetailedOffers = createAction<OfferModel>(
  'data/loadDetailedOffers'
);

export const checkAuth = createAction<AuthenticationStatus>('user/checkAuth');

export const requireAuth = createAction<AuthenticationStatus>('user/login');

export const requireLogout = createAction<AuthenticationStatus>('user/logout');

export const getUserData = createAction<UserData | null>('user/email');

export const favoriteOffers = createAction<OfferModel[]>('data/favoriteOffers');

export const loadFavoriteOffers = createAction<OfferModel[]>('data/loadFavoriteOffers');

export const sendFavoriteOffers = createAction<OfferModel>('data/sendFavoriteOffers');

export const loadOffersNearby = createAction<OfferModel[]>('data/loadOffersNearby');

export const getOffersNearby = createAction<OfferModel[]>('data/getOffersNearby');

export const toggleOfferIsFavorite = createAction<ToggleOfferIsFavoritePayload>('data/toggleOfferIsFavorite');

export const setCardId = createAction<string>('data/setCardId');

export const setFavorite = createAction<boolean | string>('data/setFavorite');

export const loadReviews = createAction<ReviewModel[]>('data/loadReviews');

export const setReviews = createAction<ReviewModel[]>('data/setReviews');

export const setReviewWithCommentAndRating = createAction<ReviewModel>('data/setReviewWithCommentAndRating');

export const setUserReview = createAction<ReviewModel>('data/setUserReview');
