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

    const { isLoaded, componentsData, setComponentsData, fieldResponses } = useContext(FormContext)

    const { editStatus, handleFormUpdate } = props

    const [compsData, setCompsData] = useState([]);

    useEffect(() => {
        setCompsData(componentsData)
    }, [compsData])    

    const handleRemove = (fieldId) => {
        setCompsData(componentsData.filter(section => section.id !== fieldId))
    }

    return (
        isLoaded ?
            <Grid container className={classes.form}>
                {compsData.map(componentData => (
                    <SectionField
                        fieldData={componentData}
                        fieldResponses={fieldResponses}
                        editStatus={editStatus}
                        handleFormUpdate={handleFormUpdate}
                        handleRemove={handleRemove}
                    />
                ))}
                {compsData.length===0?
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
