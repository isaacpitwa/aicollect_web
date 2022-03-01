import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import {
    Grid,
    Typography,
    TextField,
    MenuItem
} from '@mui/material'

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const selectField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const classes = formStyles();

    return (
        <Grid key={fieldData.id} container className={editStatus?classes.section2:classes.section}>
            <Typography style={{ fontSize: '18px', color: '#5048E5' }}>
                {fieldData.label}<GeneralTooltip tipData={fieldData.tooltip}/>
            </Typography>
            <TextField
                fullWidth
                select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fieldData.values[0].label}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
            >
                {fieldData.values.map(option => (
                    <MenuItem value={option.label}>{option.label}</MenuItem>
                ))}
            </TextField>
        </Grid>

    )
}

export default selectField
