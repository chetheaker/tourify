import { useEffect, useState } from 'react';
import './SuggestedResults.css';
import SuggestedResult from './SuggestedResult/SuggestedResult';
import { Skeleton } from '@chakra-ui/react';

function SuggestedResults({
  place,
  category,
  directionsResponse,
  itinerary,
  setItinerary
}) {
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!directionsResponse) return;
    const getPlaces = () => {
      setIsLoading(true);
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
            directionsResponse.routes[0].legs.length - 1
          ].end_location.lat(),
          directionsResponse.routes[0].legs[
            directionsResponse.routes[0].legs.length - 1
          ].end_location.lng()
        );
      }
      console.log('location', location);

      // eslint-disable-next-line no-undef
      const map = new google.maps.Map(
        document.getElementById('places-map-div'),
        {
          center: location,
          zoom: 15
        }
      );

      const request = {
        location: location,
        radius: '2000',
        type: [category]
      };
      // eslint-disable-next-line no-undef
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status === 'OK') {
          setSuggestedPlaces(results);
          setIsLoading(false);
        }
      });
    };

    getPlaces();
  }, [place, category, directionsResponse]);

  console.log('places', suggestedPlaces);

  if (isLoading) {
    return (
      <div className="skeleton-loading">
        <Skeleton height="250px" minWidth="150px" />
        <Skeleton height="250px" minWidth="150px" />
        <Skeleton height="250px" minWidth="150px" />
        <Skeleton height="250px" minWidth="150px" />
      </div>
    );
  }

  return (
    <div className="suggested-results">
      {suggestedPlaces.map((place, index) => (
        <SuggestedResult
          key={index}
          place={place}
          itinerary={itinerary}
          setItinerary={setItinerary}
        />
      ))}
    </div>
  );
}

export default SuggestedResults;
