import React from 'react'
import {
    Box,
    Grid,
    Typography,
    TextField
} from '@mui/material'

import {
    FieldTooltip,
    DescriptionCard,
} from '../utils';

/**
 * @function FieldPreview
 * @desc This is the Field preview component that displays how a particular field will look like when added to the form.
 * @arg {Object} props - The properties passed to the field preview.
 * @arg {String} props.fieldLabel - The field label passed through props.
 * @arg {String} props.fieldValue - The field value passed through props.
 * @arg {Object} props.options - The field options passed through props.
 * @arg {String} props.fieldDescription - The field description passed through props.
 * @arg {String} props.tooltip - The field passed tooltip through props.
 * @arg {Boolean} props.isRequired - The field required passed through props.
 * @returns {Component} The Field preview component
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const FieldPreview = (props) => {

    const { fieldLabel, fieldDescription, tooltip, isRequired } = props

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
            <TextField
                required={fieldData.required}
                fullWidth
                variant="outlined"
                type={'text'}
                label={fieldData.label}
                value={fieldValue}
                onChange={handleFieldValue}
                helperText={<DescriptionCard description={fieldData.description} helperText={true} />}
                InputProps={{
                    endAdornment: <FieldTooltip tooltip={fieldData.tooltip}/>
                }}
            />
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

export default FieldPreview
                    