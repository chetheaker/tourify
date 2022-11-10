import './ExplorePage.css';
import NavBar from '../NavBar/NavBar';
import ExploreTripsContainer from '../ExploreTripsContainer/ExploreTripsContainer';

function ExplorePage() {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="explore-trips">
          <div className="header">
            <h1>Explore Trips 🧭</h1>
            <h2>Explore trips made by other road trippers</h2>
          </div>
          <ExploreTripsContainer />
        </div>
      </div>
    </>
  );
}

export default ExplorePage;
