import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferModel, AuthSettings, UserData, FavoriteStatus } from '../types';
import { APIRoute, AppRoute, AuthenticationStatus } from '../components/consts';
import {
  loadOffers,
  loadDetailedOffers,
  checkAuth,
  requireAuth,
  requireLogout,
  getUserData,
  loadFavoriteOffers,
} from './action';
import { saveUserData, deleteUserData } from '../local-storage.ts/userData';
type Extra = {
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<void, undefined, Extra>(
  'data/loadOffers',
  async (_arg, { extra: api, dispatch }) => {
    const { data } = await api.get<OfferModel[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
  }
);

export const fetchOfferDetailedAction = createAsyncThunk<
  void,
  OfferModel['id'],
  Extra
>('data/loadDetailedOffers', async (offerId, { extra: api, dispatch }) => {
  const { data } = await api.get<OfferModel>(`${APIRoute.Offers}/${offerId}`);
  dispatch(loadDetailedOffers(data));
});

export const checkAuthAction = createAsyncThunk<void, undefined, Extra>(
  'user/checkAuth',
  async (_arg, { extra: api, dispatch }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(checkAuth(AuthenticationStatus.auth));
    } catch (err) {
      dispatch(checkAuth(AuthenticationStatus.notAuth));
    }
  }
);

export const loginAuthAction = createAsyncThunk<void, AuthSettings, Extra>(
  'user/login',
  async (
    { login: { email, password }, navigate },
    { extra: api, dispatch }
  ) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveUserData(data);
    dispatch(requireAuth(AuthenticationStatus.auth));
    dispatch(getUserData(data));
    navigate(AppRoute.Main);
  }
);

export const logoutAction = createAsyncThunk<void, undefined, Extra>(
  'user/logout',
  async (_arg, { extra: api, dispatch }) => {
    await api.delete(APIRoute.Logout);
    deleteUserData();
    dispatch(requireLogout(AuthenticationStatus.notAuth));
  }
);

export const getFavoriteOffers = createAsyncThunk<void, undefined, Extra>(
  'data/favoriteOffers',
  async (_arg, { extra: api, dispatch }) => {
    const { data } = await api.get<OfferModel[]>(APIRoute.FavoriteOffers);
    dispatch(loadFavoriteOffers(data));
    console.log(data);
  }
);

export const changeStatusFavoriteOffers = createAsyncThunk<
  void,
  FavoriteStatus,
  Extra
>(
  'data/sendFavoriteOffers',
  async ({ offerId, status }, { extra: api, dispatch }) => {
    const response = await api.post<OfferModel>(
      `${APIRoute.FavoriteOffers}/${offerId}/${status}`,
      { offerId, status }
    );
    console.log(response);
  }
);
