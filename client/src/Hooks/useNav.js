import { useRef, useContext, useEffect } from 'react';
import { useOnScreen } from './useOnScreen';
import { NavContext } from '../Context/NavContext';

export const useNav = (navLink) => {
  const ref = useRef(null);

  // eslint-disable-next-line
  const { setActiveNavLink } = useContext(NavContext);

  const isOnScreen = useOnScreen(ref);

  useEffect(() => {
    if (isOnScreen) {
      setActiveNavLink(navLink);
    }
  }, [isOnScreen, setActiveNavLink, navLink]);

  return ref;
};
