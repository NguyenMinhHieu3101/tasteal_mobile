import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react';

import Spinner from 'react-native-loading-spinner-overlay';
import { SpinnerLoadingFunction } from '../hooks/useSpinner';

type SpinnerContextType = SpinnerLoadingFunction;

const SpinnerContext = createContext(null as unknown as SpinnerContextType);

const SpinnerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [spinning, setSpinning] = useState(false);
  const spin = useCallback((spin: boolean = false) => {
    setSpinning(spin);
  }, []);

  return (
    <SpinnerContext.Provider value={spin}>
      {children}
      <Spinner visible={spinning} />
    </SpinnerContext.Provider>
  );
};

export { SpinnerContext, SpinnerProvider };
