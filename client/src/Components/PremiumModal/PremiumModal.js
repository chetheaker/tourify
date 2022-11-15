import './PremiumModal.css';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react';
import { TiTick } from 'react-icons/ti';

function PremiumModal({ isOpen, onClose }) {
  const handlePremiumPurchase = () => {
    console.log('premium');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="modal-header">
          <div className="logo"></div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="modal-body">
          <h1 className="head">You need premium for this!</h1>
          <div className="body">
            <div className="left">
              <div className="feature">
                <TiTick color="white" size="1.5em" />
                <h1>Unlimited Road Trips</h1>
              </div>
              <div className="feature">
                <TiTick color="white" size="1.5em" />
                <h1>Access to explore feature</h1>
              </div>
              <div className="feature">
                <TiTick color="white" size="1.5em" />
                <h1>Access to something else</h1>
              </div>
            </div>
            <div className="right">
              <h1 className="price">$5/month</h1>
              <Button
                className="buy-btn"
                colorScheme="green"
                onClick={handlePremiumPurchase}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PremiumModal;
