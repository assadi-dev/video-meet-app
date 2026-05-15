import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form";
import MultipleSelector, { MultipleSelectorProps, Option } from "../ui/MultipleSelector";

type FormFieldMultiSelectProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    description?: string;
    placeholder?: string;
    classNameFormItem?: string;
    options?: Option[];
} & MultipleSelectorProps;
const FormFieldMultiSelect = <T extends FieldValues>({
    control,
    name,
    label,
    description,
    placeholder,
    classNameFormItem,
    options,
    ...props
}: FormFieldMultiSelectProps<T>) => {
    return (
        <div>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl className={classNameFormItem}>
                            <MultipleSelector
                                {...field}
                                defaultOptions={options}
                                placeholder={placeholder}
                                emptyIndicator={
                                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                        Aucun résultat
                                    </p>
                                }
                                {...props}
                            />
                        </FormControl>
                        {description && <FormDescription>{description}</FormDescription>}
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default FormFieldMultiSelect;
