import { useEffect, useState } from 'react';
import './FriendsTrips.css';
import { getFriendTrips } from '../../Utils/TripService';

function FriendsTrips() {
  const [friendTrips, setFriendTrips] = useState([]);

  useEffect(() => {
    const getTrips = async () => {
      const trips = await getFriendTrips();
      setFriendTrips(trips);
    };
    getTrips();
  }, []);
  return (
    <div className="friends-trips">
      <div className="heading">
        <h1>Friends' Trips 🧳</h1>
      </div>
      <div className="friends-trips-container"></div>
    </div>
  );
}

export default FriendsTrips;
