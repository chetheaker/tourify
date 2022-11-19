import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import UserContext from './Context/UserContext';
import { useState, useEffect, lazy, Suspense } from 'react';
import { getUser } from './Utils/UserService';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { useJsApiLoader } from '@react-google-maps/api';

// COMPONENTS
import ExplorePage from './Pages/ExplorePage/ExplorePage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import PlanTrip from './Pages/PlanTrip/PlanTrip';
import TripDetails from './Pages/TripDetails/TripDetails';
import Loading from './Components/Loading/Loading';
import SuccessPage from './Pages/SuccessPage/SuccessPage';
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const LoginPage = lazy(() => import('./Pages/LoginPage/LoginPage'));

const libraries = ['places'];

function App() {
  const [activeUser, setActiveUser] = useState({
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    notifications: [],
    account_type: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries
  });

  useEffect(() => {
    async function getUserFromAPI() {
      const user = await getUser();
      if (user._id) {
        setActiveUser(user);
      }
      setIsLoading(false);
    }
    getUserFromAPI();
  }, []);

  if (!isLoaded || isLoading) return <Loading />;

  return (
    <UserContext.Provider value={[activeUser, setActiveUser]}>
      <ChakraProvider>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/plan" element={<PlanTrip />} />
                <Route path="/trips/:tripId" element={<TripDetails />} />
                <Route path="/success" element={<SuccessPage />} />
              </Route>
              <Route element={<PublicRoutes />}>
                <Route path="/" element={<LoginPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default App;
