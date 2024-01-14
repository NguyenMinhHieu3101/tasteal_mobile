import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import DefaultBottomSheet from "../components/common/DefaultBottomSheet";
import useDefaultBottomSheet from "../hooks/useDefaultBottomSheet";
const Grocery = ({ navigation }) => {
  const bottomSheet = useDefaultBottomSheet();

  return (
    <DefaultBottomSheet
      bottomSheetHookType={bottomSheet}
      bottomSheetChildren={<Text>BottomSheet</Text>}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                style={{ marginLeft: -10 }}
                icon="arrow-left"
                size={24}
                onPress={() => navigation.navigate("DoThang")}
              />
              <IconButton
                style={{ marginRight: -10 }}
                icon="dots-horizontal-circle-outline"
                size={24}
                onPress={() => {
                  bottomSheet.openBottomSheet();
                }}
              />
            </View>
          </View>
          <View>
            <Text variant="headlineMedium" style={{ fontWeight: "900" }}>
              Giỏ đi chợ
            </Text>
          </View>
          <View>
            <Text variant="titleMedium">0 Công thức • 3 Nguyên liệu</Text>
          </View>
        </View>
      </SafeAreaView>
    </DefaultBottomSheet>
  );
};

export default Grocery;
