import './Notifications.css';
import { IoMdNotifications } from 'react-icons/io';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button
} from '@chakra-ui/react';

function Notifications() {
  return (
    <Popover>
      <PopoverTrigger>
        <button>
          <IoMdNotifications color="#1FC28B" size="2em" className="icon" />
        </button>
      </PopoverTrigger>
      <PopoverContent border="1px" borderColor="#E2E8F0">
        <PopoverArrow />
        <PopoverHeader>Notifications</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Button colorScheme="blue">Button</Button>
        </PopoverBody>
        <PopoverFooter>
          <button>Clear Notifications</button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default Notifications;
