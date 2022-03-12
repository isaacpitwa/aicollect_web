import { useState, useEffect, useContext } from 'react'
import formStyles from '../../styles/FormStyles'
import { smallBtns } from '../../styles/FormStyles'
import {
    Grid,
    Typography
} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import {
    DescriptionCard,
    allFormFields
} from '../../utils'

import SubSection from '../../dialogs/SubSection'
import GeneralTooltip from '../../previews/GeneralTooltip'
import FormField from '../FormField'

const SubSectionField = (props) => {

    const { fieldResponses, editStatus } = useContext(FormContext);

    const { fieldData } = props

    const [subSectionDialog, setSubSectionDialog] = useState(false)
    const [display, setDisplay] = useState('hidden');
    const [numericFieldValue, SetNumericFieldValue] = useState(0)

    useEffect(() => {
        SetNumericFieldValue(fieldData.dependency?DependencyFieldValue():0)
    }, [fieldResponses])

    const handleLabel = (e) => {
        setFieldLabel(e.target.value)
    }

    const handleDescription = (e) => {
        setFieldDescription(e.target.value)
    }

    const handleTooltip = (e) => {
        setTooltip(e.target.value)
    }

    const handleDisplay = (e) => {
        setButtonFocused("display")
        setConditional(false)
    }

    const handleConditional = (e) => {
        setButtonFocused("conditional")
        setConditional(true)
    }

    const handleDiplayValue = (e) => {
        setDisplay(e.target.value)
    }

    const handleWhen = (e) => {
        setWhen(e.target.value)
    }

    const handleCompValue = (e) => {
        setCompValue(e.target.value)
    }
    
    const DependencyFieldValue = () => {
        let fieldObj = fieldResponses.find(field => field.fieldId === fieldData.dependency.when)
        return fieldObj.value
    }

    const handleSubSection = () => {
        setSubSectionDialog(true)
    }

    const handleClose = () => {
        setSubSectionDialog(false)
    }
    
    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        fieldData.dependency?
            editStatus?
                [...Array(DependencyFieldValue()).keys()].map(() => (
                    <>
                        <Grid
                            key={fieldData.id}
                            container
                            className={classes.subSection}
                        >
                            <SubSection open={subSectionDialog} fieldData={fieldData} handleClose={handleClose} />
                            <Typography
                                onMouseOver={() => { setDisplay('visible'); } }
                                onMouseOut={() => { setDisplay('hidden'); } }
                                className={classes.subSectionLabel}
                                variant='h5'
                            >
                                {fieldData.label}{fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
                                <small style={{ float: 'right', visibility: display, paddingTop: '5px' }}>
                                    <EditIcon
                                        onClick={handleSubSection}
                                        className={smallBtn.editBtn}
                                    />
                                    <HighlightOffIcon
                                        className={smallBtn.deleteBtn}
                                    />
                                </small>
                            </Typography>
                            <DescriptionCard description={fieldData.description} helperText={true} />
                            <Grid
                                item
                                sm={12}
                                style={{ padding: '10px' }}
                            >
                                {fieldData.components.map((componentData, index) => (
                                    <FormField key={index} fieldData={componentData} />
                                ))}
                            </Grid>
                        </Grid>
                    </>
                ))
            : ""
        :
            <Grid key={fieldData.id} container className={classes.subSection} style={{ visibility: fieldData.display }}>
                <SubSection open={subSectionDialog} fieldData={fieldData} handleClose={handleClose} />
                <Typography
                    onMouseOver={() => { setDisplay('visible'); } }
                    onMouseOut={() => { setDisplay('hidden'); } }
                    className={classes.subSectionLabel}
                    variant='h5'
                >
                    {fieldData.label}{fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
                    <small style={{ float: 'right', visibility: display, paddingTop: '5px' }}>
                    <EditIcon
                        onClick={handleSubSection}
                        className={smallBtn.editBtn}
                    />
                    <HighlightOffIcon
                        className={smallBtn.deleteBtn}
                    />
                    </small>
                </Typography>
                <DescriptionCard description={fieldData.description} helperText={true} />
                <Grid
                    item
                    sm={12}
                    style={{ padding: '10px' }}
                >
                    {fieldData.components.map((componentData, index) => (
                        <FormField key={index} fieldData={componentData} />
                    ))}
                </Grid>
            </Grid>
    )
}

export default SubSectionField
