import { useEffect, useRef, useState } from 'react';
import ExploreTripPreview from '../ExploreTripPreview/ExploreTripPreview';
import './ExploreTripsContainer.css';

const arr = [
  'small',
  'medium',
  'large',
  'medium',
  'large',
  'medium',
  'small',
  'small',
  'large',
  'small',
  'medium',
  'small',
  'medium',
  'large',
  'medium',
  'large',
  'medium',
  'small',
  'small',
  'large',
  'small',
  'medium',
  'small',
  'medium',
  'large',
  'medium',
  'large',
  'medium',
  'small',
  'small',
  'large',
  'small',
  'medium',
  'small',
  'medium',
  'large',
  'medium',
  'large',
  'medium',
  'small',
  'small',
  'large',
  'small',
  'medium',
  'small',
  'medium',
  'large',
  'medium',
  'large',
  'medium',
  'small',
  'small',
  'large',
  'small',
  'medium',
  'small',
  'medium',
  'large',
  'medium',
  'large',
  'medium',
  'small',
  'small',
  'large',
  'small',
  'medium'
];

function ExploreTripsContainer() {
  const [scrollID, setScrollID] = useState(null);
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

  return (
    <div className="explore-trips-container" ref={containerRef}>
      {arr.map((trip, index) => (
        <ExploreTripPreview
          key={index}
          size={trip}
          stopScroll={stopScroll}
          startScroll={startScroll}
        />
      ))}
    </div>
  );
}

export default ExploreTripsContainer;
