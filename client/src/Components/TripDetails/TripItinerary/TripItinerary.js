import './TripItinerary.css';
import ItineraryList from './ItineraryList/ItineraryList';
import { updateTripItinerary } from '../../../Utils/TripService';
import { useEffect } from 'react';

function TripItinerary({ itinerary, setItinerary, tripId, renderToast }) {
  useEffect(() => {
    const updateItinerary = async () => {
      await updateTripItinerary(tripId, itinerary);
    };
    updateItinerary();
  }, [itinerary, tripId, renderToast]);

  return (
    <div className="section editable ">
      <div id="itinerary">
        <ItineraryList
          itinerary={itinerary}
          setItinerary={setItinerary}
          renderToast={renderToast}
        />
      </div>
    </div>
  );
}

export default TripItinerary;
