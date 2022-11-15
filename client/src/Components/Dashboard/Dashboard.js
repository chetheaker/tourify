import './Dashboard.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import TripsContainer from '../TripsContainer/TripsContainer';
import FriendsTrips from '../FriendsTrips/FriendsTrips';
import NavBar from '../NavBar/NavBar';
import ProUpgrade from '../ProUpgrade/ProUpgrade';
import ProDeals from '../ProDeals/ProDeals';

// TODO check frontedendjoe dashboard layouts
function Dashboard() {
  const navigate = useNavigate();
  const [activeUser] = useContext(UserContext);

  const planTrip = () => navigate('/plan');

  return (
    <div className="container">
      <NavBar />
      <div className="dashboard">
        <div className="stats-container">
          <div className="left">
            <h1 className="welcome">
              Welcome back, {activeUser.first_name}! 🙌
            </h1>
            {activeUser.account_type === 'basic' ? (
              <ProUpgrade />
            ) : (
              <ProDeals />
            )}
            <FriendsTrips />
          </div>
        </div>
        <div className="trips">
          <div className="my-trips">
            <div className="header">
              <div className="left">
                <h1>Your Trips 🌎</h1>
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
    </div>
  );
}

export default Dashboard;
