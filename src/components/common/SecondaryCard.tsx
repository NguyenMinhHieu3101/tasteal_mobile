import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon, IconButton, Text, useTheme } from "react-native-paper";

const borderRadius = 20;
const cardHeight = 172;
const imageHeight = "68%";
const shadow = {
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.2,
};

const SecondaryCard = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "100%",
        height: cardHeight,
        ...shadow,
        borderRadius: borderRadius,
      }}
    >
      <View
        style={{
          borderRadius: borderRadius,
          overflow: "hidden",
          flex: 1,
        }}
      >
        <View style={{ height: imageHeight }}>
          <Image
            source={{
              uri: "https://www.sidechef.com/ingredient/28cce717-1e68-446e-ac63-18bd27f8b7e9.jpg",
            }}
            style={{ flex: 1 }}
          />

          <TouchableOpacity
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 100,
              padding: 4,
            }}
          >
            <Icon source="close" size={16} color={"white"} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Text
            variant="bodySmall"
            numberOfLines={1}
            style={{
              fontWeight: "900",
              color: theme.colors.primary,
              textAlign: "center",
            }}
          >
            Táo
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SecondaryCard;
