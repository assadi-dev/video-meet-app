import React from "react";
import { Label } from "@components/ui/label";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField } from "@components/ui/form";
import { RadioGroupProps } from "@radix-ui/react-radio-group";
import { generateSlug } from "@/lib/generator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type SelectOptionsType = {
  label: string;
  value: string | number;
};
type FormFieldInputProps<T extends FieldValues> = {
  control?: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  classNames?: {
    container?: string;
    radioItems?: string;
  };
  options: SelectOptionsType[];
};

type InputFieldProps = RadioGroupProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const FormFieldRadioGroup = <T extends FieldValues>({
  control,
  name,
  options,
  ...props
}: FormFieldInputProps<T> & InputFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup
          {...props}
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          {options.map((v) => {
            const labelKey = generateSlug(v.label);
            return (
              <FormControl key={v.value}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={v.value as string}
                    id={labelKey}
                  />
                  <Label htmlFor={labelKey}>{v.label}</Label>
                </div>
              </FormControl>
            );
          })}
        </RadioGroup>
      )}
    />
  );
};

export default FormFieldRadioGroup;
