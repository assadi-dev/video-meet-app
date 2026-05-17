export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  classNamButton?: string;
}

export type InputFieldProps = InputProps &
  React.InputHTMLAttributes<HTMLInputElement>;
