import './SignIn.css';
import { useToast } from '@chakra-ui/react';
import React, { useState, useContext, FocusEvent, FormEvent } from 'react';
import { loginUser } from '../../Utils/UserService';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import { SignInProps } from '../../../types/props';

function SignIn({ rightActive, setRightActive }: SignInProps) {
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [_, setActiveUser] = useContext(UserContext);

  const toast = useToast();

  const renderErrorToast = (message: string) => {
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

  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e: FocusEvent<HTMLInputElement>) => {
    if ((e.target !== null) &&
      ((e.target.value.includes('@') && e.target.value.includes('.')) ||
      (e.target.value === ''))
    ) {
      setEmail(e.target.value);
      setEmailError(false);
    } else {
      setEmailError(true);
      renderErrorToast('Invalid email');
    }
  };

  const handlePasswordChange = (e: FocusEvent<HTMLInputElement>) => {
    if (
      (e.target.value.length > 0 && e.target.value.length < 5) ||
      e.target.value.length > 15
    ) {
      setPasswordError(true);
      renderErrorToast('Password must be between 5 and 15 characters');
    } else {
      setPasswordError(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    type TargetType = EventTarget & {
      email: {
        value: string
      },
      password: {
        value: string
      }
    }
    e.preventDefault();
    const target = e.target as TargetType;

    setEmail(target.email.value);
    if (email === '') {
      setEmailError(true);
      renderErrorToast('Email cannot be blank');
      return;
    }
    if (target.password.value === '') {
      setPasswordError(true);
      renderErrorToast('Password cannot be blank');
      return;
    }

    const data = {
      email: email,
      password: target.password.value
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
