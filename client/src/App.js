import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './UserContext';
import { useState, useEffect, lazy, Suspense } from 'react';
import { getUser } from './Utils/UserService';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { useJsApiLoader } from '@react-google-maps/api';

// COMPONENTS
import ExplorePage from './Components/ExplorePage/ExplorePage';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import PlanTrip from './Components/PlanTrip/PlanTrip';
const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard'));
const LoginPage = lazy(() => import('./Components/LoginPage/LoginPage'));

const libraries = ['places'];

function App() {
  const [activeUser, setActiveUser] = useState(null);

  useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries
  });

  useEffect(() => {
    async function getUserFromAPI() {
      const user = await getUser();
      if (user._id) {
        setActiveUser(user);
      }
      console.log('active user: ', user);
    }
    getUserFromAPI();
  }, []);

  return (
    <UserContext.Provider value={[activeUser, setActiveUser]}>
      <Suspense fallback={<h1>LOADING...</h1>}>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/plan" element={<PlanTrip />} />
            </Route>
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<LoginPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </UserContext.Provider>
  );
}

// entering protected endpoints always redirects to the dashboard page

export default App;
