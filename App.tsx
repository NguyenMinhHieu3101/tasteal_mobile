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

const screenHideOption = {
  tabBarStyle: {
    display: "none",
  },
  tabBarItemStyle: {
    display: "none",
  },
};

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

const Tab = createBottomTabNavigator();
const screens: {
  name: string;
  component: React.FC;
  options?: object;
}[] = [
  {
    name: ROUTES.Welcome,
    component: Welcome,
    options: {
      ...screenHideOption,
    },
  },
  {
    name: ROUTES.Login,
    component: Login,
    options: {
      ...screenHideOption,
    },
  },
  {
    name: ROUTES.Signup,
    component: Signup,
    options: {
      ...screenHideOption,
    },
  },
  {
    name: ROUTES.Grocery,
    component: Grocery,
    options: {
      ...screenHideOption,
    },
  },
  {
    name: ROUTES.IngredientFilter,
    component: IngredientFilter,
    options: {
      ...screenHideOption,
    },
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
  {
    name: "DoThang",
    component: DoThang,
    options: {
      ...screenHideOption,
    },
  },
  {
    name: ROUTES.RecipeDetail,
    component: RecipeDetail,
  },
];

export default function App() {
  return (
    <PaperProvider theme={defaultTheme}>
      <SpinnerProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={
              // ROUTES.Welcome
              "DoThang"
            }
            screenOptions={{
              headerShown: false,
            }}
          >
            {screens.map((screen) => (
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
        </NavigationContainer>
      </SpinnerProvider>
    </PaperProvider>
  );
}
