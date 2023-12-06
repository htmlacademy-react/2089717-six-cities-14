import { createAction } from '@reduxjs/toolkit';
import { OfferModel, UserData } from '../types';
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
