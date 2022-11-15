import './ProDeals.css';
import { Button } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';

function ProDeals() {
  return (
    <div className="pro-deals">
      <div className="header">
        <div className="left">
          <div className="logo"></div>
          <h1>PRO</h1>
          <BsDot size="2em" className="dot" />
          <h2>Member</h2>
        </div>
        <div className="right">
          <Button colorScheme="green">EXPLORE</Button>
        </div>
      </div>
      {/* <div className="body">
        <div className="left">
          <h1 className="price">$9.99</h1>
          <h1 className="month">per month</h1>
        </div>
        <div className="right">
          <div className="feature">
            <h1>Unlimited Road Trips</h1>
          </div>
          <div className="feature">
            <h1>Customised Suggestions</h1>
          </div>
          <div className="feature">
            <h1>No Ads</h1>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default ProDeals;
