import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Grid,
    Typography,
    TextField
} from '@mui/material'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import GeneralTooltip from './GeneralTooltip'

const DatefieldPreview = (props) => {

    const { fieldLabel, fieldDescription, tooltip, isRequired } = props
    
    const [value, setValue] = useState(null);

    return (
        <Grid
            item
            xs={12}
            md={6}
            style={{ padding: '30px 20px' }}
        >
            <Typography
                style={{ backgroundColor: '#5048E5', padding: '5px 10px', color: 'white', marginTop: '2px', borderRadius: '8px 8px 0px 0px' }}
                size='small'
            >
                <strong>Preview</strong>
            </Typography>
            <Box
                component="form"
                style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 0px 8px 8px', marginTop: '-1px', minHeight: '200px' }}
            >                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
					<DesktopDatePicker
						label={fieldLabel}
						value={value}
						minDate={new Date('2017-01-01')}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
						renderInput={(params) => <TextField {...params} fullWidth/>}
					/>
                </LocalizationProvider>
                {fieldDescription!=''?
                    <Typography
                        style={{ fontSize: '14px', color: '#5048e598' }}
                    >
                        <i>{fieldDescription}</i>
                    </Typography>
                :
                    ''
                }
            </Box>
        </Grid>

    )
}

export default DatefieldPreview
                    