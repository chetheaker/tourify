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
    </div>
  );
}

export default ProDeals;
