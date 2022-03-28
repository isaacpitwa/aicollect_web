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
        dependecyValue
    } = useContext(FormContext);

    const { fieldData } = props

    const [fieldStyles, setFieldStyles] = useState(0)
    const [subSectionDialog, setSubSectionDialog] = useState(false)
    const [dependency] = useState(fieldData?fieldData.dependency:null);
    const [display, setDisplay] = useState('hidden');
    const [numericFieldValue, setNumericFieldValue] = useState(0);

    useEffect(() => {
        setFieldStyles(subSectionId===fieldData.id?2:0)
    }, [setSectionId, subSectionId, fieldResponses, editStatus, dependecyValue])

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
    

    const handleClose = () => {
        setSubSectionDialog(false)
    }
    
    const classes = formStyles();
    const smallBtn = smallBtns();

    return (
        fieldData.display==='visible'?
            <Grid
                key={fieldData.id}
                container
                onClick={getSectionIDs}
                className={editStatus?fieldStyles===2?classes.subSection2:classes.subSection:classes.subSection3}
            >
                <SubSection open={subSectionDialog} fieldData={fieldData} handleClose={handleClose} />
                <Typography
                    onMouseOver={() => { setDisplay('visible'); } }
                    onMouseOut={() => { setDisplay('hidden'); } }
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
        : fieldData.display==='hidden'&&editStatus?
            <Grid
                key={fieldData.id}
                container
                onClick={getSectionIDs}
                className={editStatus?fieldStyles===2?classes.subSection2:classes.subSection:classes.subSection3}
            >
                <SubSection open={subSectionDialog} fieldData={fieldData} handleClose={handleClose} />
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
                    className={classes.subSection2}
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
        : ""
    )
}

export default SubSectionField
