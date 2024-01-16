import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon, PaperProvider, Text, useTheme } from "react-native-paper";
import { ROUTES } from "./src/constants/common";
import { SpinnerProvider } from "./src/contexts";
import {
  Grocery,
  Home,
  Login,
  Search,
  Signup,
  Welcome,
  RecipeDetail,
} from "./src/screens";
import DoThang from "./src/screens/DoThang";
import IngredientFilter from "./src/screens/IngredientFilter";
import Pantry from "./src/screens/Pantry";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { defaultTheme } from "./src/theme/defaultTheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

const CustomTabBarIcon = ({ focused, color, active, inactive }) => {
  const theme = useTheme();
  return (
    <View style={{ paddingTop: 6 }}>
      <Icon
        source={focused ? active : inactive}
        color={!focused ? color : theme.colors.primary}
        size={24}
      />
    </View>
  );
};

const screens: {
  name: string;
  component: React.FC;
  hideBottomBar?: boolean;
  options?: object;
}[] = [
  {
    name: ROUTES.Welcome,
    component: Welcome,
    hideBottomBar: true,
  },
  {
    name: ROUTES.Login,
    component: Login,
    hideBottomBar: true,
  },
  {
    name: ROUTES.Signup,
    component: Signup,
    hideBottomBar: true,
  },
  {
    name: ROUTES.Grocery,
    component: Grocery,
    hideBottomBar: true,
  },
  {
    name: ROUTES.IngredientFilter,
    component: IngredientFilter,
    hideBottomBar: true,
  },
  {
    name: ROUTES.RecipeDetail,
    component: RecipeDetail,
    hideBottomBar: true,
  },
  // Hiện bottom navigation bar
  {
    name: ROUTES.Home,
    component: Home,
    options: {
      tabBarIcon: ({ focused, color }) => (
        <CustomTabBarIcon
          focused={focused}
          color={color}
          active="home"
          inactive="home-outline"
        />
      ),
    },
  },
  {
    name: ROUTES.Search,
    component: Search,
    options: {
      tabBarIcon: ({ focused, color }) => (
        <CustomTabBarIcon
          focused={focused}
          color={color}
          active="magnify"
          inactive="magnify"
        />
      ),
    },
  },
  {
    name: ROUTES.Pantry,
    component: Pantry,
    options: {
      tabBarIcon: ({ focused, color }) => (
        <CustomTabBarIcon
          focused={focused}
          color={color}
          active="food-takeout-box"
          inactive="food-takeout-box-outline"
        />
      ),
    },
  },
  // Xóa khi phát triển xong
  {
    name: "DoThang",
    component: DoThang,
    hideBottomBar: true,
  },
];

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider theme={defaultTheme}>
      <SpinnerProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={
              // ROUTES.Welcome Mở ra
              "DoThang"
            }
            screenOptions={{
              headerShown: false,
            }}
          >
            {screens
              // .filter((screen) => screen.hideBottomBar) Mở ra
              .map((screen) => (
                <Stack.Screen
                  key={screen.name}
                  name={screen.name}
                  component={screen.component}
                  options={{ ...screen.options }}
                />
              ))}

            <Stack.Screen
              name={ROUTES.NoBottomBarScreen}
              children={NoBottomBar}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SpinnerProvider>
    </PaperProvider>
  );
}

const NoBottomBar = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      unmountOnBlur: true,
    })}
    initialRouteName={ROUTES.Home}
  >
    {screens
      .filter((screen) => !screen.hideBottomBar)
      .map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            ...screen.options,
            tabBarLabel: ({ focused, color }) => (
              <Text
                variant="labelSmall"
                style={{
                  color: !focused ? color : defaultTheme.colors.primary,
                  fontWeight: focused ? "900" : "normal",
                }}
              >
                {screen.name}
              </Text>
            ),
          }}
        />
      ))}
  </Tab.Navigator>
);
