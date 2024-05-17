import { View, ViewProps } from 'react-native';
import { ReactNode } from 'react';
import { clsx } from 'clsx';

type PaperProps = ViewProps & {
  children: ReactNode;
};

export default function Paper({ children, ...restProps }: PaperProps) {
  return (
    <View
      {...restProps}
      className={clsx(
        'rounded-[6px] border border-border',
        restProps.className,
      )}
    >
      {children}
    </View>
  );
}
