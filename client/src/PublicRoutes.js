import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserContext from './UserContext';

function PublicRoutes() {
  const [activeUser] = useContext(UserContext);

  return !activeUser ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default PublicRoutes;
