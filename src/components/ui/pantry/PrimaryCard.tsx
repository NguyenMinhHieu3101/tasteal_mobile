import { LinearGradient } from "expo-linear-gradient";
import { Image, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { RecipeEntity } from "../../../api/models/entities/RecipeEntity/RecipeEntity";
import useFirebaseImage from "../../../api/hooks/useFirebaseImage";
import { ROUTES } from "../../../constants/common";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const borderRadius = 20;
const cardHeight = 260;
const imageHeight = 168;
const shadow = {
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.2,
  elevation: 3,
};

const spacing = 12;
export function PrimaryCard({ recipe }: { recipe: RecipeEntity }) {
  const theme = useTheme();
  const image = useFirebaseImage(recipe.image);
  const avatar = useFirebaseImage(recipe.account.avatar);

  const navigation = useNavigation<NavigationProp<any>>();
  const handleCardPress = () => {
    navigation.navigate(ROUTES.RecipeDetail, { recipeId: recipe.id });
  };
  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View
        style={{
          backgroundColor: "white",
          height: cardHeight,
          width: "100%",
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
          {/* Hình */}
          <View style={{ height: imageHeight, position: "relative" }}>
            <Image
              source={{
                uri: image,
              }}
              style={{ flex: 1 }}
            />

            {/* <TouchableOpacity
            style={{
              position: "absolute",
              right: spacing,
              top: spacing,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 100,
              padding: 4,
            }}
          >
            <Icon source="close" size={16} color={"white"} />
          </TouchableOpacity> */}

            {/* Phút */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: spacing,
              }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.15)"]}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "200%",
                }}
              />
              <Text
                variant="labelSmall"
                style={{ fontWeight: "700", color: "white" }}
              >
                {recipe.totalTime} phút
              </Text>
            </View>

            {/* Avatar */}
            <View
              style={{
                position: "absolute",
                bottom: -5,
                width: "100%",
                paddingRight: spacing,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 64,
                  height: 32,
                }}
              >
                <Image
                  source={require("../../../../assets/tasteal/shape1.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />

                <Image
                  source={{
                    uri: avatar,
                  }}
                  style={{
                    width: 32,
                    height: 32,
                    objectFit: "cover",
                    borderRadius: 100,
                    overflow: "hidden",
                    marginTop: 16,
                  }}
                />
              </View>
            </View>
          </View>

          {/* Nội dung */}
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: spacing,
              paddingBottom: 16,
              gap: 8,
            }}
          >
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Rating
                type="star"
                ratingCount={5}
                startingValue={recipe.rating}
                imageSize={12}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
                readonly
              />
            </View>
            <Text
              variant="bodySmall"
              numberOfLines={2}
              style={{
                fontWeight: "800",
                color: theme.colors.primary,
                textAlign: "left",
                width: "100%",
              }}
            >
              {recipe.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
