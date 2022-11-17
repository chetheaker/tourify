import './RouteDetail.css';
import { GiPathDistance } from 'react-icons/gi';
import { BiTimeFive, BiGasPump } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Tooltip } from '@chakra-ui/react';

function RouteDetail({ index, leg }) {
  const calculateFuelPrice = () => {
    const metres = leg.distance.value;
    const pricePerLitre = 1.5;
    const metresPerLitre = 15000;
    const litresRequired = metres / metresPerLitre;
    const totalPrice = (litresRequired * pricePerLitre).toFixed(2);
    return totalPrice;
  };

  const start = leg.start_address.replace(' ', '+');
  const end = leg.end_address.replace(' ', '+');
  const url = `https://google.com/maps/dir/${start}/${end}`;

  return (
    <div className="leg">
      <div className="heading">
        <h3>
          <span>Leg {index + 1}:</span> {leg.start_address} - {leg.end_address}
        </h3>
        <Tooltip
          label="View route in google maps"
          hasArrow
          arrowSize={10}
          placement="right"
        >
          <a href={url} target="_blank" rel="noreferrer">
            <button className="google-map"></button>
          </a>
        </Tooltip>
      </div>
      <div className="leg-details">
        <div className="leg-detail">
          <GiPathDistance />
          <h4>{leg.distance.text}</h4>
        </div>
        <div className="leg-detail">
          <BiTimeFive />
          <h4>{leg.duration.text}</h4>
        </div>
        <div className="leg-detail">
          <BiGasPump />
          <h4>${calculateFuelPrice()}</h4>
          <Tooltip
            label="Estimate based on $1.50 per litre petrol price and 15 km per litre or ~ 35 miles per gallon"
            hasArrow
            arrowSize={10}
            placement="right"
          >
            <span>
              <AiOutlineInfoCircle className="info" />
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="link">
        {/* TODO Add google location icon here */}
        {/* <a href={url} target="_blank" rel="noreferrer">
          Open in Google Maps
        </a> */}
      </div>
    </div>
  );
}

export default RouteDetail;
