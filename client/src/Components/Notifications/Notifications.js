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
import { useContext } from 'react';
import UserContext from '../../Context/UserContext';

function Notifications() {
  const [activeUser, setActiveUser] = useContext(UserContext);

  return (
    <Popover>
      <PopoverTrigger>
        <button>
          <IoMdNotifications color="#1FC28B" size="2em" className="icon" />
        </button>
      </PopoverTrigger>
      <PopoverContent border="1px" borderColor="#E2E8F0">
        <PopoverArrow />
        <PopoverHeader>
          <span className="notif-header">Notifications</span>
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          {activeUser.notifications.length ? (
            activeUser.notifications.map((notification) => (
              <h1>{notification.body}</h1>
            ))
          ) : (
            <h1>You have no new notifications</h1>
          )}
        </PopoverBody>
        <PopoverFooter>
          {activeUser.notifications.length ? (
            <button className="clear-notifications">Clear Notifications</button>
          ) : null}
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default Notifications;
