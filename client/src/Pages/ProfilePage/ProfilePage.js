import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';
import UserContext from '../../Context/UserContext';
import { logoutUser } from '../../Utils/UserService';
import NavBar from '../../Components/NavBar/NavBar';
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
import DeleteProfile from './DeleteProfile/DeleteProfile';

function ProfilePage() {
  // eslint-disable-next-line
  const [activeUser, setActiveUser] = useContext(UserContext);
  const navigate = useNavigate();
  const cancelRef = useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleLogOut = async () => {
    await logoutUser();
    setActiveUser(null);
    navigate('/');
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="profile-container">
          <div className="profile-heading">
            <h1>{activeUser.first_name}'s Profile</h1>
            <div className="right">
              <Button className="logout" onClick={onOpen} bg="white">
                LOGOUT
              </Button>
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Log Out
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure you want to log out?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button colorScheme="red" onClick={handleLogOut} ml={3}>
                        Log Out
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
              <DeleteProfile handleLogOut={handleLogOut} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
