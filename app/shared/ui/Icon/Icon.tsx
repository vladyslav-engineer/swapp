import React from 'react';
import { SvgProps } from 'react-native-svg';
import ArrowBack from 'app/shared/assets/arrow-back.svg';
import ChevronRight from 'app/shared/assets/chevron-right.svg';
import ErrorFile from 'app/shared/assets/error-file.svg';
import Favorite from 'app/shared/assets/favorite.svg';
import FavoriteChecked from 'app/shared/assets/favorite-checked.svg';

type IconType =
  | 'arrow_back'
  | 'chevron_right'
  | 'error_file'
  | 'favorite'
  | 'favorite_checked';

type IconProps = SvgProps & {
  type: IconType;
};

const mapping: Record<IconType, React.FC<SvgProps>> = {
  arrow_back: ArrowBack,
  chevron_right: ChevronRight,
  error_file: ErrorFile,
  favorite: Favorite,
  favorite_checked: FavoriteChecked,
};

export default function Icon({ type, ...restProps }: IconProps) {
  const IconComponent = mapping[type];
  return <IconComponent {...restProps} />;
}
