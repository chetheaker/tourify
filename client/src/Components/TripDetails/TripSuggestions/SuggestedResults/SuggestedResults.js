import { useEffect, useState } from 'react';
import './SuggestedResults.css';

function SuggestedResults({ place, category, directionsResponse }) {
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  useEffect(() => {
    if (!directionsResponse) return;
    const getPlaces = () => {
      setSuggestedPlaces([]);
      let location;
      for (let i = 0; i < directionsResponse.routes[0].legs.length; i++) {
        if (directionsResponse.routes[0].legs[i].start_address === place.stop) {
          // eslint-disable-next-line no-undef
          location = new google.maps.LatLng(
            directionsResponse.routes[0].legs[i].start_location.lat(),
            directionsResponse.routes[0].legs[i].start_location.lng()
          );
        }
      }
      if (!location) {
        // eslint-disable-next-line no-undef
        location = new google.maps.LatLng(
          directionsResponse.routes[0].legs[
            directionsResponse.routes[0].legs.length
          ].start_location.lat(),
          directionsResponse.routes[0].legs[
            directionsResponse.routes[0].legs.length
          ].start_location.lng()
        );
      }
      console.log(location);

      // // eslint-disable-next-line no-undef
      // const map = new google.maps.Map(
      //   document.getElementById('places-map-div'),
      //   {
      //     center: location,
      //     zoom: 15
      //   }
      // );

      // const request = {
      //   location: location,
      //   radius: '2000',
      //   type: [type]
      // };
      // // eslint-disable-next-line no-undef
      // const service = new google.maps.places.PlacesService(map);
      // service.nearbySearch(request, (results, status) => {
      //   if (status === 'OK') {
      //     setSuggestedPlaces(results);
      //   }
      // });
    };

    getPlaces();
  }, [place, category, directionsResponse]);

  return (
    <div className="suggested-results">
      <h1>
        {category} in {place.stop}
      </h1>
    </div>
  );
}

export default SuggestedResults;
