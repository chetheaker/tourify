import './NavBar.css';
import { useNavigate } from 'react-router-dom';

// ICON IMPORTS
import Hamburger from 'hamburger-react'; // for mobile
import { FaHome, FaUser } from 'react-icons/fa';
import { MdExplore } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';
import { useState } from 'react';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="left">
          <div className="logo"></div>
          <button onClick={() => navigate('/dashboard')}>
            <FaHome color="#1FC28B" size="2em" className="icon" />
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate('/explore')}>
            <MdExplore color="#1FC28B" size="2em" className="icon" />
            <span>Explore</span>
          </button>
        </div>
        <div className="right">
          <button className="burger mobile-only" id="burger">
            <Hamburger toggled={isOpen} toggle={setIsOpen} color="#1FC28B" />
          </button>
          <button>
            <IoMdNotifications color="#1FC28B" size="2em" className="icon" />
          </button>
          <button onClick={() => navigate('/profile')}>
            <FaUser color="#1FC28B" size="1.5em" className="icon" />
          </button>
        </div>
      </nav>
      <nav className={`menu ${isOpen ? 'menu-open' : ''}`}>
        <button
          onClick={() => navigate('/dashboard')}
          className="mobile"
          style={{ animationDelay: '0.1s' }}
        >
          <FaHome color="#1FC28B" size="4em" className="icon" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => navigate('/explore')}
          className="mobile"
          style={{ animationDelay: '0.2s' }}
        >
          <MdExplore color="#1FC28B" size="4em" className="icon" />
          <span>Explore</span>
        </button>
        <button className="mobile" style={{ animationDelay: '0.3s' }}>
          <IoMdNotifications color="#1FC28B" size="4em" className="icon" />
          <span>Notifications</span>
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="mobile"
          style={{ animationDelay: '0.4s' }}
        >
          <FaUser color="#1FC28B" size="4em" className="icon" />
          <span>Profile</span>
        </button>
      </nav>
    </>
  );
}

export default NavBar;
