import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Screens } from 'app/shared/lib/constants.ts';

export type PaginatedResponse<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type StackParamList = {
  [Screens.HOME]: undefined;
  [Screens.FAVORITE_CHARACTERS_STATS]: undefined;
  [Screens.CHARACTER_DETAILS]: {
    url: string;
    name: string;
  };
};

export type ScreenNavigationProp<T extends Screens> = NativeStackNavigationProp<
  StackParamList,
  T
>;

export type ScreenRouteProp<T extends Screens> = RouteProp<StackParamList, T>;
