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
    allFormFields,
    getDependantField
} from '../../utils'

import SubSection from '../../dialogs/SubSection'
import GeneralTooltip from '../../previews/GeneralTooltip'
import FormField from '../FormField'

const SubSectionField = (props) => {

    const {
        setError,
        setSelectSection,
        setSectionId,
        subSectionId,
        setSubSectionId,
        fieldResponses,
        editStatus,
        dependantId,
        dependecyValue,
        conditionalId,
        conditionalValue,
        formFieldValues,
        setFormFieldValues,
        deleteFieldData,
    } = useContext(FormContext);

    const { fieldData } = props

    const [fieldStyles, setFieldStyles] = useState(0)
    const [subSectionDialog, setSubSectionDialog] = useState(false)
    const [dependency] = useState(fieldData?fieldData.dependency:null);
    const [conditional, setConditional] = useState(false);
    const [display, setDisplay] = useState('hidden');
    const [numericFieldValue, setNumericFieldValue] = useState(0);

    const handleSubSection = () => {
        setSubSectionDialog(true)
    }

    const getSectionIDs = () => {
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
    }

    const getConditionalValue = (dependeeData) => {
        let dependee = "";
        try {
            if(fieldData.conditional) {
                dependee = dependeeData.find(field => field.id===fieldData.conditional.when&&field.value===fieldData.conditional.value)
                return dependee?true:false
            }
        } catch (error) {
            return false
        }
    }

    const deleteField = () => {
        setSectionId(null)
        setSubSectionId(null)
        deleteFieldData(fieldData)
    }    

    const handleClose = () => {
        setSubSectionDialog(false)
    }
    
    const classes = formStyles();
    const smallBtn = smallBtns();

    const sectionStyle = () => {
        if(subSectionId===fieldData.id) {
            return classes.subSection2
        } else {
            return classes.subSection
        }
    };

    return (
        fieldData.display==='visible'?
            <Grid
                key={fieldData.id}
                container
                onClick={getSectionIDs}
                className={editStatus?sectionStyle():classes.subSection3}
            >
                <SubSection
                    open={subSectionDialog}
                    fieldData={fieldData}
                    handleClose={handleClose}
                />
                <Typography
                    onMouseOver={() => { setDisplay('visible'); } }
                    onMouseOut={() => { setDisplay('hidden'); } }
                    className={classes.subSectionLabel}
                    variant='h5'
                >
                    {fieldData.label}{fieldData.tooltip!==''? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
                    {editStatus?
                        <small style={{ float: 'right', visibility: display, paddingTop: '5px' }}>
                        <EditIcon
                            onClick={handleSubSection}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
                        </small>
                    :
                        ""
                    }
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
        : fieldData.display==='hidden'&&editStatus?
            <Grid
                container
                onClick={getSectionIDs}
                className={editStatus?sectionStyle():classes.subSection3}
            >
                <SubSection
                    open={subSectionDialog}
                    fieldData={fieldData}
                    handleClose={handleClose}
                />
                <Typography
                    onMouseOver={() => { setDisplay('visible'); } }
                    onMouseOut={() => { setDisplay('hidden'); } }
                    className={classes.subSectionLabel}
                    variant='h5'
                >                    
                    {fieldData.label} {fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
                    {editStatus?
                        <small style={{ float: 'right', visibility: display, paddingTop: '5px' }}>
                        <EditIcon
                            onClick={handleSubSection}
                            className={smallBtn.editBtn}
                        />
                        <HighlightOffIcon
                            onClick={deleteField}
                            className={smallBtn.deleteBtn}
                        />
                        </small>
                    :
                        ""
                    }
                </Typography>
                <DescriptionCard description={fieldData.description} helperText={true} />
                <Grid
                    item
                    sm={12}
                    style={{ padding: '10px' }}
                >
                    {fieldData.components.map((componentData, index) => (
                        <FormField key={index} fieldKey={index} fieldData={componentData} />
                    ))}
                </Grid>
            </Grid>
        : fieldData.dependency===dependantId&&dependecyValue>0?
            [...Array(parseInt(dependecyValue)).keys()].map((field, index) => (
                <Grid
                    key={index}
                    container
                    className={classes.subSection3}
                >
                    <Typography
                        className={classes.subSectionLabel}
                        variant='h5'
                    >
                        {fieldData.label}{fieldData.tooltip != '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
                        {editStatus?
                            <small style={{ float: 'right', visibility: display, paddingTop: '5px' }}>
                            <EditIcon
                                onClick={handleSubSection}
                                className={smallBtn.editBtn}
                            />
                            <HighlightOffIcon
                                onClick={deleteField}
                                className={smallBtn.deleteBtn}
                            />
                            </small>
                        :
                            ""
                        }
                    </Typography>
                    <DescriptionCard description={fieldData.description} helperText={true} />
                    <Grid
                        item
                        sm={12}
                        style={{ padding: '10px' }}
                    >
                        {fieldData.components.map((componentData, index) => (
                            <FormField key={index} fieldKey={index} fieldData={componentData} />
                        ))}
                    </Grid>
                </Grid>
            ))
        : fieldData.conditional&&fieldData.conditional.when===conditionalId&&fieldData.conditional.value===conditionalValue&&!editStatus?
            <Grid
                container
                className={classes.subSection3}
            >
                <Typography
                    onMouseOver={() => { setDisplay('visible'); } }
                    onMouseOut={() => { setDisplay('hidden'); } }
                    className={classes.subSectionLabel}
                    variant='h5'
                >
                    {fieldData.label}{fieldData.tooltip !== '' ? <GeneralTooltip tipData={fieldData.tooltip} /> : false}
                    {editStatus?
                        <small style={{ float: 'right', visibility: display, paddingTop: '5px' }}>
                            <EditIcon
                                onClick={handleSubSection}
                                className={smallBtn.editBtn}
                            />
                            <HighlightOffIcon
                                onClick={deleteField}
                                className={smallBtn.deleteBtn}
                            />
                        </small>
                    :
                        ""
                    }
                </Typography>
                <DescriptionCard description={fieldData.description} helperText={true} />
                <Grid
                    item
                    sm={12}
                    style={{ padding: '10px' }}
                >
                    {fieldData.components.map((componentData, index) => (
                        <FormField key={index} fieldKey={index} fieldData={componentData} />
                    ))}
                </Grid>
            </Grid>
        : ""
    )
}

export default SubSectionField
