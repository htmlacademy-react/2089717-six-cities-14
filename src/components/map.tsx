import { useRef, useEffect } from 'react';
import useMap from '../hooks/use-map';
import { OfferType } from '../types';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import { DEFAULT_OFFER_MAP_ICON, CURRENT_OFFER_MAP_ICON } from './consts';

type MapProps = {
  offers: OfferType[];
  selectedCardId: number;
};

function Map({ offers, selectedCardId }: MapProps) {
  const currentOffer = offers.find((offer) => offer.city.name === 'Amsterdam');
  const currentCity = currentOffer?.city || {
    location: {
      lat: 52.37403,
      lng: 4.88969,
      zoom: 12,
    },
    name: 'Amsterdam',
  };
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);

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
  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
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
  }, [map, offers, selectedCardId, defaultCustomIcon, currentCustomIcon]);

  return <section className="cities__map map" ref={mapRef}></section>;
}

export default Map;
