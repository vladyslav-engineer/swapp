import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Character,
  prepareCharacterFavoriteItemId,
} from 'app/features/characters';
import { AddToFavoriteButton } from 'app/features/common';
import { AnimatedPressable, Icon, Paper, Typography } from 'app/shared/ui';
import {
  FavoriteItemsCollections,
  Screens,
  useAppNavigation,
} from 'app/shared/lib';

type CharacterCardProps = {
  character: Character;
};

export default function CharacterCard({ character }: CharacterCardProps) {
  const navigation = useAppNavigation();

  const handleCharacterPress = () => {
    navigation.navigate(Screens.CHARACTER_DETAILS, {
      url: character.url,
      name: character.name,
    });
  };

  return (
    <AnimatedPressable onPress={handleCharacterPress}>
      <Paper>
        <LinearGradient
          className="flex-row items-center justify-between p-2 pl-3"
          colors={['rgba(60,121,255,0.05)', 'rgba(107,38,245,0.075)']}
          angle={45}
          useAngle
        >
          <View className="flex-row items-center gap-x-[8px]">
            <AddToFavoriteButton
              collection={FavoriteItemsCollections.CHARACTERS}
              value={prepareCharacterFavoriteItemId(character)}
            />
            <View>
              <Typography>{character.name}</Typography>
              <Typography className="mt-1 text-grey" variant="body2">
                {character.gender}
              </Typography>
            </View>
          </View>
          <View className="flex-row items-center gap-x-[8px]">
            <Typography>{character.birth_year}</Typography>
            <Icon type="chevron_right" />
          </View>
        </LinearGradient>
      </Paper>
    </AnimatedPressable>
  );
}
