import { TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetHookType } from "../../hooks/useDefaultBottomSheet";
import Animated from "react-native-reanimated";

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
        }}
      >
        <View style={{ flex: 1, zIndex: 0 }}>{children}</View>
        <Animated.View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: bottomSheetHookType.isOpen
              ? "rgba(0, 0, 0, 0.5)"
              : "transparent",
            zIndex: bottomSheetHookType.isOpen ? 1 : -1,
          }}
        >
          <BottomSheet
            ref={bottomSheetHookType.sheetRef}
            snapPoints={
              snapPoints
                ? snapPoints.map((snapPoint) =>
                    parseInt(snapPoint.replace("%", "")) < 10
                      ? "10%"
                      : snapPoint
                  )
                : ["10%", "20%", "50%", "70%"]
            }
            style={{ flex: 1 }}
            enablePanDownToClose={true}
            onClose={() => bottomSheetHookType.closeBottomSheet()}
          >
            <BottomSheetView style={{ flex: 1 }}>
              {bottomSheetChildren}
            </BottomSheetView>
          </BottomSheet>
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
};

export default DefaultBottomSheet;
