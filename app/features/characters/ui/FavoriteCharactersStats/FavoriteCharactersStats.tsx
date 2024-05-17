import { View } from 'react-native';
import {
  calcFavoriteCharactersGenderStats,
  CharacterGender,
} from 'app/features/characters';
import { useFavoriteItemsContext } from 'app/shared/lib';
import { Paper, Typography } from 'app/shared/ui';

const titles: Record<CharacterGender, string> = {
  male: 'Male',
  female: 'Female',
  'n/a': 'Others',
};

export default function FavoriteCharactersStats() {
  const {
    items: { characters },
  } = useFavoriteItemsContext();

  const stats = Object.entries(calcFavoriteCharactersGenderStats(characters));

  return (
    <View>
      <Typography className="pb-2" variant="h2">
        Characters
      </Typography>
      <View className="flex-row gap-2">
        {stats.map(([key, value]) => {
          const title = titles[key as CharacterGender];
          return (
            <Paper
              className="flex-1 items-center justify-center gap-y-2 p-2"
              key={key}
            >
              <Typography variant="h1">{value.toString()}</Typography>
              <Typography variant="body2">{title}</Typography>
            </Paper>
          );
        })}
      </View>
    </View>
  );
}
