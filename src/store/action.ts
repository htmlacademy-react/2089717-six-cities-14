import { createAction } from '@reduxjs/toolkit';
import { OfferModel } from '../types';

export const activeCityAction = createAction<string>('selectCity');

export const updateOffersAction = createAction<OfferModel[]>('updateOffers');

export const sortOffersAction = createAction<OfferModel[]>('sortOffers');

export const loadOffers = createAction<OfferModel[]>('data/loadOffers');

export const loadDetailedOffers = createAction<OfferModel>('data/loadDetailedOffers');
