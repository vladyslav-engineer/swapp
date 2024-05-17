import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FavoriteCharactersStats } from 'app/features/characters';
import { RootView, Toolbar } from 'app/shared/ui';
import { ResetFavoritesButton } from 'app/features/common';
import { FavoriteItemsCollections } from 'app/shared/lib';

export default function FavoriteCharactersStatsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <RootView>
      <Toolbar title="Favorite" />
      <View
        className="flex-1 justify-between px-2.5 pt-2.5"
        style={{
          paddingBottom: Platform.OS === 'android' ? 24 : insets.bottom,
        }}
      >
        <FavoriteCharactersStats />
        <View className="items-center">
          <ResetFavoritesButton
            collection={FavoriteItemsCollections.CHARACTERS}
          />
        </View>
      </View>
    </RootView>
  );
}
