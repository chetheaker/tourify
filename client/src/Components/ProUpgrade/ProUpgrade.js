import './ProUpgrade.css';
import { Button } from '@chakra-ui/react';

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
    </div>
  );
}

export default ProUpgrade;
