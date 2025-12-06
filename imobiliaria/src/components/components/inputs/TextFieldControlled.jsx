import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"

export const TextFieldControlled = ({ name, control, label, rules = {}, type = "text", ...rest }) => {
    const fieldLabel = label || name;
    return (
        <Controller 
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState })=> (
                <TextField 
                    {...field}
                    id={`field-${name}`}
                    label={fieldLabel}
                    variant="outlined"
                    type={type}
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : ''}
                    {...rest}
                />
            )}
        />
    )
}