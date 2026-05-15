import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import uniqid from "uniqid";

type SelectOptionsType = {
    label: string;
    value: string;
};
type FormFieldInputProps<T extends FieldValues> = {
    control?: Control<T>;
    name: Path<T>;
    label?: string;
    description?: string;
    placeholder?: string;
    classNameFormItem?: string;
    options: SelectOptionsType[];
};

const FormFieldSelect = <T extends FieldValues>({
    control,
    name,
    label,
    description,
    placeholder,
    options,
    classNameFormItem,
}: FormFieldInputProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={classNameFormItem}>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} {...field} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={uniqid()} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        {description && <FormDescription>{description}</FormDescription>}
                        <FormMessage />
                    </Select>
                </FormItem>
            )}
        />
    );
};

export default FormFieldSelect;
