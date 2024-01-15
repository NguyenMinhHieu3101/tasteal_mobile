import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Autocomplete from "react-native-autocomplete-input";

const AddYourOwnItem = () => {
  const [autoCompleteValue, setAutoCompleteValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState(""); // Assuming 'unit' is a string, change it according to your data structure

  const ingredientData = []; // Replace with your actual ingredient data
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 35,
      }}
    >
      <TouchableOpacity
        style={{
          borderRadius: 100,
          height: 50,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
        onPress={showDialog}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons name="add" size={24} color="black" />
          <Text variant="bodyMedium" style={{ fontWeight: "700" }}>
            THÊM NGUYÊN LIỆU
          </Text>
        </View>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <View
            style={{
              paddingHorizontal: 24,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              minWidth: "100%",
            }}
          >
            <Text variant="bodyMedium" style={{ fontWeight: "700" }}>
              THÊM NGUYÊN LIỆU
            </Text>
            <IconButton
              icon="close"
              size={24}
              onPress={hideDialog}
            ></IconButton>
          </View>
          <Dialog.Content>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "stretch",
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    borderRadius: 40,
                    marginTop: 8,
                    paddingHorizontal: 8,
                  }}
                  value={amount.toString()}
                  onChangeText={(text) => setAmount(Number(text))}
                  keyboardType="numeric"
                  placeholder="Số lượng"
                />
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    paddingHorizontal: 8,
                    marginTop: 8,
                    backgroundColor: "#CCCCCC",
                    borderRadius: 40,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text>{unit}</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginTop: 16,
                  borderRadius: 100,
                  height: 50,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
                onPress={hideDialog}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Text variant="bodyMedium" style={{ fontWeight: "700" }}>
                    LƯU
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
});

export default AddYourOwnItem;
