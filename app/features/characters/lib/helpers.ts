import { Character, CharacterGender } from 'app/features/characters';

export const prepareCharacterFavoriteItemId = (character: Character) => {
  return [character.url, character.gender].join(';');
};

const parseCharacterFavoriteItemGender = (id: string) => {
  return id.split(';')[1] as CharacterGender;
};

export const calcFavoriteCharactersGenderStats = (ids: string[]) => {
  return ids.reduce(
    (acc, id) => {
      const key = parseCharacterFavoriteItemGender(id);
      acc[key] += 1;
      return acc;
    },
    {
      male: 0,
      female: 0,
      'n/a': 0,
    },
  ) as Record<CharacterGender, number>;
};
