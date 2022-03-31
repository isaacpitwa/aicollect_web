import React from 'react'
import {
    Box,
    Grid,
    Typography,
    MenuItem,
    Select
} from '@mui/material'

import GeneralTooltip from '../previews/GeneralTooltip'

const SelectPreview = (props) => {

    const { fieldLabel, fieldDescription, tooltip, options, isRequired } = props

    return (
        <Grid
            item
            xs={12}
            md={6}
            style={{ padding: '30px 20px' }}
        >
            <Typography
                size='small'
                style={{ backgroundColor: '#5048E5', padding: '5px 10px', color: 'white', marginTop: '2px', borderRadius: '8px 8px 0px 0px' }}
            >
                <strong>Preview</strong>
            </Typography>
            <Box
                component="form"
                style={{ padding: '20px', border: '1px #5048E5 solid', borderRadius: '0px 0px 8px 8px', marginTop: '-1px', minHeight: '200px' }}
            >
            <Typography
                style={{ fontSize: '18px', color: '#5048E5' }}
            >
                {fieldLabel}{isRequired?
                    <small style={{ color: 'red' }}>*</small>
                :''}<GeneralTooltip tipData={tooltip}/>
            </Typography>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={options[0].optionLabel}
                fullWidth
                size={'small'}
            >
                {options.map((option, index)=>(
                    <MenuItem
                        key={index}
                        value={option.optionLabel}
                    >{option.optionLabel}</MenuItem>
                ))}
            </Select>
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

export default SelectPreview
