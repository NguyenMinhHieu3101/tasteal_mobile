import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { ROUTES } from './src/constants/common';
import { SpinnerProvider } from './src/contexts';
import { Grocery, Home, Login, Search, Signup, Welcome } from './src/screens';
import DoThang from './src/screens/DoThang';
import IngredientFilter from './src/screens/IngredientFilter';
import Pantry from './src/screens/Pantry';
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
  },
  {
    name: ROUTES.Login,
    component: Login,
  },
  {
    name: ROUTES.Signup,
    component: Signup,
  },
  {
    name: ROUTES.Home,
    component: Home,
  },
  {
    name: ROUTES.Grocery,
    component: Grocery,
  },
  {
    name: ROUTES.Search,
    component: Search,
  },
  {
    name: ROUTES.Pantry,
    component: Pantry,
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
  },
];

export default function App() {
  return (
    <PaperProvider theme={defaultTheme}>
      <SpinnerProvider>
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
                  headerShown: false,
                }}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </SpinnerProvider>
    </PaperProvider>
  );
}
