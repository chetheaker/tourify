import { createContext } from 'react';
import { User } from '../../types/models';

type ContextType = [User, ContextSetter];
type ContextSetter = (cb: (prev: User) => User) => void;

const UserContext = createContext<ContextType>([{
  _id: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  notifications: [],
  account_type: '',
}, () => {}]);

export default UserContext;
