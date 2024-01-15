import { useMemo } from 'react';

const useSelected = (item, items, checkSelected = true) => {
  const selected = useMemo(
    () => (checkSelected ? items.includes(item) : false),
    [item, items, checkSelected]
  );
  return selected;
};

export { useSelected };
