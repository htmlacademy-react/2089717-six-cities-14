import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  OfferModel,
  AuthSettings,
  UserData,
  FavoriteStatus,
  ReviewModel,
} from '../types';
import { APIRoute, AppRoute, AuthenticationStatus } from '../components/consts';
import {
  loadOffers,
  loadDetailedOffers,
  checkAuth,
  requireAuth,
  requireLogout,
  getUserData,
  loadFavoriteOffers,
  getOffersNearby,
  setReviews,
  setUserReview,
} from './action';
import { saveUserData, deleteUserData } from '../local-storage.ts/userData';
import { AppDispatch, State } from '.';

type ThunkApi = {
  extra: AxiosInstance;
  dispatch: AppDispatch;
  state: State;
};

type ToggleFavoriteOffer = {
  isFavorite: boolean;
  id: string;
};

export const fetchOffersAction = createAsyncThunk<void, undefined, ThunkApi>(
  'data/loadOffers',
  async (_arg, { extra: api, dispatch }) => {
    const { data } = await api.get<OfferModel[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
  }
);

export const fetchOfferDetailedAction = createAsyncThunk<
  void,
  OfferModel['id'],
  ThunkApi
>('data/loadDetailedOffers', async (offerId, { extra: api, dispatch }) => {
  const { data } = await api.get<OfferModel>(`${APIRoute.Offers}/${offerId}`);
  dispatch(loadDetailedOffers(data));
});

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkApi>(
  'user/checkAuth',
  async (_arg, { extra: api, dispatch }) => {
    try {
      await api.get(APIRoute.Login); //?
      dispatch(checkAuth(AuthenticationStatus.auth));
    } catch (err) {
      dispatch(checkAuth(AuthenticationStatus.notAuth));
    }
  }
);

export const loginAuthAction = createAsyncThunk<void, AuthSettings, ThunkApi>(
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

export const logoutAction = createAsyncThunk<void, undefined, ThunkApi>(
  'user/logout',
  async (_arg, { extra: api, dispatch }) => {
    await api.delete(APIRoute.Logout);
    deleteUserData();
    dispatch(requireLogout(AuthenticationStatus.notAuth));
  }
);

export const getFavoriteOffers = createAsyncThunk<void, undefined, ThunkApi>(
  'data/favoriteOffers',
  async (_arg, { extra: api, dispatch }) => {
    const { data } = await api.get<OfferModel[]>(APIRoute.FavoriteOffers); //?
    dispatch(loadFavoriteOffers(data));
  }
);

export const changeStatusFavoriteOffers = createAsyncThunk<
  void,
  FavoriteStatus,
  ThunkApi
>(
  'data/sendFavoriteOffers',
  async ({ offerId, isFavorite }, { extra: api, dispatch, getState }) => {
    if (getState().authStatus !== AuthenticationStatus.auth) {
      return;
    }
    const status = isFavorite ? 0 : 1;

    await api.post<OfferModel>(
      `${APIRoute.FavoriteOffers}/${offerId}/${status}`,
      { offerId, status }
    );

    dispatch(getFavoriteOffers());
  }
);

export const fetchOffersNearby = createAsyncThunk<
  void,
  OfferModel['id'],
  ThunkApi
>('data/loadOffersNearby', async (offerId, { extra: api, dispatch }) => {
  try {
    const response = await api.get<OfferModel[]>(
      `${APIRoute.Offers}/${offerId}/nearby`
    );

    const randomInteger = (min: number, max: number) => {
      const rand: number = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    };

    const offersNearbyS = new Set<OfferModel>();

    while (offersNearbyS.size < 3 && response.data.length > 3) {
      offersNearbyS.add(response.data[randomInteger(0, response.data.length)]);
    }

    const offersNearby = Array.from(offersNearbyS);

    dispatch(getOffersNearby(offersNearby));
  } catch (err) {
    console.log(err);
  }
});

export const fetchReview = createAsyncThunk<void, OfferModel['id'], ThunkApi>(
  'data/loadReviews',
  async (offerId, { extra: api, dispatch }) => {
    const { data } = await api.get<ReviewModel[]>(
      `${APIRoute.Comments}/${offerId}`
    );

    dispatch(setReviews(data));
  }
);

export const sentReview = createAsyncThunk<
  void,
  {
    offerId: OfferModel['id'] | undefined;
    rating: number;
    comment: string;
    clearForm: void;
  },
  ThunkApi
>(
  'data/setReviewWithCommentAndRating',
  async ({ offerId, rating, comment, clearForm }, { extra: api, dispatch }) => {
    const { data, status } = await api.post<ReviewModel>(
      `${APIRoute.Comments}/${offerId}`,
      { rating, comment }
    );
    dispatch(setUserReview(data));
    if (status < 300) {
      clearForm();
    }
  }
);
