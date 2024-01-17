import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSpinner } from "../hooks";
import { auth } from "../api/firebase/firebaseConfig";
import { User } from "@react-native-google-signin/google-signin";
import { onAuthStateChanged } from "firebase/auth";

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
