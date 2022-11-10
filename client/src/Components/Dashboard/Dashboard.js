import './Dashboard.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import TripsContainer from '../TripsContainer/TripsContainer';
import NavBar from '../NavBar/NavBar';

// TODO Fix routing: At the moment the request to get the logged in user takes some time so if a user is logged in and goes to /dashboard, they go back to the login page for a brief moment before going back to the dashboard. Could lazy load + suspend?
// TODO check frontedendjoe dashboard layouts
function Dashboard() {
  const navigate = useNavigate();
  const [activeUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setIsLoading(false), []);

  if (isLoading) {
    return <h1>LOADING...</h1>;
  }

  const planTrip = () => navigate('/plan');

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
          <div className="trips">
            <div className="header">
              <div className="left">
                <h1>Your Trips 🌎</h1>
                <h2>Your carefully crafted road trips.</h2>
              </div>
              <div className="right">
                <button onClick={planTrip}>
                  <span>Create Trip</span>
                </button>
              </div>
            </div>
            <TripsContainer planTrip={planTrip} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
