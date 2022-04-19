import { useContext } from 'react'
import formStyles from '../styles/FormStyles'
import {
    Grid,
    Typography,
} from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import FormLoader from '../utils/FormLoader';
import { FormContext } from '../context'
import SectionField from './FormField/sectionField'

const FormRenderer = () => {

    const {
        isLoaded,
        componentsData,
        setComponentsData, 
        formFieldValues,
    } = useContext(FormContext)

    const handleRemove = (fieldId) => {
        setComponentsData(componentsData.filter(section => section.id !== fieldId))
    }

    const classes = formStyles();

    return (
        isLoaded?
            <Grid
                container
                className={classes.formRender}
                justifyContent={'center'}                
            >
                {console.log("Field Values:===>", formFieldValues)}
                {componentsData.map((fieldData, index) => (
                    <SectionField
                        key={index}
                        fieldData={fieldData}
                    />
                ))}
                {componentsData.length===0?
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={10}
                        lg={9}
                        xl={9}
                    >
                        <Alert
                            severity="info"
                            className={classes.alertContainer}
                        >
                            <AlertTitle
                                className={classes.alertTitle}
                            >This Form has no fields.</AlertTitle>
                            <Typography
                                className={classes.alertHeader1}
                            >
                                <strong>Quick Start</strong><br/>
                            </Typography>
                            <Typography
                                className={classes.alertBody}
                            >
                                To add fields to this form, follow the steps listed below;<br/>
                                <strong>Step 1:</strong> Check if you are in [ <strong>Form Builder: </strong>Edit Mode ] at the top, if not, click on the <strong>Edit Form</strong> button.<br/>
                                <strong>Step 2:</strong> Click on the <strong>Section</strong> button to add a section to the form.<br/>
                                <strong>Step 3:</strong> Other buttons will appear after creating a form Section field.
                            </Typography>
                        </Alert>
                    </Grid>
                : "" }
            </Grid>
        : 
            <FormLoader/>
    )
}

export default FormRenderer
