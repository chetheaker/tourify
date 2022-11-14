import './SideBar.css';
import Hamburger from 'hamburger-react';
import { FaHome, FaUser } from 'react-icons/fa';
import { MdExplore } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';
import { HiOutlineLogout } from 'react-icons/hi';
import { useState, useContext } from 'react';
import UserContext from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Utils/APIService';

// TODO WORK ON RESPONSIVE DESIGN
function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [_, setActiveUser] = useContext(UserContext);

  const handleLogOut = async () => {
    await logoutUser();
    setActiveUser(null);
    navigate('/');
  };

  return (
    <div className={`side-bar ${isOpen ? 'side-bar-open' : ''}`}>
      <div className="side-bar-inner">
        <div className="top">
          <button className="burger">
            <Hamburger toggled={isOpen} toggle={setIsOpen} color="#1FC28B" />
            <div className={`${isOpen ? 'logo-open' : ''} logo`}></div>
          </button>
          <button className="icon-cont" onClick={() => navigate('/dashboard')}>
            <FaHome color="#1FC28B" size="2em" className="icon" />
            <span
              className={`${isOpen ? 'open' : ''}`}
              style={{ animationDelay: '0.1s' }}
            >
              Dashboard
            </span>
          </button>
          <button className="icon-cont" onClick={() => navigate('/explore')}>
            <MdExplore color="#1FC28B" size="2em" className="icon" />
            <span
              className={`${isOpen ? 'open' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              Explore
            </span>
          </button>
        </div>
        <div className="bottom">
          <button className="icon-cont">
            <IoMdNotifications color="#1FC28B" size="2em" className="icon" />
            <span
              className={`${isOpen ? 'open' : ''}`}
              style={{ animationDelay: '0.3s' }}
            >
              Notifications
            </span>
          </button>
          <button className="icon-cont" onClick={() => navigate('/profile')}>
            <FaUser color="#1FC28B" size="2em" className="icon" />
            <span
              className={`${isOpen ? 'open' : ''}`}
              style={{ animationDelay: '0.4s' }}
            >
              Profile
            </span>
          </button>
          <button className="icon-cont" onClick={handleLogOut}>
            <HiOutlineLogout color="#1FC28B" size="2em" className="icon" />
            <span
              className={`${isOpen ? 'open' : ''}`}
              style={{ animationDelay: '0.5s' }}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
