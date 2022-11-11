import './TripDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getUserTripById, updateTripName } from '../../Utils/TripService';
import { FiEdit } from 'react-icons/fi';
import NavBar from '../NavBar/NavBar';
import Loading from '../Loading/Loading';
import Map from '../Map/Map';

function TripDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(true);
  // const [activeSection, setActiveSection] = useState('overview');

  const toast = useToast();

  const renderToast = (title, status, message) => {
    toast({
      position: 'bottom-left',
      title: title,
      description: message,
      status: status,
      duration: 3000,
      isClosable: true
    });
  };

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
    console.log(updated);
    if (updated.acknowledged) {
      renderToast('Name Updated', 'success', 'Trip name successfully updated');
    } else {
      // send error toast
      renderToast(
        'Error',
        'error',
        'Oh no! Something went wrong updating the trip name'
      );
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
          <div className="trip-details">
            <div id="trip-nav">
              <button>Overview</button>
              <button>Route</button>
              <button>Itinerary</button>
              <button>Checklist</button>
            </div>
            <div id="overview" className="section">
              OVERVIEW
              <div className="overlay"></div>
              <button className="icon-container">
                <FiEdit color="#fff" size="1.5em" />
              </button>
            </div>
            <div className="section">
              <div id="route">ROUTE</div>
              <div className="overlay"></div>
              <button className="icon-container">
                <FiEdit color="#fff" size="1.5em" />
              </button>
            </div>
            <div id="itinerary" className="section">
              ITINERARY
              <div className="overlay"></div>
              <button className="icon-container">
                <FiEdit color="#fff" size="1.5em" />
              </button>
            </div>
            <div id="checklist" className="section">
              CHECKLIST
              <div className="overlay"></div>
              <button className="icon-container">
                <FiEdit color="#fff" size="1.5em" />
              </button>
            </div>
          </div>
        </div>
        <Map />
      </div>
    </div>
  );
}

export default TripDetails;
