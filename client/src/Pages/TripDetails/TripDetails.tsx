import './TripDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import NavContextProvider from '../../Context/NavContext';
import { useToast } from '@chakra-ui/react';
import { FocusEvent, useContext, useEffect, useState } from 'react';
import { getUserTripById, updateTripName } from '../../Utils/TripService';
import NavBar from '../../Components/NavBar/NavBar';
import Loading from '../../Components/Loading/Loading';
import Map from '../../Components/Map/Map';
import TripOverview from './TripOverview/TripOverview';
import TripRoute from './TripRoute/TripRoute';
import TripItinerary from './TripItinerary/TripItinerary';
import TripDetailsNav from './TripDetailsNav/TripDetailsNav';
import TripSuggestions from './TripSuggestions/TripSuggestions';
import RouteDetails from './RouteDetails/RouteDetails';
import DeleteTrip from './DeleteTrip/DeleteTrip';
import UserContext from '../../Context/UserContext';
import InviteFriend from './InviteFriend/InviteFriend';
import Attendees from './Attendees/Attendees';
import { Stop, Trip, Itinerary } from '../../../types/models';

function TripDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip & {user: string}>({
    _id: '',
    trip_name: '',
    start_date: '',
    end_date: '',
    stops: [],
    itinerary: [],
    attendees: [],
    user: ''
  });
  const [stops, setStops] = useState<Stop[]>([]);
  const [itinerary, setItinerary] = useState<Itinerary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [activeUser] = useContext(UserContext);
  const [isAuth, setIsAuth] = useState(false);

  const toast = useToast();

  const renderToast = (title: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined, message: string) => {
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
      const id = params.tripId || '';
      const t = await getUserTripById(id);
      if (!t._id) {
        navigate('/dashboard');
        return;
      }
      if (!t.user) {
        navigate('/');
        return;
      }
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

  const handleNameChangeBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (newName === trip.trip_name) return;
    const updated = await updateTripName(trip._id, newName);
    if (updated.acknowledged) {
      renderToast('Name Updated', 'success', 'Trip name successfully updated');
    } else {
      renderToast(
        'Error',
        'error',
        'Oh no! Something went wrong updating the trip name'
      );
    }
  };

  const calculateRoute = async () => {
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
            <Attendees attendees={trip.attendees} adminUser={trip.user} />
            {isAuth && params.tripId ? (
              <div className="invite">
                <InviteFriend
                  renderToast={renderToast}
                  tripId={params.tripId}
                />
              </div>
            ) : null}
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
                tripId={params.tripId || ''}
                isAuth={isAuth}
              />
            </NavContextProvider>
            {isAuth && params.tripId ? (
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