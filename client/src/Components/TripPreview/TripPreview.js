import './TripPreview.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function TripPreview({ trip }) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    const day = dayjs(date).date();
    const month = formatMonth(dayjs(date).month());
    return `${month} ${day}`;
  };

  const formatMonth = (month) => {
    switch (month) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      default:
        return 'December';
    }
  };

  const handleTripDetails = () => {
    navigate('/trips/' + trip._id);
  };

  return (
    <div className="trip-preview" onClick={handleTripDetails}>
      <div className="bottom">
        <h1>{trip.trip_name}</h1>
        <h2>
          📍 {trip.stops[0].stop} - {trip.stops[trip.stops.length - 1].stop}
        </h2>
      </div>
      <div className="top">
        <AiOutlineCalendar />
        <h2>
          {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
        </h2>
      </div>
    </div>
  );
}

export default TripPreview;
