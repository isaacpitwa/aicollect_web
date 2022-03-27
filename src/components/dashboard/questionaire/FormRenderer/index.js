import { useState, useEffect, useContext } from 'react'
import formStyles from '../styles/FormStyles'
import {
    Grid,
    Box,
} from "@mui/material";
import FormLoader from '../utils/FormLoader';


import { FormContext } from '../context'
import SectionField from './FormField/sectionField'

const FormRenderer = (props) => {

    const classes = formStyles();

    const { isLoaded, componentsData, setComponentsData, fieldResponses } = useContext(FormContext)

    const { editStatus, handleFormUpdate } = props

    useEffect(() => {
    }, [isLoaded, componentsData])    

    const handleRemove = (fieldId) => {
        setComponentsData(componentsData.filter(section => section.id !== fieldId))
    }

    return (
        isLoaded ?
            <Grid container className={classes.form}>
                {componentsData.map((componentData, index) => (
                    <SectionField
                        key={index}
                        fieldData={componentData}
                        fieldResponses={fieldResponses}
                        editStatus={editStatus}
                        handleFormUpdate={handleFormUpdate}
                        handleRemove={handleRemove}
                    />
                ))}
                {componentsData.length===0?
                    <Box style={{ background: '#448AFF', color: 'white', padding: '10px', width: '100%', textAlign: 'center', marginTop: '20px' }}>
                        Drag and Drop a form component
                    </Box>
                    :
                    ''
                }
            </Grid>
            : 
            <FormLoader/>
    )
}

export default FormRenderer
