import FormStyles from '../../styles/FormStyles'
import {
    Grid,
    Typography
} from "@mui/material"

import FormField from '../FormField'

const SectionField = (props) => {

    const Styles = FormStyles.sectionStyles

    const { fieldData } = props

    return (
        <Grid key={fieldData.id} container style={Styles.section}>
            <Typography style={Styles.sectionLabel} variant='h5'>
                {fieldData.label}
            </Typography>
            {fieldData.components.map(componentData => (
                <FormField fieldData={componentData} />
            ))}
        </Grid>
    )
}

export default SectionField
