import { View } from 'react-native';
import { CharacterList } from 'app/features/characters';
import {
  AnimatedPressable,
  RootView,
  Toolbar,
  Typography,
} from 'app/shared/ui';
import { Screens, useAppNavigation } from 'app/shared/lib';

export default function HomeScreen() {
  const navigation = useAppNavigation();

  const handleFavoritePress = () => {
    navigation.navigate(Screens.FAVORITE_CHARACTERS_STATS);
  };

  return (
    <RootView>
      <Toolbar
        title="Home"
        renderRightSlot={() => (
          <AnimatedPressable onPress={handleFavoritePress}>
            <Typography className="text-grey">Favorite</Typography>
          </AnimatedPressable>
        )}
        hideBackButton
      />
      <View className="flex-1 px-2.5">
        <CharacterList />
      </View>
    </RootView>
  );
}
