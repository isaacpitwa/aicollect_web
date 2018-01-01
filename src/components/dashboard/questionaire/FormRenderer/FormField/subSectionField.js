import FormStyles from '../../styles/FormStyles'
import {
    Grid,
    Typography
} from "@mui/material"

import FormField from '../FormField'

const SubSectionField = (props) => {

    const subSecStyles = FormStyles.subSectionStyles

    const { fieldData } = props

    return (
        <Grid key={fieldData.id} container style={subSecStyles.section}>
            <Typography style={subSecStyles.sectionLabel} variant='subtitle2'>
                {fieldData.label}
            </Typography>
            {fieldData.components.map(componentData => (
                <FormField fieldData={componentData} />
            ))}
        </Grid>
    )
}

export default SubSectionField
