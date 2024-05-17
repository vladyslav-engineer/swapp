import { AnimatedPressable, Icon } from 'app/shared/ui';
import {
  FavoriteItemsCollections,
  useFavoriteItemsContext,
} from 'app/shared/lib';

type AddToFavoriteButtonProps = {
  collection: FavoriteItemsCollections;
  value: string;
};

export default function AddToFavoriteButton({
  collection,
  value,
}: AddToFavoriteButtonProps) {
  const { toggleItem, checkIsFavorite } = useFavoriteItemsContext();

  const isFavorite = checkIsFavorite(collection, value);

  return (
    <AnimatedPressable onPress={() => toggleItem(collection, value)}>
      {isFavorite ? (
        <Icon type="favorite_checked" fill="rgba(255,66,66,0.7)" />
      ) : (
        <Icon type="favorite" />
      )}
    </AnimatedPressable>
  );
}
