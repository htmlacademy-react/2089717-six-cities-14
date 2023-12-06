enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/',
}

const DEFAULT_OFFER_MAP_ICON = '../img/pin.svg';
const CURRENT_OFFER_MAP_ICON = '../img/pin-active.svg';

const CITIES_MAP = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

enum APIRoute {
  Offers = '/offers',
  FavoriteOffers = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export {
  AppRoute,
  DEFAULT_OFFER_MAP_ICON,
  CURRENT_OFFER_MAP_ICON,
  CITIES_MAP,
  APIRoute,
};
