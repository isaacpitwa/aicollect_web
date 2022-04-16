import React from 'react';
import {
    Box,
    Grid,
    Typography,
    MenuItem,
    Select
} from '@mui/material';

import GeneralTooltip from './GeneralTooltip';

/**
 * @function SelectPreview
 * @desc This is the Select field preview component
 * @arg {Object} props - The properties passed to the select field preview.
 * @arg {String} props.fieldLabel - The field label passed through props.
 * @arg {String} props.fieldValue - The field value passed through props.
 * @arg {Object} props.options - The field options passed through props.
 * @arg {String} props.fieldDescription - The field description passed through props.
 * @arg {String} props.tooltip - The field passed tooltip through props.
 * @arg {Boolean} props.isRequired - The field required passed through props.
 * @returns {Component} The Select field preview component
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const SelectPreview = (props) => {

    const { fieldLabel, fieldValue, options, fieldDescription, tooltip, isRequired } = props

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
                value={options[0]?options[0].optionLabel:fieldValue}
                fullWidth
                size={'small'}
            >
                {options.map((option, index)=>(
                    <MenuItem
                        key={index}
                        value={option.label}
                    >{option.label}</MenuItem>
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
