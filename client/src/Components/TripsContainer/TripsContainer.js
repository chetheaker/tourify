import TripPreview from '../TripPreview/TripPreview';
import './TripsContainer.css';

// TODO Make the trips container a random offsetted collage of trips (maybe fireship has a video or hyperplexed?)
function TripsContainer() {
  return (
    <div className="trips">
      <div className="header">
        <h1>Your Trips 🌎</h1>
        <h2>Your carefully crafted road trips.</h2>
      </div>
      <div className="trips-container">
        <TripPreview />
        <TripPreview />
        <TripPreview />
      </div>
    </div>
  );
}

export default TripsContainer;
