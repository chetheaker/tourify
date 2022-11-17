import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import ExploreTripPreview from '../ExploreTripPreview/ExploreTripPreview';
import './ExploreTripsContainer.css';
import { getExploreTrips } from '../../Utils/TripService';
import Loading from '../Loading/Loading';

function ExploreTripsContainer() {
  const [scrollID, setScrollID] = useState(0);
  const [exploreTrips, setExploreTrips] = useState([]);
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [isLoading, setIsLoading] = useState(true);

  const startScroll = () => {
    const id = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy(0, 0.5);
      }
    }, 25) as unknown as number;
    setScrollID(id);
  };

  const stopScroll = () => {
    clearInterval(scrollID);
    clearInterval(scrollID - 1);
  };

  useEffect(() => {
    startScroll();

    return () => stopScroll();
    //eslint-disable-next-line
  }, [containerRef]);

  useEffect(() => {
    const fetchTrips = async () => {
      const trips = await getExploreTrips();
      setExploreTrips(trips);
      setIsLoading(false);
    };
    fetchTrips();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="explore-trips-container" ref={containerRef}>
      {exploreTrips.map((trip, index) => (
        <ExploreTripPreview
          key={index}
          trip={trip}
          stopScroll={stopScroll}
          startScroll={startScroll}
        />
      ))}
    </div>
  );
}

export default ExploreTripsContainer;
