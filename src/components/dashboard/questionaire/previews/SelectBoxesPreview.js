import React from 'react'
import {
    Box,
    Grid,
    Typography,
    TextField,
    Checkbox
} from '@mui/material'
import GeneralTooltip from '../previews/GeneralTooltip'

const SelectBoxesPreview = (props) => {

    const { fieldLabel, fieldDescription, tooltip, checkBoxes } = props

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
                {fieldLabel}<GeneralTooltip tipData={tooltip}/>
            </Typography>
            {checkBoxes.map(checkbox=>(
                <Typography key={checkbox.boxId}>
                    <Checkbox checked={checkbox.checked} />
                    {checkbox.boxLabel}
                </Typography>
            ))}
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

export default SelectBoxesPreview
