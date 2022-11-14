import './ItineraryList.css';
import ItineraryDay from '../ItineraryDay/ItineraryDay';

function ItineraryList({ itinerary, setItinerary, renderToast, isAuth }) {
  return (
    <div className="itinerary-list">
      {itinerary.map((day, index) => (
        <ItineraryDay
          day={day}
          key={index}
          index={index}
          itinerary={itinerary}
          setItinerary={setItinerary}
          renderToast={renderToast}
          isAuth={isAuth}
        />
      ))}
    </div>
  );
}

export default ItineraryList;
