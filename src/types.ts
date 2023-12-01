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

export type AuthenticationStatusType = 'AUTH' | 'NOT_AUTH' | 'UNKNOWN';
