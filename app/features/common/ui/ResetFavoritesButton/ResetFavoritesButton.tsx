import { AnimatedPressable, Typography } from 'app/shared/ui';
import {
  FavoriteItemsCollections,
  useFavoriteItemsContext,
} from 'app/shared/lib';

type ResetFavoritesButtonProps = {
  collection: FavoriteItemsCollections;
  title?: string;
};

export default function ResetFavoritesButton({
  collection,
  title = 'Clear All',
}: ResetFavoritesButtonProps) {
  const { resetCollection } = useFavoriteItemsContext();

  return (
    <AnimatedPressable onPress={() => resetCollection(collection)}>
      <Typography className="text-red-500">{title}</Typography>
    </AnimatedPressable>
  );
}
