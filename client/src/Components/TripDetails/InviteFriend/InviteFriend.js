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
import { useContext, useRef, useState } from 'react';
import UserContext from '../../../Context/UserContext';

function InviteFriend({ renderToast }) {
  const [activeUser] = useContext(UserContext);
  const [inviteEmail, setInviteEmail] = useState('');
  const inviteRef = useRef();

  const handleInvite = () => {
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

    console.log(inviteEmail);
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
