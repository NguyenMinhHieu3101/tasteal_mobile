import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";

import { Card, Text, useTheme } from "react-native-paper";
import useFirebaseImage from "../../../api/hooks/useFirebaseImage";
import { AccountEntity } from "../../../api/models/entities/AccountEntity/AccountEntity";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../../constants/common";

const AuthorCard = ({ author }: { author?: AccountEntity }) => {
  const theme = useTheme();
  const width = Dimensions.get("screen").width;
  const avatarUrl = useFirebaseImage(author?.avatar || "");
  const navigation = useNavigation<NavigationProp<any>>();

  const handleCardPress = () => {
    navigation.navigate(ROUTES.AuthorDetail, { uid: author?.uid });
  };

  return (
    <>
      <TouchableOpacity onPress={handleCardPress}>
        <View>
          <Card style={{ width: width - 150, height: 415 }}>
            <Card.Cover source={{ uri: avatarUrl }}></Card.Cover>
            <Card.Content>
              <Text
                variant="titleSmall"
                style={{
                  textTransform: "uppercase",
                  paddingTop: 10,
                  color: theme.colors.primary,
                }}
              >
                {author?.slogan}
              </Text>
              <Text
                variant="titleMedium"
                style={{
                  fontWeight: "bold",
                  paddingVertical: 5,
                  color: theme.colors.primary,
                }}
              >
                {author?.name}
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.primary }}
              >
                {author?.introduction}
              </Text>
            </Card.Content>
          </Card>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AuthorCard;
