import './Map.css';
import { GoogleMap } from '@react-google-maps/api';
import { useMemo } from 'react';

function Map() {
  const center = useMemo(() => ({ lat: 0, lng: 0 }), []);
  const options = useMemo(
    () => ({
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false
    }),
    []
  );

  return (
    <div id="map">
      <GoogleMap
        zoom={3}
        center={center}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={options}
      ></GoogleMap>
    </div>
  );
}

export default Map;
