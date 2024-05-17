import { ReactNode } from 'react';
import { GestureResponderEvent, Pressable, PressableProps } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type AnimatedPressableProps = PressableProps & {
  children: ReactNode;
};

export default function AnimatedPressable({
  children,
  ...restProps
}: AnimatedPressableProps) {
  const opacity = useSharedValue(1);

  const wrapperStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(interpolate(opacity.value, [0, 1], [0.5, 1]), {
        duration: 250,
      }),
    };
  });

  const handlePressIn = (event: GestureResponderEvent) => {
    restProps.onPressIn?.(event);
    opacity.value = 0;
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    restProps.onPressOut?.(event);
    opacity.value = 1;
  };

  return (
    <Pressable
      {...restProps}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={wrapperStyle}>{children}</Animated.View>
    </Pressable>
  );
}
