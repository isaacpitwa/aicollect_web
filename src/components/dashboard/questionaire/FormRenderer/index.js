import { useState, useEffect, useContext } from 'react'
import formStyles from '../styles/FormStyles'
import {
    Grid,
    Box,
} from "@mui/material";

import { FormContext } from '../context'
import SectionField from './FormField/sectionField'

const FormRenderer = (props) => {

    const classes = formStyles();

    const { isLoaded, componentsData, fieldResponses } = useContext(FormContext)

    const { editStatus, handleFormUpdate } = props

    const [compsData, setCompsData] = useState([]);

    useEffect(async () => {
        // setCompsData(componentsData);
        // setIsLoaded(true);
        setCompsData(componentsData)
    }, [isLoaded])

    

    return (
        isLoaded ?
            <Grid container className={classes.form}>
                {componentsData.map(componentData => (
                    <SectionField fieldData={componentData} fieldResponses={fieldResponses} editStatus={editStatus} handleFormUpdate={handleFormUpdate} />
                ))}
                {componentsData.length===0?
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
