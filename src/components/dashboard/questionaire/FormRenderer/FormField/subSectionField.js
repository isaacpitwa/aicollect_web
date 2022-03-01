import { useContext } from 'react'
import { subSectionStyles } from '../../styles/FormStyles'
import {
    Grid,
    Typography
} from "@mui/material"

import { FormContext } from '../../context'
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'
import FormField from '../FormField'

const SubSectionField = (props) => {

    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const classes = subSectionStyles();

    return (
        <Grid key={fieldData.id} container className={classes.subSection}>
            <Typography variant='h5' className={classes.subSectionLabel}>
                {fieldData.label}{fieldData.tooltip != '' ?<GeneralTooltip tipData={fieldData.tooltip} />:false}
            </Typography>
            <DescriptionCard description={fieldData.description} helperText={true}/>
            {fieldData.components.map(componentData => (
                <FormField fieldData={componentData} />
            ))}
        </Grid>
    )
}

export default SubSectionField
