import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferModel, AuthSettings, UserData } from '../types';
import { APIRoute, AppRoute, AuthenticationStatus } from '../components/consts';
import {
  loadOffers,
  loadDetailedOffers,
  checkAuth,
  requireAuth,
  requireLogout,
  getUserData,
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
    } catch {
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
