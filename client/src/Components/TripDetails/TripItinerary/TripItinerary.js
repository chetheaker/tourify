import './TripItinerary.css';
import { FiEdit } from 'react-icons/fi';

function TripItinerary() {
  return (
    <div id="itinerary" className="section">
      ITINERARY
      <div className="overlay"></div>
      <button className="icon-container">
        <FiEdit color="#fff" size="1.5em" />
      </button>
    </div>
  );
}

export default TripItinerary;
