import './ItineraryList.css';
import ItineraryDay from '../ItineraryDay/ItineraryDay';

function ItineraryList({ itinerary }) {
  return (
    <div className="itinerary-list">
      {itinerary.map((day, index) => (
        <ItineraryDay day={day} key={index} index={index} />
      ))}
    </div>
  );
}

export default ItineraryList;
