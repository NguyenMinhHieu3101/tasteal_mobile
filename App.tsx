import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { Grocery, Home, Login, Search, Signup, Welcome } from "./src/screens";
import { defaultTheme } from "./src/theme/defaultTheme";
import { ROUTES } from "./src/constants/common";

const Stack = createNativeStackNavigator();

const screens: {
  name: string;
  component: React.FC;
  options?: object;
}[] = [
  {
    name: ROUTES.Welcome,
    component: Welcome,
    options: {
      headerShown: false,
    },
  },
  {
    name: ROUTES.Login,
    component: Login,
    options: {
      headerShown: false,
    },
  },
  {
    name: ROUTES.Signup,
    component: Signup,
    options: {
      headerShown: false,
    },
  },
  {
    name: ROUTES.Home,
    component: Home,
    options: {
      headerShown: false,
    },
  },
  {
    name: ROUTES.Grocery,
    component: Grocery,
    options: {
      headerShown: false,
    },
  },
  {
    name: ROUTES.Search,
    component: Search,
    options: {
      headerShown: false,
    },
  },
];

export default function App() {
  return (
    <PaperProvider theme={defaultTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ROUTES.Welcome}>
          {screens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
              options={{
                ...screen.options,
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
