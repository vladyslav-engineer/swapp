import { ReactNode } from 'react';
import { View } from 'react-native';

type RootViewProps = {
  children: ReactNode;
};

export default function RootView({ children }: RootViewProps) {
  return <View className="flex-1 bg-background">{children}</View>;
}
