import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useRef, useState } from 'react';

export type BottomSheetHookType = {
  sheetRef: React.MutableRefObject<BottomSheetMethods>;
  isOpen: boolean;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
};

const useDefaultBottomSheet: () => BottomSheetHookType = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openBottomSheet = () => {
    setIsOpen(true);
    sheetRef.current?.expand();
  };
  const closeBottomSheet = () => {
    setIsOpen(false);
    sheetRef.current?.close();
  };
  return { sheetRef, isOpen, openBottomSheet, closeBottomSheet };
};

export default useDefaultBottomSheet;
