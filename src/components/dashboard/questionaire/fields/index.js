import { Grid } from "@mui/material";
import React, { useState } from "react";

export const SectionField = (fieldData) => {

}

const FormField = (props) => {

    const { label, description, type, components, values } = props

    const getField = (types) => {
        switch(types){
            case 'subSection':
                return 'Sub Section Component'
                break;
            case 'textField':
                return 'textField Component'
                break;
            case 'textArea':
                return 'textArea Component'
                break;
            case 'numberField':
                return 'numberField Component'
                break;
            case 'selectBox':
                return 'selectBox Component'
                break;
            case 'selectOption':
                return 'selectOption Component'
                break;
            case 'selectRadio':
                return 'selectRadio Component'
                break;
            case 'emailAddress':
                return 'emailAddress Component'
                break;
            case 'phoneNumber':
                return 'phoneNumber Component'
                break;
            default:
                return 'Section Component'
        }
    }

    return (
        <Grid>
            
        </Grid>    
    )
}
