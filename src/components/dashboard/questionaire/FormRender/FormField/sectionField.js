import { useState, useEffect, useContext } from 'react';
import formStyles from '../../styles/FormStyles';
import { smallBtns } from '../../styles/FormStyles';
import {
    Grid,
    Typography
} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../context'
import Section from '../../dialogs/Section';
import {
    DescriptionCard,
    FieldTooltip,
} from '../../utils';
import GeneralTooltip from '../../previews/GeneralTooltip';
import FormField from '.';

/**
 * @function SectionField
 * @desc This is the Section Field component, it is the Section field displayed in the form.
 * @arg {Object} fieldData - The data of the field which contains all the properties of the Section field.
 * @returns {Component} - Returns a Section field JSX component.
 * @author Atama Zack <atama.zack@gmail.com>
 * @version 1.0.0
 */
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

    const [sectionLoaded, setSectionLoaded] = useState(false);
    const [display, setDisplay] = useState('hidden');
    const [sectionDialog, setSectionDialog] = useState(false)

    useEffect(()=>{
        setSectionLoaded(true)
    }, [componentsData])

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

    const getSectionFields = () => {
        let allFields = componentsData.find(section=>section.id===fieldData.id).components;
        return allFields?allFields:[]
    }

    const deleteField = () => {
        setComponentsData(componentsData.filter(section => section.id !== fieldData.id));
    };

    const handleClose = () => {
        setSectionDialog(false)
    };

    const smallBtn = smallBtns();
    const classes = formStyles();

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
                <Section
                    open={sectionDialog}
                    fieldData={fieldData}
                    handleClose={handleClose}
                />
                <Typography
                    onMouseOver={() => { setDisplay('visible') }}
                    onMouseOut={() => { setDisplay('hidden') }}
                    onClick={getSectionId}
                    className={classes.sectionLabel}
                >
                    {fieldData.label}<FieldTooltip tooltip={fieldData.tooltip}/>
                    {editStatus ?
                        <small
                            className={smallBtn.sectionBtns}
                            style={{ visibility: display }}
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
                <DescriptionCard description={fieldData.description} helperText={false} />
                {sectionLoaded?
                    getSectionFields().map((field, index) => (
                        <FormField key={index} fieldData={field} />
                    ))
                : ""}
            </Grid>
        )
    }

    return (
        fieldData.display==='visible'||conditionalDisplay(fieldData)?
            fieldDisplay()
        : fieldData.display==='hidden'&&editStatus?
            fieldDisplay()
        : fieldData.dependency===dependantId&&dependecyValue>0?
            [...Array(parseInt(dependecyValue)).keys()].map((field, index) => (
                fieldDisplay(index)
            ))
        : ""
    )
}

export default SectionField
