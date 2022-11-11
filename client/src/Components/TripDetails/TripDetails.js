import './TripDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserTripById, updateTripName } from '../../Utils/TripService';
import NavBar from '../NavBar/NavBar';
import Loading from '../Loading/Loading';
import Map from '../Map/Map';

function TripDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(true);

  useEffect(() => {
    const getTrip = async () => {
      const id = params.tripId;
      const t = await getUserTripById(id);
      if (!t._id) {
        navigate('/dashboard');
        return;
      }
      if (!t.user) {
        navigate('/');
        return;
      }
      setTrip(t);
      setIsDetailsLoading(false);
    };
    getTrip();
  }, [params.tripId, navigate]);

  const handleNameChangeBlur = async (e) => {
    const newName = e.target.value;
    // check if newName is the same as previous one
    if (newName === trip.trip_name) return;
    const updated = await updateTripName(trip._id, newName);
    if (updated.acknowledged) {
      // send toast
    } else {
      // send error toast
    }
  };

  if (isDetailsLoading) return <Loading />;

  return (
    <div className="container">
      <NavBar />
      <div className="trip-details-container">
        <div className="details">
          <div className="trip-details-header">
            <input
              type="text"
              className="trip-name"
              defaultValue={trip.trip_name}
              onBlur={handleNameChangeBlur}
            />
            <div className="overlay"></div>
          </div>
        </div>
        <Map />
      </div>
    </div>
  );
}

export default TripDetails;
