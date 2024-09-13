import {TextField} from "@mui/material";

export default function MuiTextInput({
                                         name,
                                         value,
                                         errors,
                                         label,
                                         variant = "outlined",
                                         setValue,
                                         ...props
                                     }: any) {

    return (
        <TextField
            {...props}
            sx={{width: '100%'}}
            value={value[name]}
            error={Boolean(errors[name])}
            type="text"
            onChange={(e) => {
                const aux = {...value}
                aux[name] = e.target.value
                setValue(aux)
            }}
            variant={variant as "outlined" | "standard" | "filled"}
            label={label}
            //@ts-ignore
            helperText={errors[name]}
        />
    );
}