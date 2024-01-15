import React, { useEffect } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { IconButton, useTheme, Text } from "react-native-paper";
import useDefaultBottomSheet from "../hooks/useDefaultBottomSheet";
import Container from "../components/common/Container";

const RecipeDetail = ({ route, navigation }) => {
  const theme = useTheme();
  const widthDevice = Dimensions.get("screen").width;
  const heightDevice = Dimensions.get("screen").height;
  console.log(heightDevice); //844
  console.log(widthDevice); //390
  //const { recipe } = route.params;
  const recipe = {
    id: 4,
    name: "Thịt heo khô xé sợi rim mắm",
    rating: 4,
    totalTime: 50,
    serving_size: 4,
    introduction:
      "Thịt Heo Khô Xé Sợi Rim Mắm: Thịt heo khô xé sợi, rim mắm tạo nên một món ăn mặn ngon, giòn rụm. Hương vị mắm mặn mòi và thịt heo dai ngon kích thích vị giác. Thường được ăn kèm với cơm trắng, món thịt heo khô xé sợi rim mắm là một lựa chọn ăn vặt phổ biến và thú vị. Đây cũng là một món quà tặng lý tưởng cho những người yêu thích hương vị truyền thống Việt Nam.",
    author_note: null,
    image:
      "https://cdn.tgdd.vn/2020/08/CookProductThumb/Screenshotter--YouTube-KHHEO-CchlmmnKhHeoXSiKHNGCNLnngSy-MnngonNgyTtbyVanhKhuyen-0%E2%80%9922%E2%80%9D-620x620.jpg",
    is_private: false,
    isDeleted: false,
    author: {
      uid: "Ah3AvtwmXrfuvGFo8sjSO2IOpCg1",
      name: "Hên Nguyễn",
      avatar: "Avatar/Ah3AvtwmXrfuvGFo8sjSO2IOpCg1",
      introduction:
        "Tốt nghiệp Học viện Đầu bếp hàng đầu châu Âu. Đã từng đạt giải nhất Master Chef, làm bếp trưởng của hơn 23 chi nhánh khắp thế giới. Nay trở về ở ẩn chốn sơn dã, khám phá ẩm thực chốn hồng trần.",
      link: "https://www.facebook.com/hen.nguyen.775823/",
      slogan: "Ăn uống. Tuyệt!",
      quote: "Biến đơn giản thành phức tạp",
      recipeCount: null,
    },
    ingredients: [
      {
        id: "60",
        name: "Gừng",
        image: "Nguyen-Lieu/Rau-Cu-Qua/gung.jpg",
        amount: 50,
        amount_per_serving: 12.5,
        isLiquid: false,
      },
      {
        id: "152",
        name: "Nước mắm",
        image: "Nguyen-Lieu/Sot-Gia-Vi/nuoc-mam.jpg",
        amount: 60,
        amount_per_serving: 15,
        isLiquid: true,
      },
      {
        id: "164",
        name: "Muối",
        image: "Nguyen-Lieu/Sot-Gia-Vi/muoi.jpg",
        amount: 50,
        amount_per_serving: 12.5,
        isLiquid: false,
      },
      {
        id: "165",
        name: "Đường",
        image: "Nguyen-Lieu/Sot-Gia-Vi/duong.jpg",
        amount: 40,
        amount_per_serving: 10,
        isLiquid: false,
      },
      {
        id: "185",
        name: "Tiêu",
        image: "Nguyen-Lieu/Sot-Gia-Vi/tieu.jpg",
        amount: 20,
        amount_per_serving: 5,
        isLiquid: false,
      },
      {
        id: "230",
        name: "Hành tím",
        image: null,
        amount: 50,
        amount_per_serving: 12.5,
        isLiquid: false,
      },
      {
        id: "231",
        name: "Thịt heo",
        image: null,
        amount: 500,
        amount_per_serving: 125,
        isLiquid: false,
      },
      {
        id: "235",
        name: "Nước",
        image: null,
        amount: 100,
        amount_per_serving: 25,
        isLiquid: false,
      },
      {
        id: "236",
        name: "Sả",
        image: null,
        amount: 50,
        amount_per_serving: 12.5,
        isLiquid: false,
      },
    ],
    nutrition_info: {
      id: 241,
      calories: 265,
      fat: 0.7,
      saturated_fat: 0.26,
      trans_fat: 0,
      cholesterol: 0,
      carbohydrates: 65.38,
      fiber: 5.04,
      sugars: 42.42,
      protein: 5.08,
      sodium: 24127.3,
      vitaminD: 0,
      calcium: 132.54,
      iron: 2.63,
      potassium: 650.8,
    },
    directions: [
      {
        step: 1,
        image: "Huong-Dan/thit-heo-kho-xe-soi-rim-mam[1].jpg",
        direction:
          "Thịt heo rửa sạch, thái miếng to. Sau đó, nấu khoảng 1.5 lít nước cùng với sả, gừng và muối cùng với 1 muỗng canh nước mắm. Khi nước sôi khoảng 5 phút thì cho thịt heo vào luộc chín. Khi thịt heo vừa chín là tắt bếp vì luộc thịt lâu sẽ mất hết độ ngọt, vớt thịt ra đĩa. Chờ thịt nguội bớt, bạn xé thịt thành sợi.",
      },
      {
        step: 2,
        image: "Huong-Dan/thit-heo-kho-xe-soi-rim-mam[2].jpg",
        direction:
          "Bắc chảo lên bếp, cho vào khoảng 200 ml dầu ăn, chờ dầu hơi nóng cho hành tím vào phi thơm. Khi hành khô vàng giòn vớt hành ra chén. Bây giờ bạn cho thịt heo xé nhỏ vào chiên (chia làm 3 lần). Nhớ dùng đũa đảo cho thịt heo vàng tơi thì vớt thịt ra đĩa có lót giấy thấm dầu. Tiếp theo cho đường, nước vào chảo, bắc lên bếp nấu tan đường với lửa nhỏ, sau đó cho nước mắm vào tiếp tục nấu cho nước mắm hơi sánh (khoảng 7 phút). Cuối cùng cho thịt heo đã chiên cùng 1/2 muỗng cà phê tiêu vào, và dùng đũa trộn đều cho nước mắm thấm hết vào thịt. Trộn đều cho đến khi nước mắm cạn khô thì tắt bếp.",
      },
      {
        step: 3,
        image: "Huong-Dan/thit-heo-kho-xe-soi-rim-mam[3].jpg",
        direction:
          "Với cách làm vô cùng đơn giản là đã có ngay món thịt heo khô thơm ngon, dai dai, cay nồng đã sẵng sàng cho bạn nhâm nhi làm món ăn chơi hoặc kẹp với bánh mì làm bữa sáng rồi đấy. Chúc các bạn thành công.",
      },
    ],
    comments: [],
    createAt: "2023-12-30T10:27:27.95827",
    occasions: [],
    relatedRecipes: [
      {
        id: 2,
        name: "Heo quay da giòn",
        image: "Cong-Thuc/heo-quay-da-gion.jpg",
        totalTime: "50",
        rating: 4,
        ingredientAmount: 0,
        author: {
          uid: "Ah3AvtwmXrfuvGFo8sjSO2IOpCg1",
          name: "Hên Nguyễn",
          avatar: "Avatar/Ah3AvtwmXrfuvGFo8sjSO2IOpCg1",
          introduction:
            "Tốt nghiệp Học viện Đầu bếp hàng đầu châu Âu. Đã từng đạt giải nhất Master Chef, làm bếp trưởng của hơn 23 chi nhánh khắp thế giới. Nay trở về ở ẩn chốn sơn dã, khám phá ẩm thực chốn hồng trần.",
          link: "https://www.facebook.com/hen.nguyen.775823/",
          slogan: "Ăn uống. Tuyệt!",
          quote: "Biến đơn giản thành phức tạp",
          recipeCount: null,
        },
      },
      {
        id: 4,
        name: "Thịt heo khô xé sợi rim mắm",
        image: "Cong-Thuc/thit-heo-kho-xe-soi-rim-mam.jpg",
        totalTime: "50",
        rating: 0,
        ingredientAmount: 0,
        author: {
          uid: "Ah3AvtwmXrfuvGFo8sjSO2IOpCg1",
          name: "Hên Nguyễn",
          avatar: "Avatar/Ah3AvtwmXrfuvGFo8sjSO2IOpCg1",
          introduction:
            "Tốt nghiệp Học viện Đầu bếp hàng đầu châu Âu. Đã từng đạt giải nhất Master Chef, làm bếp trưởng của hơn 23 chi nhánh khắp thế giới. Nay trở về ở ẩn chốn sơn dã, khám phá ẩm thực chốn hồng trần.",
          link: "https://www.facebook.com/hen.nguyen.775823/",
          slogan: "Ăn uống. Tuyệt!",
          quote: "Biến đơn giản thành phức tạp",
          recipeCount: null,
        },
      },
      {
        id: 5,
        name: "Thịt heo cuộn rau củ",
        image: "Cong-Thuc/thit-heo-cuon-rau-cu.jpg",
        totalTime: "50",
        rating: 2.5,
        ingredientAmount: 0,
        author: {
          uid: "Ah3AvtwmXrfuvGFo8sjSO2IOpCg1",
          name: "Hên Nguyễn",
          avatar: "Avatar/Ah3AvtwmXrfuvGFo8sjSO2IOpCg1",
          introduction:
            "Tốt nghiệp Học viện Đầu bếp hàng đầu châu Âu. Đã từng đạt giải nhất Master Chef, làm bếp trưởng của hơn 23 chi nhánh khắp thế giới. Nay trở về ở ẩn chốn sơn dã, khám phá ẩm thực chốn hồng trần.",
          link: "https://www.facebook.com/hen.nguyen.775823/",
          slogan: "Ăn uống. Tuyệt!",
          quote: "Biến đơn giản thành phức tạp",
          recipeCount: null,
        },
      },
    ],
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <IconButton
          style={{ marginLeft: -10 }}
          icon="arrow-left"
          size={24}
          onPress={() => navigation.navigate("DoThang")}
        />
      ),
      headerStyle: {
        backgroundColor: "transparent",
      },
      headerShadowVisible: false,
    });
  }, [navigation, recipe]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ flex: 0 }}>
          <View style={{ height: 520 }}>
            <Image
              source={{ uri: recipe.image }}
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "cover",
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              position: "absolute",
              bottom: -50,
              width: "100%",
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.background,
                padding: 20,
                alignItems: "center",
                width: "90%",
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <Text style={{ color: theme.colors.primary }}>CÔNG THỨC</Text>
              <Text
                variant="headlineSmall"
                style={{
                  fontWeight: "bold",
                  color: theme.colors.primary,
                  marginVertical: 8,
                }}
              >
                {recipe.name}
              </Text>
              <Text style={{ color: theme.colors.primary }}>
                <Text
                  style={{ fontWeight: "bold", color: theme.colors.primary }}
                >
                  by
                </Text>{" "}
                {recipe.author.name}
              </Text>
            </View>
          </View>
        </View>

        <Container
          style={{
            width: "100%",
            flex: 1,
            marginTop: 100,
            backgroundColor: theme.colors.background,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 16,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: theme.colors.primary,

                    // padding: 4,
                  }}
                >
                  {recipe.rating % 1 === 0
                    ? recipe.rating.toFixed(1)
                    : recipe.rating}
                </Text>
              </View>

              <View>
                <Rating
                  type="star"
                  ratingCount={5}
                  startingValue={recipe.rating}
                  imageSize={20}
                  style={{}}
                  readonly
                />
              </View>
            </View>
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.primary,
                //  fontFamily: "roboto",
                textAlign: "justify",
                marginTop: 24,
              }}
            >
              {recipe.introduction}
            </Text>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  backgroundColor: theme.colors.background,
                  padding: 30,
                  paddingHorizontal: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  borderRadius: 12,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  gap: 16,
                  marginTop: 24,
                }}
              >
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    color: theme.colors.primary,
                  }}
                  variant="titleMedium"
                >
                  {recipe.totalTime} phút
                </Text>
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    fontStyle: "italic",
                    color: theme.colors.primary,
                  }}
                  variant="labelSmall"
                >
                  Tổng thời gian
                </Text>
              </View>
            </View>

            <Text>Thời gian: {recipe.totalTime} phút</Text>
            <Text style={{ marginBottom: 24 }}>
              Luồng: {recipe.serving_size} người
            </Text>
          </View>
        </Container>
      </View>
    </ScrollView>
  );
};

export default RecipeDetail;
