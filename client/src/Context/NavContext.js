/* Nav Scroll Effect and Context taken from https://github.com/shapirodaniel/single-page-nav */

import { createContext, useState } from 'react';

export const NavContext = createContext();

function NavContextProvider({ children }) {
  const [activeNavLink, setActiveNavLink] = useState('');

  return (
    <NavContext.Provider value={[activeNavLink, setActiveNavLink]}>
      {children}
    </NavContext.Provider>
  );
}

export default NavContextProvider;
