import { Text, TextProps } from 'react-native';
import { clsx } from 'clsx';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2';

type TypographyProps = TextProps & {
  variant?: Variant;
};

export default function Typography({
  children,
  variant = 'body1',
  ...restProps
}: TypographyProps) {
  return (
    <Text
      {...restProps}
      className={clsx(
        'font-medium text-primary',
        variant === 'h1' && 'text-[24px] font-bold',
        variant === 'h2' && 'text-[20px]',
        variant === 'h3' && 'text-[18px]',
        variant === 'h3' && 'text-[16px]',
        variant === 'body1' && 'font-regular text-[14px]',
        variant === 'body2' && 'font-regular text-[12px]',
        restProps.className,
      )}
    >
      {children}
    </Text>
  );
}
