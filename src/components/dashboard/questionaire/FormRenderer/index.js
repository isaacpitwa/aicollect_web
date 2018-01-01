import { useContext } from 'react'
import FormStyles from '../styles/FormStyles'
import {
    Grid,
    Box
} from "@mui/material";

import { FormContext } from '../context'
import FormField from './FormField'

const FormRenderer = () => {

    const formStyles = FormStyles.form

    const { componentsData } = useContext(FormContext)

    return (
        <Grid container style={formStyles}>
            {componentsData.map(componentData => (
                <FormField fieldData={componentData} />
            ))}
            <Box style={{ background: '#448AFF', color: 'white', padding: '10px', width: '100%', textAlign: 'center', marginTop: '20px' }}>
                Drag and Drop a form component
            </Box>
        </Grid>
    )
}

export default FormRenderer
