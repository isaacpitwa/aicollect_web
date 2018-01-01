import FormStyles from '../../styles/FormStyles'
import {
    Grid,
    TextField
} from "@mui/material"

const textAreaField = (props) => {

    const Styles = FormStyles.sectionStyles

    const { fieldData } = props

    return (
        <Grid key={fieldData.id} container style={Styles.section}>
            <TextField
                fullWidth
                multiline
                type={'text'}
                variant={'outlined'}
                label={fieldData.label}
                style={Styles.textfield}
                rows={4}
            />
        </Grid>
    )
}

export default textAreaField
