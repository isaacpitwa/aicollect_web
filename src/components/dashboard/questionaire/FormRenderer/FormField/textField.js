import FormStyles from '../../styles/FormStyles'
import {
    Grid,
    TextField
} from "@mui/material"

const textField = (props) => {

    const Styles = FormStyles.sectionStyles

    const { fieldData } = props

    return (
        <Grid key={fieldData.id} container style={Styles.section}>
            <TextField
                fullWidth
                type={'text'}
                variant={'outlined'}
                label={fieldData.label}
                style={Styles.textfield}
            />
        </Grid>
    )
}

export default textField
