import './ItineraryList.css';
import ItineraryDay from '../ItineraryDay/ItineraryDay';
import { ItineraryListProps } from '../../../../../types/props';

function ItineraryList({ itinerary, setItinerary, renderToast, isAuth }: ItineraryListProps) {
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
