import './ProUpgrade.css';
import { Button } from '@chakra-ui/react';
import { TiTick } from 'react-icons/ti';

function ProUpgrade() {
  return (
    <div className="pro-upgrade">
      <div className="header">
        <div className="left">
          <div className="logo"></div>
          <h1>PRO</h1>
        </div>
        <div className="right">
          <Button colorScheme="green">UPGRADE</Button>
        </div>
      </div>
      <div className="body">
        <div className="left">
          <h1 className="price">$9.99</h1>
          <h1 className="month">per month</h1>
        </div>
        <div className="right">
          <div className="feature">
            <TiTick size="1.5em" color="#1FC28B" />
            <h1>Unlimited Road Trips</h1>
          </div>
          <div className="feature">
            <TiTick size="1.5em" color="#1FC28B" />
            <h1>Customised Suggestions</h1>
          </div>
          <div className="feature">
            <TiTick size="1.5em" color="#1FC28B" />
            <h1>No Ads</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProUpgrade;
