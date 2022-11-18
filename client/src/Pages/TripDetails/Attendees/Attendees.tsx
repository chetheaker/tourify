import { Avatar, AvatarGroup, Tooltip } from '@chakra-ui/react';
import './Attendees.css';
import { useEffect, useState } from 'react';
import { getUserByEmail } from '../../../Utils/UserService';
import { AttendeesProps } from '../../../../types/props';
import { User } from '../../../../types/models';

function Attendees({ attendees, adminUser }: AttendeesProps) {
  const [attendeeUsers, setAttendeeUsers] = useState<User[]>([]);

  useEffect(() => {
    const getAttendees = async () => {
      const attendeesArr = [];
      for (let i = 0; i < attendees.length; i++) {
        const user = await getUserByEmail(attendees[i]);
        attendeesArr.push(user);
      }
      const admin = await getUserByEmail(adminUser);
      attendeesArr.push(admin);
      setAttendeeUsers(attendeesArr);
    };
    getAttendees();
  }, [attendees, adminUser]);

  return (
    <div className="attendees">
      <Tooltip
        label={`${
          attendeeUsers.length > 1
            ? `${attendeeUsers.length} people are going`
            : `${attendeeUsers.length} person is going`
        }`}
        hasArrow
        arrowSize={10}
        placement="right"
      >
        <span>
          <AvatarGroup max={2}>
            {attendeeUsers.map((user, index) => (
              <Avatar
                name={`${user.first_name} ${user.last_name}`}
                key={index}
              />
            ))}
          </AvatarGroup>
        </span>
      </Tooltip>
    </div>
  );
}

export default Attendees;
