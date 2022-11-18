import './InviteFriend.css';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button
} from '@chakra-ui/react';
import { MutableRefObject, useContext, useRef, useState } from 'react';
import UserContext from '../../../Context/UserContext';
import { inviteUser } from '../../../Utils/TripService';
import { InviteFriendsProps } from '../../../../types/props';

function InviteFriend({ renderToast, tripId }: InviteFriendsProps) {
  const [activeUser] = useContext(UserContext);
  const [inviteEmail, setInviteEmail] = useState('');
  const inviteRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleInvite = async () => {
    if (activeUser.email === inviteEmail) {
      renderToast(
        'Error',
        'error',
        'Cannot invite yourself, get some friends you loner'
      );
      setInviteEmail('');
      inviteRef.current.value = '';
      return;
    }
    const res = await inviteUser(tripId, inviteEmail);
    if (res.modifiedCount) {
      renderToast('Success', 'success', 'Invite sucessfully sent');
    }
    if (res.modifiedCount === 0) {
      renderToast(
        'Error',
        'error',
        'Invitee not found. Make sure they have an account!'
      );
    }
    inviteRef.current.value = '';
  };

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button>Invite Friends</Button>
      </PopoverTrigger>
      <PopoverContent border="1px" borderColor="#E2E8F0">
        <PopoverArrow />
        <PopoverHeader>
          <span className="invite-header">Invite Friend</span>
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody className="invite-body">
          <input
            ref={inviteRef}
            className="invite-input"
            placeholder="Enter your friend's email here"
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <Button colorScheme="green" onClick={handleInvite}>
            Invite
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default InviteFriend;
