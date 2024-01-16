import { Dimensions, View } from "react-native";
import React from "react";

import { AccountEntity } from "../../../api/models/entities/AccountEntity/AccountEntity";
import { useTheme, Card, Text } from "react-native-paper";
import useFirebaseImage from "../../../api/hooks/useStorageImage";

const AuthorCard = ({ author }: { author?: AccountEntity }) => {
  const theme = useTheme();
  const width = Dimensions.get("screen").width;
  const avatarUrl = useFirebaseImage(author?.avatar || "");
  return (
    <>
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
            <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
              {author?.introduction}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

export default AuthorCard;
