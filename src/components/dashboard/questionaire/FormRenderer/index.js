import { useContext } from 'react'
import formStyles from '../styles/FormStyles'
import {
    Grid,
    Box,
} from "@mui/material";

import { FormContext } from '../context'
import FormField from './FormField'

const FormRenderer = (props) => {

    const classes = formStyles();
    
    const { editStatus } = props

    const { componentsData } = useContext(FormContext)

    return (
        <Grid container className={classes.form}>
            {componentsData.map(componentData => (
                <FormField fieldData={componentData} editStatus={editStatus}/>
            ))}
            {editStatus?
            <Box style={{ background: '#448AFF', color: 'white', padding: '10px', width: '100%', textAlign: 'center', marginTop: '20px' }}>
                Drag and Drop a form component
            </Box>
            :
                ''
            }
        </Grid>
    )
}

export default FormRenderer
