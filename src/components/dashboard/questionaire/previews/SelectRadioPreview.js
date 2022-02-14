import React from 'react'
import {
    Box,
    Grid,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@mui/material'

const SelectRadioPreview = (props) => {

    const { fieldLabel, fieldDescription, radioValue, radios } = props

    return (
        <Grid item xs={12} md={6} style={{ padding: '30px 20px' }}>
            <Typography style={{ backgroundColor: '#5048E5', padding: '5px 10px', color: 'white', marginTop: '2px', borderRadius: '8px 8px 0px 0px' }} size='small' >
                <strong>Preview</strong>
            </Typography>
            <Box
                component="form"
                style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 0px 8px 8px', marginTop: '-1px', minHeight: '200px' }}
            >
                <Typography style={{ fontSize: '18px', color: '#5048E5' }}>
                    {fieldLabel}
                </Typography>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={radioValue}
                    >
                        {radios.map(radio=>(
                            <FormControlLabel value={radio.radioId} control={<Radio />} label={radio.radioLabel} />
                        ))}
                    </RadioGroup>
                </FormControl>
                {fieldDescription!=''?
                    <Typography style={{ fontSize: '14px', color: '#5048e598' }}>
                        <i>{fieldDescription}</i>
                    </Typography>
                :
                    ''
                }
            </Box>
        </Grid>

    )
}

export default SelectRadioPreview
