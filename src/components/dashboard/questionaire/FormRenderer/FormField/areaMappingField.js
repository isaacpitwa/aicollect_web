import { useState, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import {
    Card,
    Grid
} from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { FormContext } from '../../context'
import AreaMapImg from "./areaMap.jpeg"

const areaMappingField = (props) => {
    
    const { editStatus } = useContext(FormContext);

    const { fieldData } = props

    const classes = formStyles();
    
    return (
        <Grid key={fieldData.id} container className={editStatus?classes.section2:classes.section}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <img src={AreaMapImg} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Typography variant="h6">
                    Please walk around the boundary of the area to be mapped
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    GPS coordinates can only be collected when you're mobile
                </Typography>
                <Button color={'primary'}>
                    Start Mapping
                </Button>
            </Grid>
        </Grid>
    )
}

export default areaMappingField;
