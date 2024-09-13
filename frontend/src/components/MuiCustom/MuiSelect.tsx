import {Box, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";

export default function MuiSelect({
                                      name,
                                      value,
                                      errors,
                                      label,
                                      presetValues,
                                      setValue,
                                  }: any) {

    return (
        <>
            <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
            <Box sx={{display:'flex', flexDirection:'column'}}>
                <Select
                    value={value[name]}
                    sx = {{width: '100%', color: 'black'}}
                    label={label}
                    labelId={"demo-simple-select-standard-label"}
                    onChange={(e) => {
                        const aux = {...value}
                        aux[name] = e.target.value
                        setValue(aux)
                    }}
                    error={Boolean(errors[name])}
                    variant={'outlined'}>
                    {presetValues.map((value: any) => (<MenuItem key={value.name} value={value.uf}>{value.name}</MenuItem>))}
                </Select>
                <FormHelperText sx={{color: '#d32f2f', marginLeft:'14px'}}>{errors[name]}</FormHelperText>
            </Box>

        </>

    )
}