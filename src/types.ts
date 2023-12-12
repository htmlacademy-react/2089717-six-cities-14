import { NavigateFunction } from 'react-router-dom';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  location: Location;
  name: string;
};

export type Host = {
  avatarUrl: string;
  name: string;
  isPro: boolean;
  id: number;
};

export type OfferModel = {
  previewImage: string;
  title: string;
  description: string;
  isPrime: boolean;
  isFavorite: boolean;
  type: string;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  city: City;
  location: Location;
  host: Host;
  reviews: number;
  id: string;
  images: string[];
};

export type AuthData = {
  email: string | undefined;
  password: string | undefined;
};

export type AuthSettings = {
  login: AuthData;
  navigate: NavigateFunction;
};

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type FavoriteStatus = {
  offerId: OfferModel['id'];
  status: 1 | 0;
};
