import React from 'react'
import { TextField, Grid } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
const FormInput = ({ name, label, required , placeholder}) => {
  const { control } = useFormContext()
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        label={label}
        rules={{ required: true }}
        render={({
          field: { ref, ...field },
          fieldState: { invalid, error },
        }) => (
          <TextField
            {...field}
            inputRef={ref}
            id="firstName"
            variant="outlined"
            fullWidth
            error={invalid}
            placeholder={placeholder}
          />
        )}
      />
    </Grid>
  )
}

export default FormInput
