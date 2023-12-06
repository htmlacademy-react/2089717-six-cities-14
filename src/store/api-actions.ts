import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferModel } from '../types';
import { APIRoute } from '../components/consts';

type TExtra = {
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  OfferModel[],
  undefined,
  TExtra
>('data/loadOffers', async (_arg, { extra: api, dispatch }) => {
  const { data } = await api.get<OfferModel[]>(APIRoute.Offers);
  dispatch({ type: 'data/loadOffers', payload: data });
  return data;
});

export const fetchOfferDetailedAction = createAsyncThunk<
  OfferModel,
  OfferModel['id'],
  TExtra
>('data/loadDetailedOffers', async (offerId, { extra: api, dispatch }) => {
  const { data } = await api.get<OfferModel>(`${APIRoute.Offers}/${offerId}`);
  dispatch({ type: 'data/loadDetailedOffers', payload: data });
  return data;
});
