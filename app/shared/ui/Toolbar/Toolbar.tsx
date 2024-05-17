import { ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable, Icon, Typography } from 'app/shared/ui';

type ToolbarProps = {
  title?: string;
  hideBackButton?: boolean;
  renderLeftSlot?: () => ReactNode;
  renderRightSlot?: () => ReactNode;
};

export default function Toolbar({
  title,
  hideBackButton,
  renderLeftSlot,
  renderRightSlot,
}: ToolbarProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View
      className="border-b border-b-border px-2.5 pb-1.5"
      style={{ paddingTop: Platform.OS === 'android' ? 24 : insets.top }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-[8px]">
          {!hideBackButton && (
            <AnimatedPressable onPress={handleGoBack}>
              <Icon type="arrow_back" fill="#323A47" />
            </AnimatedPressable>
          )}
          {title && <Typography variant="h1">{title}</Typography>}
          {renderLeftSlot?.()}
        </View>
        {renderRightSlot?.()}
      </View>
    </View>
  );
}
