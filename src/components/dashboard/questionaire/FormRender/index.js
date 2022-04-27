import { useState, useEffect, useContext } from 'react'
import formStyles from '../styles/FormStyles'
import {
    Grid,
    Box,
    Stack,
    Button,
} from "@mui/material";

import FormLoader from '../utils/FormLoader';
import {
    FormBuildHelp,
} from '../utils';
import { FormContext } from '../context'
import FormField from './FormField'

const FormRender = (props) => {

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
                    justifyContent={'center'}
    
                >
                    {componentsData.map((fieldData, index) => (
                        <FormField key={index} fieldData={fieldData}/>
                    ))}
                    {componentsData.length===0?
                        <FormBuildHelp/>
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
