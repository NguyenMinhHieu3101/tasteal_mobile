import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { ROUTES } from './src/constants/common';
import { Grocery, Home, Login, Search, Signup, Welcome } from './src/screens';
import DoThang from './src/screens/DoThang';
import IngredientFilter from './src/screens/IngredientFilter';
import { defaultTheme } from './src/theme/defaultTheme';

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
  {
    name: ROUTES.IngredientFilter,
    component: IngredientFilter,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'DoThang',
    component: DoThang,
    options: {
      headerShown: false,
    },
  },
];

export default function App() {
  return (
    <PaperProvider theme={defaultTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            // ROUTES.Welcome
            'DoThang'
          }
        >
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
