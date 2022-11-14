import './TripDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import NavContextProvider from '../../Context/NavContext';
import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { getUserTripById, updateTripName } from '../../Utils/TripService';
import NavBar from '../NavBar/NavBar';
import Loading from '../Loading/Loading';
import Map from '../Map/Map';
import TripOverview from './TripOverview/TripOverview';
import TripRoute from './TripRoute/TripRoute';
import TripItinerary from './TripItinerary/TripItinerary';
// import TripChecklist from './TripChecklist/TripChecklist';
import TripDetailsNav from './TripDetailsNav/TripDetailsNav';
import TripSuggestions from './TripSuggestions/TripSuggestions';
import RouteDetails from './RouteDetails/RouteDetails';
import DeleteTrip from './DeleteTrip/DeleteTrip';
import UserContext from '../../Context/UserContext';

function TripDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [activeSection, setActiveSection] = useState('overview');
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [activeUser] = useContext(UserContext);
  const [isAuth, setIsAuth] = useState(false);

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
    // GET TRIP DATA FROM BACKEND
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
      console.log('trip: ', t);
      if (activeUser.email === t.user) {
        setIsAuth(true);
      }
      setTrip(t);
      setStops(t.stops);
      setItinerary(t.itinerary);
      setIsLoading(false);
    };
    getTrip();
  }, [params.tripId, navigate, activeUser.email]);

  const handleNameChangeBlur = async (e) => {
    // HANDLE UPDATE NAME
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

  const calculateRoute = async () => {
    // GET ROUTE DIRECTIONS FROM GOOGLE API
    if (!trip) return;

    setDirectionsResponse(null);

    const waypoints = stops
      .slice(1, stops.length - 1)
      .map((place) => ({ location: place.stop, stopover: true }));

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: stops[0].stop,
      destination: stops[trip.stops.length - 1].stop,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: [...waypoints]
    });
    setDirectionsResponse(results);
  };

  useEffect(() => {
    calculateRoute();
    // eslint-disable-next-line
  }, [trip?.stops]);

  useEffect(() => {
    if (!trip) return;
    setIsAuth(activeUser.email === trip.user);
  }, [isAuth, activeUser.email, trip]);

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <NavBar />
      <div className="trip-details-container">
        <div className="details" id="trip">
          <div className="trip-details-header">
            {isAuth ? (
              <input
                type="text"
                className="trip-name"
                defaultValue={trip.trip_name}
                onBlur={handleNameChangeBlur}
              />
            ) : (
              <h1 className="trip-name">{trip.trip_name}</h1>
            )}
            <div className="overlay"></div>
          </div>
          <div className="trip-details">
            <NavContextProvider>
              <TripDetailsNav />
              <TripOverview
                trip={trip}
                directionsResponse={directionsResponse}
              />
              <TripRoute
                stops={stops}
                setStops={setStops}
                tripStops={trip.stops}
                id={trip._id}
                renderToast={renderToast}
                setTrip={setTrip}
                isAuth={isAuth}
              />
              <RouteDetails directionsResponse={directionsResponse} />
              <TripSuggestions
                stops={stops}
                renderToast={renderToast}
                directionsResponse={directionsResponse}
                itinerary={itinerary}
                setItinerary={setItinerary}
                isAuth={isAuth}
              />
              <TripItinerary
                itinerary={itinerary}
                setItinerary={setItinerary}
                renderToast={renderToast}
                setTrip={setTrip}
                tripId={params.tripId}
                isAuth={isAuth}
              />
            </NavContextProvider>
            {/* <TripChecklist /> */}
            {isAuth ? (
              <DeleteTrip tripId={params.tripId} renderToast={renderToast} />
            ) : null}
          </div>
        </div>
        <Map directionsResponse={directionsResponse} />
      </div>
    </div>
  );
}

export default TripDetails;
