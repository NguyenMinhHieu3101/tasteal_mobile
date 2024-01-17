import { User } from 'firebase/auth';
import { createContext, useCallback, useState } from 'react';
import { useSpinner } from '../hooks';

export type LoginContextState = {
  login: {
    isUserSignedIn?: boolean;
    user?: User;
    handleLogin: (isUserSignedIn?: boolean, user?: User) => void;
  };
};

const LoginContext = createContext<LoginContextState>({
  login: {
    isUserSignedIn: undefined,
    user: undefined,
    handleLogin: () => {},
  },
});
export const useLoginContext = () => {
  const spin = useSpinner();

  const [login, setLogin] = useState<{
    isUserSignedIn?: boolean;
    user?: User;
  }>({});

  const handleLogin = useCallback((isUserSignedIn?: boolean, user?: User) => {
    setLogin({ isUserSignedIn: isUserSignedIn, user: user });
  }, []);

  // useEffect(() => {
  //   if (login.isUserSignedIn == undefined) {
  //     // spin(true);
  //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //       if (user) {
  //         setLogin({ isUserSignedIn: true, user: user });
  //       } else {
  //         setLogin({ isUserSignedIn: false, user: undefined });
  //       }
  //     });
  //     // spin(false);

  //     return () => {
  //       unsubscribe();
  //     };
  //   }
  // }, [login]);

  return {
    login: {
      isUserSignedIn: login.isUserSignedIn,
      user: login.user,
      handleLogin: handleLogin,
    },
  };
};

export default LoginContext;
