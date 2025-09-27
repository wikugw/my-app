// components/ui/Button/Button.tsx
import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const buttonClass = clsx(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    className
  );

  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
}