import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../UserContext';
import { logoutUser } from '../../Utils/APIService';
import NavBar from '../NavBar/NavBar';

function ProfilePage() {
  // eslint-disable-next-line
  const [_, setActiveUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logoutUser();
    setActiveUser(null);
    navigate('/');
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h1>PROFILE</h1>
        <button onClick={handleLogOut}>LOGOUT</button>
      </div>
    </>
  );
}

export default ProfilePage;
