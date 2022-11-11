import './Map.css';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useMemo } from 'react';

function Map({ directionsResponse }) {
  const center = useMemo(() => ({ lat: 0, lng: 0 }), []);
  const options = useMemo(
    () => ({
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false
    }),
    []
  );

  console.log(directionsResponse);

  return (
    <div id="map">
      <GoogleMap
        zoom={3}
        center={center}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={options}
      >
        {directionsResponse ? (
          <DirectionsRenderer directions={directionsResponse} />
        ) : null}
      </GoogleMap>
    </div>
  );
}

export default Map;
