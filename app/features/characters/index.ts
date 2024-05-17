export { default as CharacterList } from './ui/CharacterList/CharacterList';
export { default as CharacterCard } from './ui/CharacterCard/CharacterCard';
export { default as FavoriteCharactersStats } from './ui/FavoriteCharactersStats/FavoriteCharactersStats';
export type { Character, CharacterGender } from './lib/types';
export {
  prepareCharacterFavoriteItemId,
  calcFavoriteCharactersGenderStats,
} from './lib/helpers';
export { useFetchCharacter } from './hooks/useFetchCharacter';
