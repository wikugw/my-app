import { useFormContext } from "react-hook-form";
import clsx from 'clsx';
import styles from './FormInput.module.scss';
import { Input } from "../../../micro/input/Input";

type Props = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  layout?: 'vertical' | 'horizontal' | 'inline';
  helperText?: string;
};

export function FormInput({ 
  name, 
  label, 
  type = "text", 
  placeholder, 
  required = false,
  layout = 'vertical',
  helperText 
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const hasError = !!error;

  const formInputClass = clsx(
    styles.formInput,
    styles[`formInput--${layout}`]
  );

  const labelClass = clsx(
    styles.label,
    {
      [styles['label--required']]: required,
    }
  );

  return (
    <div className={formInputClass}>
      {label && (
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
      )}
      
      <div className={clsx(styles.inputWrapper, { [styles.hasIcon]: false })}>
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          error={hasError}
          {...register(name)}
        />
      </div>

      {helperText && !hasError && (
        <span className={styles.helper}>{helperText}</span>
      )}
      
      {hasError && (
        <span className={styles.error}>
          {(error?.message as string) ?? "This field is required"}
        </span>
      )}
    </div>
  );
}