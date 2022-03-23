import React from 'react';
import {
    Box,
    Grid,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
} from '@mui/material';

import GeneralTooltip from '../previews/GeneralTooltip';

const SelectRadioPreview = (props) => {

    const { fieldLabel, fieldDescription, tooltip, fieldValue, radios, isRequired } = props

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
                    {fieldLabel}{isRequired?<small style={{ color: 'red' }}>*</small>:''}<GeneralTooltip tipData={tooltip}/>
                </Typography>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={fieldValue}
                    >
                        {radios.map(radio=>(
                            <FormControlLabel value={radio.id} control={<Radio />} label={radio.label}/>
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
