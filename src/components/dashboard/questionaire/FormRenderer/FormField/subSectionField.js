import { useState, useEffect, useContext } from 'react';
import formStyles from '../../styles/FormStyles';
import { smallBtns } from '../../styles/FormStyles';
import {
    Grid,
    Typography
} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context';
import SubSection from '../../dialogs/SubSection';
import { DescriptionCard } from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';
import FormField from '../FormField';

/**
 * @function SubSectionField
 * @desc This is the Sub-Section Field component, it is the Sub-Section field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Sub-Section field.
 * @returns {Component} - Returns a Sub-Section field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
const SubSectionField = (props) => {

    const {
        setError,
        conditionalDisplay,
        setSelectSection,
        setSectionId,
        subSectionId,
        setSubSectionId,
        editStatus,
        dependantId,
        dependecyValue,
        deleteFieldData,
    } = useContext(FormContext);

    const { fieldData } = props

    const [display, setDisplay] = useState('hidden');
    const [subSectionDialog, setSubSectionDialog] = useState(false)

    const handleSubSection = () => {
        setSubSectionDialog(true)
    }

    const getSectionIds = () => {
        if(editStatus){
            if(subSectionId===fieldData.id) {
                setError(false)
                setSubSectionId(null)
            } else {
                setError(false)
                setSelectSection(true)
                setSectionId(fieldData.parentId)
                setSubSectionId(fieldData.id)
            }
        }
    };

    const deleteField = () => {
        setSectionId(null)
        setSubSectionId(null)
        deleteFieldData(fieldData)
    };   

    const handleClose = () => {
        setSubSectionDialog(false)
    };
    
    const classes = formStyles();
    const smallBtn = smallBtns();

    const subSectionStyle = () => {
        if(editStatus) {
            if(subSectionId===fieldData.id) {
                return classes.subSection3
            } else {
                return classes.subSection
            }
        } else {
            return classes.subSection2
        }
    };

    const fieldDisplay = (key) => {

        return (
            <Grid
                key={key}
                container
                onClick={getSectionIds}
                className={subSectionStyle()}
            >
                <Typography
                    onMouseOver={() => { setDisplay('visible'); } }
                    onMouseOut={() => { setDisplay('hidden'); } }
                    className={classes.subSectionLabel}
                >
                    {editStatus?
                        <SubSection
                            open={subSectionDialog}
                            fieldData={fieldData}
                            handleClose={handleClose}
                        />
                    : "" }
                    {fieldData.label}{fieldData.tooltip!=''?<GeneralTooltip tipData={fieldData.tooltip}/>:false}
                    {editStatus?
                        <small
                            className={smallBtn.sectionBtns}
                            style={{ visibility: display }}
                        >
                            <EditIcon
                                onClick={handleSubSection}
                                className={smallBtn.editBtn}
                            />
                            <HighlightOffIcon
                                onClick={deleteField}
                                className={smallBtn.deleteBtn}
                            />
                        </small>
                    : "" }
                </Typography>
                <DescriptionCard description={fieldData.description} helperText={false} />
                {fieldData.components.map((field, index) => (
                    <FormField key={index} fieldData={field} />
                ))}
            </Grid>        
        )
    }

    return (
        fieldData.display==='visible'?
            fieldDisplay(fieldData.id)
        : fieldData.display==='hidden'&&editStatus?
            fieldDisplay(fieldData.id)
        : fieldData.dependency===dependantId&&dependecyValue>0?
            [...Array(parseInt(dependecyValue)).keys()].map((field, index) => (
                fieldDisplay(index)
            ))
        : conditionalDisplay(fieldData)?
            fieldDisplay()
        : ""
    )
}

export default SubSectionField
