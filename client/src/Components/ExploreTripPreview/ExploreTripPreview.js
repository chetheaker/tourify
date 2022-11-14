import './ExploreTripPreview.css';
import { formatDate } from '../../Utils/date';
import { AiOutlineCalendar } from 'react-icons/ai';
import { Avatar, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { randomPhoto } from '../../Utils/image';
import { getUserByTrip } from '../../Utils/UserService';

function ExploreTripPreview({ stopScroll, startScroll, trip }) {
  const [tripUser, setTripUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState(null);
  const [image, setImage] = useState(null);

  const getRandomSize = () => {
    const index = Math.floor(Math.random() * 3);
    if (index === 2) return 'large';
    else if (index === 1) return 'medium';
    else return 'small';
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserByTrip(trip._id);
      setTripUser(user);
      setIsLoading(false);
    };
    setSize(getRandomSize());
    setImage(randomPhoto());
    getUser();
  }, [trip._id]);

  const handleTripDetails = () => {
    console.log('do something');
  };

  if (isLoading) return <Skeleton style={styles[size]} />;

  return (
    <div
      className="explore-trip-preview"
      style={styles[size]}
      onMouseEnter={stopScroll}
      onMouseLeave={startScroll}
      onClick={handleTripDetails}
    >
      <img
        className="preview-img"
        width="320px"
        height="320px"
        src={require(`../../media/${image}`)}
        alt=""
      />
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
        <Avatar name={`${tripUser.first_name} ${tripUser.last_name}`} />
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
