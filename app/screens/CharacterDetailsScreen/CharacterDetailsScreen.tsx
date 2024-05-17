import { RefreshControl, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  Character,
  prepareCharacterFavoriteItemId,
  useFetchCharacter,
} from 'app/features/characters';
import { AddToFavoriteButton } from 'app/features/common';
import { Icon, Paper, RootView, Toolbar, Typography } from 'app/shared/ui';
import {
  FavoriteItemsCollections,
  ScreenRouteProp,
  Screens,
} from 'app/shared/lib';

const titles: Partial<Record<keyof Character, string>> = {
  birth_year: 'Birth year',
  eye_color: 'Eye color',
  gender: 'Gender',
  hair_color: 'Hair color',
  height: 'Height',
  mass: 'Mass',
};

export default function CharacterDetailsScreen({
  route,
}: {
  route: ScreenRouteProp<Screens.CHARACTER_DETAILS>;
}) {
  const { character, loading, error, refreshing, onRefresh } =
    useFetchCharacter(route.params.url);

  const insets = useSafeAreaInsets();

  return (
    <RootView>
      <Toolbar
        title={route.params.name}
        renderRightSlot={() =>
          !!character && (
            <AddToFavoriteButton
              collection={FavoriteItemsCollections.CHARACTERS}
              value={prepareCharacterFavoriteItemId(character)}
            />
          )
        }
      />
      {loading && <Loading />}
      {!loading && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 24,
            paddingBottom: insets.bottom,
          }}
        >
          {error && <Error name={route.params.name} />}
          {!error && !!character && <List character={character} />}
        </ScrollView>
      )}
    </RootView>
  );
}

function List({ character }: { character: Character }) {
  const filteredInfo = Object.entries(character).filter(
    ([key]) => titles[key as keyof Character],
  );

  return (
    <View className="flex-1 gap-y-[12px]">
      {filteredInfo.map(([key, value]) => (
        <Paper key={key} className="flex-row items-center justify-between p-2">
          <Typography className="font-semibold" variant="h4">
            {titles[key as keyof Character]}
          </Typography>
          <Typography className="text-grey" variant="body2">
            {String(value)}
          </Typography>
        </Paper>
      ))}
    </View>
  );
}

function Loading() {
  return (
    <SkeletonPlaceholder borderRadius={6}>
      <SkeletonPlaceholder.Item paddingHorizontal={20} paddingTop={24}>
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            height={51}
            marginTop={index === 0 ? 0 : 12}
          />
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}

function Error({ name }: { name: string }) {
  return (
    <View className="flex-1 items-center justify-center gap-y-[8px]">
      <Icon type="error_file" width={40} height={40} />
      <Typography>Error fetching {name}</Typography>
    </View>
  );
}
