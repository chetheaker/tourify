import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './UserContext';
import { useState, useEffect, lazy, Suspense } from 'react';
import { getUser } from './Utils/APIService';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

// COMPONENTS
import ExplorePage from './Components/ExplorePage/ExplorePage';
import ProfilePage from './Components/ProfilePage/ProfilePage';
const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard'));
const LoginPage = lazy(() => import('./Components/LoginPage/LoginPage'));

function App() {
  const [activeUser, setActiveUser] = useState(null);

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
