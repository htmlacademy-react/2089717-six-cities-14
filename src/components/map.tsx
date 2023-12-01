import { useEffect } from 'react';
import useMap from '../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import { DEFAULT_OFFER_MAP_ICON, CURRENT_OFFER_MAP_ICON } from './consts';
import { useAppSelector } from '../store';
import { getOffersByActiveCity } from '../utils/utils';

type MapProps = {
  selectedCardId: number;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: DEFAULT_OFFER_MAP_ICON,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: CURRENT_OFFER_MAP_ICON,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({ selectedCardId }: MapProps) {
  const currentCity = useAppSelector((state) => state.selectedCityName);
  const offersCurrentCity = useAppSelector(getOffersByActiveCity);
  const currentOffer = offersCurrentCity.find(
    (offer) => offer.city.name === `${currentCity}`
  );
  const activeCityLocation = currentOffer?.city || {
    location: {
      lat: 48.864716,
      lng: 2.349014,
      zoom: 12,
    },
    name: 'Paris',
  };

  const { map, mapRef } = useMap(activeCityLocation);

  useEffect(() => {
    if (map) {
      map.setView(
        [activeCityLocation.location.lat, activeCityLocation.location.lng],
        12
      );
      offersCurrentCity.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.site.lat,
              lng: offer.site.lng,
            },
            {
              icon:
                offer.id === selectedCardId
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [
    map,
    activeCityLocation,
    offersCurrentCity,
    selectedCardId,
    defaultCustomIcon,
    currentCustomIcon,
  ]);

  return <section className="cities__map map" ref={mapRef}></section>;
}

export default Map;
