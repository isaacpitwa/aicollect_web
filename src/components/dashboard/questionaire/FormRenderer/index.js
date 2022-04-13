import { useContext } from 'react'
import formStyles from '../styles/FormStyles'
import {
    Grid,
    Box,
} from "@mui/material";
import FormLoader from '../utils/FormLoader';


import { FormContext } from '../context'
import SectionField from './FormField/sectionField'

const FormRenderer = (props) => {

    const { isLoaded, componentsData, setComponentsData, fieldResponses } = useContext(FormContext)

    const { editStatus, handleFormUpdate } = props

    const handleRemove = (fieldId) => {
        setComponentsData(componentsData.filter(section => section.id !== fieldId))
    }

    const classes = formStyles();

    return (
        isLoaded?
            <Grid
                container
                className={classes.form}
            >
                {componentsData.map((fieldData, index) => (
                    <SectionField
                        key={index}
                        fieldData={fieldData}
                        fieldResponses={fieldResponses}
                        editStatus={editStatus}
                        handleFormUpdate={handleFormUpdate}
                        handleRemove={handleRemove}
                    />
                ))}
                {componentsData.length===0?
                    <Box 
                        className={classes.formFields}
                    >
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
