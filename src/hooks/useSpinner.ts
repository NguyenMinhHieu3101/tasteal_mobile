import { useContext } from 'react';
import { SpinnerContext } from '../contexts';

export type SpinnerLoadingFunction = (spin?: boolean) => void;

const useSpinner = (): SpinnerLoadingFunction => {
  const spin = useContext(SpinnerContext);

  return spin;
};

export { useSpinner };
