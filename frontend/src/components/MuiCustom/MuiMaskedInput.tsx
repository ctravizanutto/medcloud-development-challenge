import InputMask from "react-input-mask";
import {TextField} from "@mui/material";

export default function MuiMaskedInput({
                                           name = "",
                                           value,
                                           setValue,
                                           errors,
                                           label,
                                           mask = "",
                                           maskChar = "",
                                           formatChars = {
                                               "9": "[0-9]",
                                               "a": "[A-Za-z]",
                                               "*": "[A-Za-z0-9]",
                                           },
                                           variant = "outlined",
                                           state,
                                           ...props
                                       }: any) {
    return (
        <InputMask value={value} onChange={(e: any) => {
            const aux = {...state}
            aux[name] = e.target.value
            setValue(aux)
        }} mask={mask} maskChar={maskChar} {...(formatChars && {formatChars})}>
            {/* @ts-ignore */}
            {() => (
                <TextField
                    {...props}
                    error={Boolean(errors[name])}
                    type="text"
                    variant={variant as "outlined" | "standard" | "filled"}
                    label={label}
                    helperText={errors[name]}
                />
            )}
        </InputMask>
    );
}
