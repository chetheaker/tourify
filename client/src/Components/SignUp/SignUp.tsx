import './SignUp.css';

import React, { useState, useContext, FocusEvent, FormEvent } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import { registerUser, loginUser } from '../../Utils/UserService';
import { SignUpProps } from '../../../types/props';

function SignUp({ setRightActive, rightActive }: SignUpProps) {
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

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleFirstNameChange = (e: FocusEvent<HTMLInputElement>) => {
    if (!/^[A-Z]+$/i.test(e.target.value) && e.target.value !== '') {
      setFirstNameError(true);
      renderErrorToast('First name can only container letters');
    } else {
      setFirstNameError(false);
      setFirstName(
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
      );
    }
  };

  const handleLastNameChange = (e: FocusEvent<HTMLInputElement>) => {
    if (/\d/.test(e.target.value)) {
      setLastNameError(true);
      renderErrorToast('Last name can only container letters');
    } else {
      setLastName(
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
      );
      setLastNameError(false);
    }
  };

  const handleEmailChange = (e: FocusEvent<HTMLInputElement>) => {
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

  const handlePasswordChange = (e: FocusEvent<HTMLInputElement>) => {
    if (
      (e.target.value.length > 0 && e.target.value.length < 5) ||
      e.target.value.length > 15
    ) {
      setPasswordError(true);
      renderErrorToast('Password must be between 5 and 15 characters');
    } else {
      setPassword(e.target.value);
      setPasswordError(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (firstName === '') {
      setFirstNameError(true);
      renderErrorToast('First name cannot be blank');
      return;
    }
    if (lastName === '') {
      setLastNameError(true);
      renderErrorToast('Last name cannot be blank');
      return;
    }
    if (email === '') {
      setEmailError(true);
      renderErrorToast('Email cannot be blank');
      return;
    }
    if (password === '') {
      setPasswordError(true);
      renderErrorToast('Password cannot be blank');
      return;
    }
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    };
    const res = await registerUser(data);
    if (res.existingEmail) {
      renderErrorToast('Email already exists');
      return;
    }
    await loginUser({ email, password });
    setActiveUser(res);
    navigate('/dashboard');
  };

  const moveToSignIn = () => setRightActive(false);

  return (
    <div className={`signup ${rightActive ? 'show' : 'hide'}`}>
      <h1>Hey there, traveller!</h1>
      <h2>Create an account to start exploring</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="names">
          <input
            className={`${firstNameError && 'error'}`}
            type="text"
            placeholder="First name"
            onBlur={handleFirstNameChange}
          />
          <input
            className={`${lastNameError && 'error'}`}
            type="text"
            placeholder="Last name"
            onBlur={handleLastNameChange}
          />
        </div>
        <input
          className={`${emailError && 'error'}`}
          type="text"
          placeholder="Email"
          onBlur={handleEmailChange}
        />
        <input
          className={`${passwordError && 'error'}`}
          type="password"
          placeholder="Password"
          onBlur={handlePasswordChange}
        />
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already have an account?<button onClick={moveToSignIn}>Sign in</button>
      </p>
    </div>
  );
}

export default SignUp;
