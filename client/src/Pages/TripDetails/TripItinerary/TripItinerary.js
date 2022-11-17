import './TripItinerary.css';
import ItineraryList from './ItineraryList/ItineraryList';
import { updateTripItinerary } from '../../../Utils/TripService';
import { useEffect } from 'react';
import { useNav } from '../../../Hooks/useNav';

function TripItinerary({
  itinerary,
  setItinerary,
  tripId,
  renderToast,
  isAuth
}) {
  const itineraryRef = useNav('itinerary');
  useEffect(() => {
    const updateItinerary = async () => {
      await updateTripItinerary(tripId, itinerary);
    };
    updateItinerary();
  }, [itinerary, tripId, renderToast]);

  return (
    <div className="section editable ">
      <div id="itinerary" ref={itineraryRef}>
        <ItineraryList
          itinerary={itinerary}
          setItinerary={setItinerary}
          renderToast={renderToast}
          isAuth={isAuth}
        />
      </div>
    </div>
  );
}

export default TripItinerary;
