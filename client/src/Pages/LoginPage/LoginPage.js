import './LoginPage.css';
import { ChakraProvider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../../Context/UserContext';

//COMPONENTS
import SignUp from '../../Components/SignUp/SignUp';
import SignIn from '../../Components/SignIn/SignIn';

function LoginPage() {
  const navigate = useNavigate();
  const [activeUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading, activeUser, navigate]);

  const [rightActive, setRightActive] = useState(true);

  const showSignUp = () => setRightActive(true);
  const showSignIn = () => setRightActive(false);

  if (isLoading) return <h1>LOADING...</h1>;

  return (
    <ChakraProvider>
      <div className="signup-login-container">
        <div className={`image ${rightActive ? 'right' : 'left'}`}>
          <div className="overlay"></div>
        </div>
        <div className="signup-login">
          <div className="mobile-widget">
            <div
              className={`mobile-signup ${rightActive ? 'active' : ''}`}
              onClick={showSignUp}
            >
              Sign Up
            </div>
            <div
              className={`mobile-signin ${rightActive ? '' : 'active'}`}
              onClick={showSignIn}
            >
              Sign In
            </div>
          </div>
          <SignIn rightActive={rightActive} setRightActive={setRightActive} />
          <SignUp rightActive={rightActive} setRightActive={setRightActive} />
        </div>
      </div>
    </ChakraProvider>
  );
}

export default LoginPage;
