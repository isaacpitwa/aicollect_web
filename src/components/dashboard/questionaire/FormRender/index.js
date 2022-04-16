import { useContext } from 'react'
import formStyles from '../styles/FormStyles'
import {
    Grid,
    Box,
} from "@mui/material";
import FormLoader from '../utils/FormLoader';


import { FormContext } from '../context'
import SectionField from './FormField/sectionField'

const FormRender = () => {

    const {
        isLoaded,
        componentsData,
    } = useContext(FormContext)

    const classes = formStyles();

    return (
        <Grid
            container
            className={classes.form}
        >
            {isLoaded?
                <Grid
                    container
                    className={classes.formRender}
                >
                    {componentsData.map((fieldData, index) => (
                        <SectionField
                            key={index}
                            fieldData={fieldData}
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
            }
        </Grid>
    )
}

export default FormRender
