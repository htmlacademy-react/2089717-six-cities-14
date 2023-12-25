import { useEffect } from 'react';
import useMap from '../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import { DEFAULT_OFFER_MAP_ICON, CURRENT_OFFER_MAP_ICON } from './consts';
import { useAppSelector } from '../store';
import { getOffersByActiveCity } from '../utils/utils';

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

function OfferMap() {
  const currentCity = useAppSelector((state) => state.selectedCityName);
  const selectedCardId = useAppSelector((state) => state.selectedCardId);
  const offersNearby = useAppSelector((state) => state.offersNearby);
  console.log(offersNearby);
  const currentOffer = offersNearby.find(
    (offer) => offer.city.name === `${currentCity}`
  );
  const activeCityLocation = currentOffer?.city || {
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    },
    name: 'Paris',
  };

  const { map, mapRef } = useMap(activeCityLocation);

  useEffect(() => {
    if (map) {
      map.setView(
        [
          activeCityLocation.location.latitude,
          activeCityLocation.location.longitude,
        ],
        12
      );
      offersNearby.forEach((offer) => {
        if (offer.city.location && activeCityLocation.location) {
          leaflet
            .marker(
              {
                lat: offer.location.latitude,
                lng: offer.location.longitude,
              },
              {
                icon:
                  offer.id === selectedCardId
                    ? currentCustomIcon
                    : defaultCustomIcon,
              }
            )
            .addTo(map);
        }
      });
    }
    return () => {
      if (map) {
        console.log('размонтировалось');
        map.remove();
      }
    };
  }, [
    map,
    activeCityLocation,
    offersNearby,
    selectedCardId,
    defaultCustomIcon,
    currentCustomIcon,
  ]);

  return (
    <section
      className="offer__map map"
      ref={mapRef}
      style={{ width: '809px', margin: '0 auto 15px auto', height: '380px' }}
    ></section>
  );
}

export default OfferMap;
