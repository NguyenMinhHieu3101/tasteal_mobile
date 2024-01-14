import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetHookType } from "../../hooks/useDefaultBottomSheet";

const DefaultBottomSheet = ({
  children,
  bottomSheetChildren,
  bottomSheetHookType,
  snapPoints,
}: {
  children: React.ReactNode;
  bottomSheetChildren: React.ReactNode;
  bottomSheetHookType: BottomSheetHookType;
  snapPoints?: string[];
}) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: bottomSheetHookType.isOpen ? "grey" : "white",
        }}
      >
        {children}
        <BottomSheet
          ref={bottomSheetHookType.sheetRef}
          snapPoints={snapPoints ? snapPoints : ["10%", "50%", "70%"]}
          style={{ flex: 1 }}
          enablePanDownToClose={true}
          onClose={() => bottomSheetHookType.closeBottomSheet()}
        >
          <BottomSheetView style={{ flex: 1 }}>
            {bottomSheetChildren}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default DefaultBottomSheet;
