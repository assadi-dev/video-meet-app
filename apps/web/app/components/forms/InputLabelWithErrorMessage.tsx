import { InputProps } from "@/app/types/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";

type InputLabelWithErrorMessageType = InputProps & {
    label: string;
};
const InputLabelWithErrorMessage = React.forwardRef(({ label, ...props }: InputLabelWithErrorMessageType, ref) => {
    return (
        <>
            <div className="mb-1">
                <Label>{label}</Label>
                <Input {...props} />
            </div>
            <div className="rounded bg-red-300 font-semibold text-red-900 px-1.5">erreur</div>
        </>
    );
});

InputLabelWithErrorMessage.displayName = "InputLabelWithErrorMessage";
export default InputLabelWithErrorMessage;
