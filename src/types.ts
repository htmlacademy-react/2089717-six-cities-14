export type Location = {
  lat: number;
  lng: number;
  zoom: number;
}
export type Site = {
  lat: number;
  lng: number;
};
export type City = {
  location: Location;
  name: string;
}

export type Host = {
  avatarImage: string;
  hostName: string;
  isPro: boolean;
  id: number;
}

export type OfferType = {
  image: string;
  smalllImage: string;
  header: string;
  description: string;
  isPrime: boolean;
  isFavourite: boolean;
  housingType: string;
  rating: number;
  bedroomQuantity: number;
  maxGuest: number;
  costPerNight: number;
  city: City;
  site: Site;
  host: Host;
  reviews: number;
  id: number;
};

