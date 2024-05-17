import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { CharacterCard, Character } from 'app/features/characters';
import { Icon, Typography } from 'app/shared/ui';
import { useInfiniteScroll } from 'app/shared/lib';

export default function CharacterList() {
  const {
    data: characters,
    loading,
    error,
    refreshing,
    handleRefresh,
    handleEndReached,
  } = useInfiniteScroll<Character>({
    url: 'https://swapi.py4e.com/api/people',
  });

  const insets = useSafeAreaInsets();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error refreshing={refreshing} onRefresh={handleRefresh} />;
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <Typography className="mb-2" variant="h2">
          Characters
        </Typography>
      )}
      data={characters}
      renderItem={({ item }) => <CharacterCard character={item} />}
      keyExtractor={({ url }) => url}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: Platform.OS === 'android' ? 24 : insets.bottom,
        paddingTop: 24,
      }}
      ItemSeparatorComponent={() => <View className="h-[12px]" />}
    />
  );
}

function Loading() {
  return (
    <SkeletonPlaceholder borderRadius={6}>
      <SkeletonPlaceholder.Item marginTop={24}>
        <SkeletonPlaceholder.Item height={24} marginBottom={16} />
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonPlaceholder.Item key={index} height={70} marginTop={12} />
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}

function Error({
  refreshing,
  onRefresh,
}: {
  refreshing: boolean;
  onRefresh: () => void;
}) {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 8,
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Icon type="error_file" width={40} height={40} />
      <Typography>Error fetching characters</Typography>
    </ScrollView>
  );
}
