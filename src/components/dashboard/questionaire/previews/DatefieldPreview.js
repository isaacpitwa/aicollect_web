import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Grid,
    Typography,
    TextField
} from '@mui/material'


import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { DescriptionCard } from '../utils';
import GeneralTooltip from './GeneralTooltip'

const DatefieldPreview = (props) => {

    const { fieldLabel, fieldValue, fieldDescription, tooltip, isRequired } = props
    
    const [value, setValue] = useState(fieldValue);

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
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
						renderInput={
                            (params) => <TextField
                                required={isRequired}
                                fullWidth
                                {...params}
                                helperText={<DescriptionCard description={fieldDescription} helperText={true} />}
                            />
                        }
                        InputProps={{
                            startAdornment: <GeneralTooltip tipData={tooltip} />
                        }}
                        
					/>
                </LocalizationProvider>
            </Box>
        </Grid>

    )
}

export default DatefieldPreview
                    