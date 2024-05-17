import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  HomeScreen,
  FavoriteCharactersStatsScreen,
  CharacterDetailsScreen,
} from 'app/screens';
import { FavoriteItemsProvider, Screens, StackParamList } from 'app/shared/lib';

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <FavoriteItemsProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Screens.HOME} component={HomeScreen} />
          <Stack.Screen
            name={Screens.FAVORITE_CHARACTERS_STATS}
            component={FavoriteCharactersStatsScreen}
          />
          <Stack.Screen
            name={Screens.CHARACTER_DETAILS}
            component={CharacterDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteItemsProvider>
  );
}
