import './Dashboard.css';

import { useContext, useEffect, useState } from 'react';
import UserContext from '../../UserContext';
import TripsContainer from '../TripsContainer/TripsContainer';
import NavBar from '../NavBar/NavBar';

// TODO Fix routing: At the moment the request to get the logged in user takes some time so if a user is logged in and goes to /dashboard, they go back to the login page for a brief moment before going back to the dashboard. Could lazy load + suspend?
// TODO check frontedendjoe dashboard layouts
function Dashboard() {
  const [activeUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setIsLoading(false), []);

  if (isLoading) {
    return <h1>LOADING...</h1>;
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="dashboard">
          <div className="stats-container">
            <h1 className="welcome">
              Welcome back, {activeUser.first_name}! 🙌
            </h1>
          </div>
          <TripsContainer />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
