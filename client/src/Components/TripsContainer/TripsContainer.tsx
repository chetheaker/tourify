import './TripsContainer.css';
import { getUserTrips } from '../../Utils/TripService';
import TripPreview from '../TripPreview/TripPreview';
import { RiRoadsterLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import { TripsContainerProps } from '../../../types/props';
import { Trip } from '../../../types/models';

// TODO Make the trips container a random offsetted collage of trips (maybe fireship has a video or hyperplexed?)
function TripsContainer({ planTrip }: TripsContainerProps) {
  const [trips, setTrips] = useState<Trip[]>([]);

  const getTrips = async () => {
    const userTrips = await getUserTrips();
    setTrips(userTrips);
  };

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <>
      {trips.length ? (
        <div className="trips-container">
          {trips.map((trip) => (
            <TripPreview trip={trip} key={trip._id} />
          ))}
        </div>
      ) : (
        <div className="no-trips-container">
          <div className="no-trips">
            <RiRoadsterLine color="#1FC28B" size="5em" />
            <h1>You have no trips</h1>
            <button onClick={planTrip}>Create a trip now</button>
          </div>
        </div>
      )}
    </>
  );
}

export default TripsContainer;
