import './ExploreTripPreview.css';
import { formatDate } from '../../Utils/date';
import { AiOutlineCalendar } from 'react-icons/ai';

function ExploreTripPreview({ size, stopScroll, startScroll, trip }) {
  const randomPhoto = () => {
    const randIndex = Math.ceil(Math.random() * 4);
    if (randIndex === 1) {
      return '../../../public/assets/backgrounds/bg1.jpeg';
    } else {
      return `../../../public/assets/backgrounds/bg${randIndex}.jpg`;
    }
  };

  console.log(randomPhoto());

  const handleTripDetails = () => {
    console.log('do omething');
  };

  return (
    <div
      className="explore-trip-preview"
      style={styles[size]}
      onMouseEnter={stopScroll}
      onMouseLeave={startScroll}
    >
      <div className="trip-preview" onClick={handleTripDetails}>
        <img className="preview-img" src="" alt="" />
        <div className="overlay"></div>
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
    </div>
  );
}

const styles = {
  small: {
    gridRowEnd: 'span 18'
  },
  medium: {
    gridRowEnd: 'span 22'
  },
  large: {
    gridRowEnd: 'span 26'
  }
};

export default ExploreTripPreview;
