import './ExplorePage.css';
import NavBar from '../../Components/NavBar/NavBar';
import ExploreTripsContainer from '../../Components/ExploreTripsContainer/ExploreTripsContainer';
import React from 'react';

function ExplorePage() {
  return (
    <div className="container">
      <NavBar />
      <div className="explore-trips">
        <div className="header">
          <h1>Explore Trips 🧭</h1>
          <h2>Explore trips made by other road trippers</h2>
        </div>
        <ExploreTripsContainer />
      </div>
    </div>
  );
}

export default ExplorePage;
