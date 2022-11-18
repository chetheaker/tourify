import './DeleteProfile.css';
import { MutableRefObject, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { deleteUser } from '../../../Utils/UserService';
import { DeleteProfileProps } from '../../../../types/props';

function DeleteProfile({ handleLogOut }: DeleteProfileProps) {
  const cancelRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleProfileDelete = async () => {
    const res = await deleteUser();
    if (res.acknowledged) {
      onClose();
      await handleLogOut();
    }
  };

  return (
    <>
      <div className="delete-profile">
        <Button colorScheme="red" onClick={onOpen}>
          Delete Profile
        </Button>
      </div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Profile
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleProfileDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteProfile;
