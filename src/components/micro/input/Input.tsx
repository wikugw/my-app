import type { InputHTMLAttributes } from "react";
import clsx from 'clsx';
import styles from './Input.module.scss';

const sizes = ["small", "medium", "large"] as const;
type Size = typeof sizes[number];

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputSize?: Size;
  error?: boolean;
};

export const Input = ({ inputSize = "medium", error, className, ...props }: InputProps) => {
  const inputClass = clsx(
    styles.input,
    styles[`input--${inputSize}`],
    {
      [styles.error]: error,
    },
    className
  );

  return <input {...props} className={inputClass} />;
};