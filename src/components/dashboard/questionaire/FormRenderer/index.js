import { useState, useEffect, useContext } from 'react'
import formStyles from '../styles/FormStyles'
import {
    Grid,
    Box,
} from "@mui/material";

import { FormContext } from '../context'
import FormField from './FormField'

const FormRenderer = (props) => {

    const classes = formStyles();

    const { editStatus, handleFormUpdate } = props

    const { componentsData, fieldResponses } = useContext(FormContext)

    const [isLoaded, setIsLoaded] = useState(false);
    const [compsData, setCompsData] = useState([]);

    useEffect(async () => {
        // setCompsData(componentsData);
        setIsLoaded(true);
    })

    console.log(fieldResponses);

    return (
        isLoaded ?
            <Grid container className={classes.form}>
                {componentsData.map(componentData => (
                    <FormField fieldData={componentData} editStatus={editStatus} handleFormUpdate={handleFormUpdate} />
                ))}
                {editStatus ?
                    <Box style={{ background: '#448AFF', color: 'white', padding: '10px', width: '100%', textAlign: 'center', marginTop: '20px' }}>
                        Drag and Drop a form component
                    </Box>
                    :
                    ''
                }
            </Grid>
            : "Loading Form"
    )
}

export default FormRenderer
