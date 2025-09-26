import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className={`border p-2 rounded w-full ${props.className || ""}`}
    />
  );
};
