import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export default function MuiDatePicker({
                                         name,
                                         value,
                                         errors,
                                         label,
                                         format = "DD/MM/YYYY",
                                         disabledFuture = false,
                                         setValue,
                                     }: any) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                // @ts-ignore
                value={value[name]}
                onChange={(e) => {
                    const aux = {...value}
                    aux[name] = e
                    setValue(aux)
                }}
                format={format}
                disableFuture={disabledFuture}
                formatDensity="spacious"
                reduceAnimations
                slotProps={{
                    textField: {
                        /* @ts-ignore */
                        helperText: errors[name],
                        error: Boolean(errors[name])
                    }
                }}
            />
        </LocalizationProvider>
    );
}