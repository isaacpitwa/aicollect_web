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
import Section from '../../dialogs/Section';
import { DescriptionCard } from '../../utils'
import GeneralTooltip from '../../previews/GeneralTooltip'
import FormField from '../FormField'

const SectionField = (props) => {

    const {
        setError,
        conditionalDisplay,
        sectionId,
        setSelectSection,
        setSectionId,
        setSubSectionId,
        componentsData,
        setComponentsData,
        editStatus,
        dependantId,
        dependecyValue,
    } = useContext(FormContext);

    const { fieldData } = props

    const [display, setDisplay] = useState('hidden');
    const [sectionDialog, setSectionDialog] = useState(false)

    const handleSectionField = () => {
        setSectionDialog(true)
    }

    const getSectionId = () => {
        if(editStatus){
            if(sectionId===fieldData.id) {
                setError(false)
                setSelectSection(false)
                setSectionId(null)
                setSubSectionId(null)
            } else {
                setError(false)
                setSelectSection(true)
                setSectionId(fieldData.id)
                setSubSectionId(null)
            }
        }
    }

    const deleteField = () => {
        setComponentsData(componentsData.filter(section => section.id !== fieldData.id));
    };

    const handleClose = () => {
        setSectionDialog(false)
    };

    const smallBtn = smallBtns();
    let classes = formStyles();

    const sectionStyle = () => {
        if(editStatus) {
            if(sectionId===fieldData.id) {
                return classes.section3
            } else {
                return classes.section
            }
        } else {
            return classes.section2
        }
    };

    const fieldDisplay = (key) => {

        return (
            <Grid
                key={key}
                container
                className={sectionStyle()}
            >
                {editStatus?
                    <Section
                        open={sectionDialog}
                        fieldData={fieldData}
                        handleClose={handleClose}
                    />
                : "" }
                <Typography
                    onMouseOver={() => { setDisplay('visible') }}
                    onMouseOut={() => { setDisplay('hidden') }}
                    onClick={getSectionId}
                    className={classes.sectionLabel}
                >
                    {fieldData.label}{fieldData.tooltip!==''?<GeneralTooltip tipData={fieldData.tooltip}/>:false}
                    {editStatus ?
                        <small
                            style={{ float: 'right', visibility: display, paddingTop: '5px' }}
                        >
                            <EditIcon
                                onClick={handleSectionField}
                                className={smallBtn.editBtn}
                            />
                            <HighlightOffIcon
                                onClick={deleteField}
                                className={smallBtn.deleteBtn}
                            />
                        </small>
                        : "" }
                </Typography>
                <DescriptionCard description={fieldData.description} helperText={true} />
                {fieldData.components.map((field, index) => (
                    <FormField key={index} fieldData={field} />
                ))}
            </Grid>          
        )
    }

    return (
        fieldData.display==='visible'?
            fieldDisplay()
        : fieldData.display==='hidden'&&editStatus?
            fieldDisplay()
        : fieldData.dependency===dependantId&&dependecyValue>0?
            [...Array(parseInt(dependecyValue)).keys()].map((field, index) => (
                fieldDisplay(index)
            ))
        : conditionalDisplay(fieldData)?
            fieldDisplay()
        : ""
    )
}

export default SectionField
