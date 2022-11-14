import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserContext from './Context/UserContext';

function PrivateRoutes() {
  const [activeUser] = useContext(UserContext);

  return activeUser ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
