import './RouteDetails.css';
import RouteDetail from './RouteDetail/RouteDetail';

function RouteDetails({ directionsResponse }) {
  return (
    <div className="route-details">
      {directionsResponse
        ? directionsResponse.routes[0].legs.map((leg, index) => {
            return <RouteDetail leg={leg} key={index} index={index} />;
          })
        : null}
    </div>
  );
}

export default RouteDetails;
