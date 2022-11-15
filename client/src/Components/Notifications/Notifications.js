import './Notifications.css';
import { IoMdNotifications } from 'react-icons/io';
import { GoPrimitiveDot } from 'react-icons/go';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton
} from '@chakra-ui/react';
import { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import { acceptInvite, declineInvite } from '../../Utils/TripService';

function Notifications() {
  const [activeUser, setActiveUser] = useContext(UserContext);

  const handleAccept = async (notification) => {
    const res = await acceptInvite(notification.trip.id);
    if (res.modifiedCount) {
      setActiveUser((prev) => ({
        ...prev,
        notifications: prev.notifications.filter(
          (notif) => notif.trip.id !== notification.trip.id
        )
      }));
    }
  };

  const handleDecline = async (notification) => {
    const res = await declineInvite(notification.trip.id);
    if (res.modifiedCount) {
      setActiveUser((prev) => ({
        ...prev,
        notifications: prev.notifications.filter(
          (notif) => notif.trip.id !== notification.trip.id
        )
      }));
    }
  };

  return (
    <Popover variant="responsive" className="notifications-container" size="lg">
      <PopoverTrigger>
        <button className="notif-btn">
          <IoMdNotifications color="#1FC28B" size="2em" className="icon" />
          {activeUser.notifications.length ? (
            <GoPrimitiveDot className="notification-alert" />
          ) : null}
        </button>
      </PopoverTrigger>
      <PopoverContent border="1px" borderColor="#E2E8F0">
        <PopoverArrow />
        <PopoverHeader>
          <span className="notif-header">Notifications</span>
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          {activeUser?.notifications?.length ? (
            activeUser.notifications.map((notification, index) => (
              <div className="notification" key={index}>
                <h1>
                  {notification.inviter.firstName}{' '}
                  {notification.inviter.lastName} has invited you to a road
                  trip.
                </h1>
                <div className="buttons">
                  <button
                    className="accept"
                    onClick={() => handleAccept(notification)}
                  >
                    Accept
                  </button>
                  <button
                    className="decline"
                    onClick={() => handleDecline(notification)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1>You have no new notifications</h1>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default Notifications;
