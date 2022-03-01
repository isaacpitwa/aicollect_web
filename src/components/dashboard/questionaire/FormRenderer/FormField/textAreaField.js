import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import {
    Grid,
    TextField
} from "@mui/material"

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const textAreaField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const classes = formStyles();

    return (
        <Grid key={fieldData.id} container className={editStatus?classes.section2:classes.section}>
            <TextField
                fullWidth
                multiline
                type={'text'}
                variant={'outlined'}
                label={fieldData.label}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                style={formStyles.textfield}
                rows={4}
                InputProps={{
                    endAdornment: fieldData.tooltip != '' ?<GeneralTooltip tipData={fieldData.tooltip} />:false
                }}
            />
        </Grid>
    )
}

export default textAreaField
