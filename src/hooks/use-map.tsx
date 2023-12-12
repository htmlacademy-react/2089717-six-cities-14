import { useEffect, useState, useRef } from 'react';
import leaflet from 'leaflet';
import { City } from '../types';

type UseMapResult = {
  map: L.Map | null;
  mapRef: React.RefObject<HTMLElement>;
};

function useMap(city: City): UseMapResult {
  const [map, setMap] = useState<L.Map | null>(null);
  const [isMapRendered, setIsRendered] = useState<boolean>(false);
  const mapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mapRef.current !== null && !isMapRendered) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        )
        .addTo(instance);
      setMap(instance);
      setIsRendered((isRendered) => !isRendered);
    }
  }, [city, isMapRendered]);

  return { map, mapRef };
}

export default useMap;
