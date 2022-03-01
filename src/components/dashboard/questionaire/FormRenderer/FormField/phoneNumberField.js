import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import {
    Grid,
} from "@mui/material"
import MuiPhoneNumber from 'material-ui-phone-number'
import 'react-phone-number-input/style.css'

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'

const phoneNumberField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const classes = formStyles();

    return (
        <Grid key={fieldData.id} container className={editStatus?classes.section2:classes.section}>
            <MuiPhoneNumber
                fullWidth
                margin="dense"
                variant='outlined'
                defaultCountry={'ug'}
                label={fieldData.label}
                style={formStyles.textfield}
                helperText={<DescriptionCard description={fieldData.description} helperText={true}/>}
                InputProps={{
                    endAdornment: fieldData.tooltip != '' ?<GeneralTooltip tipData={fieldData.tooltip} />:false
                }}
            />
        </Grid>
    )
}

export default phoneNumberField
