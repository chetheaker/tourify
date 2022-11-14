import { useEffect, useRef, useState } from 'react';
import ExploreTripPreview from '../ExploreTripPreview/ExploreTripPreview';
import './ExploreTripsContainer.css';
import { getExploreTrips } from '../../Utils/TripService';

function ExploreTripsContainer() {
  const [scrollID, setScrollID] = useState(null);
  const [exploreTrips, setExploreTrips] = useState([]);
  const containerRef = useRef();

  const startScroll = () => {
    const id = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy(0, 0.5);
      }
    }, 25);
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
    };
    fetchTrips();
  }, []);

  const getRandomSize = () => {
    const index = Math.floor(Math.random() * 3);
    if (index === 2) return 'large';
    else if (index === 1) return 'medium';
    else return 'small';
  };

  return (
    <div className="explore-trips-container" ref={containerRef}>
      {exploreTrips.map((trip, index) => (
        <ExploreTripPreview
          key={index}
          size={getRandomSize()}
          trip={trip}
          stopScroll={stopScroll}
          startScroll={startScroll}
        />
      ))}
    </div>
  );
}

export default ExploreTripsContainer;
