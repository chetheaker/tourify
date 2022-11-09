import './NavBar.css';
import { useNavigate } from 'react-router-dom';

// ICON IMPORTS
import { FaHome, FaUser } from 'react-icons/fa';
import { MdExplore } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';

function NavBar() {
  const navigate = useNavigate();

  return (
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
        <button>
          <IoMdNotifications color="#1FC28B" size="2em" className="icon" />
        </button>
        <button onClick={() => navigate('/profile')}>
          <FaUser color="#1FC28B" size="1.5em" className="icon" />
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
