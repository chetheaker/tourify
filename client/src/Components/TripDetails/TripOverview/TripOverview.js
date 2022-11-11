import './TripOverview.css';
import { GiPathDistance } from 'react-icons/gi';
import { BiTimeFive } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';

function TripOverview({ trip }) {
  return (
    <div id="overview" className="section">
      <div className="top">
        <div className="widget total-distance">
          <GiPathDistance size="1.25em" />
          <h1>Trip Distance: 500km</h1>
        </div>
        <div className="widget total-time">
          <BiTimeFive size="1.25em" />
          <h1>Trip Time: 17hr 45min</h1>
        </div>
      </div>
      <div className="bottom">
        <div className="widget total-days">
          <AiOutlineCalendar size="1.25em" />
          <h1>Road Trip Days: 7</h1>
        </div>
        <div className="widget total-stops">
          <GrLocation size="1.25em" />
          <h1>Road Trip Stops: {trip.stops.length}</h1>
        </div>
      </div>
      <div className="overlay"></div>
    </div>
  );
}

export default TripOverview;
