import { useEffect, useState } from 'react';
import './SuggestedResults.css';
import SuggestedResult from './SuggestedResult/SuggestedResult';
import { Skeleton } from '@chakra-ui/react';
import { SuggestedResultsProps } from './../../../../../types/props';

function SuggestedResults({
  place,
  category,
  directionsResponse,
  itinerary,
  setItinerary,
  isAuth
}: SuggestedResultsProps) {
  const [suggestedPlaces, setSuggestedPlaces] = useState<google.maps.places.PlaceResult[]>([]);
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

      // eslint-disable-next-line no-undef
      let map;
      const mapDiv = document.getElementById('places-map-div');
      if (mapDiv) map = new google.maps.Map(
        mapDiv,
        {
          center: location,
          zoom: 15
        }
      );

      const request: google.maps.places.PlaceSearchRequest = {
        location: location,
        radius: 2000,
        type: category
      };
      // eslint-disable-next-line no-undef
      let service;
      if (map) service = new google.maps.places.PlacesService(map);
      if (service) service.nearbySearch(request, (results, status) => {
        if (status === 'OK') {
          if (results) setSuggestedPlaces(results);
          setIsLoading(false);
        }
      });
    };

    getPlaces();
  }, [place, category, directionsResponse]);

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
          isAuth={isAuth}
        />)
      )}
    </div>
  );
}

export default SuggestedResults;
