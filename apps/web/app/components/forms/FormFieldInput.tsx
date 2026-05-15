"use client";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputProps } from "@/types/form";

type InputFieldProps = InputProps & React.InputHTMLAttributes<HTMLInputElement>;
type FormFieldInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  classNameFormItem?: string;
} & InputFieldProps;

const FormFieldInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  classNameFormItem,
  ...props
}: FormFieldInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={classNameFormItem}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              {...props}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldInput;
