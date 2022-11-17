import './Dashboard.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import TripsContainer from '../../Components/TripsContainer/TripsContainer';
import FriendsTrips from '../../Components/FriendsTrips/FriendsTrips';
import NavBar from '../../Components/NavBar/NavBar';
import ProUpgrade from '../../Components/ProUpgrade/ProUpgrade';
import ProDeals from '../../Components/ProDeals/ProDeals';
import { getUser } from '../../Utils/UserService';
import Loading from '../../Components/Loading/Loading';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeUser, setActiveUser] = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get('session_id');
  const navigate = useNavigate();

  useEffect(() => {
    const getUserAfterPurchase = async () => {
      const user = await getUser();
      setActiveUser(user);
      setIsLoading(false);
    };
    getUserAfterPurchase();
  }, [session_id, setActiveUser]);

  const planTrip = () => navigate('/plan');

  if (isLoading) return <Loading />;

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
