import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import {
    Grid,
    TextField,
    MenuItem
} from '@mui/material'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const locationField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const classes = formStyles();

    return (
        <Grid key={fieldData.id} item sm={12} className={editStatus?classes.section2:classes.section}>
            <TextField
                fullWidth
                select
                type={'text'}
                variant={'outlined'}
                label={fieldData.label}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                style={formStyles.textfield}
                InputProps={{
                    startAdornment: <AddLocationAltIcon style={{ color: '#5F768A', marginRight: '10px' }}/>,
                    endAdornment: fieldData.tooltip != '' ?<GeneralTooltip tipData={fieldData.tooltip} />:false,
                }}
            >
                <MenuItem disabled>Select Location</MenuItem>
                {fieldData.values.map(option => (
                    <MenuItem value={option.label}>{option.label}</MenuItem>
                ))}
            </TextField>
        </Grid>
    )
}

export default locationField
