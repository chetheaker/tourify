import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserContext from './Context/UserContext';

function PublicRoutes() {
  const [activeUser] = useContext(UserContext);

  return activeUser.email === '' ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default PublicRoutes;
