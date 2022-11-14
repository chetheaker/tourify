import { Avatar, AvatarGroup } from '@chakra-ui/react';
import './Attendees.css';

function Attendees({ attendees }) {
  console.log(attendees);
  return (
    <div className="attendees">
      <AvatarGroup>
        <Avatar name="John Smith" />
      </AvatarGroup>
    </div>
  );
}

export default Attendees;
