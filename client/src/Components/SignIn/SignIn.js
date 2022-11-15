import './SignIn.css';
import { useToast } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { loginUser } from '../../Utils/UserService';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

function SignIn({ rightActive, setRightActive }) {
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [_, setActiveUser] = useContext(UserContext);

  const toast = useToast();

  const renderErrorToast = (message) => {
    toast({
      position: 'top',
      title: 'Error',
      description: message,
      status: 'error',
      duration: 3000,
      isClosable: true
    });
  };

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e) => {
    if (
      (e.target.value.includes('@') && e.target.value.includes('.')) ||
      e.target.value === ''
    ) {
      setEmail(e.target.value);
      setEmailError(false);
    } else {
      setEmailError(true);
      renderErrorToast('Invalid email');
    }
  };

  const handlePasswordChange = (e) => {
    if (
      (e.target.value.length > 0 && e.target.value.length < 5) ||
      e.target.value.length > 15
    ) {
      setPasswordError(true);
      // password must be between 5 - 15 characters (toast)
      renderErrorToast('Password must be between 5 and 15 characters');
    } else {
      setPassword(e.target.value);
      setPasswordError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail(e.target.email.value);
    setPassword(e.target.password.value); // problem with password being updated here and it doesn't change the state until next render so password on line 69 will be wrong
    if (email === '') {
      setEmailError(true);
      renderErrorToast('Email cannot be blank');
      return;
    }
    if (e.target.password.value === '') {
      setPasswordError(true);
      renderErrorToast('Password cannot be blank');
      return;
    }

    const data = {
      email: email,
      password: e.target.password.value
    };
    const res = await loginUser(data);
    if (res.user === false) {
      renderErrorToast('Incorrect email or password');
      return;
    }
    setActiveUser(res);
    navigate('/dashboard');
  };
  const moveToSignUp = () => setRightActive(true);

  return (
    <div className={`login ${rightActive ? 'hide' : 'show'}`}>
      <h1>Hello again!</h1>
      <h2>Welcome back, we've missed you!</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className={`${emailError && 'error'}`}
          type="text"
          placeholder="Email"
          onBlur={handleEmailChange}
          name="email"
        />
        <input
          className={`${passwordError && 'error'}`}
          type="password"
          placeholder="Password"
          onBlur={handlePasswordChange}
          name="password"
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Haven't registered yet?
        <button onClick={moveToSignUp}>Create an Account</button>
      </p>
    </div>
  );
}

export default SignIn;
