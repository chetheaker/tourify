import './DeleteProfile.css';
import { useRef } from 'react';
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

function DeleteProfile({ id, handleLogOut }) {
  const cancelRef = useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleProfileDelete = async () => {
    console.log(id);
    const res = await deleteUser();
    console.log(res);
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
