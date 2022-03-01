import formStyles from '../../styles/FormStyles'
import {
    Grid,
    Typography
} from "@mui/material"

import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'
import FormField from '../FormField'

const SectionField = (props) => {

    const { fieldData, editStatus } = props

    const classes = formStyles();

    return (
        <Grid key={fieldData.id} container className={editStatus?classes.section2:classes.section}>
            <Typography
                className={classes.sectionLabel}
                variant='h5'
            >
                {fieldData.label}{fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
            </Typography>
            <DescriptionCard description={fieldData.description} helperText={true}/>
            {fieldData.components.map(componentData => (
                <FormField fieldData={componentData} />
            ))}
        </Grid>
    )
}

export default SectionField
