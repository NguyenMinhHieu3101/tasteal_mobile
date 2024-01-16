import { FC, memo, useCallback } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { IconButton, MD3Theme, Text } from "react-native-paper";
import useFirebaseImage from "../../../api/hooks/useStorageImage";
import { DirectionRes } from "../../../api/models/dtos/Response/DirectionRes/DirectionRes";

type RowDirectionItemProps = {
  item: DirectionRes;
  style?: StyleProp<ViewStyle> | undefined;
};

const RowIngredientItem: FC<RowDirectionItemProps> = ({ item, style }) => {
  const imageUrl = useFirebaseImage(item.image || "");

  return (
    <View style={[styles.container, style || {}]}>
      <View style={{ width: "100%" }}>
        <Text
          variant="titleLarge"
          style={[
            styles.stepText,
            styles.boldText,
            { paddingTop: item.step == 1 ? 0 : 20 },
          ]}
        >
          Bước: {item.step}
        </Text>
      </View>
      <View style={styles.direction}>
        <Text variant="bodyMedium" style={{ textAlign: "justify" }}>
          {item.direction}
        </Text>
      </View>

      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
  stepText: {
    // Define your text styles here
    textAlign: "left",
    width: "100%",

    fontWeight: "bold",
    paddingTop: 50,
  },
  boldText: {
    fontWeight: "bold",
  },
  direction: {
    textAlign: "justify",
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center", // Center the content horizontally
    justifyContent: "center", // Center the content vertically
  },
});

export default memo(RowIngredientItem);
